import { DocCodePanel } from "@/components/doc/doc-code-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DetailList } from "@/components/detail-list";
import { PageLayout } from "@/components/ui/page-layout";

const INVOICE_LIST_USAGE = `import { Button } from '@/components/ui/button'
import { PageLayout } from '@/components/ui/page-layout'

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

const INVOICE_DETAIL_USAGE = `import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DetailList } from '@/components/detail-list'
import { PageLayout } from '@/components/ui/page-layout'

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
        <DetailList
          columns={2}
          items={[
            { key: 'customer', label: 'Customer', value: 'Alex Turner', alignment: 'Vertical' },
            { key: 'email', label: 'Email', value: 'alex@studio.co', alignment: 'Vertical' },
            { key: 'amount', label: 'Amount', value: 'SGD 128.00', alignment: 'Vertical' },
            { key: 'channel', label: 'Channel', value: 'PayNow', alignment: 'Vertical' },
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
            <DetailList
              columns={2}
              items={[
                {
                  key: "customer",
                  label: "Customer",
                  value: "Alex Turner",
                  alignment: "Vertical",
                },
                {
                  key: "email",
                  label: "Email",
                  value: "alex@studio.co",
                  alignment: "Vertical",
                },
                {
                  key: "amount",
                  label: "Amount",
                  value: "SGD 128.00",
                  alignment: "Vertical",
                },
                {
                  key: "channel",
                  label: "Channel",
                  value: "PayNow",
                  alignment: "Vertical",
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
