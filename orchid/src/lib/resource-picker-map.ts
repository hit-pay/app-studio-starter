import type {
  ResourcePickerItem,
  ResourcePickerLoadInput,
  ResourcePickerPage,
  ResourcePickerRecord,
  ResourcePickerType,
} from '@/components/form/resource-picker'

function asRecord(value: unknown): ResourcePickerRecord {
  return value as ResourcePickerRecord
}

type Paginated<T> = {
  data?: T[]
  meta?: { current_page?: number; last_page?: number; next_cursor?: string | null }
  links?: { next?: string | null }
}

function asList<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) return payload as T[]
  if (payload && typeof payload === 'object' && 'data' in payload) {
    const data = (payload as Paginated<T>).data
    if (Array.isArray(data)) return data
  }
  return []
}

function hasMore(payload: unknown, page: number) {
  if (!payload || typeof payload !== 'object') return false
  const body = payload as Paginated<unknown>
  if (typeof body.meta?.last_page === 'number') return page < body.meta.last_page
  if (typeof body.meta?.next_cursor === 'string' && body.meta.next_cursor) return true
  return Boolean(body.links?.next)
}

function nextCursor(payload: unknown): string | undefined {
  if (!payload || typeof payload !== 'object') return undefined
  const cursor = (payload as Paginated<unknown>).meta?.next_cursor
  return typeof cursor === 'string' && cursor ? cursor : undefined
}

function imageUrl(images: unknown): string | null {
  if (!Array.isArray(images) || images.length === 0) return null
  const first = images[0] as { url?: string; urls?: { thumbnail?: string; icon?: string } }
  return first.urls?.thumbnail || first.urls?.icon || first.url || null
}

function variationTitle(variation: Record<string, unknown>) {
  const parts = [1, 2, 3]
    .map((index) => variation[`variation_value_${index}`])
    .filter((value): value is string => typeof value === 'string' && value.length > 0)
  if (parts.length) return parts.join(' / ')
  if (typeof variation.description === 'string' && variation.description) return variation.description
  return 'Variant'
}

function rowsOf(type: ResourcePickerType, payload: unknown): Record<string, unknown>[] {
  if (type === 'shipping' && payload && typeof payload === 'object') {
    const shippings = (payload as { shippings?: unknown }).shippings
    if (Array.isArray(shippings)) return shippings as Record<string, unknown>[]
  }
  return asList<Record<string, unknown>>(payload)
}

function mapProduct(product: Record<string, unknown>): ResourcePickerItem {
  const variations = Array.isArray(product.variations) ? product.variations : []
  return {
    id: String(product.id),
    title: String(product.name ?? product.id),
    image: imageUrl(product.images),
    badge: product.status === 'draft' ? 'Draft' : undefined,
    resource: asRecord(product),
    children: variations.map((variation) => {
      const row = variation as Record<string, unknown>
      const quantity = typeof row.quantity === 'number' ? row.quantity : null
      return {
        id: String(row.id),
        title: variationTitle(row),
        meta: quantity == null ? undefined : `${quantity} available`,
        trailing: typeof row.price_display === 'string' ? row.price_display : undefined,
        resource: asRecord(row),
      }
    }),
  }
}

function mapCustomer(customer: Record<string, unknown>): ResourcePickerItem {
  return {
    id: String(customer.id),
    title: String(customer.name || customer.email || customer.id),
    resource: asRecord(customer),
  }
}

function customerMatches(customer: Record<string, unknown>, needle: string) {
  if (!needle) return true
  const hay = [customer.name, customer.email, customer.phone_number]
    .filter((value) => typeof value === 'string')
    .join(' ')
    .toLowerCase()
  return hay.includes(needle)
}

