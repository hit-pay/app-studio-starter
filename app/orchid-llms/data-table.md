<!-- Generated from content/docs/components/data-table.mdx. Do not edit. -->

# Data Table

Rows-and-columns table with search, filters, sort, and pagination.

## Interactive example

The interactive example is rendered on the Orchid documentation page. Use the usage guidance below and verify the installed component source for the exact API.

# Quick decision

Use `DataTable` when the collection needs search, filters, sorting, pagination,
row selection, or row actions. The table already renders its search, filter,
sort, pagination, and column-visibility controls from the schema. Do not build
those controls separately.

Use `DataTable` when the list needs search, column filters, sorting, or pagination.
Use `DataList` for compact collections without those tools, and `DetailCard` for one record.
Put `DataTable` directly in `PageLayout`. Do not wrap it in `Card`.

`DataTable` already includes a filter button and filter popover. Do not build a
separate filter row or a custom `Select` outside the table. Define the available
filters in `schema.filters`; the table applies all active filters together.

Configure `selectionActions` and `emptyState.actions` in the schema. The config is JSON-friendly:
it contains keys, labels, supported icon keys, variants, disabled state, and dropdown items—but
never functions or React nodes. `onSelectionAction` receives the selected IDs snapshot and the
chosen button or dropdown leaf item. `onEmptyAction` receives the chosen empty-state action.

`editColumns` is the optional column-visibility popover (`true` to show it; default off). Set `rowActions` to `["edit"]`,
`["delete"]`, or both when the list needs the row ⋮ menu. Pass `onRowAction`.
That menu opens `FormLayout` for multi-field edits. Neither `editColumns` nor
`type: "status"` makes a cell editable.

`onRowClick(row)` opens the record (detail / show page) from a browse list. Clicks on
checkboxes, the row ⋮ menu, links, and `cells` controls do not fire it. Do not put
`DataTable` inside `FormLayout`.

One-field updates (status, assignee, stage) use `cells` on `DataTable`, not the schema.
Search, sort, and filters still use `row[column.key]`. Only listed keys override; other
columns keep the built-in `type` render (`status` is a read-only badge until overridden).

## Built-in filters

Each filter has a `key`, display `title`, and exact-match `options`. The option
`value` must match the row value for that key; `label` is only the text shown
in the popover and active-filter chip. Multiple configured filters are combined
with AND logic. Clearing a filter removes its key from `table.query.filters`.

```tsx
const schema = {
  columns: [
    { key: "name", title: "Product" },
    { key: "status", title: "Status", type: "status" },
    { key: "inventory", title: "Inventory" },
  ],
  filters: [
    {
      key: "status",
      title: "Status",
      options: [
        { value: "published", label: "Published" },
        { value: "draft", label: "Draft" },
      ],
    },
    {
      key: "inventory",
      title: "Inventory",
      options: [
        { value: "in_stock", label: "In stock" },
        { value: "not_tracked", label: "Inventory not tracked" },
      ],
    },
  ],
} satisfies SchemaTableSchema
```

In `mode: "client"` (the default), filtering is performed against the loaded
`data` rows. In `mode: "server"`, the table does not filter or sort rows
locally; handle `query.filters` in `onQueryChange` and fetch the filtered page
from your data source. The callback receives `change.key === "filters"` when
the user applies or clears filters.

```tsx
function StatusCell({
  value,
  onStatusChange,
}: {
  value: unknown;
  onStatusChange: (status: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        nativeButton
        className="inline-flex"
        render={
          <button type="button" className="inline-flex rounded-full">
            <Badge tone={value === "Published" ? "green" : "grey"}>
              {String(value ?? "–")}
              <DownRegular />
            </Badge>
          </button>
        }
      />
      <DropdownMenuContent align="start">
        {["Published", "Draft"].map((status) => {
          const selected = status === value;
          return (
            <DropdownMenuItem
              key={status}
              data-active={selected || undefined}
              className={selected ? "bg-oc-dark-blue-soft font-medium" : undefined}
              onClick={() => {
                onStatusChange(status);
                setOpen(false);
              }}
            >
              {status}
              {selected ? <CheckRegular className="ml-auto" /> : null}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const [rows, setRows] = useState(SCHEMA_TABLE_EXAMPLE_ROWS);
const table = useDataTable({
  schema: SCHEMA_TABLE_EXAMPLE_SCHEMA,
  data: rows,
});

<DataTable
  table={table}
  cells={{
    status: (value, row) => (
      <StatusCell
        value={value}
        onStatusChange={(status) =>
          setRows((current) =>
            current.map((item) =>
              item.id === row.id ? { ...item, status } : item,
            ),
          )
        }
      />
    ),
  }}
  onRowAction={(action, row) => {
    console.log(action, row.id);
  }}
/>
```

