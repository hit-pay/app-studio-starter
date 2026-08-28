import { createFileRoute } from '@tanstack/react-router'
import {
  CreditCardIcon,
  LinkIcon,
  QrCodeIcon,
  RepeatIcon,
  ShoppingBagIcon,
  StoreIcon,
} from 'lucide-react'
import { ChoiceCard, ChoiceCardGroup } from '@/components/ui/choice-card'
import { DocExamplePage } from '@/components/doc/doc-example-page'

export const Route = createFileRoute('/choice-card')({
  component: ChoiceCardExamplesPage,
})

const usage = `import { CreditCardIcon, QrCodeIcon } from 'lucide-react'
import { ChoiceCard, ChoiceCardGroup } from '@/components/ui/choice-card'

<ChoiceCardGroup defaultValue="paynow">
  <ChoiceCard
    value="paynow"
    icon={<QrCodeIcon />}
    title="PayNow"
    description="Instant SGD transfers via QR"
  />
  <ChoiceCard
    value="cards"
    icon={<CreditCardIcon />}
    title="Cards"
    description="Visa, Mastercard, and AMEX"
  />
</ChoiceCardGroup>`

function ChoiceCardExamplesPage() {
  return (
    <DocExamplePage to="/choice-card" usage={usage}>
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Left
        </p>
        <ChoiceCardGroup defaultValue="paynow">
          <ChoiceCard
            value="paynow"
            alignment="Left"
            iconAlign="Left"
            icon={<QrCodeIcon />}
            title="PayNow"
            description="Instant SGD transfers via QR"
          />
          <ChoiceCard
            value="cards"
            alignment="Left"
            iconAlign="Left"
            icon={<CreditCardIcon />}
            title="Cards"
            description="Visa, Mastercard, and AMEX"
          />
          <ChoiceCard
            value="link"
            alignment="Left"
            iconAlign="Left"
            icon={<LinkIcon />}
            title="Payment Link"
            description="Share a checkout URL with the customer"
          />
        </ChoiceCardGroup>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Center
        </p>
        <ChoiceCardGroup defaultValue="invoice" alignment="Horizontal">
          <ChoiceCard
            value="invoice"
            alignment="Center"
            iconAlign="Center"
            icon={<ShoppingBagIcon />}
            title="Invoice"
            description="INV-2026"
            className="flex-1"
          />
          <ChoiceCard
            value="recurring"
            alignment="Center"
            iconAlign="Center"
            icon={<RepeatIcon />}
            title="Recurring"
            description="Subscriptions"
            className="flex-1"
          />
          <ChoiceCard
            value="pos"
            alignment="Center"
            iconAlign="Center"
            icon={<StoreIcon />}
            title="Point of Sale"
            description="In-store"
            className="flex-1"
          />
        </ChoiceCardGroup>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Commerce channel
        </p>
        <ChoiceCardGroup defaultValue="online-store">
          <ChoiceCard
            value="online-store"
            alignment="Left"
            iconAlign="Left"
            icon={<ShoppingBagIcon />}
            title="Online Store"
            description="Sell SKUs on your HitPay storefront"
          />
          <ChoiceCard
            value="pos"
            alignment="Left"
            iconAlign="Left"
            icon={<StoreIcon />}
            title="Point of Sale"
            description="Collect SGD at the counter with Cards or PayNow"
          />
        </ChoiceCardGroup>
      </div>
    </DocExamplePage>
  )
}
