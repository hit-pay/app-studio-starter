import { createFileRoute } from '@tanstack/react-router'
import { CheckCircleIcon, InfoIcon, TriangleAlertIcon, XCircleIcon } from 'lucide-react'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Alert, AlertAction, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { PageTitle } from '@/components/ui/page-title'

export const Route = createFileRoute('/alert')({
  component: AlertExamplesPage,
})

function AlertExamplesPage() {
  return (
    <DocExamplePage
      to="/alert"
      usage={`import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  CheckCircleIcon,
  InfoIcon,
  TriangleAlertIcon,
  XCircleIcon,
} from 'lucide-react'

<Alert>
  <InfoIcon />
  <AlertTitle>PayNow delay</AlertTitle>
  <AlertDescription>
    Payments may take longer than usual.
  </AlertDescription>
  <AlertAction placement="bottom">
    <Button variant="Secondary" style="Border" size="Small">
      View status
    </Button>
  </AlertAction>
</Alert>

<Alert variant="success">
  <CheckCircleIcon />
  <AlertTitle>Payment received</AlertTitle>
  <AlertDescription>SGD 128.00 was paid successfully.</AlertDescription>
</Alert>

<Alert variant="warning">
  <TriangleAlertIcon />
  <AlertTitle>Low stock</AlertTitle>
  <AlertDescription>SKU-TEA-12 has 3 units remaining.</AlertDescription>
</Alert>

<Alert variant="destructive">
  <XCircleIcon />
  <AlertTitle>Refund failed</AlertTitle>
  <AlertDescription>Retry or contact the customer.</AlertDescription>
</Alert>`}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Default
          </p>
          <Alert>
            <InfoIcon />
            <AlertTitle>PayNow delay</AlertTitle>
            <AlertDescription>
              Payments may take longer than usual. Consider using Cards or GrabPay while the
              channel recovers.
            </AlertDescription>
          </Alert>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Success
          </p>
          <Alert variant="success">
            <CheckCircleIcon />
            <AlertTitle>Payment received</AlertTitle>
            <AlertDescription>
              SGD 128.00 for INV-2048 was paid successfully through PayNow.
            </AlertDescription>
          </Alert>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Warning
          </p>
          <Alert variant="warning">
            <TriangleAlertIcon />
            <AlertTitle>Low stock</AlertTitle>
            <AlertDescription>
              SKU-TEA-12 has 3 units remaining. Restock before the weekend promotion.
            </AlertDescription>
          </Alert>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Destructive
          </p>
          <Alert variant="destructive">
            <XCircleIcon />
            <AlertTitle>Refund failed</AlertTitle>
            <AlertDescription>
              We could not refund SGD 48.00 on INV-2048. Retry or contact the customer.
            </AlertDescription>
          </Alert>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Default action
          </p>
          <Alert>
            <InfoIcon />
            <AlertTitle>PayNow delay</AlertTitle>
            <AlertDescription>Payments may take longer than usual.</AlertDescription>
            <AlertAction>
              <Button variant="Secondary" style="Border" size="Small">
                View status
              </Button>
            </AlertAction>
          </Alert>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Bottom action
          </p>
          <Alert variant="success">
            <CheckCircleIcon />
            <AlertTitle>Invoice created</AlertTitle>
            <AlertDescription>
              INV-2048 for SGD 128.00 was created and sent to Priya Nair.
            </AlertDescription>
            <AlertAction placement="bottom">
              <Button variant="Secondary" style="Border" size="Small">
                View invoice
              </Button>
              <Button size="Small">Send reminder</Button>
            </AlertAction>
          </Alert>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Above page header
        </p>
        <Alert>
          <InfoIcon />
          <AlertTitle>Scheduled maintenance</AlertTitle>
          <AlertDescription>
            Dashboard reporting may be delayed between 02:00 and 02:30 SGT.
          </AlertDescription>
        </Alert>
        <PageTitle
          title="Invoices"
          description="Create, send, and track invoices across payment channels."
          actions={<Button>Create invoice</Button>}
        />
      </div>
    </DocExamplePage>
  )
}