`onQueryChange(query, change)` receives the final query after page-reset rules and a typed
discriminated change payload. The `change.key` is one of `search`, `tab`, `filters`, `sort`,
`page`, or `pageSize`, with the corresponding value fields.

In server mode, search callbacks are debounced by 300ms while `table.query.search` updates
immediately, keeping the input responsive. Configure the delay with
`search: { placeholder: "Search products", debounceMs: 500 }`. Client-mode search remains
instant. Clearing search cancels pending work and emits immediately.

## Usage with TanStack Query

```tsx
import { useQuery } from "@tanstack/react-query";
import {
  DataTable,
  SCHEMA_TABLE_EXAMPLE_ROWS,
  SCHEMA_TABLE_EXAMPLE_SCHEMA,
  useDataTable,
} from "@/components/displaying-data/data-table";

function ProductList() {
  const products = useQuery({
    queryKey: ["products"],
    queryFn: async () => SCHEMA_TABLE_EXAMPLE_ROWS,
    initialData: SCHEMA_TABLE_EXAMPLE_ROWS,
    staleTime: 30_000,
  });
  const table = useDataTable({
    schema: SCHEMA_TABLE_EXAMPLE_SCHEMA,
    data: products.data,
  });

  return (
    <DataTable
      table={table}
      onRowClick={(row) => {
        console.log(row.id);
      }}
      onRowAction={(action, row) => {
        console.log(action, row.id);
      }}
      onSelectionAction={(action, selectedIds) => {
        console.log(action.key, selectedIds);
      }}
      onEmptyAction={(action) => {
        console.log(action.key);
      }}
    />
  );
}
```

## Usage with TanStack DB

```tsx
import { QueryClient } from "@tanstack/query-core";
import {
  DbClient,
  DbProvider,
  collectionOptions,
  useDbClient,
  useLiveQuery,
} from "@tanstack/react-db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";
import {
  DataTable,
  SCHEMA_TABLE_EXAMPLE_ROWS,
  SCHEMA_TABLE_EXAMPLE_SCHEMA,
  useDataTable,
} from "@/components/displaying-data/data-table";

const queryClient = new QueryClient();
const dbClient = new DbClient({ queryClient });

const productCollection = collectionOptions("products", (client) =>
  queryCollectionOptions({
    id: "products",
    queryKey: ["products"],
    staleTime: 30_000,
    queryClient: client.requireDependency<QueryClient>("queryClient"),
    queryFn: async () => SCHEMA_TABLE_EXAMPLE_ROWS,
    getKey: (item) => item.id,
  }),
);

function ProductList() {
  useDbClient().collection(productCollection);
  const { data: rows } = useLiveQuery({
    query: (q) => q.from({ product: productCollection }),
  });
  const table = useDataTable({
    schema: SCHEMA_TABLE_EXAMPLE_SCHEMA,
    data: rows ?? SCHEMA_TABLE_EXAMPLE_ROWS,
  });

  return (
    <DataTable
      table={table}
      onRowClick={(row) => {
        console.log(row.id);
      }}
      onRowAction={(action, row) => {
        console.log(action, row.id);
      }}
      onSelectionAction={(action, selectedIds) => {
        console.log(action.key, selectedIds);
      }}
      onEmptyAction={(action) => {
        console.log(action.key);
      }}
    />
  );
}

function ProductsPage() {
  return (
    <DbProvider client={dbClient}>
      <ProductList />
    </DbProvider>
  );
}
```
