import { createServerFn } from '@tanstack/react-start'

import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { asList } from '#/lib/resource-picker-map'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

type NamedRow = { id: string; name?: string | null }

async function fetchItems(path: string, error: string): Promise<{ items: NamedRow[] }> {
  await requireHitPayRoles(HITPAY_ALL_ROLES)
  const response = await hitpayRequest(path)
  if (!response.ok) throw new Error(error)
  return { items: asList<NamedRow>(await response.json()) }
}

const loadCouponsForSelect = createServerFn({ method: 'GET' }).handler(() =>
  fetchItems('/v1/coupons?per_page=100', 'Could not load coupons.'),
)

const loadDiscountsForSelect = createServerFn({ method: 'GET' }).handler(() =>
  fetchItems('/v1/discounts?per_page=100', 'Could not load discounts.'),
)

const loadTaxesForSelect = createServerFn({ method: 'GET' }).handler(() =>
  fetchItems('/v1/taxes?per_page=100', 'Could not load taxes.'),
)

const loadPickupsForSelect = createServerFn({ method: 'GET' }).handler(() =>
  fetchItems('/v1/pickups?per_page=100', 'Could not load pickups.'),
)

type CategoryRow = NamedRow & { children?: CategoryRow[] }

function flattenCategories(rows: CategoryRow[]): NamedRow[] {
  const items: NamedRow[] = []
  for (const row of rows) {
    items.push(row)
    if (Array.isArray(row.children) && row.children.length) {
      items.push(...flattenCategories(row.children))
    }
  }
  return items
}

const loadProductCategoriesForSelect = createServerFn({ method: 'GET' }).handler(async () => {
  await requireHitPayRoles(HITPAY_ALL_ROLES)
  const response = await hitpayRequest('/v1/product-category?perPage=100&get_children=1&format=flat')
  if (!response.ok) throw new Error('Could not load product categories.')
  return { items: flattenCategories(asList<CategoryRow>(await response.json())) }
})

const loadLocationsForSelect = createServerFn({ method: 'GET' }).handler(() =>
  fetchItems('/v1/locations?perPage=500', 'Could not load locations.'),
)

const loadShippingsForSelect = createServerFn({ method: 'GET' }).handler(async () => {
  await requireHitPayRoles(HITPAY_ALL_ROLES)
  const response = await hitpayRequest('/v1/shipping')
  if (!response.ok) throw new Error('Could not load shipping.')
  const payload = (await response.json()) as { shippings?: NamedRow[] }
  return { items: Array.isArray(payload.shippings) ? payload.shippings : [] }
})

export {
  loadCouponsForSelect,
  loadDiscountsForSelect,
  loadLocationsForSelect,
  loadPickupsForSelect,
  loadProductCategoriesForSelect,
  loadShippingsForSelect,
  loadTaxesForSelect,
}
export type { NamedRow }
