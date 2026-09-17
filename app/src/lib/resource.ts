/** Shared load for Orchid ResourcePicker and ResourceList. See docs/hitpay/{products,orders,charges,invoices}.md */
import { createServerFn } from '@tanstack/react-start'

import { ALL_ROLES } from '#/lib/roles'
import { requireRoles } from '#/server/lib/session'
import { proxyRequest } from '#/server/lib/proxy'

export type ResourceType = 'product' | 'order' | 'charge' | 'invoice'
export type ResourceRecord = Record<string, unknown>
export type ResourceItem = {
  id: string
  title: string
  subtitle?: string
  image?: string | null
  badge?: string
  meta?: string
  trailing?: string
  resource?: ResourceRecord
  children?: ResourceItem[]
}
export type ResourceLoadInput = {
  type: ResourceType
  page?: number
  cursor?: string
  query?: string
  filter?: string
  extras?: Record<string, string>
}
export type ResourcePage = {
  items: ResourceItem[]
  hasMore: boolean
  cursor?: string
  total?: number
}

const ORDER_STATUSES = ['completed', 'pending', 'sent', 'draft', 'expired', 'canceled'] as const
const CHARGE_STATUSES = [
  'canceled',
  'failed',
  'refunded',
  'partially_refunded',
  'requires_customer_action',
  'requires_payment_method',
  'succeeded',
  'succeeded_manually',
  'void',
  'pending',
] as const

export function mapResourcePayload(data: ResourceLoadInput, payload: unknown): ResourcePage {
  const page = data.page || 1
  const body = payload && typeof payload === 'object' ? (payload as {
    data?: unknown[]
    meta?: { current_page?: number; last_page?: number; next_cursor?: string | null; total?: number; total_count?: number; count?: number }
    links?: { next?: string | null }
  }) : null
  const rows = Array.isArray(payload)
    ? payload as Record<string, unknown>[]
    : Array.isArray(body?.data)
      ? body.data as Record<string, unknown>[]
      : []
  const cursor = typeof body?.meta?.next_cursor === 'string' && body.meta.next_cursor
    ? body.meta.next_cursor
    : undefined
  const more = typeof body?.meta?.last_page === 'number'
    ? page < body.meta.last_page
    : Boolean(cursor) || Boolean(body?.links?.next)
  const total = [body?.meta?.total, body?.meta?.total_count, body?.meta?.count].find(
    (value): value is number => typeof value === 'number' && Number.isFinite(value),
  )

  if (data.type === 'product') {
    return {
      items: rows.map((product) => {
        const images = product.images
        const first = Array.isArray(images) ? images[0] as { url?: string; urls?: { thumbnail?: string; icon?: string } } : undefined
        const shopify = product.shopify && typeof product.shopify === 'object' && !Array.isArray(product.shopify)
          ? (product.shopify as { image_url?: unknown }).image_url
          : undefined
        const image = first?.urls?.thumbnail || first?.urls?.icon || first?.url
          || (typeof shopify === 'string' ? shopify : null)
          || (typeof product.image === 'string' ? product.image : null)
        const sku = typeof (product.stock_keeping_unit ?? product.sku) === 'string'
          ? String(product.stock_keeping_unit ?? product.sku).trim() || undefined
          : undefined
        const variations = Array.isArray(product.variations) ? product.variations : []
        return {
          id: String(product.id),
          title: String(product.name ?? product.id),
          subtitle: sku,
          image,
          badge: product.status === 'draft' ? 'Draft' : undefined,
          resource: product,
          children: variations.map((variation) => {
            const row = variation as Record<string, unknown>
            const values = Array.isArray(row.values)
              ? row.values
                .map((entry) => {
                  if (!entry || typeof entry !== 'object' || Array.isArray(entry)) return ''
                  const value = (entry as { value?: unknown }).value
                  return typeof value === 'string' ? value : ''
                })
                .filter(Boolean)
              : []
            const title = values.length
              ? values.join(' / ')
              : (typeof row.description === 'string' && row.description ? row.description : 'Variant')
            const quantity = typeof row.quantity === 'number' ? row.quantity : null
            const variantSku = typeof (row.stock_keeping_unit ?? row.sku) === 'string'
              ? String(row.stock_keeping_unit ?? row.sku).trim() || undefined
              : undefined
            const metaParts = [variantSku, quantity == null ? undefined : `${quantity} available`].filter(Boolean)
            return {
              id: String(row.id),
              title,
              meta: metaParts.length ? metaParts.join(' · ') : undefined,
              trailing: typeof row.price_display === 'string' ? row.price_display : undefined,
              resource: row,
            }
          }),
        }
      }),
      hasMore: more,
      total,
    }
  }

  if (data.type === 'order') {
    return {
      items: rows.map((order) => ({
        id: String(order.id),
        title: order.order_display_number != null ? `Order #${order.order_display_number}` : String(order.id),
        badge: typeof order.status === 'string' ? order.status : undefined,
        resource: order,
      })),
      hasMore: more,
      total,
    }
  }

  if (data.type === 'charge') {
    return {
      items: rows.map((charge) => ({
        id: String(charge.id),
        title: [charge.remark, charge.amount, charge.currency].filter(Boolean).join(' · ') || String(charge.id),
        badge: typeof charge.status === 'string' ? charge.status : undefined,
        resource: charge,
      })),
      hasMore: more || Boolean(cursor),
      cursor,
      total,
    }
  }

  if (data.type === 'invoice') {
    return {
      items: rows.map((invoice) => ({
        id: String(invoice.id),
        title: String(invoice.invoice_number || invoice.reference || invoice.email || invoice.id),
        badge: typeof invoice.status === 'string' ? invoice.status : undefined,
        resource: invoice,
      })),
      hasMore: more || Boolean(cursor),
      cursor,
      total,
    }
  }

  throw new Error(`Unsupported resource type: ${data.type}`)
}

