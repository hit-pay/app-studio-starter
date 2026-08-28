import { createFileRoute } from '@tanstack/react-router'

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

function PageExamplesPage() {
  return (
    <DocExamplePage
      to="/page"
      usage={`import {
  Page,
  PageContent,
  PageHeader,
} from '@/components/ui/page'

<Page>
  <PageHeader
    title="Invoices"
    description="Create, send, and track invoices."
    actions={<Button>Create invoice</Button>}
  />
  <PageContent>
    {/* Tables, cards, filters, or other page content */}
  </PageContent>
</Page>`}
    >
      <div className="h-96 overflow-hidden rounded-xl border border-oc-border p-6">
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

      <div className="h-112 overflow-hidden rounded-xl border border-oc-border p-6">
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
    </DocExamplePage>
  )
}
