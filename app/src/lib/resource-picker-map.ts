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
  const values = variation.values
  if (Array.isArray(values)) {
    const parts = values
      .map((entry) => {
        if (!entry || typeof entry !== 'object' || Array.isArray(entry)) return ''
        const value = (entry as { value?: unknown }).value
        return typeof value === 'string' ? value : ''
      })
      .filter(Boolean)
    if (parts.length) return parts.join(' / ')
  }
  if (typeof variation.description === 'string' && variation.description) return variation.description
  return 'Variant'
}

function productImage(product: Record<string, unknown>): string | null {
  const fromImages = imageUrl(product.images)
  if (fromImages) return fromImages
  const shopify = product.shopify
  if (shopify && typeof shopify === 'object' && !Array.isArray(shopify)) {
    const url = (shopify as { image_url?: unknown }).image_url
    if (typeof url === 'string' && url) return url
  }
  return typeof product.image === 'string' ? product.image : null
}

function cursorPage(items: ResourcePickerItem[], payload: unknown): ResourcePickerPage {
  const cursor = nextCursor(payload)
  return { items, hasMore: Boolean(cursor), cursor }
}

function rowsOf(_type: ResourcePickerType, payload: unknown): Record<string, unknown>[] {
  return asList<Record<string, unknown>>(payload)
}

function mapProduct(product: Record<string, unknown>): ResourcePickerItem {
  const variations = Array.isArray(product.variations) ? product.variations : []
  return {
    id: String(product.id),
    title: String(product.name ?? product.id),
    image: productImage(product),
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

  if (type === 'product') {
    return { items: rows.map(mapProduct), hasMore: hasMore(payload, page) }
  }

  if (type === 'customer') {
    return cursorPage(rows.map(mapCustomer), payload)
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
      hasMore: hasMore(payload, page),
    }
  }

  if (type === 'charge') {
    return cursorPage(
      rows.map((charge) => ({
        id: String(charge.id),
        title: [charge.remark, charge.amount, charge.currency].filter(Boolean).join(' · ') || String(charge.id),
        badge: typeof charge.status === 'string' ? charge.status : undefined,
        resource: asRecord(charge),
      })),
      payload,
    )
  }

  if (type === 'invoice') {
    return cursorPage(
      rows.map((invoice) => ({
        id: String(invoice.id),
        title: String(invoice.invoice_number || invoice.reference || invoice.email || invoice.id),
        badge: typeof invoice.status === 'string' ? invoice.status : undefined,
        resource: asRecord(invoice),
      })),
      payload,
    )
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
