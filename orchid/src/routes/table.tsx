import { CircleIcon, EllipsisVerticalIcon, PencilIcon, Trash2Icon } from 'lucide-react'
import { createFileRoute } from '@tanstack/react-router'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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

const ROWS = [
  { name: 'Classic White Tee' },
  { name: 'Studio Membership' },
  { name: 'Weekend Workshop' },
  { name: 'Gift Card SGD 50' },
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
} from '@/orchid-ui/table'

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Product</TableHead>
      <TableHead>Amount</TableHead>
    </TableRow>
  </TableHeader>
</Table>`}
    >
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Default
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead type="Checkbox">
                <Checkbox aria-label="Select all" indeterminate />
              </TableHead>
              <TableHead type="Image">Image</TableHead>
              <TableHead>Table Header</TableHead>
              <TableHead>Channel</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Created</TableHead>
              <TableHead type="Icon" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {ROWS.map((row) => (
              <TableRow key={row.name}>
                <TableCell type="Checkbox">
                  <Checkbox aria-label={`Select ${row.name}`} />
                </TableCell>
                <TableCell type="Image">
                  <TableCellImage alt={row.name} />
                </TableCell>
                <TableCell>
                  <TableCellText icon={<CircleIcon />}>{row.name}</TableCellText>
                </TableCell>
                <TableCell>
                  <TableCellText>Online Store</TableCellText>
                </TableCell>
                <TableCell>
                  <TableCellText>Paid</TableCellText>
                </TableCell>
                <TableCell>
                  <TableCellText>SGD 128.00</TableCellText>
                </TableCell>
                <TableCell>
                  <TableCellText>Priya Nair</TableCellText>
                </TableCell>
                <TableCell>
                  <TableCellText>3 Sep 2026</TableCellText>
                </TableCell>
                <TableCell type="Icon">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      nativeButton
                      className="inline-flex"
                      render={
                        <Button
                          variant="Secondary"
                          style="Transparent"
                          size="Small"
                          iconOnly
                          aria-label={`Actions for ${row.name}`}
                        >
                          <EllipsisVerticalIcon />
                        </Button>
                      }
                    />
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <PencilIcon />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem variant="destructive">
                        <Trash2Icon />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DocExamplePage>
  )
}