export const loadResourcePage = createServerFn({ method: 'GET' })
  .validator((data: ResourceLoadInput) => data)
  .handler(async ({ data }): Promise<ResourcePage> => {
    await requireRoles(ALL_ROLES)
    const query = new URLSearchParams()
    const page = data.page || 1
    const extras = data.extras

    if (data.type === 'product') {
      query.set('page', String(page))
      query.set('per_page', '25')
      if (data.query) query.append('keywords', data.query)
      if (data.filter === 'published' || data.filter === 'draft') query.append('statuses[]', data.filter)
      if (extras?.inventory === 'in_stock' || extras?.inventory === 'out_of_stock') query.append('inventory', extras.inventory)
      if (extras?.channel && extras.channel !== 'all') query.append('channels[]', extras.channel)
      if (extras?.location_id && extras.location_id !== 'all') query.append('location_ids[]', extras.location_id)
      const categoryIds = extras?.category_ids
        ? extras.category_ids.split(',').map((id) => id.trim()).filter(Boolean)
        : extras?.category_id && extras.category_id !== 'all'
          ? [extras.category_id]
          : []
      for (const categoryId of categoryIds) query.append('categories[]', categoryId)
      const response = await proxyRequest(`/v1/products?${query}`)
      if (!response.ok) throw new Error('Could not load products.')
      return mapResourcePayload(data, await response.json())
    }

    if (data.type === 'order') {
      query.set('page', String(page))
      query.set('per_page', '25')
      if (data.query) query.set('keywords', data.query)
      if (data.filter === 'all') {
        for (const status of ORDER_STATUSES) query.append('statuses[]', status)
      } else {
        query.append('statuses[]', data.filter ?? 'all')
      }
      if (extras?.channel && extras.channel !== 'all') query.append('channels[]', extras.channel)
      if (extras?.date_from) query.set('dateFrom', extras.date_from)
      if (extras?.date_to) query.set('dateTo', extras.date_to)
      const response = await proxyRequest(`/v1/orders?${query}`)
      if (!response.ok) throw new Error('Could not load orders.')
      return mapResourcePayload(data, await response.json())
    }

    if (data.type === 'charge') {
      query.set('page', String(page))
      query.set('per_page', '25')
      if (data.query) query.set('keywords', data.query)
      if (data.filter === 'all') {
        for (const status of CHARGE_STATUSES) query.append('statuses[]', status)
      } else {
        query.append('statuses[]', data.filter ?? 'all')
      }
      if (extras?.location_id && extras.location_id !== 'all') query.append('location_ids[]', extras.location_id)
      if (extras?.payment_method && extras.payment_method !== 'all') query.append('payment_methods[]', extras.payment_method)
      if (extras?.date_from) query.set('date_from', extras.date_from)
      if (extras?.date_to) query.set('date_to', extras.date_to)
      const response = await proxyRequest(`/v1/charges?${query}`)
      if (!response.ok) throw new Error('Could not load charges.')
      return mapResourcePayload(data, await response.json())
    }

    if (data.type === 'invoice') {
      query.set('per_page', '10')
      if (data.query) query.set('keywords', data.query)
      if (data.filter && data.filter !== 'all') query.set('status', data.filter)
      if (data.cursor) query.set('cursor', data.cursor)
      const response = await proxyRequest(`/v1/invoices?${query}`)
      if (!response.ok) throw new Error('Could not load invoices.')
      return mapResourcePayload(data, await response.json())
    }

    throw new Error(`Unsupported resource type: ${data.type}`)
  })
