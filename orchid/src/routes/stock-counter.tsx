import { useMemo, useState } from 'react'
import { BoxesIcon, PackageIcon, TriangleAlertIcon } from 'lucide-react'
import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import {
  AppShell,
  AppShellNav,
  AppShellNavGroup,
  AppShellNavItem,
} from '@/components/ui/app-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { PageTitle } from '@/components/ui/page-title'
import { SchemaForm, useSchemaForm, type SchemaFormField } from '@/components/ui/schema-form'
import {
  SchemaTable,
  useSchemaTable,
  type SchemaTableRow,
  type SchemaTableSchema,
} from '@/components/ui/schema-table'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { StatCard } from '@/components/ui/stat-card'
import { toast } from '@/components/ui/toast'
import { TooltipProvider } from '@/components/ui/tooltip'

export const Route = createFileRoute('/stock-counter')({
  component: StockCounterDocsPage,
})

type Page = 'inventory' | 'history'

const PRODUCTS = [
  { value: 'sku-milk', label: 'Fresh milk 1L', sku: 'MILK-1L', location: 'Chiller' },
  { value: 'sku-bread', label: 'White loaf', sku: 'BRD-WHT', location: 'Bakery' },
  { value: 'sku-eggs', label: 'Eggs 12s', sku: 'EGG-12', location: 'Chiller' },
  { value: 'sku-oil', label: 'Cooking oil 2L', sku: 'OIL-2L', location: 'Aisle 4' },
]

const INVENTORY_SCHEMA: SchemaTableSchema = {
  search: { placeholder: 'Search SKU or name' },
  tabKey: 'status',
  tabs: [
    { key: 'all', title: 'All' },
    { key: 'ok', title: 'In stock', value: 'In stock' },
    { key: 'low', title: 'Low', value: 'Low' },
  ],
  filters: [
    {
      key: 'location',
      title: 'Location',
      options: [
        { value: 'Chiller', label: 'Chiller' },
        { value: 'Bakery', label: 'Bakery' },
        { value: 'Aisle 4', label: 'Aisle 4' },
      ],
    },
  ],
  sort: {
    fields: [
      { key: 'name', title: 'Product' },
      { key: 'qty', title: 'Qty' },
    ],
    defaultKey: 'name',
    defaultDir: 'asc',
  },
  pagination: { pageSize: 8, pageSizes: [8, 20] },
  rowActions: ['edit', 'delete'],
  columns: [
    { key: 'sku', title: 'SKU', type: 'text', locked: true },
    { key: 'name', title: 'Product', type: 'text' },
    { key: 'location', title: 'Location', type: 'text' },
    { key: 'qty', title: 'On hand', type: 'text' },
    { key: 'status', title: 'Status', type: 'status' },
  ],
}

const HISTORY_SCHEMA: SchemaTableSchema = {
  search: { placeholder: 'Search counts' },
  sort: {
    fields: [{ key: 'when', title: 'When' }],
    defaultKey: 'when',
    defaultDir: 'desc',
  },
  pagination: { pageSize: 8, pageSizes: [8, 20] },
  columns: [
    { key: 'when', title: 'When', type: 'date' },
    { key: 'name', title: 'Product', type: 'text', locked: true },
    { key: 'delta', title: 'Counted', type: 'text' },
    { key: 'note', title: 'Note', type: 'text' },
  ],
}

function countFields(row?: SchemaTableRow | null): SchemaFormField[] {
  return [
    {
      key: 'section',
      title: 'Floor count',
      type: 'section',
      description: 'Tap a SKU, then the quantity on the shelf.',
    },
    {
      key: 'product',
      title: 'Product',
      type: 'combobox',
      required: true,
      placeholder: 'Search product',
      options: PRODUCTS.map((item) => ({ value: item.value, label: `${item.label} · ${item.sku}` })),
      value: row?.id ?? 'sku-milk',
    },
    {
      key: 'qty',
      title: 'Quantity on hand',
      type: 'quantity',
      required: true,
      min: 0,
      max: 999,
      value: row ? Number(row.qty) : 0,
    },
    {
      key: 'note',
      title: 'Note',
      type: 'textarea',
      placeholder: 'Damaged, expiry, missing…',
      value: '',
    },
  ]
}

