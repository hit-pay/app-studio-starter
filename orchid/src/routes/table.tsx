import { createFileRoute } from '@tanstack/react-router'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export const Route = createFileRoute('/table')({
  component: TableExamplesPage,
})

const INVOICES = [
  { invoice: 'INV-2048', customer: 'Priya Nair', status: 'Paid', amount: 'SGD 128.00' },
  { invoice: 'INV-2047', customer: 'Alex Turner', status: 'Pending', amount: 'SGD 86.50' },
  { invoice: 'INV-2046', customer: 'Chloe Tan', status: 'Paid', amount: 'SGD 240.00' },
]

function TableExamplesPage() {
  return (
    <DocExamplePage
      to="/table"
      usage={`import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Customer</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV-2048</TableCell>
      <TableCell>Priya Nair</TableCell>
      <TableCell className="text-right">SGD 128.00</TableCell>
    </TableRow>
  </TableBody>
</Table>`}
    >
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Invoices
        </p>
        <Table>
          <TableCaption>Recent invoices and their payment status.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {INVOICES.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                <TableCell>{invoice.customer}</TableCell>
                <TableCell>{invoice.status}</TableCell>
                <TableCell className="text-right">{invoice.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">SGD 454.50</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </DocExamplePage>
  )
}
