/** HitPay catalog types: product | order | charge | invoice, plus status/extra filters. */
export const RESOURCE_CATALOG_TYPES = ['product', 'order', 'charge', 'invoice'] as const

export type ResourceCatalogType = (typeof RESOURCE_CATALOG_TYPES)[number]

export type ResourceFilterOption = { value: string; label: string }
export type ResourceExtraFilter = {
  key: string
  label: string
  options: ResourceFilterOption[]
}

export const RESOURCE_CATALOG_LABELS: Record<
  ResourceCatalogType,
  { singular: string; plural: string }
> = {
  product: { singular: 'product', plural: 'products' },
  order: { singular: 'order', plural: 'orders' },
  charge: { singular: 'charge', plural: 'charges' },
  invoice: { singular: 'invoice', plural: 'invoices' },
}

export const RESOURCE_STATUS_FILTERS: Record<ResourceCatalogType, ResourceFilterOption[]> = {
  product: [
    { value: 'all', label: 'All statuses' },
    { value: 'published', label: 'Published' },
    { value: 'draft', label: 'Draft' },
  ],
  order: [
    { value: 'all', label: 'All statuses' },
    { value: 'completed', label: 'Completed' },
    { value: 'pending', label: 'Pending' },
    { value: 'sent', label: 'Sent' },
    { value: 'draft', label: 'Draft' },
    { value: 'expired', label: 'Expired' },
    { value: 'canceled', label: 'Canceled' },
  ],
  charge: [
    { value: 'all', label: 'All statuses' },
    { value: 'succeeded', label: 'Succeeded' },
    { value: 'failed', label: 'Failed' },
    { value: 'refunded', label: 'Refunded' },
  ],
  invoice: [
    { value: 'all', label: 'All statuses' },
    { value: 'draft', label: 'Draft' },
    { value: 'sent', label: 'Sent' },
    { value: 'pending', label: 'Pending' },
    { value: 'overdue', label: 'Overdue' },
    { value: 'paid', label: 'Paid' },
  ],
}

export const RESOURCE_EXTRA_FILTERS: Partial<
  Record<ResourceCatalogType, ResourceExtraFilter[]>
> = {
  product: [
    {
      key: 'inventory',
      label: 'Inventory',
      options: [
        { value: 'all', label: 'All stock' },
        { value: 'in_stock', label: 'In stock' },
        { value: 'out_of_stock', label: 'Out of stock' },
      ],
    },
    {
      key: 'channel',
      label: 'Channel',
      options: [
        { value: 'all', label: 'All channels' },
        { value: 'pos', label: 'POS' },
        { value: 'online_store', label: 'Online store' },
        { value: 'invoice', label: 'Invoice' },
        { value: 'self_serve', label: 'Self serve' },
      ],
    },
  ],
  order: [
    {
      key: 'channel',
      label: 'Channel',
      options: [
        { value: 'all', label: 'All channels' },
        { value: 'point_of_sale', label: 'POS' },
        { value: 'quick_sale', label: 'Quick sale' },
        { value: 'store_checkout', label: 'Online store' },
      ],
    },
  ],
  charge: [
    {
      key: 'payment_method',
      label: 'Method',
      options: [
        { value: 'all', label: 'All methods' },
        { value: 'cash', label: 'Cash' },
        { value: 'card', label: 'Card' },
      ],
    },
  ],
}

export const RESOURCE_DATE_FILTER_TYPES = new Set<ResourceCatalogType>(['order', 'charge'])

export function categoryIdsFromExtras(extras: Record<string, string>) {
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

export function resourceCatalogFiltersActive(
  status: string,
  extras: Record<string, string>,
  type: ResourceCatalogType,
) {
  if (status !== 'all') return true
  if (categoryIdsFromExtras(extras).length > 0) return true
  if (extras.location_id) return true
  if (extras.date_from || extras.date_to) return true
  for (const group of RESOURCE_EXTRA_FILTERS[type] ?? []) {
    if ((extras[group.key] ?? 'all') !== 'all') return true
  }
  return false
}
