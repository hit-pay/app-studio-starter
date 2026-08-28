import { createFileRoute } from '@tanstack/react-router'
import { FileTextIcon, PlusIcon, SearchIcon, TriangleAlertIcon } from 'lucide-react'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'

export const Route = createFileRoute('/empty')({
  component: EmptyExamplesPage,
})

function EmptyExamplesPage() {
  return (
    <DocExamplePage
      to="/empty"
      usage={`import { FileTextIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'

<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <FileTextIcon />
    </EmptyMedia>
    <EmptyTitle>No invoices yet</EmptyTitle>
    <EmptyDescription>
      Create an invoice to bill a customer.
    </EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button>Create invoice</Button>
  </EmptyContent>
</Empty>`}
    >
      <div className="grid gap-12 md:grid-cols-2">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            No invoices
          </p>
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FileTextIcon />
              </EmptyMedia>
              <EmptyTitle>No invoices yet</EmptyTitle>
              <EmptyDescription>
                Create an invoice to bill a customer by email or payment link.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="flex-row justify-center">
              <Button variant="outline">Learn more</Button>
              <Button>
                <PlusIcon data-icon="inline-start" />
                Create invoice
              </Button>
            </EmptyContent>
          </Empty>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Search not found
          </p>
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="search">
                <SearchIcon />
              </EmptyMedia>
              <EmptyTitle>No matching invoices</EmptyTitle>
              <EmptyDescription>
                Try another invoice number, customer, or payment channel.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Upgrade
          </p>
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="upgrade">
                <TriangleAlertIcon />
              </EmptyMedia>
              <EmptyTitle>Upgrade to Point of Sale</EmptyTitle>
              <EmptyDescription>
                Accept in-store payments on a HitPay terminal.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button>Upgrade now</Button>
            </EmptyContent>
          </Empty>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Text only
          </p>
          <Empty>
            <EmptyHeader>
              <EmptyTitle>No customers yet</EmptyTitle>
              <EmptyDescription>
                Customer Data appears here after a payment, invoice, or POS sale.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </div>
      </div>
    </DocExamplePage>
  )
}
