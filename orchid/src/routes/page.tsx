import { createFileRoute } from '@tanstack/react-router'

import { DocCodePanel } from '@/components/doc/doc-code-panel'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DetailList,
  DetailListGrid,
  DetailListRow,
} from '@/components/ui/detail-list'
import { Page, PageContent, PageHeader } from '@/components/ui/page'

export const Route = createFileRoute('/page')({
  component: PageExamplesPage,
})

const INVOICE_LIST_USAGE = `import { Button } from '@/components/ui/button'
import {
  Page,
  PageContent,
  PageHeader,
} from '@/components/ui/page'

function InvoiceListPageExample() {
  return (
    <div className="h-96 overflow-hidden rounded-xl border border-oc-border">
      <Page>
        <PageHeader
          title="Invoices"
          description="Create, send, and track invoices across payment channels."
          actions={<Button>Create invoice</Button>}
        />
        <PageContent>
          <div className="rounded-xl border border-oc-border p-6 text-sm text-oc-muted-foreground">
            Invoice table or empty state goes here.
          </div>
        </PageContent>
      </Page>
    </div>
  )
}`

const INVOICE_DETAIL_USAGE = `import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DetailList,
  DetailListGrid,
  DetailListRow,
} from '@/components/ui/detail-list'
import {
  Page,
  PageContent,
  PageHeader,
} from '@/components/ui/page'

function InvoiceDetailPageExample() {
  return (
    <div className="h-112 overflow-hidden rounded-xl border border-oc-border">
      <Page>
        <PageHeader
          title="INV-2048"
          description="https://pay.hitpayapp.com/inv-2048"
          copyValue="https://pay.hitpayapp.com/inv-2048"
          badge={<Badge tone="green">Paid</Badge>}
          actions={<Button variant="outline">Edit</Button>}
        />
        <PageContent>
          <DetailList style="Default">
            <DetailListGrid columns={2}>
              <DetailListRow label="Customer" alignment="Vertical">
                Alex Turner
              </DetailListRow>
              <DetailListRow label="Email" alignment="Vertical">
                alex@studio.co
              </DetailListRow>
              <DetailListRow label="Amount" alignment="Vertical">
                SGD 128.00
              </DetailListRow>
              <DetailListRow label="Channel" alignment="Vertical">
                PayNow
              </DetailListRow>
            </DetailListGrid>
          </DetailList>
        </PageContent>
      </Page>
    </div>
  )
}`

function PageExamplesPage() {
  return (
    <DocExamplePage to="/page">
      <div className="space-y-4">
        <div className="h-96 overflow-hidden rounded-xl border border-oc-border">
          <Page>
            <PageHeader
              title="Invoices"
              description="Create, send, and track invoices across payment channels."
              actions={<Button>Create invoice</Button>}
            />
            <PageContent>
              <div className="rounded-xl border border-oc-border p-6 text-sm text-oc-muted-foreground">
                Invoice table or empty state goes here.
              </div>
            </PageContent>
          </Page>
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
          <Page>
            <PageHeader
              title="INV-2048"
              description="https://pay.hitpayapp.com/inv-2048"
              copyValue="https://pay.hitpayapp.com/inv-2048"
              badge={<Badge tone="green">Paid</Badge>}
              actions={<Button variant="outline">Edit</Button>}
            />
            <PageContent>
              <DetailList style="Default">
                <DetailListGrid columns={2}>
                  <DetailListRow label="Customer" alignment="Vertical">
                    Alex Turner
                  </DetailListRow>
                  <DetailListRow label="Email" alignment="Vertical">
                    alex@studio.co
                  </DetailListRow>
                  <DetailListRow label="Amount" alignment="Vertical">
                    SGD 128.00
                  </DetailListRow>
                  <DetailListRow label="Channel" alignment="Vertical">
                    PayNow
                  </DetailListRow>
                </DetailListGrid>
              </DetailList>
            </PageContent>
          </Page>
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
    </DocExamplePage>
  )
}
