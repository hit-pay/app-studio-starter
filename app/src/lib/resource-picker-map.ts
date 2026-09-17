import type {
  ResourcePickerItem,
  ResourcePickerLoadInput,
  ResourcePickerPage,
  ResourcePickerRecord,
  ResourcePickerType,
} from '@/components/form/resource-picker'
function extractListTotal(payload: unknown): number | undefined {
  if (!payload || typeof payload !== 'object') return undefined
  const meta = (payload as { meta?: Record<string, unknown> }).meta
  if (!meta) return undefined
  for (const key of ['total', 'total_count', 'count']) {
    const value = meta[key]
    if (typeof value === 'number' && Number.isFinite(value)) return value
  }
  return undefined
}

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

function pageResult(items: ResourcePickerItem[], payload: unknown, page: number): ResourcePickerPage {
  const cursor = nextCursor(payload)
  return {
    items,
    hasMore: hasMore(payload, page) || Boolean(cursor),
    cursor,
    total: extractListTotal(payload),
  }
}

function rowsOf(_type: ResourcePickerType, payload: unknown): Record<string, unknown>[] {
  return asList<Record<string, unknown>>(payload)
}

function readSku(row: Record<string, unknown>) {
  const raw = row.stock_keeping_unit ?? row.sku
  return typeof raw === 'string' && raw.trim() ? raw.trim() : undefined
}

function mapProduct(product: Record<string, unknown>): ResourcePickerItem {
  const variations = Array.isArray(product.variations) ? product.variations : []
  const productSku = readSku(product)
  return {
    id: String(product.id),
    title: String(product.name ?? product.id),
    subtitle: productSku,
    image: productImage(product),
    badge: product.status === 'draft' ? 'Draft' : undefined,
    resource: asRecord(product),
    children: variations.map((variation) => {
      const row = variation as Record<string, unknown>
      const quantity = typeof row.quantity === 'number' ? row.quantity : null
      const variantSku = readSku(row)
      const metaParts = [
        variantSku,
        quantity == null ? undefined : `${quantity} available`,
      ].filter(Boolean)
      return {
        id: String(row.id),
        title: variationTitle(row),
        meta: metaParts.length ? metaParts.join(' · ') : undefined,
        trailing: typeof row.price_display === 'string' ? row.price_display : undefined,
        resource: asRecord(row),
      }
    }),
  }
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
    return {
      items: rows.map(mapProduct),
      hasMore: hasMore(payload, page),
      total: extractListTotal(payload),
    }
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
      total: extractListTotal(payload),
    }
  }

  if (type === 'charge') {
    return pageResult(
      rows.map((charge) => ({
        id: String(charge.id),
        title: [charge.remark, charge.amount, charge.currency].filter(Boolean).join(' · ') || String(charge.id),
        badge: typeof charge.status === 'string' ? charge.status : undefined,
        resource: asRecord(charge),
      })),
      payload,
      page,
    )
  }

  if (type === 'invoice') {
    return pageResult(
      rows.map((invoice) => ({
        id: String(invoice.id),
        title: String(invoice.invoice_number || invoice.reference || invoice.email || invoice.id),
        badge: typeof invoice.status === 'string' ? invoice.status : undefined,
        resource: asRecord(invoice),
      })),
      payload,
      page,
    )
  }

  throw new Error(`Unsupported resource picker type: ${data.type}`)
}

export { asList, hasMore, mapResourcePickerPayload, nextCursor }
