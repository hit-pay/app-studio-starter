import type { ReactNode } from 'react'
import { MessageCircleIcon } from 'lucide-react'
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
          <CustomerCard variant="Small" customer={CUSTOMER} />
          <CustomerCard variant="Small" customer={CUSTOMER} hover />
          <CustomerCard variant="Small" customer={CUSTOMER} active />
          <CustomerCard variant="Small" customer={CUSTOMER} loading />
          <CustomerCard variant="Big" customer={CUSTOMER} loading />
        </div>
      </ExampleBlock>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        <ExampleBlock title="Big">
          <CustomerCard variant="Big" customer={CUSTOMER} />
        </ExampleBlock>

        <ExampleBlock title="Float">
          <CustomerCard variant="Float" customer={CUSTOMER} />
        </ExampleBlock>

        <ExampleBlock title="Empty">
          <CustomerCard variant="Empty" />
        </ExampleBlock>

        <ExampleBlock title="Invoice payer">
          <CustomerCard
            variant="Small"
            customer={CUSTOMER}
            badge={<Badge tone="blue">Invoice</Badge>}
          />
        </ExampleBlock>

        <ExampleBlock title="Recurring subscriber">
          <CustomerCard
            variant="Small"
            customer={CUSTOMER}
            badge={<Badge tone="purple">Recurring</Badge>}
          />
        </ExampleBlock>

        <ExampleBlock title="POS walk-in">
          <CustomerCard
            variant="Small"
            customer={POS_CUSTOMER}
            badge={<Badge tone="green">POS</Badge>}
          />
        </ExampleBlock>

        <ExampleBlock title="Edit and action">
          <CustomerCard
            variant="Big"
            customer={CUSTOMER}
            edit
            hover
            bottom={
              <Button variant="Primary" style="Transparent" size="Small" className="w-full">
                <MessageCircleIcon />
                Start Chat
              </Button>
            }
          />
        </ExampleBlock>

        <ExampleBlock title="Closable">
          <div className="p-2">
            <CustomerCard variant="Small" customer={CUSTOMER} closable />
          </div>
        </ExampleBlock>
      </div>
    </>
  )
}

export { CustomerCardDemo }
