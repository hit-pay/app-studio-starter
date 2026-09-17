import type {
  SchemaTableFilter,
  SchemaTableSchema,
  SchemaTableSelectionAction,
  SchemaTableTab,
} from '@/components/displaying-data/data-table-model'
import {
  RESOURCE_CATALOG_LABELS,
  RESOURCE_EXTRA_FILTERS,
  RESOURCE_STATUS_FILTERS,
  type ResourceCatalogType,
} from '#/business/catalog'

const RESOURCE_LIST_SELECTION_ACTIONS: SchemaTableSelectionAction[] = [
  { key: 'export', label: 'Export', icon: 'download' },
  {
    key: 'more',
    label: 'More actions',
    icon: 'more',
    presentation: 'dropdown',
    items: [
      { key: 'duplicate', label: 'Duplicate', icon: 'duplicate' },
      {
        key: 'delete',
        label: 'Delete',
        icon: 'delete',
        variant: 'destructive',
        separator: true,
      },
    ],
  },
]

function catalogStatusTabs(type: ResourceCatalogType): SchemaTableTab[] {
  return RESOURCE_STATUS_FILTERS[type].map((option) => ({
    key: option.value,
    title: option.label,
  }))
}

function catalogToolbarFilters(type: ResourceCatalogType): SchemaTableFilter[] {
  return (RESOURCE_EXTRA_FILTERS[type] ?? []).map((group) => ({
    key: group.key,
    title: group.label,
    options: group.options.filter((option) => option.value !== 'all'),
  }))
}

function listTableChrome(
  type: ResourceCatalogType,
  searchPlaceholder: string,
): Pick<
  SchemaTableSchema,
  | 'mode'
  | 'selection'
  | 'editColumns'
  | 'search'
  | 'tabs'
  | 'tabKey'
  | 'filters'
  | 'sort'
  | 'pagination'
  | 'rowActions'
  | 'selectionActions'
  | 'emptyState'
> {
  const labels = RESOURCE_CATALOG_LABELS[type]
  const toolbarFilters = catalogToolbarFilters(type)

  return {
    mode: 'server',
    selection: true,
    editColumns: true,
    search: { placeholder: searchPlaceholder, debounceMs: 300 },
    tabKey: 'status',
    tabs: catalogStatusTabs(type),
    filters: toolbarFilters.length > 0 ? toolbarFilters : undefined,
    rowActions: ['edit', 'delete'],
    selectionActions: RESOURCE_LIST_SELECTION_ACTIONS.map((action) =>
      action.key === 'export'
        ? { ...action, label: `Export ${labels.plural}` }
        : action,
    ),
    emptyState: {
      title: `No ${labels.plural} found`,
      description: 'Try another search, tab, or filter.',
      actions: [{ key: 'add', label: `Add ${labels.singular}`, icon: 'add' }],
    },
  }
}

export function resourceListSchema(type: ResourceCatalogType): SchemaTableSchema {
  const labels = RESOURCE_CATALOG_LABELS[type]
  const searchPlaceholder = `Search ${labels.plural}`
  const chrome = listTableChrome(type, searchPlaceholder)

  if (type === 'product') {
    return {
      ...chrome,
      key: 'resource-list-product',
      sort: {
        fields: [
          { key: 'name', title: 'Product name' },
          { key: 'price', title: 'Price' },
          { key: 'sku', title: 'SKU' },
        ],
        defaultKey: 'name',
        defaultDir: 'asc',
      },
      pagination: { pageSize: 25, pageSizes: [25, 50] },
      columns: [
        { key: 'image', title: '', type: 'image', locked: true, search: false },
        { key: 'name', title: 'Product', sortable: false },
        { key: 'sku', title: 'SKU', sortable: false },
        { key: 'status', title: 'Status', type: 'status', sortable: false },
        { key: 'price', title: 'Price', type: 'amount', sortable: false },
      ],
    }
  }

  if (type === 'order') {
    return {
      ...chrome,
      key: 'resource-list-order',
      sort: {
        fields: [
          { key: 'date', title: 'Date' },
          { key: 'amount', title: 'Amount' },
          { key: 'name', title: 'Order' },
        ],
        defaultKey: 'date',
        defaultDir: 'desc',
      },
      pagination: { pageSize: 25, pageSizes: [25, 50] },
      columns: [
        { key: 'name', title: 'Order', locked: true, sortable: false },
        { key: 'status', title: 'Status', type: 'status', sortable: false },
        { key: 'amount', title: 'Amount', type: 'amount', sortable: false },
        { key: 'channel', title: 'Channel', sortable: false },
        { key: 'date', title: 'Date', type: 'date', sortable: false },
      ],
    }
  }

  if (type === 'charge') {
    return {
      ...chrome,
      key: 'resource-list-charge',
      sort: {
        fields: [
          { key: 'date', title: 'Date' },
          { key: 'amount', title: 'Amount' },
          { key: 'name', title: 'Charge' },
        ],
        defaultKey: 'date',
        defaultDir: 'desc',
      },
      pagination: { pageSize: 25, pageSizes: [25, 50] },
      columns: [
        { key: 'name', title: 'Charge', locked: true, sortable: false },
        { key: 'status', title: 'Status', type: 'status', sortable: false },
        { key: 'amount', title: 'Amount', type: 'amount', sortable: false },
        { key: 'method', title: 'Method', sortable: false },
        { key: 'date', title: 'Date', type: 'date', sortable: false },
      ],
    }
  }

  return {
    ...chrome,
    key: 'resource-list-invoice',
    sort: {
      fields: [
        { key: 'name', title: 'Invoice' },
        { key: 'amount', title: 'Amount' },
      ],
      defaultKey: 'name',
      defaultDir: 'asc',
    },
    pagination: { pageSize: 10, pageSizes: [10, 25] },
    columns: [
      { key: 'name', title: 'Invoice', locked: true, sortable: false },
      { key: 'status', title: 'Status', type: 'status', sortable: false },
      { key: 'amount', title: 'Amount', type: 'amount', sortable: false },
      { key: 'email', title: 'Customer', sortable: false },
    ],
  }
}

/** Toolbar filter keys owned by SchemaTable (popover skips these). */
export function resourceListToolbarFilterKeys(type: ResourceCatalogType): string[] {
  return (RESOURCE_EXTRA_FILTERS[type] ?? []).map((group) => group.key)
}
