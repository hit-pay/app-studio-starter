import { createFileRoute } from '@tanstack/react-router'
import { CreditCardIcon, StoreIcon } from 'lucide-react'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'

export const Route = createFileRoute('/accordion')({
  component: AccordionExamplesPage,
})

function AccordionExamplesPage() {
  return (
    <DocExamplePage
      to="/accordion"
      usage={`import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

<Accordion defaultValue={['invoice']}>
  <AccordionItem value="invoice">
    <AccordionTrigger>Invoice details</AccordionTrigger>
    <AccordionContent>
      Invoice INV-2048 is due on 3 Sep 2026.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="customer">
    <AccordionTrigger>Customer data</AccordionTrigger>
    <AccordionContent>
      Priya Nair · priya.nair@example.com
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
    >
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            shadcn-compatible API
          </p>
          <Accordion defaultValue={['payment-channels']}>
            <AccordionItem value="invoice">
              <AccordionTrigger>Invoice details</AccordionTrigger>
              <AccordionContent>
                <p className="font-medium">INV-2048 · Priya Nair</p>
                <p className="mt-4">
                  Invoice for 2× Matcha Latte and 1× Croissant. Amount SGD 128.00. Due 3 Sep 2026.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="customer">
              <AccordionTrigger>Customer data</AccordionTrigger>
              <AccordionContent>
                <p className="font-medium">Priya Nair</p>
                <p className="mt-4">
                  Billing email priya.nair@example.com. Last paid INV-1988 via PayNow.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="payment-channels">
              <AccordionTrigger>Payment channels</AccordionTrigger>
              <AccordionContent>
                <p className="font-medium">Singapore payment channels</p>
                <p className="mt-4">
                  PayNow, Cards, GrabPay, and WeChat Pay are available for this business.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Composable trigger content
          </p>
          <Accordion>
            <AccordionItem value="pos">
              <AccordionTrigger>
                <span className="flex min-w-0 flex-1 items-center gap-2">
                  <CreditCardIcon className="size-5 shrink-0" />
                  <span className="flex min-w-0 flex-col items-start">
                    <span>Point of Sale</span>
                    <span className="truncate text-xs font-normal text-oc-muted-foreground">
                      Terminal HP-POS-04 is online
                    </span>
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                Last sale SGD 24.50 via GrabPay. Terminal is ready to accept payments.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="store">
              <AccordionTrigger>
                <span className="flex min-w-0 flex-1 items-center gap-2">
                  <StoreIcon className="size-5 shrink-0" />
                  <span>Online Store</span>
                  <Badge color="Purple" style="Background">
                    New
                  </Badge>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                Home page is published. Checkout accepts PayNow and Cards.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="setup">
              <AccordionTrigger>
                <span className="flex min-w-0 flex-1 items-center gap-2">
                  <span className="shrink-0">Store setup</span>
                  <span className="ml-auto text-xs font-normal whitespace-nowrap text-oc-muted-foreground">
                    2/5 completed
                  </span>
                  <span className="relative h-2 w-24 overflow-clip rounded-full bg-oc-background">
                    <span className="absolute inset-y-0 left-0 w-2/5 rounded-full bg-oc-primary" />
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                Add products, connect PayNow, and publish the Home page.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </DocExamplePage>
  )
}
