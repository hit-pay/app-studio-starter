import { createFileRoute } from '@tanstack/react-router'
import { FileTextIcon, LinkIcon, PlusIcon, ShoppingBagIcon, StoreIcon, UserPlusIcon } from 'lucide-react'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Button } from '@/components/ui/button'
import { EmptyPage } from '@/components/ui/empty-page'

export const Route = createFileRoute('/empty-page')({
  component: EmptyPageExamplesPage,
})

function EmptyPageExamplesPage() {
  return (
    <DocExamplePage to="/empty-page">
      <div className="grid gap-12 md:grid-cols-2">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            No invoices
          </p>
          <EmptyPage
            type="Default"
            title="No invoices yet"
            description="Create an invoice to bill a customer by email or payment link."
            actions={
              <>
                <Button type="Secondary" size="Small">
                  <FileTextIcon />
                  Learn more
                </Button>
                <Button type="Primary" size="Small">
                  <PlusIcon />
                  Create invoice
                </Button>
              </>
            }
          />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            No products
          </p>
          <EmptyPage
            type="Default"
            title="No products yet"
            description="Add Product Data to sell in Online Store, POS, invoices, and payment links."
            actions={
              <Button type="Primary" size="Small">
                <ShoppingBagIcon />
                Add product
              </Button>
            }
          />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            No customers
          </p>
          <EmptyPage
            type="Default"
            title="No customers yet"
            description="Customer Data appears here after a payment, invoice, or POS sale."
            actions={
              <Button type="Primary" size="Small">
                <UserPlusIcon />
                Add customer
              </Button>
            }
          />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            No payment links
          </p>
          <EmptyPage
            type="Default"
            title="No payment links yet"
            description="Share a link so customers can pay without an invoice."
            actions={
              <Button type="Primary" size="Small">
                <LinkIcon />
                Create payment link
              </Button>
            }
          />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Upgrade POS
          </p>
          <EmptyPage
            type="Upgrade"
            title="Upgrade to Point of Sale"
            description="Accept in-store payments on a HitPay terminal. Upgrade your plan to enable POS."
            actions={
              <Button type="Primary" size="Small">
                Upgrade now
              </Button>
            }
          />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Search not found
          </p>
          <EmptyPage
            type="Search"
            title="No matching invoices"
            description="Try another invoice number, customer, or payment channel."
          />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Online Store
          </p>
          <EmptyPage
            type="Default"
            title="Your Online Store is empty"
            description="Add products so customers can check out on your storefront."
            actions={
              <Button type="Primary" size="Small">
                <StoreIcon />
                Add product
              </Button>
            }
          />
        </div>
      </div>
    </DocExamplePage>
  )
}
