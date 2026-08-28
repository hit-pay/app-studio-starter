import { createFileRoute } from '@tanstack/react-router'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableCellImage,
  DataTableCellText,
  DataTableHead,
  DataTableHeader,
  DataTableRow,
} from '@/components/ui/data-table'

export const Route = createFileRoute('/data-table')({
  component: DataTableExamplesPage,
})

const PLAIN_ROWS = [
  { product: 'Classic White Tee', channel: 'Online Store', amount: 'SGD 48.00' },
  { product: 'Studio Membership', channel: 'POS', amount: 'SGD 128.00' },
  { product: 'Weekend Workshop', channel: 'Online Store', amount: 'SGD 88.00' },
]

const DETAIL_ROWS = [
  { name: 'Classic White Tee', status: 'Paid', amount: 'SGD 48.00', created: '3 Sep 2026' },
  { name: 'Studio Membership', status: 'Paid', amount: 'SGD 128.00', created: '1 Sep 2026' },
  { name: 'Gift Card SGD 50', status: 'Unpaid', amount: 'SGD 50.00', created: '28 Aug 2026' },
]

function DataTableExamplesPage() {
  return (
    <DocExamplePage to="/data-table">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Default
          </p>
          <DataTable resizable={false}>
            <DataTableHeader>
              <DataTableRow>
                <DataTableHead>Product</DataTableHead>
                <DataTableHead>Channel</DataTableHead>
                <DataTableHead>Amount</DataTableHead>
              </DataTableRow>
            </DataTableHeader>
            <DataTableBody>
              {PLAIN_ROWS.map((row) => (
                <DataTableRow key={row.product}>
                  <DataTableCell>
                    <DataTableCellText>{row.product}</DataTableCellText>
                  </DataTableCell>
                  <DataTableCell>
                    <DataTableCellText>{row.channel}</DataTableCellText>
                  </DataTableCell>
                  <DataTableCell>
                    <DataTableCellText>{row.amount}</DataTableCellText>
                  </DataTableCell>
                </DataTableRow>
              ))}
            </DataTableBody>
          </DataTable>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            With image
          </p>
          <DataTable resizable={false}>
            <DataTableHeader>
              <DataTableRow>
                <DataTableHead type="Image">Image</DataTableHead>
                <DataTableHead>Product</DataTableHead>
                <DataTableHead>Status</DataTableHead>
                <DataTableHead>Amount</DataTableHead>
                <DataTableHead>Created</DataTableHead>
              </DataTableRow>
            </DataTableHeader>
            <DataTableBody>
              {DETAIL_ROWS.map((row) => (
                <DataTableRow key={row.name}>
                  <DataTableCell type="Image">
                    <DataTableCellImage alt={row.name} />
                  </DataTableCell>
                  <DataTableCell>
                    <DataTableCellText>{row.name}</DataTableCellText>
                  </DataTableCell>
                  <DataTableCell>
                    <DataTableCellText>{row.status}</DataTableCellText>
                  </DataTableCell>
                  <DataTableCell>
                    <DataTableCellText>{row.amount}</DataTableCellText>
                  </DataTableCell>
                  <DataTableCell>
                    <DataTableCellText>{row.created}</DataTableCellText>
                  </DataTableCell>
                </DataTableRow>
              ))}
            </DataTableBody>
          </DataTable>
        </div>
      </div>
    </DocExamplePage>
  )
}
