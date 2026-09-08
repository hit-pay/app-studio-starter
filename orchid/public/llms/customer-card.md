<!-- Generated from content/docs/components/customer-card.mdx. Do not edit. -->

# Customer Card

Small, Big, and Float customer or beneficiary cards.

## Example

```tsx
import type { ReactNode } from 'react'
import { Chat1Regular } from '@mingcute/react/core-regular'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CustomerCard, type CustomerCardData } from '@/components/ui/customer-card'

const CUSTOMER: CustomerCardData = {
  name: 'Alex Turner',
  email: 'alex@studio.co',
  phone: '8373 3739 18',
  phoneCountryCode: '65',
  address: {
    street: '12 Orchard Road',
    state: 'Singapore',
  },
}

const POS_CUSTOMER: CustomerCardData = {
  name: 'Chloe Tan',
  email: 'chloe@tan.co',
  phone: '9123 4567',
  phoneCountryCode: '65',
  address: {
    street: 'Tanjong Pagar Centre',
    state: 'Singapore',
  },
}

function ExampleBlock({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
        {title}
      </p>
      {children}
    </div>
  )
}

function CustomerCardDemo() {
  return (
    <>
      <ExampleBlock title="Small">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <CustomerCard variant="small" customer={CUSTOMER} />
          <CustomerCard variant="small" customer={CUSTOMER} hover />
          <CustomerCard variant="small" customer={CUSTOMER} active />
          <CustomerCard variant="small" customer={CUSTOMER} loading />
          <CustomerCard variant="big" customer={CUSTOMER} loading />
        </div>
      </ExampleBlock>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        <ExampleBlock title="Big">
          <CustomerCard variant="big" customer={CUSTOMER} />
        </ExampleBlock>

        <ExampleBlock title="Float">
          <CustomerCard variant="float" customer={CUSTOMER} />
        </ExampleBlock>

        <ExampleBlock title="Empty">
          <CustomerCard variant="empty" />
        </ExampleBlock>

        <ExampleBlock title="Invoice payer">
          <CustomerCard
            variant="small"
            customer={CUSTOMER}
            badge={<Badge tone="blue">Invoice</Badge>}
          />
        </ExampleBlock>

        <ExampleBlock title="Recurring subscriber">
          <CustomerCard
            variant="small"
            customer={CUSTOMER}
            badge={<Badge tone="purple">Recurring</Badge>}
          />
        </ExampleBlock>

        <ExampleBlock title="POS walk-in">
          <CustomerCard
            variant="small"
            customer={POS_CUSTOMER}
            badge={<Badge tone="green">POS</Badge>}
          />
        </ExampleBlock>

        <ExampleBlock title="Edit and action">
          <CustomerCard
            variant="big"
            customer={CUSTOMER}
            edit
            hover
            bottom={
              <Button variant="ghost" size="sm" className="w-full">
                <Chat1Regular />
                Start Chat
              </Button>
            }
          />
        </ExampleBlock>

        <ExampleBlock title="Closable">
          <div className="p-2">
            <CustomerCard variant="small" customer={CUSTOMER} closable />
          </div>
        </ExampleBlock>
      </div>
    </>
  )
}

export { CustomerCardDemo }
```
