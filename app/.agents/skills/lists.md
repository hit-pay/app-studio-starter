---
description: SchemaTable is the data table (search, filter, sort, tabs, pager already in the kit). Open when building a list or fetching rows.
---

# Lists (SchemaTable = data table)

**`SchemaTable` already is the data table.** Search, filters, tabs, sort, pagination, column picker, row select, and row edit/delete are **in the kit**. You only pass a `schema` + `data`. Do **not** add `Input`, `Combobox`, `Select`, `Popover` filters, `Tabs` above the grid, `Pagination`, `TableToolbar`, or TanStack Table because the prompt said “filter”.

Import `@/orchid-ui/schema-table`. Types live in `schema-table-model.ts`. Read that file if a prop is unclear.

Kit UI only. Fetch with `#/lib/query`. No TanStack Table. `QueryProvider` is already on `__root`. Persistence is `createServerFn` + `#/lib/db`. Default: `useQuery` + `useSchemaTable({ schema, data: rows })`.

## Already in SchemaTable (wire via `schema`)

| Feature | Schema | Default |
| --- | --- | --- |
| Search box | `search: { placeholder }` or `search: false` | On. Columns with `search: false` skipped |
| Status / category tabs | `tabs` + `tabKey` (row field, default `status`) | Off until you set `tabs` |
| Filter popover (option lists) | `filters: [{ key, title, options }]` | Off until you set `filters`. `key` = row field |
| Sort popover | `sort: { fields, defaultKey, defaultDir }` or `sort: false` | Off if omitted; `sortable: false` on a column skips header sort |
| Pagination | `pagination: { pageSize, pageSizes }` or `pagination: false` | On (`pageSize` 10) |
| Checkbox select + bulk bar | `selection: true` | Off. Bulk UI = `selectionActions` on `<SchemaTable>` |
| Edit columns (show/hide, reorder) | `editColumns` (default on) | Local only — not in `queryKey` |
| Row ⋮ menu | `rowActions: ['edit', 'delete']` or `false` | Off until set. Handle `onRowAction` |
| Empty state | built-in | Pass `emptyActions` (e.g. Add). Do not wrap in `Empty` |

Column `type`: `text` \| `amount` \| `date` \| `status` \| `image` \| `empty`. `locked` pins a column. `icon` on text cells.

`mode: 'client'` (default): kit applies search/tab/filters/sort/page **in memory** on `data`. `mode: 'server'`: you pass the current page `data` + `total`; kit still **shows** the same chrome.

## Do not

- Homemade toolbar next to SchemaTable
- `Table` for CRUD lists (`Table` = tiny read-only grid, no chrome)
- Extra `Pagination` under SchemaTable
- Put `columnOrder` / `hiddenKeys` / `selected` in `queryKey`

```tsx
const table = useSchemaTable({
  schema: {
    key: 'products',
    mode: 'client',
    selection: true,
    search: { placeholder: 'Search products' },
    tabKey: 'status',
    tabs: [
      { key: 'all', title: 'All' },
      { key: 'published', title: 'Published', value: 'Published' },
    ],
    filters: [
      { key: 'category', title: 'Category', options: [{ value: 'Apparel', label: 'Apparel' }] },
    ],
    sort: { fields: [{ key: 'created', title: 'Created' }], defaultKey: 'created', defaultDir: 'desc' },
    pagination: { pageSize: 10, pageSizes: [10, 20, 50] },
    rowActions: ['edit', 'delete'],
    columns: [
      { key: 'name', title: 'Name', type: 'text', locked: true },
      { key: 'amount', title: 'Amount', type: 'amount', search: false },
      { key: 'status', title: 'Status', type: 'status', search: false },
    ],
  },
  data: rows,
})

<SchemaTable
  table={table}
  selectionActions={selected => /* bulk */}
  emptyActions={<Button variant="Primary">Add</Button>}
  onRowAction={(action, row) => { /* edit | delete */ }}
/>
```

Full example schema: `SCHEMA_TABLE_EXAMPLE_SCHEMA` in `schema-table-model.ts`.

TanStack DB collections are **optional**. Do not add `DbProvider` unless the prompt needs optimistic local rows.

## Pick a mode (do not default to server)

| Dataset | Mode | Fetch |
| --- | --- | --- |
| Bounded list (products, customers, settings rows) | `mode: 'client'` (default) | **One** `useQuery` load. Kit filters, sorts, pages in memory. |
| Huge / must page on the server | `mode: 'server'` | Query per **committed** list query. Pass `data` + `total`. |

Prefer **client + one query**. Server mode only when the prompt says large data or the API is already paginated.

## Do not refetch for

- Edit Column (visibility, reorder) — `columnOrder` / `hiddenKeys`
- Row selection — `selected`
- Opening search/filter/sort popovers
- Typing search **before** 300ms idle (`mode: 'server'` only)

Those stay local. They must **not** be in `queryKey`.

## `queryKey` (server mode)

Stable and minimal:

`[resource, { search, tab, filters, sortKey, sortDir, page, pageSize }]`

- Debounce **search** 300ms before it enters `queryKey` / `queryFn`. Tab, filters, sort, page, pageSize fetch immediately.
- Keep previous rows while the next page/filter loads: `placeholderData: keepPreviousData`.
- `staleTime: 30_000`. Do not set `refetchOnWindowFocus: true` on list queries.
- Same key = one in-flight request (Query dedupes). Do not add timestamps or random ids.

## Client lists

```tsx
const { data: rows = [] } = useQuery({
  queryKey: ['products'],
  queryFn: () => listProducts(),
})
const table = useSchemaTable({ schema, data: rows })
```

After a mutation, `invalidateQueries({ queryKey: ['products'] })` once (or update the cache). Do not put table chrome in `queryKey`.

## Optional: client + DB collection

Only if you wired a collection provider:

- `queryCollectionOptions` with a **stable** `queryKey` like `['products']` — no table chrome in that key.
- `useLiveQuery` for derived views if the prompt needs joins; otherwise pass collection rows into `useSchemaTable`.
- Mutations: `collection.insert` / `update` / `delete` (optimistic). Persist in `onInsert` / `onUpdate` / `onDelete` via `createServerFn`.

## UX while loading

- First load, no rows yet: SchemaTable empty state is fine; do not block the whole page.
- Refetch / page change: keep showing `placeholderData` rows. No full-page spinner over a table that already has data.
- Errors: stay on the table; use `toast.add` or `Alert` above `PageTitle`. Do not unmount SchemaTable.

## Example (server page)

```tsx
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useDebouncedValue } from '#/lib/query'

const search = useDebouncedValue(query.search)
const fetchQuery = { ...query, search }
const { data } = useQuery({
  queryKey: ['products', fetchQuery],
  queryFn: () => listProducts({ data: fetchQuery }),
  placeholderData: keepPreviousData,
})
```

Root `QueryProvider` already sets `staleTime: 30_000` and `refetchOnWindowFocus: false`.

List endpoints take the same fields as `SchemaTableQuery` (search, tab, filters, sort, page). Parameterized SQL. Return `{ rows, total }`. Do not return the full table when `mode: 'server'`.
