---
description: SchemaTable + TanStack Query. Open when building a list, table, search, or fetching rows.
---

# Lists (SchemaTable data)

Kit (`SchemaTable`) is UI only. Fetch with `#/lib/query` ([TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview)). No TanStack Table. `QueryProvider` is already on `__root` — never mount another `QueryClient` per page.

Do **not** treat Query/DB as a Turso connection fix. Persistence is still `createServerFn` + `#/lib/db`. Query is cache/UX only.

TanStack DB collections (`queryCollectionOptions`, `useLiveQuery`) are **optional**. Do not add `DbProvider` or collections unless the prompt needs optimistic local rows / live joins. Default path: `useQuery` + pass `data` into `useSchemaTable`.

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
