import { useState } from 'react'
import { EllipsisVerticalIcon, EyeIcon, EyeOffIcon, PlusIcon } from 'lucide-react'
import { createFileRoute } from '@tanstack/react-router'
import { DocCodePanel } from '@/components/doc/doc-code-panel'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SchemaTable,
  SCHEMA_TABLE_EXAMPLE_ROWS,
  SCHEMA_TABLE_EXAMPLE_SCHEMA,
  useSchemaTable,
} from '@/components/ui/schema-table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const Route = createFileRoute('/schema-table')({
  component: SchemaTableExamplesPage,
})

const SCHEMA_PROMPT = `Schema Table schema prompt

Pass one schema object to useSchemaTable({ schema, data }).

Required
- columns[] — key, title; type text | amount | date | status | image | empty

Optional
- mode — client (filter in kit from a Query/DB collection) | server (Query fetches the page; pass data + total + onQueryChange)
- selection — checkbox column
- search — { placeholder } or false
- tabs[] — key, title, value (matches tabKey on the row, default tabKey is status)
- tabKey — row field for tabs
- filters[] — key, title, options[{ value, label }]
- sort — { fields[{ key, title }], defaultKey, defaultDir } or false
- pagination — { pageSize, pageSizes[] } or false
- editColumns — false to hide Edit Column
- rowActions — ["edit", "delete"] or false

Column optional
- sortable, hidden, locked (fixed, no hide/reorder), icon, search: false (exclude from search)

Query state (table.query)
- search, tab, filters, sortKey, sortDir, page, pageSize

Column layout (table.columnOrder, table.hiddenKeys)
- Edit Column popover toggles visibility and drag-reorders active columns

Bulk actions are not schema. Pass selectionActions / emptyActions as React nodes.

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
  "columns": [
    { "key": "image", "title": "Image", "type": "image", "search": false },
    { "key": "name", "title": "Product name", "type": "text", "icon": true, "locked": true },
    { "key": "inventory", "title": "Available quantity", "type": "text", "search": false },
    { "key": "category", "title": "Category", "type": "text" },
    { "key": "amount", "title": "Amount", "type": "amount", "search": false },
    { "key": "status", "title": "Status", "type": "status", "search": false }
  ]
}`

const USAGE_ACTIONS = `function ProductSelectionActions() {
  return (
    <>
      <Button variant="Secondary" style="Transparent" size="Small">
        <EyeIcon />
        Publish
      </Button>
      <Button variant="Secondary" style="Transparent" size="Small">
        <EyeOffIcon />
        Unpublish
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger
          nativeButton
          render={
            <Button
              variant="Secondary"
              style="Transparent"
              size="Small"
              iconOnly
              aria-label="More actions"
            >
              <EllipsisVerticalIcon />
            </Button>
          }
        />
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Archive</DropdownMenuItem>
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

function ProductEmptyActions() {
  return (
    <Button variant="Primary" size="Small">
      <PlusIcon />
      Add new
    </Button>
  )
}`

const USAGE_IMPORTS = `import { EllipsisVerticalIcon, EyeIcon, EyeOffIcon, PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SchemaTable,
  SCHEMA_TABLE_EXAMPLE_ROWS,
  SCHEMA_TABLE_EXAMPLE_SCHEMA,
  useSchemaTable,
} from '@/components/ui/schema-table'

${USAGE_ACTIONS}`

const USAGE_EXAMPLE = `${USAGE_IMPORTS}

function ProductList() {
  const table = useSchemaTable({
    schema: SCHEMA_TABLE_EXAMPLE_SCHEMA,
    data: SCHEMA_TABLE_EXAMPLE_ROWS,
  })

  return (
    <SchemaTable
      table={table}
      selectionActions={<ProductSelectionActions />}
      emptyActions={<ProductEmptyActions />}
    />
  )
}`

const USAGE_QUERY = `import { useQuery } from '@tanstack/react-query'
${USAGE_IMPORTS}

function ProductList() {
  const products = useQuery({
    queryKey: ['products'],
    queryFn: async () => SCHEMA_TABLE_EXAMPLE_ROWS,
    initialData: SCHEMA_TABLE_EXAMPLE_ROWS,
    staleTime: 30_000,
  })
  const table = useSchemaTable({
    schema: SCHEMA_TABLE_EXAMPLE_SCHEMA,
    data: products.data,
  })

  return (
    <SchemaTable
      table={table}
      selectionActions={<ProductSelectionActions />}
      emptyActions={<ProductEmptyActions />}
    />
  )
}`