function StockCounterApp() {
  const [page, setPage] = useState<Page>('inventory')
  const [formKey, setFormKey] = useState(0)
  const [countRow, setCountRow] = useState<SchemaTableRow | null | 'new'>(null)
  const [inventory, setInventory] = useState<SchemaTableRow[]>([
    { id: 'sku-milk', sku: 'MILK-1L', name: 'Fresh milk 1L', location: 'Chiller', qty: 12, status: 'In stock' },
    { id: 'sku-bread', sku: 'BRD-WHT', name: 'White loaf', location: 'Bakery', qty: 4, status: 'Low' },
    { id: 'sku-eggs', sku: 'EGG-12', name: 'Eggs 12s', location: 'Chiller', qty: 28, status: 'In stock' },
    { id: 'sku-oil', sku: 'OIL-2L', name: 'Cooking oil 2L', location: 'Aisle 4', qty: 2, status: 'Low' },
  ])
  const [history, setHistory] = useState<SchemaTableRow[]>([
    { id: 'h-1', when: '2026-08-27', name: 'White loaf', delta: '4', note: 'Morning count' },
    { id: 'h-2', when: '2026-08-26', name: 'Fresh milk 1L', delta: '18', note: 'Delivery received' },
  ])
  const [remove, setRemove] = useState<SchemaTableRow | null>(null)

  const counting = countRow && countRow !== 'new' ? countRow : null

  const count = useSchemaForm({
    fields: useMemo(() => countFields(counting), [counting, formKey]),
    onSubmit: (values) => {
      const product = PRODUCTS.find((item) => item.value === values.product)
      if (!product) return
      const qty = Number(values.qty) || 0
      const status = qty <= 5 ? 'Low' : 'In stock'
      setInventory((current) =>
        current.map((row) => (row.id === product.value ? { ...row, qty, status } : row)),
      )
      setHistory((current) => [
        {
          id: `h-${Date.now()}`,
          when: new Date().toISOString().slice(0, 10),
          name: product.label,
          delta: String(qty),
          note: String(values.note || 'Floor count'),
        },
        ...current,
      ])
      setFormKey((key) => key + 1)
      setCountRow(null)
      toast.add({ title: `${product.label} set to ${qty}`, type: 'success' })
    },
  })

  const inventoryTable = useSchemaTable({ schema: INVENTORY_SCHEMA, data: inventory })
  const historyTable = useSchemaTable({ schema: HISTORY_SCHEMA, data: history })

  const units = inventory.reduce((sum, row) => sum + Number(row.qty || 0), 0)
  const low = inventory.filter((row) => row.status === 'Low').length

  function openCount(row?: SchemaTableRow) {
    setFormKey((key) => key + 1)
    setCountRow(row ?? 'new')
  }

  return (
    <TooltipProvider>
      <AppShell
        header={
          <div className="px-4 py-3 md:px-6 md:py-4">
            <PageTitle
              title="Stock Counter"
              description="Count what is on the shelf"
              badge={
                <Badge color="Blue" style="Background">
                  Staff
                </Badge>
              }
              actions={
                page === 'inventory' ? (
                  <Button variant="Primary" onClick={() => openCount()}>
                    Count now
                  </Button>
                ) : null
              }
            />
          </div>
        }
        tabs={
          <AppShellNav>
            <AppShellNavGroup>
              <AppShellNavItem active={page === 'inventory'} onClick={() => setPage('inventory')}>
                Inventory
              </AppShellNavItem>
              <AppShellNavItem active={page === 'history'} onClick={() => setPage('history')}>
                Count history
              </AppShellNavItem>
            </AppShellNavGroup>
          </AppShellNav>
        }
      >
        {page === 'inventory' ? (
          <div className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <StatCard icon={<PackageIcon />} iconColor="Blue" title="SKUs" content={String(inventory.length)} />
              <StatCard icon={<BoxesIcon />} iconColor="Green" title="Units on hand" content={String(units)} />
              <StatCard icon={<TriangleAlertIcon />} iconColor="Red" title="Low stock" content={String(low)} />
            </div>
            <SchemaTable
              table={inventoryTable}
              onRowAction={(action, row) => {
                if (action === 'edit') openCount(row)
                if (action === 'delete') setRemove(row)
              }}
              emptyActions={
                <Button variant="Primary" onClick={() => openCount()}>
                  Count first SKU
                </Button>
              }
            />
          </div>
        ) : null}

        {page === 'history' ? (
          <div className="flex flex-col gap-4">
            <PageTitle title="Count history" description="Every save from Count now." />
            <SchemaTable table={historyTable} />
          </div>
        ) : null}

        <Dialog open={countRow != null} onOpenChange={(open) => !open && setCountRow(null)}>
          <DialogContent
            title="Count stock"
            description="Updates on-hand quantity for this demo."
            confirmLabel="Save count"
            onConfirm={() => void count.submit()}
          >
            <SchemaForm key={formKey} form={count} />
          </DialogContent>
        </Dialog>

        <ConfirmDialog
          open={Boolean(remove)}
          onOpenChange={(open) => !open && setRemove(null)}
          type="Delete"
          title="Remove SKU?"
          message={`Remove ${remove?.name ?? ''} from this demo list?`}
          onConfirm={() => {
            if (!remove) return
            setInventory((current) => current.filter((row) => row.id !== remove.id))
            toast.add({ title: 'SKU removed', type: 'success' })
            setRemove(null)
          }}
        />
      </AppShell>
    </TooltipProvider>
  )
}

function StockCounterDocsPage() {
  return (
    <DocExamplePage to="/stock-counter" fill>
      <StockCounterApp />
    </DocExamplePage>
  )
}
