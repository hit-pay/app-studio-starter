<!-- Generated from content/docs/components/page-layout.mdx. Do not edit. -->

# Page Layout

Standard route page with built-in responsive padding, header, and scrollable content.

`PageLayout` renders its required header and wraps its children in a scrollable content area.
The `actions` prop accepts any React node so pages can provide the controls they need.

## Example

```tsx
import { DocCodePanel } from "@/components/doc/doc-code-panel";
import { Badge } from "@/base-ui/displaying-data/badge";
import { Button } from "@/base-ui/actions/button";
import { DetailCard } from "@/components/displaying-data/detail-card";
import { PageLayout } from "@/components/layout/page-layout";

const INVOICE_LIST_USAGE = `import { Button } from '@/base-ui/actions/button'
import { PageLayout } from '@/components/layout/page-layout'

function InvoiceListPageExample() {
  return (
    <div className="h-96 overflow-hidden rounded-xl border border-oc-border">
      <PageLayout
        title="Invoices"
        description="Create, send, and track invoices across payment channels."
        actions={<Button>Create invoice</Button>}
      >
        <div className="rounded-xl border border-oc-border p-6 text-sm text-oc-muted-foreground">
          Invoice table or empty state goes here.
        </div>
      </PageLayout>
    </div>
  )
}`;

const INVOICE_DETAIL_USAGE = `import { Badge } from '@/base-ui/displaying-data/badge'
import { Button } from '@/base-ui/actions/button'
import { DetailCard } from '@/components/displaying-data/detail-card'
import { PageLayout } from '@/components/layout/page-layout'

function InvoiceDetailPageExample() {
  return (
    <div className="h-112 overflow-hidden rounded-xl border border-oc-border">
      <PageLayout
        title="INV-2048"
        description="https://pay.hitpayapp.com/inv-2048"
        copyValue="https://pay.hitpayapp.com/inv-2048"
        badge={<Badge tone="green">Paid</Badge>}
        actions={<Button variant="outline">Edit</Button>}
      >
        <DetailCard
          columns={2}
          items={[
            { key: 'customer', label: 'Customer', value: 'Alex Turner', alignment: 'vertical' },
            { key: 'email', label: 'Email', value: 'alex@studio.co', alignment: 'vertical' },
            { key: 'amount', label: 'Amount', value: 'SGD 128.00', alignment: 'vertical' },
            { key: 'channel', label: 'Channel', value: 'PayNow', alignment: 'vertical' },
          ]}
        />
      </PageLayout>
    </div>
  )
}`;

function PageLayoutDemo() {
  return (
    <>
      <div className="space-y-4">
        <div className="h-96 overflow-hidden rounded-xl border border-oc-border">
          <PageLayout
            title="Invoices"
            description="Create, send, and track invoices across payment channels."
            actions={<Button>Create invoice</Button>}
          >
            <div className="rounded-xl border border-oc-border p-6 text-sm text-oc-muted-foreground">
              Invoice table or empty state goes here.
            </div>
          </PageLayout>
        </div>
        <div className="flex min-w-0 flex-col gap-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Usage
          </p>
          <DocCodePanel
            filename="invoice-list-page.tsx"
            code={INVOICE_LIST_USAGE}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="h-112 overflow-hidden rounded-xl border border-oc-border">
          <PageLayout
            title="INV-2048"
            description="https://pay.hitpayapp.com/inv-2048"
            copyValue="https://pay.hitpayapp.com/inv-2048"
            badge={<Badge tone="green">Paid</Badge>}
            actions={<Button variant="outline">Edit</Button>}
          >
            <DetailCard
              columns={2}
              items={[
                {
                  key: "customer",
                  label: "Customer",
                  value: "Alex Turner",
                  alignment: "vertical",
                },
                {
                  key: "email",
                  label: "Email",
                  value: "alex@studio.co",
                  alignment: "vertical",
                },
                {
                  key: "amount",
                  label: "Amount",
                  value: "SGD 128.00",
                  alignment: "vertical",
                },
                {
                  key: "channel",
                  label: "Channel",
                  value: "PayNow",
                  alignment: "vertical",
                },
              ]}
            />
          </PageLayout>
        </div>
        <div className="flex min-w-0 flex-col gap-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Usage
          </p>
          <DocCodePanel
            filename="invoice-detail-page.tsx"
            code={INVOICE_DETAIL_USAGE}
          />
        </div>
      </div>
    </>
  );
}

export { PageLayoutDemo };
```
