import { createFileRoute } from '@tanstack/react-router'
import { FileTextIcon, LinkIcon, PlusIcon, ShoppingBagIcon, StoreIcon, UserPlusIcon } from 'lucide-react'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'

export const Route = createFileRoute('/empty-state')({
  component: EmptyStateExamplesPage,
})

function EmptyStateExamplesPage() {
  return (
    <DocExamplePage
      to="/empty-state"
      usage={`import { EmptyState } from '@/orchid-ui/empty-state'
import { Button } from '@/orchid-ui/button'
import { PlusIcon } from 'lucide-react'

<EmptyState
  type="Default"
  title="No invoices yet"
  description="Create an invoice to bill a customer by email or payment link."
  actions={
    <Button variant="Primary" size="Small">
      <PlusIcon />
      Create invoice
    </Button>
  }
/>

<EmptyState type="Search" title="No matching invoices" description="Try another invoice number." />

<EmptyState type="Upgrade" title="Upgrade to Point of Sale" description="Accept in-store payments on a HitPay terminal." />`}
    >
      <div className="grid gap-12 md:grid-cols-2">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            No invoices
          </p>
          <EmptyState
            type="Default"
            title="No invoices yet"
            description="Create an invoice to bill a customer by email or payment link."
            actions={
              <>
                <Button variant="Secondary" size="Small">
                  <FileTextIcon />
                  Learn more
                </Button>
                <Button variant="Primary" size="Small">
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
          <EmptyState
            type="Default"
            title="No products yet"
            description="Add Product Data to sell in Online Store, POS, invoices, and payment links."
            actions={
              <Button variant="Primary" size="Small">
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
          <EmptyState
            type="Default"
            title="No customers yet"
            description="Customer Data appears here after a payment, invoice, or POS sale."
            actions={
              <Button variant="Primary" size="Small">
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
          <EmptyState
            type="Default"
            title="No payment links yet"
            description="Share a link so customers can pay without an invoice."
            actions={
              <Button variant="Primary" size="Small">
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
          <EmptyState
            type="Upgrade"
            title="Upgrade to Point of Sale"
            description="Accept in-store payments on a HitPay terminal. Upgrade your plan to enable POS."
            actions={
              <Button variant="Primary" size="Small">
                Upgrade now
              </Button>
            }
          />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Search not found
          </p>
          <EmptyState
            type="Search"
            title="No matching invoices"
            description="Try another invoice number, customer, or payment channel."
          />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Online Store
          </p>
          <EmptyState
            type="Default"
            title="Your Online Store is empty"
            description="Add products so customers can check out on your storefront."
            actions={
              <Button variant="Primary" size="Small">
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
