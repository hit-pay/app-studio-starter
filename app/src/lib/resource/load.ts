/** List queries for ResourcePicker and ResourceList — see docs/hitpay/{products,orders,charges,invoices}.md */
import { createServerFn } from '@tanstack/react-start'

import { ALL_ROLES } from '#/lib/roles'
import { requireRoles } from '#/server/lib/session'
import { proxyRequest } from '#/server/lib/proxy'

import { mapResourcePickerPayload } from './map'
import type { ResourcePickerLoadInput, ResourcePickerPage } from './map'

const ORDER_STATUSES = ['completed', 'pending', 'sent', 'draft', 'expired', 'canceled'] as const
function categoryIdsFromExtras(extras?: Record<string, string>) {
  if (!extras) return []
  if (extras.category_ids) {
    return extras.category_ids
      .split(',')
      .map((id) => id.trim())
      .filter(Boolean)
  }
  if (extras.category_id && extras.category_id !== 'all') {
    return [extras.category_id]
  }
  return []
}

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

const loadResourcePickerPage = createServerFn({ method: 'GET' })
  .validator((data: ResourcePickerLoadInput) => data)
  .handler(async ({ data }): Promise<ResourcePickerPage> => {
    await requireRoles(ALL_ROLES)
    const query = new URLSearchParams()
    const page = data.page || 1

    if (data.type === 'product') {
      query.set('page', String(page))
      query.set('per_page', '25')
      if (data.query) query.append('keywords', data.query)
      if (data.filter === 'published' || data.filter === 'draft') {
        query.append('statuses[]', data.filter)
      }
      if (data.extras?.inventory === 'in_stock' || data.extras?.inventory === 'out_of_stock') {
        query.append('inventory', data.extras.inventory)
      }
      if (data.extras?.channel && data.extras.channel !== 'all') {
        query.append('channels[]', data.extras.channel)
      }
      if (data.extras?.location_id && data.extras.location_id !== 'all') {
        query.append('location_ids[]', data.extras.location_id)
      }
      for (const categoryId of categoryIdsFromExtras(data.extras)) {
        query.append('categories[]', categoryId)
      }
      const response = await proxyRequest(`/v1/products?${query}`)
      if (!response.ok) throw new Error('Could not load products.')
      return mapResourcePickerPayload(data, await response.json())
    }

    if (data.type === 'order') {
      query.set('page', String(page))
      query.set('per_page', '25')
      if (data.query) query.set('keywords', data.query)
      if (data.filter === 'all') {
        for (const status of ORDER_STATUSES) query.append('statuses[]', status)
      } else {
        query.append('statuses[]', data.filter)
      }
      if (data.extras?.channel && data.extras.channel !== 'all') {
        query.append('channels[]', data.extras.channel)
      }
      if (data.extras?.date_from) query.set('dateFrom', data.extras.date_from)
      if (data.extras?.date_to) query.set('dateTo', data.extras.date_to)
      const response = await proxyRequest(`/v1/orders?${query}`)
      if (!response.ok) throw new Error('Could not load orders.')
      return mapResourcePickerPayload(data, await response.json())
    }

    if (data.type === 'charge') {
      query.set('page', String(page))
      query.set('per_page', '25')
      if (data.query) query.set('keywords', data.query)
      if (data.filter === 'all') {
        for (const status of CHARGE_STATUSES) query.append('statuses[]', status)
      } else {
        query.append('statuses[]', data.filter)
      }
      if (data.extras?.location_id && data.extras.location_id !== 'all') {
        query.append('location_ids[]', data.extras.location_id)
      }
      if (data.extras?.payment_method && data.extras.payment_method !== 'all') {
        query.append('payment_methods[]', data.extras.payment_method)
      }
      if (data.extras?.date_from) query.set('date_from', data.extras.date_from)
      if (data.extras?.date_to) query.set('date_to', data.extras.date_to)
      const response = await proxyRequest(`/v1/charges?${query}`)
      if (!response.ok) throw new Error('Could not load charges.')
      return mapResourcePickerPayload(data, await response.json())
    }

    if (data.type === 'invoice') {
      query.set('per_page', '10')
      if (data.query) query.set('keywords', data.query)
      if (data.filter !== 'all') query.set('status', data.filter)
      if (data.cursor) query.set('cursor', data.cursor)
      const response = await proxyRequest(`/v1/invoices?${query}`)
      if (!response.ok) throw new Error('Could not load invoices.')
      return mapResourcePickerPayload(data, await response.json())
    }

    throw new Error(`Unsupported resource picker type: ${data.type}`)
  })

export { loadResourcePickerPage }
