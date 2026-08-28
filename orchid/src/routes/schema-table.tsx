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
  "selection": true,
  "search": { "placeholder": "Search products" },
  "tabKey": "status",
  "tabs": [
    { "key": "all", "title": "All" },
    { "key": "published", "title": "Published", "value": "Published" }
  ],
  "filters": [
    {
      "key": "inventory",
      "title": "Inventory",
      "options": [{ "value": "In stock", "label": "In stock" }]
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
    { "key": "name", "title": "Product name", "type": "text", "locked": true },
    { "key": "amount", "title": "Amount", "type": "amount", "search": false }
  ]
}`

const USAGE_EXAMPLE = `import {
  SchemaTable,
  useSchemaTable,
  type SchemaTableSchema,
} from '@/components/ui/schema-table'

const SCHEMA: SchemaTableSchema = {
  selection: true,
  search: { placeholder: 'Search products' },
  tabKey: 'status',
  tabs: [
    { key: 'all', title: 'All' },
    { key: 'published', title: 'Published', value: 'Published' },
    { key: 'draft', title: 'Draft', value: 'Draft' },
  ],
  filters: [
    {
      key: 'inventory',
      title: 'Inventory',
      options: [
        { value: 'In stock', label: 'In stock' },
        { value: 'Inventory not tracked', label: 'Inventory not tracked' },
      ],
    },
  ],
  sort: {
    fields: [
      { key: 'created', title: 'Created' },
      { key: 'name', title: 'Product name' },
      { key: 'amount', title: 'Price' },
    ],
    defaultKey: 'created',
    defaultDir: 'desc',
  },
  pagination: { pageSize: 10, pageSizes: [10, 20, 50] },
  rowActions: ['edit', 'delete'],
  columns: [
    { key: 'image', title: 'Image', type: 'image', search: false },
    { key: 'name', title: 'Product name', type: 'text', locked: true },
    { key: 'amount', title: 'Amount', type: 'amount', search: false },
    { key: 'status', title: 'Status', type: 'status', search: false },
  ],
}

function ProductList({ rows }) {
  const table = useSchemaTable({
    schema: SCHEMA,
    data: rows,
  })

  return <SchemaTable table={table} />
}`

const USAGE_QUERY = `import { useEffect, useState } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import {
  SchemaTable,
  useSchemaTable,
  type SchemaTableQuery,
} from '@/components/ui/schema-table'

// SCHEMA from usage.tsx, with mode: 'server'
// Prefer mode: 'client' + one collection unless the API is paginated.

function useDebouncedValue<T>(value: T, ms = 300) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), ms)
    return () => window.clearTimeout(id)
  }, [value, ms])
  return debounced
}

async function fetchProducts(query: SchemaTableQuery) {
  const params = new URLSearchParams({
    search: query.search,
    tab: query.tab,
    sortKey: query.sortKey ?? '',
    sortDir: query.sortDir,
    page: String(query.page),
    pageSize: String(query.pageSize),
  })
  for (const [key, value] of Object.entries(query.filters)) {
    if (value) params.set(key, value)
  }
  const response = await fetch(\`/api/products?\${params}\`)
  return response.json() as Promise<{ rows: Array<{ id: string }>; total: number }>
}

function ProductList() {
  const [query, setQuery] = useState<SchemaTableQuery>({
    search: '',
    tab: 'all',
    filters: {},
    sortKey: 'created',
    sortDir: 'desc',
    page: 1,
    pageSize: 10,
  })
  const search = useDebouncedValue(query.search)
  const fetchQuery = { ...query, search }
  const { data } = useQuery({
    queryKey: ['products', fetchQuery],
    queryFn: () => fetchProducts(fetchQuery),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  })
  const table = useSchemaTable({
    schema: { ...SCHEMA, mode: 'server' },
    data: data?.rows ?? [],
    total: data?.total,
    onQueryChange: setQuery,
  })

  return <SchemaTable table={table} />
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
import { SchemaTable, useSchemaTable } from '@/components/ui/schema-table'

// SCHEMA from usage.tsx (mode: 'client', default)

const queryClient = new QueryClient()
const dbClient = new DbClient({ queryClient })

const productCollection = collectionOptions('products', (client) =>
  queryCollectionOptions({
    id: 'products',
    queryKey: ['products'],
    staleTime: 30_000,
    queryClient: client.requireDependency<QueryClient>('queryClient'),
    queryFn: async () => {
      const response = await fetch('/api/products')
      return response.json()
    },
    getKey: (item) => item.id,
    onUpdate: async ({ transaction }) => {
      const { original, modified } = transaction.mutations[0]
      await fetch(\`/api/products/\${original.id}\`, {
        method: 'PUT',
        body: JSON.stringify(modified),
      })
    },
  }),
)

function ProductList() {
  const collection = useDbClient().collection(productCollection)
  const { data: rows } = useLiveQuery({
    query: (q) => q.from({ product: productCollection }),
  })
  const table = useSchemaTable({
    schema: SCHEMA,
    data: rows ?? [],
  })

  return (
    <SchemaTable
      table={table}
      onRowAction={(action, row) => {
        if (action === 'delete') collection.delete(row.id)
      }}
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

function SchemaTableExamplesPage() {
  const table = useSchemaTable({
    schema: SCHEMA_TABLE_EXAMPLE_SCHEMA,
    data: SCHEMA_TABLE_EXAMPLE_ROWS,
  })
  const [tab, setTab] = useState('result')

  return (
    <DocExamplePage
      to="/schema-table"
      usage={USAGE_EXAMPLE}
      extraUsage={[
        { title: 'Usage with TanStack Query', filename: 'usage-query.tsx', code: USAGE_QUERY },
        { title: 'Usage with TanStack DB', filename: 'usage-db.tsx', code: USAGE_DB },
      ]}
    >
      <div className="grid min-w-0 gap-6 xl:grid-cols-3">
        <div className="min-w-0 xl:col-span-2">
          <SchemaTable
            table={table}
            selectionActions={
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
            }
            emptyActions={
              <Button variant="Primary" size="Small">
                <PlusIcon />
                Add new
              </Button>
            }
          />
        </div>
        <div className="flex min-w-0 flex-col gap-4">
          <Tabs value={tab} onValueChange={(value) => setTab(String(value))} className="min-w-0 gap-3">
            <TabsList>
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
    </DocExamplePage>
  )
}
