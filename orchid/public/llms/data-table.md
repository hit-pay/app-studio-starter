<!-- Generated from content/docs/components/data-table.mdx. Do not edit. -->

# Data Table

Schema-driven table: search, tabs, filter, sort, Edit Column, pagination. Prefer this over Table for lists.

## Example

```tsx
import { useState } from "react";
import { CheckRegular, DownRegular } from "@mingcute/react/core-regular";
import { DocCodePanel } from "@/components/doc/doc-code-panel";
import {
  SchemaTable,
  SCHEMA_TABLE_EXAMPLE_ROWS,
  SCHEMA_TABLE_EXAMPLE_SCHEMA,
  useSchemaTable,
  type SchemaTableRow,
} from "@/components/displaying-data/data-table";
import { Badge } from "@/base-ui/displaying-data/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/base-ui/layout/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/base-ui/overlays/dropdown-menu";

const STATUSES = ["Published", "Draft"] as const;

const SCHEMA_PROMPT = `Schema Table schema prompt

Pass one schema object to useSchemaTable({ schema, data }).

Required
- columns[] — key, title; type text | amount | date | status | image | empty

Optional
- mode — client (filter in kit from a Query/DB collection) | server (Query fetches the page; pass data + total + onQueryChange)
- selection — checkbox column
- search — { placeholder, debounceMs } or false (server search defaults to 300ms)
- tabs[] — key, title, value (matches tabKey on the row, default tabKey is status)
- tabKey — row field for tabs
- filters[] — key, title, options[{ value, label }]
- sort — { fields[{ key, title }], defaultKey, defaultDir } or false
- pagination — { pageSize, pageSizes[] } or false
- editColumns — false to hide Edit Column
- rowActions — ["edit", "delete"] or false
- selectionActions — JSON-friendly buttons/dropdowns; callbacks receive the chosen leaf action and selected IDs
- emptyState — optional title, description, and JSON-friendly actions

Column optional
- sortable, hidden, locked (fixed, no hide/reorder), icon, search: false (exclude from search)

Query state (table.query)
- search, tab, filters, sortKey, sortDir, page, pageSize

Column layout (table.columnOrder, table.hiddenKeys)
- Edit Column popover toggles visibility and drag-reorders active columns

Action config contains no functions or React nodes. Handle behavior with onSelectionAction / onEmptyAction.
Custom cells: pass cells={{ columnKey: (value, row) => <Node /> }} on DataTable. Schema stays JSON. Search/sort still use row[column.key]. Example: status cell is a dropdown that writes the new status back onto the row.

