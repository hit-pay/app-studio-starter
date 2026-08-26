import type { ReactNode } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { MessageCircleIcon } from 'lucide-react'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Button } from '@/components/ui/button'
import { Chip } from '@/components/ui/chip'
import { CustomerCard, type CustomerCardData } from '@/components/ui/customer-card'

export const Route = createFileRoute('/customer-card')({
  component: CustomerCardExamplesPage,
})

const CUSTOMER: CustomerCardData = {
  name: 'Alex Turner',
  email: 'alex@arcticmonkey.io',
  phone_number: '8373 3739 18',
  phone_number_country_code: '65',
  address: {
    street: '4666 Dickens Islands',
    state: 'Pennsylvania',
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
      <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
        {title}
      </p>
      {children}
    </div>
  )
}

function CustomerCardExamplesPage() {
  return (
    <DocExamplePage to="/customer-card">
      <ExampleBlock title="Small">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <CustomerCard variant="Small" customer={CUSTOMER} />
          <CustomerCard variant="Small" customer={CUSTOMER} hover />
          <CustomerCard variant="Small" customer={CUSTOMER} active />
          <CustomerCard variant="Small" customer={CUSTOMER} loading />
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

        <ExampleBlock title="Label">
          <CustomerCard
            variant="Small"
            customer={CUSTOMER}
            chip={<Chip color="Blue">Text</Chip>}
          />
        </ExampleBlock>

        <ExampleBlock title="Edit and action">
          <CustomerCard
            variant="Big"
            customer={CUSTOMER}
            edit
            hover
            bottom={
              <Button type="Primary" style="Transparent" size="Small" className="w-full">
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
    </DocExamplePage>
  )
}
