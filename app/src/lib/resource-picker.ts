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
  meta?: { current_page?: number; last_page?: number }
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
  return Boolean(body.links?.next)
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

    query.set('perPage', '500')
    if (data.query) query.set('keywords', data.query)
    const response = await hitpayRequest(`/v1/locations?${query}`)
    if (response.status === 401) throw new Error('HitPay location access was denied.')
    if (!response.ok) throw new Error('Could not load locations.')
    const payload = await response.json()
    const items: ResourcePickerItem[] = asList<Record<string, unknown>>(payload).map((location) => ({
      id: String(location.id),
      title: String(location.name ?? location.id),
      badge: location.active === false ? 'Inactive' : undefined,
      resource: asRecord(location),
    }))
    return { items, hasMore: false }
  })

export { loadResourcePickerPage }
