import { useState } from 'react'
import { DownloadIcon, MoreHorizontalIcon, PackageIcon, SearchIcon, Trash2Icon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { CopyButton } from '@/components/ui/copy-button'
import {
  DataTable,
  DataTableBody,
  DataTableCaption,
  DataTableCell,
  DataTableCellImage,
  DataTableCellText,
  DataTableEmpty,
  DataTableFooter,
  DataTableHead,
  DataTableHeader,
  DataTableRow,
  DataTableSelectionBar,
  DataTableToolbar,
} from '@/components/ui/data-table'
import { Input } from '@/components/ui/input'

const ROWS = [
  {
    id: 'INV-2048',
    product: 'Classic White Tee',
    channel: 'Online Store',
    status: 'Paid',
    amount: 48,
    note: 'First-time buyer',
  },
  {
    id: 'INV-2047',
    product: 'Studio Membership',
    channel: 'POS',
    status: 'Paid',
    amount: 128,
    note: null,
  },
  {
    id: 'INV-2046',
    product: 'Weekend Workshop',
    channel: 'Payment Link',
    status: 'Unpaid',
    amount: 88,
    note: 'Follow up tomorrow',
  },
]

function DataTableDemo() {
  const [selected, setSelected] = useState<string[]>(['INV-2048'])
  const allSelected = selected.length === ROWS.length

  function toggleRow(id: string) {
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Complete data grid
          </p>
          <p className="text-sm text-oc-muted-foreground">
            Unlike the semantic Table component, DataTable is an application data grid with
            resizable columns, sticky utility cells, selection controls, toolbar, and empty
            states.
          </p>
          <DataTable>
            <DataTableToolbar>
              <div className="relative w-56">
                <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-oc-muted-foreground" />
                <Input aria-label="Search orders" placeholder="Search orders…" className="pl-8" />
              </div>
              <Button variant="outline" size="sm">
                <DownloadIcon data-icon="inline-start" />
                Export
              </Button>
            </DataTableToolbar>

            {selected.length > 0 ? (
              <DataTableSelectionBar
                count={selected.length}
                onDeselectAll={() => setSelected([])}
              >
                <Button variant="outline" size="sm">
                  <Trash2Icon data-icon="inline-start" />
                  Delete
                </Button>
              </DataTableSelectionBar>
            ) : null}

            <DataTableHeader>
              <DataTableRow>
                <DataTableHead type="Checkbox" columnKey="select" resizable={false}>
                  <Checkbox
                    aria-label="Select all orders"
                    checked={allSelected}
                    onCheckedChange={(checked) =>
                      setSelected(checked ? ROWS.map((row) => row.id) : [])
                    }
                  />
                </DataTableHead>
                <DataTableHead type="Image" columnKey="image">
                  Image
                </DataTableHead>
                <DataTableHead>Order</DataTableHead>
                <DataTableHead>Product</DataTableHead>
                <DataTableHead>Channel</DataTableHead>
                <DataTableHead>Status</DataTableHead>
                <DataTableHead>Amount</DataTableHead>
                <DataTableHead type="Empty">Note</DataTableHead>
                <DataTableHead type="Icon" columnKey="actions" resizable={false}>
                  <span className="sr-only">Actions</span>
                </DataTableHead>
              </DataTableRow>
            </DataTableHeader>
            <DataTableBody>
              {ROWS.map((row) => (
                <DataTableRow key={row.id}>
                  <DataTableCell type="Checkbox" columnKey="select">
                    <Checkbox
                      aria-label={`Select ${row.id}`}
                      checked={selected.includes(row.id)}
                      onCheckedChange={() => toggleRow(row.id)}
                    />
                  </DataTableCell>
                  <DataTableCell type="Image" columnKey="image">
                    <DataTableCellImage alt={row.product} />
                  </DataTableCell>
                  <DataTableCell>
                    <DataTableCellText>
                      <span className="inline-flex items-center gap-1.5">
                        {row.id}
                        <CopyButton value={row.id} />
                      </span>
                    </DataTableCellText>
                  </DataTableCell>
                  <DataTableCell>
                    <DataTableCellText icon={<PackageIcon />}>{row.product}</DataTableCellText>
                  </DataTableCell>
                  <DataTableCell>
                    <DataTableCellText>{row.channel}</DataTableCellText>
                  </DataTableCell>
                  <DataTableCell>
                    <Badge
                      tone={row.status === 'Paid' ? 'green' : 'orange'}
                      appearance="soft"
                    >
                      {row.status}
                    </Badge>
                  </DataTableCell>
                  <DataTableCell>
                    <DataTableCellText>SGD {row.amount.toFixed(2)}</DataTableCellText>
                  </DataTableCell>
                  <DataTableCell type="Empty">
                    {row.note ? <DataTableCellText>{row.note}</DataTableCellText> : null}
                  </DataTableCell>
                  <DataTableCell type="Icon" columnKey="actions">
                    <Button variant="ghost" size="icon" aria-label={`Actions for ${row.id}`}>
                      <MoreHorizontalIcon />
                    </Button>
                  </DataTableCell>
                </DataTableRow>
              ))}
            </DataTableBody>
            <DataTableFooter>
              <DataTableRow>
                <DataTableCell type="Checkbox" columnKey="select" />
                <DataTableCell type="Image" columnKey="image" />
                <DataTableCell />
                <DataTableCell>
                  <DataTableCellText>Total</DataTableCellText>
                </DataTableCell>
                <DataTableCell />
                <DataTableCell />
                <DataTableCell>
                  <DataTableCellText>
                    SGD {ROWS.reduce((total, row) => total + row.amount, 0).toFixed(2)}
                  </DataTableCellText>
                </DataTableCell>
                <DataTableCell type="Empty" />
                <DataTableCell type="Icon" columnKey="actions" />
              </DataTableRow>
            </DataTableFooter>
            <DataTableCaption>
              All cell types: Default, Checkbox, Image, Icon, and Empty.
            </DataTableCaption>
          </DataTable>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Empty state
          </p>
          <DataTable resizable={false}>
            <DataTableToolbar>
              <span className="text-sm font-medium text-oc-foreground">Archived orders</span>
            </DataTableToolbar>
            <DataTableHeader>
              <DataTableRow>
                <DataTableHead>Order</DataTableHead>
                <DataTableHead>Status</DataTableHead>
              </DataTableRow>
            </DataTableHeader>
            <DataTableEmpty>
              <PackageIcon className="mb-3 size-8 text-oc-muted-foreground" />
              <p className="text-sm font-medium text-oc-foreground">No archived orders</p>
              <p className="mt-1 text-sm text-oc-muted-foreground">
                Archived orders will appear here.
              </p>
            </DataTableEmpty>
          </DataTable>
        </div>
      </div>
    </>
  )
}

export { DataTableDemo }
