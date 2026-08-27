import { createFileRoute } from '@tanstack/react-router'
import {
  DetailList,
  DetailListGrid,
  DetailListRow,
} from '@/components/ui/detail-list'
import { Button } from '@/components/ui/button'
import { Chip } from '@/components/ui/chip'
import { PageTitle } from '@/components/ui/page-title'
import { DocExamplePage } from '@/components/doc/doc-example-page'

export const Route = createFileRoute('/page-title')({
  component: PageTitleExamplesPage,
})

function PageTitleExamplesPage() {
  return (
    <DocExamplePage to="/page-title">
        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Invoices
          </p>
          <PageTitle
            title="Invoices"
            description="Create, send, and track invoices across payment channels."
            actions={
              <Button variant="Primary" size="Default">
                Create invoice
              </Button>
            }
          />
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Payment Links
          </p>
          <PageTitle
            title="Payment Links"
            description="Share a link so customers can pay without an invoice."
            actions={
              <Button variant="Primary" size="Default">
                Create payment link
              </Button>
            }
          />
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Recurring
          </p>
          <PageTitle
            title="Recurring"
            description="Subscriptions billed on a weekly, monthly, or yearly cycle."
            actions={
              <Button variant="Primary" size="Default">
                New plan
              </Button>
            }
          />
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            POS
          </p>
          <PageTitle
            title="Point of Sale"
            description="In-store sales, terminals, and payment channels."
            chip={<Chip color="Green">Orchard 01 online</Chip>}
          />
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Online Store
          </p>
          <PageTitle
            title="Online Store"
            description="Products, checkout, and storefront settings."
            actions={
              <Button variant="Secondary" style="Border" size="Default">
                View store
              </Button>
            }
          />
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Customers
          </p>
          <PageTitle
            title="Customers"
            description="Customer Data from invoices, payment links, Recurring, POS, and Online Store."
            actions={
              <Button variant="Primary" size="Default">
                Add customer
              </Button>
            }
          />
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Products
          </p>
          <PageTitle
            title="Products"
            description="Product Data shared across Online Store, POS, invoices, and payment links."
            actions={
              <Button variant="Primary" size="Default">
                Add product
              </Button>
            }
          />
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Actions
          </p>
          <PageTitle
            title="Payment details"
            description="Review this transaction before you continue."
            chip={<Chip color="Green">Paid</Chip>}
            actions={
              <>
                <Button variant="Secondary" style="Border" size="Default">
                  Refund
                </Button>
                <Button variant="Primary" size="Default">
                  Send receipt
                </Button>
              </>
            }
          />
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            With box
          </p>
          <div className="space-y-4">
            <PageTitle
              title="INV-2048"
              description="https://pay.hitpayapp.com/inv-2048"
              chip={<Chip color="Green">Paid</Chip>}
              copyValue="https://pay.hitpayapp.com/inv-2048"
              actions={
                <Button variant="Secondary" style="Border" size="Default">
                  Edit
                </Button>
              }
            />
            <DetailList type="Default">
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
          </div>
        </div>
      </DocExamplePage>
  )
}
