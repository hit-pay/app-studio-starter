import { createFileRoute } from '@tanstack/react-router'
import {
  CreditCardIcon,
  LinkIcon,
  QrCodeIcon,
  RepeatIcon,
  ShoppingBagIcon,
  StoreIcon,
} from 'lucide-react'
import { ClickableOption, ClickableOptionGroup } from '@/components/ui/clickable-option'
import { DocExamplePage } from '@/components/doc/doc-example-page'

export const Route = createFileRoute('/clickable-option')({
  component: ClickableOptionExamplesPage,
})

function ClickableOptionExamplesPage() {
  return (
    <DocExamplePage to="/clickable-option">
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Left
        </p>
        <ClickableOptionGroup defaultValue="paynow">
          <ClickableOption
            value="paynow"
            alignment="Left"
            iconAlign="Left"
            icon={<QrCodeIcon />}
            title="PayNow"
            description="Instant SGD transfers via QR"
          />
          <ClickableOption
            value="cards"
            alignment="Left"
            iconAlign="Left"
            icon={<CreditCardIcon />}
            title="Cards"
            description="Visa, Mastercard, and AMEX"
          />
          <ClickableOption
            value="link"
            alignment="Left"
            iconAlign="Left"
            icon={<LinkIcon />}
            title="Payment Link"
            description="Share a checkout URL with the customer"
          />
        </ClickableOptionGroup>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Center
        </p>
        <ClickableOptionGroup defaultValue="invoice" alignment="Horizontal">
          <ClickableOption
            value="invoice"
            alignment="Center"
            iconAlign="Center"
            icon={<ShoppingBagIcon />}
            title="Invoice"
            description="INV-2026"
            className="flex-1"
          />
          <ClickableOption
            value="recurring"
            alignment="Center"
            iconAlign="Center"
            icon={<RepeatIcon />}
            title="Recurring"
            description="Subscriptions"
            className="flex-1"
          />
          <ClickableOption
            value="pos"
            alignment="Center"
            iconAlign="Center"
            icon={<StoreIcon />}
            title="Point of Sale"
            description="In-store"
            className="flex-1"
          />
        </ClickableOptionGroup>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Commerce channel
        </p>
        <ClickableOptionGroup defaultValue="online-store">
          <ClickableOption
            value="online-store"
            alignment="Left"
            iconAlign="Left"
            icon={<ShoppingBagIcon />}
            title="Online Store"
            description="Sell SKUs on your HitPay storefront"
          />
          <ClickableOption
            value="pos"
            alignment="Left"
            iconAlign="Left"
            icon={<StoreIcon />}
            title="Point of Sale"
            description="Collect SGD at the counter with Cards or PayNow"
          />
        </ClickableOptionGroup>
      </div>
    </DocExamplePage>
  )
}