/** Post-fetch mapping + the client filters `loadResourcePickerPage` already applies. */
function mapResourcePickerPayload(
  data: ResourcePickerLoadInput,
  payload: unknown,
): ResourcePickerPage {
  const page = data.page || 1
  const type = data.type
  const rows = rowsOf(type, payload)
  const needle = data.query.trim().toLowerCase()

  if (type === 'product') {
    return { items: rows.map(mapProduct), hasMore: hasMore(payload, page) }
  }

  if (type === 'product-category') {
    return {
      items: rows.map((category) => ({
        id: String(category.id),
        title: String(category.name ?? category.id),
        image: imageUrl(category.image ? [category.image] : []),
        badge: category.is_active === false ? 'Inactive' : undefined,
        resource: asRecord(category),
      })),
      hasMore: hasMore(payload, page),
    }
  }

  if (type === 'customer') {
    return { items: rows.map(mapCustomer), hasMore: hasMore(payload, page) }
  }

  if (type === 'order') {
    return {
      items: rows.map((order) => ({
        id: String(order.id),
        title:
          order.order_display_number != null
            ? `Order #${order.order_display_number}`
            : String(order.id),
        badge: typeof order.status === 'string' ? order.status : undefined,
        resource: asRecord(order),
      })),
      hasMore: false,
    }
  }

  if (type === 'location') {
    return {
      items: rows
        .filter((location) => {
          if (data.filter === 'active') return location.active !== false
          if (data.filter === 'inactive') return location.active === false
          return true
        })
        .map((location) => ({
          id: String(location.id),
          title: String(location.name ?? location.id),
          badge: location.active === false ? 'Inactive' : undefined,
          resource: asRecord(location),
        })),
      hasMore: false,
    }
  }

  if (type === 'charge') {
    const cursor = nextCursor(payload)
    return {
      items: rows.map((charge) => ({
        id: String(charge.id),
        title: [charge.remark, charge.amount, charge.currency].filter(Boolean).join(' · ') || String(charge.id),
        badge: typeof charge.status === 'string' ? charge.status : undefined,
        resource: asRecord(charge),
      })),
      hasMore: Boolean(cursor),
      cursor,
    }
  }

  if (type === 'invoice') {
    return {
      items: rows.map((invoice) => ({
        id: String(invoice.id),
        title: String(invoice.invoice_number || invoice.reference || invoice.email || invoice.id),
        badge: typeof invoice.status === 'string' ? invoice.status : undefined,
        resource: asRecord(invoice),
      })),
      hasMore: hasMore(payload, page),
    }
  }

  if (type === 'coupon') {
    return {
      items: rows.map((row) => ({
        id: String(row.id),
        title: String(row.name || row.code || row.id),
        badge: typeof row.code === 'string' ? row.code : undefined,
        resource: asRecord(row),
      })),
      hasMore: hasMore(payload, page),
    }
  }

  if (type === 'discount') {
    return {
      items: rows.map((row) => ({
        id: String(row.id),
        title: String(row.name || row.id),
        badge: typeof row.discount_type === 'string' ? row.discount_type : undefined,
        resource: asRecord(row),
      })),
      hasMore: hasMore(payload, page),
    }
  }

  if (type === 'tax') {
    return {
      items: rows.map((row) => ({
        id: String(row.id),
        title: String(row.name || row.id),
        badge: row.tax_inclusive ? 'Inclusive' : undefined,
        resource: asRecord(row),
      })),
      hasMore: hasMore(payload, page),
    }
  }

  if (type === 'shipping') {
    return {
      items: rows
        .filter((row) => {
          if (needle && !String(row.name ?? '').toLowerCase().includes(needle)) return false
          if (data.filter === 'active') return row.is_active !== false
          if (data.filter === 'inactive') return row.is_active === false
          return true
        })
        .map((row) => ({
          id: String(row.id),
          title: String(row.name ?? row.id),
          badge: row.is_active === false ? 'Inactive' : undefined,
          resource: asRecord(row),
        })),
      hasMore: false,
    }
  }

  if (type === 'pickup') {
    return {
      items: rows
        .filter((row) => !needle || String(row.name ?? row.address ?? '').toLowerCase().includes(needle))
        .map((row) => ({
          id: String(row.id),
          title: String(row.name ?? row.address ?? row.id),
          badge: typeof row.status === 'string' ? row.status : undefined,
          resource: asRecord(row),
        })),
      hasMore: hasMore(payload, page),
    }
  }

  if (type === 'add-on') {
    return {
      items: rows.map((row) => ({
        id: String(row.id),
        title: String(row.name || row.id),
        resource: asRecord(row),
      })),
      hasMore: hasMore(payload, page),
    }
  }

  throw new Error(`Unsupported resource picker type: ${data.type}`)
}

export { asList, customerMatches, hasMore, mapCustomer, mapResourcePickerPayload, nextCursor }
