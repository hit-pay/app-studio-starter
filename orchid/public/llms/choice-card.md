<!-- Generated from content/docs/components/choice-card.mdx. Do not edit. -->

# Choice Card

Selectable cards with left or center icon, no radio dot.

## Example

```tsx
import {
  BankCardRegular,
  LinkRegular,
  QrcodeRegular,
  RepeatRegular,
  ShoppingBag1Regular,
  StoreRegular,
} from '@mingcute/react/core-regular';
import { ChoiceCard, ChoiceCardGroup } from "@/components/choice-card";

function ChoiceCardDemo() {
  return (
    <>
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Left
        </p>
        <ChoiceCardGroup defaultValue="paynow">
          <ChoiceCard
            value="paynow"
            alignment="left"
            iconAlign="left"
            icon={<QrcodeRegular />}
            title="PayNow"
            description="Instant SGD transfers via QR"
          />
          <ChoiceCard
            value="cards"
            alignment="left"
            iconAlign="left"
            icon={<BankCardRegular />}
            title="Cards"
            description="Visa, Mastercard, and AMEX"
          />
          <ChoiceCard
            value="link"
            alignment="left"
            iconAlign="left"
            icon={<LinkRegular />}
            title="Payment Link"
            description="Share a checkout URL with the customer"
          />
        </ChoiceCardGroup>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Center
        </p>
        <ChoiceCardGroup defaultValue="invoice" alignment="horizontal">
          <ChoiceCard
            value="invoice"
            alignment="center"
            iconAlign="center"
            icon={<ShoppingBag1Regular />}
            title="Invoice"
            description="INV-2026"
            className="flex-1"
          />
          <ChoiceCard
            value="recurring"
            alignment="center"
            iconAlign="center"
            icon={<RepeatRegular />}
            title="Recurring"
            description="Subscriptions"
            className="flex-1"
          />
          <ChoiceCard
            value="pos"
            alignment="center"
            iconAlign="center"
            icon={<StoreRegular />}
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
            alignment="left"
            iconAlign="left"
            icon={<ShoppingBag1Regular />}
            title="Online Store"
            description="Sell SKUs on your HitPay storefront"
          />
          <ChoiceCard
            value="pos"
            alignment="left"
            iconAlign="left"
            icon={<StoreRegular />}
            title="Point of Sale"
            description="Collect SGD at the counter with Cards or PayNow"
          />
        </ChoiceCardGroup>
      </div>
    </>
  );
}

export { ChoiceCardDemo };
```
