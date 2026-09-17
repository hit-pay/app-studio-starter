/** Server fns: load HitPay named records (locations, categories, coupons, …) for selects. */
import { createServerFn } from '@tanstack/react-start'

import { ALL_ROLES } from '#/lib/roles'
import { requireRoles } from '#/server/lib/session'
import { proxyRequest } from '#/server/lib/proxy'

export type HitPayNamedRecord = {
  id: string
  name?: string | null
  code?: string | null
  address?: string | null
}

function rowsFromPayload(payload: unknown): HitPayNamedRecord[] {
  const body = payload && typeof payload === 'object' ? (payload as { data?: unknown[] }) : null
  const rows = Array.isArray(payload)
    ? payload
    : Array.isArray(body?.data)
      ? body.data
      : []
  return rows.flatMap((row) => {
    if (!row || typeof row !== 'object' || Array.isArray(row) || !('id' in row) || row.id == null) {
      return []
    }
    const record = row as Record<string, unknown>
    return [{
      id: String(record.id),
      name: typeof record.name === 'string' ? record.name : null,
      code: typeof record.code === 'string' ? record.code : null,
      address: typeof record.address === 'string' ? record.address : null,
    }]
  })
}

async function loadNamed(path: string, label: string) {
  await requireRoles(ALL_ROLES)
  const response = await proxyRequest(path)
  if (!response.ok) throw new Error(`Could not load ${label}.`)
  return { items: rowsFromPayload(await response.json()) }
}

export const loadHitPayCoupons = createServerFn({ method: 'GET' }).handler(() =>
  loadNamed('/v1/coupons?per_page=100', 'coupons'),
)
export const loadHitPayDiscounts = createServerFn({ method: 'GET' }).handler(() =>
  loadNamed('/v1/discounts?per_page=100', 'discounts'),
)
export const loadHitPayTaxes = createServerFn({ method: 'GET' }).handler(() =>
  loadNamed('/v1/taxes?per_page=100', 'taxes'),
)
export const loadHitPayShippings = createServerFn({ method: 'GET' }).handler(() =>
  loadNamed('/v1/shipping?per_page=100', 'shipping'),
)
export const loadHitPayPickups = createServerFn({ method: 'GET' }).handler(() =>
  loadNamed('/v1/pickups?per_page=100', 'pickups'),
)
export const loadHitPayProductCategories = createServerFn({ method: 'GET' }).handler(() =>
  loadNamed('/v1/product-category?per_page=100', 'categories'),
)
export const loadHitPayLocations = createServerFn({ method: 'GET' }).handler(() =>
  loadNamed('/v1/locations?per_page=100', 'locations'),
)
