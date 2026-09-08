<!-- Generated from content/docs/components/alert.mdx. Do not edit. -->

# Alert

In-page notification with semantic variants and an optional action.

## Example

```tsx
import {
  CheckCircleRegular,
  InformationRegular,
  AlertRegular,
  CloseCircleRegular,
} from '@mingcute/react/core-regular';

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

function AlertDemo() {
  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Default
          </p>
          <Alert>
            <InformationRegular />
            <AlertTitle>PayNow delay</AlertTitle>
            <AlertDescription>
              Payments may take longer than usual. Consider using Cards or
              GrabPay while the channel recovers.
            </AlertDescription>
          </Alert>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Success
          </p>
          <Alert variant="success">
            <CheckCircleRegular />
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
            <AlertRegular />
            <AlertTitle>Low stock</AlertTitle>
            <AlertDescription>
              SKU-TEA-12 has 3 units remaining. Restock before the weekend
              promotion.
            </AlertDescription>
          </Alert>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Destructive
          </p>
          <Alert variant="destructive">
            <CloseCircleRegular />
            <AlertTitle>Refund failed</AlertTitle>
            <AlertDescription>
              We could not refund SGD 48.00 on INV-2048. Retry or contact the
              customer.
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
            <InformationRegular />
            <AlertTitle>PayNow delay</AlertTitle>
            <AlertDescription>
              Payments may take longer than usual.
            </AlertDescription>
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
            <CheckCircleRegular />
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
          <InformationRegular />
          <AlertTitle>Scheduled maintenance</AlertTitle>
          <AlertDescription>
            Dashboard reporting may be delayed between 02:00 and 02:30 SGT.
          </AlertDescription>
        </Alert>
        <header className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0 flex-1">
            <h2 className="wrap-break-word text-lg leading-6 font-medium text-oc-foreground">
              Invoices
            </h2>
            <p className="wrap-break-word text-sm leading-5 text-oc-muted-foreground">
              Create, send, and track invoices across payment channels.
            </p>
          </div>
          <div className="flex justify-end sm:shrink-0">
            <Button>Create invoice</Button>
          </div>
        </header>
      </div>
    </>
  );
}

export { AlertDemo };
```

## Usage

```tsx
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  CheckCircleRegular,
  InformationRegular,
  AlertRegular,
  CloseCircleRegular,
} from '@mingcute/react/core-regular'

<Alert>
  <InformationRegular />
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
  <CheckCircleRegular />
  <AlertTitle>Payment received</AlertTitle>
  <AlertDescription>SGD 128.00 was paid successfully.</AlertDescription>
</Alert>

<Alert variant="warning">
  <AlertRegular />
  <AlertTitle>Low stock</AlertTitle>
  <AlertDescription>SKU-TEA-12 has 3 units remaining.</AlertDescription>
</Alert>

<Alert variant="destructive">
  <CloseCircleRegular />
  <AlertTitle>Refund failed</AlertTitle>
  <AlertDescription>Retry or contact the customer.</AlertDescription>
</Alert>
```
