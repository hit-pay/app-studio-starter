import { createServerFn } from '@tanstack/react-start'

import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'
import type {
  ResourcePickerItem,
  ResourcePickerLoadInput,
  ResourcePickerPage,
  ResourcePickerRecord,
} from '@/components/overlays/resource-picker'

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

const loadResourcePickerPage = createServerFn({ method: 'GET' })
  .inputValidator((data: ResourcePickerLoadInput) => data)
  .handler(async ({ data }): Promise<ResourcePickerPage> => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const query = new URLSearchParams()
    const page = data.page || 1

    if (data.type === 'product') {
      query.set('page', String(page))
      query.set('per_page', '25')
      if (data.query) query.append('keywords', data.query)
      if (data.filter === 'published' || data.filter === 'draft') query.append('statuses', data.filter)
      if (data.extras?.inventory === 'in_stock' || data.extras?.inventory === 'out_of_stock') {
        query.append('inventory', data.extras.inventory)
      }
      if (data.extras?.channel && data.extras.channel !== 'all') {
        query.append('channels', data.extras.channel)
      }
      const response = await hitpayRequest(`/v1/products?${query}`)
      if (!response.ok) throw new Error('Could not load products.')
      const payload = await response.json()
      const items: ResourcePickerItem[] = asList<Record<string, unknown>>(payload).map((product) => {
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
      })
      return { items, hasMore: hasMore(payload, page) }
    }

    if (data.type === 'product-category') {
      query.set('page', String(page))
      query.set('perPage', '20')
      if (data.query) query.set('keywords', data.query)
      if (data.filter === 'active') query.set('active', '1')
      if (data.filter === 'inactive') query.set('active', '0')
      const response = await hitpayRequest(`/v1/product-category?${query}`)
      if (!response.ok) throw new Error('Could not load product categories.')
      const payload = await response.json()
      const items: ResourcePickerItem[] = asList<Record<string, unknown>>(payload).map((category) => ({
        id: String(category.id),
        title: String(category.name ?? category.id),
        image: imageUrl(category.image ? [category.image] : []),
        badge: category.is_active === false ? 'Inactive' : undefined,
        resource: asRecord(category),
      }))
      return { items, hasMore: hasMore(payload, page) }
    }

    if (data.type === 'customer') {
      const needle = data.query.trim().toLowerCase()
      const toItem = (customer: Record<string, unknown>): ResourcePickerItem => ({
        id: String(customer.id),
        title: String(customer.name || customer.email || customer.id),
        resource: asRecord(customer),
      })
      const matches = (customer: Record<string, unknown>) => {
        if (!needle) return true
        const hay = [customer.name, customer.email, customer.phone_number]
          .filter((value) => typeof value === 'string')
          .join(' ')
          .toLowerCase()
        return hay.includes(needle)
      }

      if (!needle) {
        query.set('page', String(page))
        query.set('per_page', '25')
        const response = await hitpayRequest(`/v1/customers?${query}`)
        if (!response.ok) throw new Error('Could not load customers.')
        const payload = await response.json()
        return {
          items: asList<Record<string, unknown>>(payload).map(toItem),
          hasMore: hasMore(payload, page),
        }
      }

      const found: ResourcePickerItem[] = []
      let cursor = 1
      let more = true
      while (more && found.length < 25 && cursor <= 8) {
        const pageQuery = new URLSearchParams()
        pageQuery.set('page', String(cursor))
        pageQuery.set('per_page', '25')
        const response = await hitpayRequest(`/v1/customers?${pageQuery}`)
        if (!response.ok) throw new Error('Could not load customers.')
        const payload = await response.json()
        const rows = asList<Record<string, unknown>>(payload)
        for (const customer of rows) {
          if (matches(customer)) found.push(toItem(customer))
          if (found.length >= 25) break
        }
        more = hasMore(payload, cursor)
        cursor += 1
      }
      return { items: found, hasMore: more }
    }

    if (data.type === 'order') {
      query.set('perPage', '25')
      if (data.query) query.set('keywords', data.query)
      if (data.filter !== 'all') query.append('statuses[]', data.filter)
      const response = await hitpayRequest(`/v1/orders?${query}`)
      if (!response.ok) throw new Error('Could not load orders.')
      const payload = await response.json()
      const items: ResourcePickerItem[] = asList<Record<string, unknown>>(payload).map((order) => ({
        id: String(order.id),
        title:
          order.order_display_number != null
            ? `Order #${order.order_display_number}`
            : String(order.id),
        badge: typeof order.status === 'string' ? order.status : undefined,
        resource: asRecord(order),
      }))
      return { items, hasMore: false }
    }

    if (data.type === 'location') {
      query.set('perPage', '500')
      if (data.query) query.set('keywords', data.query)
      const response = await hitpayRequest(`/v1/locations?${query}`)
      if (response.status === 401) throw new Error('HitPay location access was denied.')
      if (!response.ok) throw new Error('Could not load locations.')
      const payload = await response.json()
      const items = asList<Record<string, unknown>>(payload)
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
        }))
      return { items, hasMore: false }
    }

    if (data.type === 'charge') {
      query.set('per_page', '25')
      if (data.query) query.set('keywords', data.query)
      if (data.filter !== 'all') query.set('status', data.filter)
      if (data.cursor) query.set('cursor', data.cursor)
      if (data.extras?.payment_method && data.extras.payment_method !== 'all') {
        query.append('payment_methods[]', data.extras.payment_method)
      }
      const response = await hitpayRequest(`/v1/charges?${query}`)
      if (!response.ok) throw new Error('Could not load charges.')
      const payload = await response.json()
      const cursor = nextCursor(payload)
      return {
        items: asList<Record<string, unknown>>(payload).map((charge) => ({
          id: String(charge.id),
          title: [charge.remark, charge.amount, charge.currency].filter(Boolean).join(' · ') || String(charge.id),
          badge: typeof charge.status === 'string' ? charge.status : undefined,
          resource: asRecord(charge),
        })),
        hasMore: Boolean(cursor),
        cursor,
      }
    }

    if (data.type === 'invoice') {
      query.set('page', String(page))
      query.set('per_page', '10')
      if (data.query) query.set('keywords', data.query)
      if (data.filter !== 'all') query.set('status', data.filter)
      const response = await hitpayRequest(`/v1/invoices?${query}`)
      if (!response.ok) throw new Error('Could not load invoices.')
      const payload = await response.json()
      return {
        items: asList<Record<string, unknown>>(payload).map((invoice) => ({
          id: String(invoice.id),
          title: String(invoice.invoice_number || invoice.reference || invoice.email || invoice.id),
          badge: typeof invoice.status === 'string' ? invoice.status : undefined,
          resource: asRecord(invoice),
        })),
        hasMore: hasMore(payload, page),
      }
    }

    if (data.type === 'payment-request') {
      query.set('current_page', String(page))
      query.set('per_page', '10')
      if (data.query) query.set('search', data.query)
      const response = await hitpayRequest(`/v1/payment-requests?${query}`)
      if (!response.ok) throw new Error('Could not load payment requests.')
      const payload = await response.json()
      return {
        items: asList<Record<string, unknown>>(payload)
          .filter((row) => data.filter === 'all' || row.status === data.filter)
          .map((row) => ({
            id: String(row.id),
            title: String(row.purpose || row.reference_number || row.name || row.id),
            badge: typeof row.status === 'string' ? row.status : undefined,
            resource: asRecord(row),
          })),
        hasMore: hasMore(payload, page),
      }
    }

    if (data.type === 'subscription-plan') {
      query.set('per_page', '10')
      if (data.query) query.set('reference', data.query)
      const response = await hitpayRequest(`/v1/subscription-plan?${query}`)
      if (!response.ok) throw new Error('Could not load subscription plans.')
      const payload = await response.json()
      return {
        items: asList<Record<string, unknown>>(payload).map((row) => ({
          id: String(row.id),
          title: String(row.name || row.reference || row.id),
          badge: typeof row.status === 'string' ? row.status : undefined,
          resource: asRecord(row),
        })),
        hasMore: hasMore(payload, page),
      }
    }

    if (data.type === 'recurring-billing') {
      query.set('per_page', '10')
      if (data.query) query.set('customer_email', data.query)
      if (data.filter !== 'all') query.set('status', data.filter)
      const response = await hitpayRequest(`/v1/recurring-billing?${query}`)
      if (!response.ok) throw new Error('Could not load recurring billings.')
      const payload = await response.json()
      return {
        items: asList<Record<string, unknown>>(payload).map((row) => ({
          id: String(row.id),
          title: String(row.name || row.customer_email || row.reference || row.id),
          badge: typeof row.status === 'string' ? row.status : undefined,
          resource: asRecord(row),
        })),
        hasMore: hasMore(payload, page),
      }
    }

    if (data.type === 'coupon') {
      query.set('per_page', '10')
      query.set('page', String(page))
      if (data.query) query.set('keywords', data.query)
      const response = await hitpayRequest(`/v1/coupons?${query}`)
      if (!response.ok) throw new Error('Could not load coupons.')
      const payload = await response.json()
      return {
        items: asList<Record<string, unknown>>(payload).map((row) => ({
          id: String(row.id),
          title: String(row.name || row.code || row.id),
          badge: typeof row.code === 'string' ? row.code : undefined,
          resource: asRecord(row),
        })),
        hasMore: hasMore(payload, page),
      }
    }

    if (data.type === 'discount') {
      query.set('per_page', '10')
      query.set('page', String(page))
      if (data.query) query.set('keywords', data.query)
      if (data.filter === 'pos') query.set('pos_discount', '1')
      if (data.filter === 'online') query.set('pos_discount', '0')
      const response = await hitpayRequest(`/v1/discounts?${query}`)
      if (!response.ok) throw new Error('Could not load discounts.')
      const payload = await response.json()
      return {
        items: asList<Record<string, unknown>>(payload).map((row) => ({
          id: String(row.id),
          title: String(row.name || row.id),
          badge: typeof row.discount_type === 'string' ? row.discount_type : undefined,
          resource: asRecord(row),
        })),
        hasMore: hasMore(payload, page),
      }
    }

    if (data.type === 'tax') {
      query.set('per_page', '20')
      if (data.query) query.set('keywords', data.query)
      const response = await hitpayRequest(`/v1/taxes?${query}`)
      if (!response.ok) throw new Error('Could not load taxes.')
      const payload = await response.json()
      return {
        items: asList<Record<string, unknown>>(payload).map((row) => ({
          id: String(row.id),
          title: String(row.name || row.id),
          badge: row.tax_inclusive ? 'Inclusive' : undefined,
          resource: asRecord(row),
        })),
        hasMore: hasMore(payload, page),
      }
    }

    if (data.type === 'shipping') {
      const response = await hitpayRequest('/v1/shipping')
      if (!response.ok) throw new Error('Could not load shipping.')
      const payload = await response.json()
      const rows = Array.isArray((payload as { shippings?: unknown }).shippings)
        ? ((payload as { shippings: Record<string, unknown>[] }).shippings)
        : asList<Record<string, unknown>>(payload)
      const needle = data.query.trim().toLowerCase()
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

    if (data.type === 'pickup') {
      query.set('per_page', '20')
      query.set('page', String(page))
      const response = await hitpayRequest(`/v1/pickups?${query}`)
      if (!response.ok) throw new Error('Could not load pickups.')
      const payload = await response.json()
      const needle = data.query.trim().toLowerCase()
      return {
        items: asList<Record<string, unknown>>(payload)
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

    if (data.type === 'add-on') {
      query.set('per_page', '20')
      query.set('page', String(page))
      if (data.query) query.set('keywords', data.query)
      const response = await hitpayRequest(`/v1/add-ons?${query}`)
      if (!response.ok) throw new Error('Could not load add-ons.')
      const payload = await response.json()
      return {
        items: asList<Record<string, unknown>>(payload).map((row) => ({
          id: String(row.id),
          title: String(row.name || row.id),
          resource: asRecord(row),
        })),
        hasMore: hasMore(payload, page),
      }
    }

    if (data.type === 'store-page') {
      query.set('per_page', '20')
      if (data.query) query.set('keywords', data.query)
      if (data.filter === 'published' || data.filter === 'draft') query.set('status', data.filter)
      const response = await hitpayRequest(`/v1/store-pages?${query}`)
      if (!response.ok) throw new Error('Could not load store pages.')
      const payload = await response.json()
      return {
        items: asList<Record<string, unknown>>(payload).map((row) => ({
          id: String(row.id),
          title: String(row.title || row.page_path || row.id),
          badge: row.enabled === false ? 'Off' : undefined,
          resource: asRecord(row),
        })),
        hasMore: hasMore(payload, page),
      }
    }

    throw new Error(`Unsupported resource picker type: ${data.type}`)
  })

export { loadResourcePickerPage }
