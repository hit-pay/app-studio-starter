import { createServerFn } from '@tanstack/react-start'

import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import {
  asList,
  customerMatches,
  hasMore,
  mapCustomer,
  mapResourcePickerPayload,
  nextCursor,
} from '#/lib/resource-picker-map'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'
import type { ResourcePickerItem, ResourcePickerLoadInput, ResourcePickerPage } from '@/components/form/resource-picker'

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
      return mapResourcePickerPayload(data, await response.json())
    }

    if (data.type === 'product-category') {
      query.set('page', String(page))
      query.set('perPage', '20')
      if (data.query) query.set('keywords', data.query)
      if (data.filter === 'active') query.set('active', '1')
      if (data.filter === 'inactive') query.set('active', '0')
      const response = await hitpayRequest(`/v1/product-category?${query}`)
      if (!response.ok) throw new Error('Could not load product categories.')
      return mapResourcePickerPayload(data, await response.json())
    }

    if (data.type === 'customer') {
      const needle = data.query.trim().toLowerCase()

      if (!needle) {
        query.set('page', String(page))
        query.set('per_page', '25')
        const response = await hitpayRequest(`/v1/customers?${query}`)
        if (!response.ok) throw new Error('Could not load customers.')
        return mapResourcePickerPayload(data, await response.json())
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
          if (customerMatches(customer, needle)) found.push(mapCustomer(customer))
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
      return mapResourcePickerPayload(data, await response.json())
    }

    if (data.type === 'location') {
      query.set('perPage', '500')
      if (data.query) query.set('keywords', data.query)
      const response = await hitpayRequest(`/v1/locations?${query}`)
      if (response.status === 401) throw new Error('HitPay location access was denied.')
      if (!response.ok) throw new Error('Could not load locations.')
      return mapResourcePickerPayload(data, await response.json())
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
      const mapped = mapResourcePickerPayload(data, payload)
      const cursor = nextCursor(payload)
      return { ...mapped, hasMore: Boolean(cursor), cursor }
    }

    if (data.type === 'invoice') {
      query.set('page', String(page))
      query.set('per_page', '10')
      if (data.query) query.set('keywords', data.query)
      if (data.filter !== 'all') query.set('status', data.filter)
      const response = await hitpayRequest(`/v1/invoices?${query}`)
      if (!response.ok) throw new Error('Could not load invoices.')
      return mapResourcePickerPayload(data, await response.json())
    }

    if (data.type === 'coupon') {
      query.set('per_page', '10')
      query.set('page', String(page))
      if (data.query) query.set('keywords', data.query)
      const response = await hitpayRequest(`/v1/coupons?${query}`)
      if (!response.ok) throw new Error('Could not load coupons.')
      return mapResourcePickerPayload(data, await response.json())
    }

    if (data.type === 'discount') {
      query.set('per_page', '10')
      query.set('page', String(page))
      if (data.query) query.set('keywords', data.query)
      if (data.filter === 'pos') query.set('pos_discount', '1')
      if (data.filter === 'online') query.set('pos_discount', '0')
      const response = await hitpayRequest(`/v1/discounts?${query}`)
      if (!response.ok) throw new Error('Could not load discounts.')
      return mapResourcePickerPayload(data, await response.json())
    }

    if (data.type === 'tax') {
      query.set('per_page', '20')
      if (data.query) query.set('keywords', data.query)
      const response = await hitpayRequest(`/v1/taxes?${query}`)
      if (!response.ok) throw new Error('Could not load taxes.')
      return mapResourcePickerPayload(data, await response.json())
    }

    if (data.type === 'shipping') {
      const response = await hitpayRequest('/v1/shipping')
      if (!response.ok) throw new Error('Could not load shipping.')
      return mapResourcePickerPayload(data, await response.json())
    }

    if (data.type === 'pickup') {
      query.set('per_page', '20')
      query.set('page', String(page))
      const response = await hitpayRequest(`/v1/pickups?${query}`)
      if (!response.ok) throw new Error('Could not load pickups.')
      return mapResourcePickerPayload(data, await response.json())
    }

    if (data.type === 'add-on') {
      query.set('per_page', '20')
      query.set('page', String(page))
      if (data.query) query.set('keywords', data.query)
      const response = await hitpayRequest(`/v1/add-ons?${query}`)
      if (!response.ok) throw new Error('Could not load add-ons.')
      return mapResourcePickerPayload(data, await response.json())
    }

    throw new Error(`Unsupported resource picker type: ${data.type}`)
  })

export { loadResourcePickerPage }
