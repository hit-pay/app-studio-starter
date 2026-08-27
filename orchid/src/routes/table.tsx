import { createFileRoute } from '@tanstack/react-router'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import {
  Table,
  TableBody,
  TableCell,
  TableCellImage,
  TableCellText,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export const Route = createFileRoute('/table')({
  component: TableExamplesPage,
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

function TableExamplesPage() {
  return (
    <DocExamplePage to="/table">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Default
          </p>
          <Table resizable={false}>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PLAIN_ROWS.map((row) => (
                <TableRow key={row.product}>
                  <TableCell>
                    <TableCellText>{row.product}</TableCellText>
                  </TableCell>
                  <TableCell>
                    <TableCellText>{row.channel}</TableCellText>
                  </TableCell>
                  <TableCell>
                    <TableCellText>{row.amount}</TableCellText>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            With image
          </p>
          <Table resizable={false}>
            <TableHeader>
              <TableRow>
                <TableHead type="Image">Image</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DETAIL_ROWS.map((row) => (
                <TableRow key={row.name}>
                  <TableCell type="Image">
                    <TableCellImage alt={row.name} />
                  </TableCell>
                  <TableCell>
                    <TableCellText>{row.name}</TableCellText>
                  </TableCell>
                  <TableCell>
                    <TableCellText>{row.status}</TableCellText>
                  </TableCell>
                  <TableCell>
                    <TableCellText>{row.amount}</TableCellText>
                  </TableCell>
                  <TableCell>
                    <TableCellText>{row.created}</TableCellText>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DocExamplePage>
  )
}
