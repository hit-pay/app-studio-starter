import { createServerFn } from '@tanstack/react-start'

import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { asList } from '#/lib/resource-picker-map'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

type NamedRow = { id: string; name?: string | null }
const PRODUCT_CATEGORIES_CACHE_TTL_MS = 30_000
const selectCache = new Map<string, { expiresAt: number; value: { items: NamedRow[] } }>()
const selectRequests = new Map<string, Promise<{ items: NamedRow[] }>>()
let productCategoriesCache:
  | { expiresAt: number; value: { items: NamedRow[] } }
  | undefined
let productCategoriesRequest: Promise<{ items: NamedRow[] }> | undefined

async function cachedSelect(
  key: string,
  load: () => Promise<{ items: NamedRow[] }>,
): Promise<{ items: NamedRow[] }> {
  const cached = selectCache.get(key)
  if (cached && cached.expiresAt > Date.now()) return cached.value
  const pending = selectRequests.get(key)
  if (pending) return pending
  const request = load().then((value) => {
    selectCache.set(key, { expiresAt: Date.now() + 30_000, value })
    return value
  })
  selectRequests.set(key, request)
  try {
    return await request
  } finally {
    selectRequests.delete(key)
  }
}

async function fetchItems(path: string, error: string, page = 1): Promise<{ items: NamedRow[]; hasMore: boolean }> {
  await requireHitPayRoles(HITPAY_ALL_ROLES)
  return cachedSelect(path, async () => {
    const separator = path.includes('?') ? '&' : '?'
    const response = await hitpayRequest(`${path}${separator}per_page=25&page=${page}`)
    if (!response.ok) throw new Error(error)
    const items = asList<NamedRow>(await response.json())
    return { items, hasMore: items.length >= 25 }
  })
}

const loadCouponsForSelect = createServerFn({ method: 'GET' }).handler(() =>
  fetchItems('/v1/coupons', 'Could not load coupons.'),
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
  const now = Date.now()
  if (productCategoriesCache && productCategoriesCache.expiresAt > now) {
    return productCategoriesCache.value
  }
  if (productCategoriesRequest) return productCategoriesRequest

  productCategoriesRequest = (async () => {
    const response = await hitpayRequest('/v1/product-category?perPage=25&get_children=1&format=flat')
  if (!response.ok) throw new Error('Could not load product categories.')
    const value = { items: flattenCategories(asList<CategoryRow>(await response.json())) }
    productCategoriesCache = {
      expiresAt: Date.now() + PRODUCT_CATEGORIES_CACHE_TTL_MS,
      value,
    }
    return value
  })()

  try {
    return await productCategoriesRequest
  } finally {
    productCategoriesRequest = undefined
  }
})

const loadLocationsForSelect = createServerFn({ method: 'GET' }).handler(() =>
  fetchItems('/v1/locations?perPage=500', 'Could not load locations.'),
)

const loadShippingsForSelect = createServerFn({ method: 'GET' }).handler(async () => {
  await requireHitPayRoles(HITPAY_ALL_ROLES)
  return cachedSelect('/v1/shipping', async () => {
    const response = await hitpayRequest('/v1/shipping')
    if (!response.ok) throw new Error('Could not load shipping.')
    const payload = (await response.json()) as { shippings?: NamedRow[] }
    return { items: Array.isArray(payload.shippings) ? payload.shippings : [] }
  })
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
