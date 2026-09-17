import type { SchemaTableSchema } from '@/components/displaying-data/data-table-model'
import {
  RESOURCE_CATALOG_LABELS,
  type ResourceCatalogType,
} from '@/lib/resource-catalog'

export function resourceListSchema(type: ResourceCatalogType): SchemaTableSchema {
  const labels = RESOURCE_CATALOG_LABELS[type]
  const searchPlaceholder = `Search ${labels.plural}`

  if (type === 'product') {
    return {
      key: 'resource-list-product',
      mode: 'server',
      selection: false,
      search: { placeholder: searchPlaceholder, debounceMs: 300 },
      sort: false,
      pagination: { pageSize: 25, pageSizes: [25, 50] },
      columns: [
        { key: 'image', title: '', type: 'image', locked: true, search: false },
        { key: 'name', title: 'Product', sortable: false },
        { key: 'sku', title: 'SKU', sortable: false },
        { key: 'status', title: 'Status', type: 'status', sortable: false },
        { key: 'price', title: 'Price', type: 'amount', sortable: false },
      ],
      emptyState: {
        title: `No ${labels.plural} found`,
        description: 'Try another search or adjust filters.',
      },
    }
  }

  if (type === 'order') {
    return {
      key: 'resource-list-order',
      mode: 'server',
      selection: false,
      search: { placeholder: searchPlaceholder, debounceMs: 300 },
      sort: false,
      pagination: { pageSize: 25, pageSizes: [25, 50] },
      columns: [
        { key: 'name', title: 'Order', locked: true, sortable: false },
        { key: 'status', title: 'Status', type: 'status', sortable: false },
        { key: 'amount', title: 'Amount', type: 'amount', sortable: false },
        { key: 'channel', title: 'Channel', sortable: false },
        { key: 'date', title: 'Date', type: 'date', sortable: false },
      ],
      emptyState: {
        title: `No ${labels.plural} found`,
        description: 'Try another search or adjust filters.',
      },
    }
  }

  if (type === 'charge') {
    return {
      key: 'resource-list-charge',
      mode: 'server',
      selection: false,
      search: { placeholder: searchPlaceholder, debounceMs: 300 },
      sort: false,
      pagination: { pageSize: 25, pageSizes: [25, 50] },
      columns: [
        { key: 'name', title: 'Charge', locked: true, sortable: false },
        { key: 'status', title: 'Status', type: 'status', sortable: false },
        { key: 'amount', title: 'Amount', type: 'amount', sortable: false },
        { key: 'method', title: 'Method', sortable: false },
        { key: 'date', title: 'Date', type: 'date', sortable: false },
      ],
      emptyState: {
        title: `No ${labels.plural} found`,
        description: 'Try another search or adjust filters.',
      },
    }
  }

  return {
    key: 'resource-list-invoice',
    mode: 'server',
    selection: false,
    search: { placeholder: searchPlaceholder, debounceMs: 300 },
    sort: false,
    pagination: { pageSize: 10, pageSizes: [10, 25] },
    columns: [
      { key: 'name', title: 'Invoice', locked: true, sortable: false },
      { key: 'status', title: 'Status', type: 'status', sortable: false },
      { key: 'amount', title: 'Amount', type: 'amount', sortable: false },
      { key: 'email', title: 'Customer', sortable: false },
    ],
    emptyState: {
      title: `No ${labels.plural} found`,
      description: 'Try another search or adjust filters.',
    },
  }
}