Example
{
  "key": "products",
  "mode": "client",
  "selection": true,
  "search": { "placeholder": "Search products" },
  "tabKey": "status",
  "tabs": [
    { "key": "all", "title": "All" },
    { "key": "published", "title": "Published", "value": "Published" },
    { "key": "draft", "title": "Draft", "value": "Draft" }
  ],
  "filters": [
    {
      "key": "category",
      "title": "Category",
      "options": [
        { "value": "Apparel", "label": "Apparel" },
        { "value": "Membership", "label": "Membership" },
        { "value": "Workshop", "label": "Workshop" }
      ]
    },
    {
      "key": "inventory",
      "title": "Inventory",
      "options": [
        { "value": "In stock", "label": "In stock" },
        { "value": "Inventory not tracked", "label": "Inventory not tracked" }
      ]
    },
    {
      "key": "source",
      "title": "Source",
      "options": [
        { "value": "Manual", "label": "Manual" },
        { "value": "Import", "label": "Import" }
      ]
    },
    {
      "key": "channel",
      "title": "Channel",
      "options": [
        { "value": "Online Store", "label": "Online Store" },
        { "value": "POS", "label": "POS" }
      ]
    }
  ],
  "sort": {
    "fields": [
      { "key": "created", "title": "Created" },
      { "key": "name", "title": "Product name" }
    ],
    "defaultKey": "created",
    "defaultDir": "desc"
  },
  "pagination": { "pageSize": 10, "pageSizes": [10, 20, 50] },
  "rowActions": ["edit", "delete"],
  "selectionActions": [
    { "key": "publish", "label": "Publish", "icon": "publish" },
    {
      "key": "more",
      "label": "More actions",
      "icon": "more",
      "presentation": "dropdown",
      "items": [
        { "key": "duplicate", "label": "Duplicate", "icon": "duplicate" },
        { "key": "delete", "label": "Delete", "icon": "delete", "variant": "destructive", "separator": true }
      ]
    }
  ],
  "emptyState": {
    "title": "No products to display",
    "description": "Add a product to start building your catalog.",
    "actions": [{ "key": "add", "label": "Add product", "icon": "add" }]
  },
  "columns": [
    { "key": "image", "title": "Image", "type": "image", "search": false },
    { "key": "name", "title": "Product name", "type": "text", "icon": true, "locked": true },
    { "key": "inventory", "title": "Available quantity", "type": "text", "search": false },
    { "key": "category", "title": "Category", "type": "text" },
    { "key": "amount", "title": "Amount", "type": "amount", "search": false },
    { "key": "status", "title": "Status", "type": "status", "search": false }
  ]
}`;

function JsonPanel({ filename, data }: { filename: string; data: unknown }) {
  const code = typeof data === "string" ? data : JSON.stringify(data, null, 2);
  return <DocCodePanel filename={filename} code={code} />;
}

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
          <button
            type="button"
            className="inline-flex rounded-full outline-none focus-visible:ring-2 focus-visible:ring-oc-ring"
          >
            <Badge tone={value === "Published" ? "green" : "grey"}>
              {String(value ?? "–")}
              <DownRegular />
            </Badge>
          </button>
        }
      />
      <DropdownMenuContent align="start">
        {STATUSES.map((status) => {
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

function SchemaTableDemo() {
  const [rows, setRows] = useState<SchemaTableRow[]>(() =>
    SCHEMA_TABLE_EXAMPLE_ROWS.map((row) => ({ ...row })),
  );
  const [lastChange, setLastChange] = useState<unknown>(null);
  const table = useSchemaTable({
    schema: SCHEMA_TABLE_EXAMPLE_SCHEMA,
    data: rows,
    onQueryChange: (query, change) => {
      console.log("Query change", query, change);
      setLastChange(change);
    },
  });
  const [tab, setTab] = useState("result");

  const setStatus = (id: string, status: string) => {
    setRows((current) =>
      current.map((row) => (row.id === id ? { ...row, status } : row)),
    );
  };

  return (
    <>
      <div className="grid min-w-0 gap-6 xl:grid-cols-3">
        <div className="min-w-0 xl:col-span-2">
          <SchemaTable
            table={table}
            cells={{
              status: (value, row) => (
                <StatusCell
                  value={value}
                  onStatusChange={(status) => setStatus(row.id, status)}
                />
              ),
            }}
            onSelectionAction={(action, selectedIds) => {
              console.log("Selection action", action.key, selectedIds);
            }}
            onEmptyAction={(action) => {
              console.log("Empty action", action.key);
            }}
          />
        </div>
        <div className="flex min-w-0 flex-col gap-4">
          <Tabs
            value={tab}
            onValueChange={(value) => setTab(String(value))}
            className="min-w-0 gap-3"
          >
            <TabsList variant="line">
              <TabsTrigger value="result">Result</TabsTrigger>
              <TabsTrigger value="schema">Schema</TabsTrigger>
              <TabsTrigger value="prompt">Prompt</TabsTrigger>
            </TabsList>
            <TabsContent value="result" className="min-w-0">
              <JsonPanel
                filename="result.json"
                data={{
                  search: table.query.search,
                  lastChange,
                  tab: table.query.tab,
                  filters: table.query.filters,
                  sort: {
                    key: table.query.sortKey,
                    dir: table.query.sortDir,
                  },
                  pagination: {
                    page: table.page,
                    pageSize: table.pageSize,
                    pageCount: table.pageCount,
                    filteredCount: table.filteredCount,
                  },
                  selected: table.selected,
                  columns: {
                    order: table.columnOrder,
                    hidden: table.hiddenKeys,
                    visible: table.visibleColumns.map((column) => column.key),
                  },
                }}
              />
            </TabsContent>
            <TabsContent value="schema" className="min-w-0">
              <JsonPanel
                filename="schema.json"
                data={SCHEMA_TABLE_EXAMPLE_SCHEMA}
              />
            </TabsContent>
            <TabsContent value="prompt" className="min-w-0">
              <JsonPanel filename="prompt.txt" data={SCHEMA_PROMPT} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export { SchemaTableDemo };
```

Put `DataTable` directly in `PageLayout`. Do not wrap it in `Card`.

Configure `selectionActions` and `emptyState.actions` in the schema. The config is JSON-friendly:
it contains keys, labels, supported icon keys, variants, disabled state, and dropdown items—but
never functions or React nodes. `onSelectionAction` receives the selected IDs snapshot and the
chosen button or dropdown leaf item. `onEmptyAction` receives the chosen empty-state action.

Pass `cells` on `DataTable` (not in the schema) to replace a column's default render. Search,
sort, and filters still use `row[column.key]`. Only listed keys override; other columns keep
the built-in `type` render.

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