const USAGE_DB = `import { QueryClient } from '@tanstack/query-core'
import {
  DbClient,
  DbProvider,
  collectionOptions,
  useDbClient,
  useLiveQuery,
} from '@tanstack/react-db'
import { queryCollectionOptions } from '@tanstack/query-db-collection'
${USAGE_IMPORTS}

const queryClient = new QueryClient()
const dbClient = new DbClient({ queryClient })

const productCollection = collectionOptions('products', (client) =>
  queryCollectionOptions({
    id: 'products',
    queryKey: ['products'],
    staleTime: 30_000,
    queryClient: client.requireDependency<QueryClient>('queryClient'),
    queryFn: async () => SCHEMA_TABLE_EXAMPLE_ROWS,
    getKey: (item) => item.id,
  }),
)

function ProductList() {
  useDbClient().collection(productCollection)
  const { data: rows } = useLiveQuery({
    query: (q) => q.from({ product: productCollection }),
  })
  const table = useSchemaTable({
    schema: SCHEMA_TABLE_EXAMPLE_SCHEMA,
    data: rows ?? SCHEMA_TABLE_EXAMPLE_ROWS,
  })

  return (
    <SchemaTable
      table={table}
      selectionActions={<ProductSelectionActions />}
      emptyActions={<ProductEmptyActions />}
    />
  )
}

function ProductsPage() {
  return (
    <DbProvider client={dbClient}>
      <ProductList />
    </DbProvider>
  )
}`

function JsonPanel({ filename, data }: { filename: string; data: unknown }) {
  const code = typeof data === 'string' ? data : JSON.stringify(data, null, 2)
  return <DocCodePanel filename={filename} code={code} />
}

function ProductSelectionActions() {
  return (
    <>
      <Button variant="Secondary" style="Transparent" size="Small">
        <EyeIcon />
        Publish
      </Button>
      <Button variant="Secondary" style="Transparent" size="Small">
        <EyeOffIcon />
        Unpublish
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger
          nativeButton
          render={
            <Button
              variant="Secondary"
              style="Transparent"
              size="Small"
              iconOnly
              aria-label="More actions"
            >
              <EllipsisVerticalIcon />
            </Button>
          }
        />
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Archive</DropdownMenuItem>
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

function ProductEmptyActions() {
  return (
    <Button variant="Primary" size="Small">
      <PlusIcon />
      Add new
    </Button>
  )
}

function SchemaTableExamplesPage() {
  const table = useSchemaTable({
    schema: SCHEMA_TABLE_EXAMPLE_SCHEMA,
    data: SCHEMA_TABLE_EXAMPLE_ROWS,
  })
  const [tab, setTab] = useState('result')

  return (
    <DocExamplePage to="/schema-table">
      <div className="grid min-w-0 gap-6 xl:grid-cols-3">
        <div className="min-w-0 xl:col-span-2">
          <SchemaTable
            table={table}
            selectionActions={<ProductSelectionActions />}
            emptyActions={<ProductEmptyActions />}
          />
        </div>
        <div className="flex min-w-0 flex-col gap-4">
          <Tabs value={tab} onValueChange={(value) => setTab(String(value))} className="min-w-0 gap-3">
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
              <JsonPanel filename="schema.json" data={SCHEMA_TABLE_EXAMPLE_SCHEMA} />
            </TabsContent>
            <TabsContent value="prompt" className="min-w-0">
              <JsonPanel filename="prompt.txt" data={SCHEMA_PROMPT} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="flex min-w-0 flex-col gap-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Usage
        </p>
        <DocCodePanel filename="usage.tsx" code={USAGE_EXAMPLE} />
      </div>
      <div className="flex min-w-0 flex-col gap-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Usage with TanStack Query
        </p>
        <DocCodePanel filename="usage-query.tsx" code={USAGE_QUERY} />
      </div>
      <div className="flex min-w-0 flex-col gap-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Usage with TanStack DB
        </p>
        <DocCodePanel filename="usage-db.tsx" code={USAGE_DB} />
      </div>
    </DocExamplePage>
  )
}
