import { createFileRoute } from '@tanstack/react-router'
import { CreditCardIcon, LinkIcon, RepeatIcon, StoreIcon } from 'lucide-react'
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Chip } from '@/components/ui/chip'
import { DocExamplePage } from '@/components/doc/doc-example-page'

export const Route = createFileRoute('/accordion')({
  component: AccordionExamplesPage,
})

const INVOICE_PANEL = (
  <>
    <p className="font-medium">INV-2048 · Priya Nair</p>
    <p className="mt-4">
      Invoice for 2× Matcha Latte (SKU-TEA-12) and 1× Croissant. Amount SGD 128.00. PayNow and Cards
      enabled. Due 3 Sep 2026.
    </p>
  </>
)

const CHANNEL_PANEL = (
  <>
    <p className="font-medium">Singapore payment channels</p>
    <p className="mt-4">
      PayNow, Cards, GrabPay, and WeChat Pay are available for this business. Settlement is in SGD.
    </p>
  </>
)

function AccordionExamplesPage() {
  return (
    <DocExamplePage to="/accordion">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Default / Open
          </p>
          <Accordion defaultValue={['open']}>
            <AccordionItem value="a">
              <AccordionTrigger title="Invoice details" />
              <AccordionPanel>{INVOICE_PANEL}</AccordionPanel>
            </AccordionItem>
            <AccordionItem value="b">
              <AccordionTrigger title="Customer data" />
              <AccordionPanel>
                <p className="font-medium">Priya Nair</p>
                <p className="mt-4">
                  Billing email priya.nair@example.com. Default method Cards. Last paid INV-1988 via
                  PayNow.
                </p>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value="open">
              <AccordionTrigger title="Payment channels" />
              <AccordionPanel>{CHANNEL_PANEL}</AccordionPanel>
            </AccordionItem>
            <AccordionItem value="c">
              <AccordionTrigger title="Product data" />
              <AccordionPanel>
                <p className="font-medium">SKU-TEA-12 · Matcha Latte</p>
                <p className="mt-4">Unit price SGD 8.50. 24 in stock for Online Store and POS.</p>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Description, label, icon, progress
          </p>
          <Accordion>
            <AccordionItem value="desc">
              <AccordionTrigger
                title="Payment Link"
                description="Share a link for one-off SGD payments"
              />
              <AccordionPanel>
                <p className="font-medium">Weekend brunch link</p>
                <p className="mt-4">Amount SGD 48.00. Channels: PayNow, GrabPay, Cards.</p>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value="label">
              <AccordionTrigger
                title="Recurring"
                label={
                  <Chip color="Purple" type="Background">
                    New
                  </Chip>
                }
              />
              <AccordionPanel>
                <p className="font-medium">Alex Turner · monthly plan</p>
                <p className="mt-4">SGD 29.00 every month on Cards. Next charge 1 Sep 2026.</p>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value="icon">
              <AccordionTrigger title="Point of Sale" leading={<CreditCardIcon />} />
              <AccordionPanel>
                <p className="font-medium">Terminal HP-POS-04</p>
                <p className="mt-4">Last sale SGD 24.50 via GrabPay. Terminal is online.</p>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value="progress">
              <AccordionTrigger
                title="Online Store setup"
                progress={{ label: '2/5 completed', value: 0.4 }}
              />
              <AccordionPanel>
                <p className="font-medium">Remaining steps</p>
                <p className="mt-4">Add products, connect PayNow, and publish the Home page.</p>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Commerce features
        </p>
        <Accordion>
          <AccordionItem value="invoice">
            <AccordionTrigger title="Invoice" leading={<LinkIcon />} description="INV-2048 overdue" />
            <AccordionPanel>{INVOICE_PANEL}</AccordionPanel>
          </AccordionItem>
          <AccordionItem value="recurring">
            <AccordionTrigger title="Recurring" leading={<RepeatIcon />} description="3 active plans" />
            <AccordionPanel>
              <p className="font-medium">Active subscriptions</p>
              <p className="mt-4">Alex Turner and two other customers billed monthly in SGD.</p>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="store">
            <AccordionTrigger title="Online Store" leading={<StoreIcon />} description="Published" />
            <AccordionPanel>
              <p className="font-medium">Home page live</p>
              <p className="mt-4">Last updated 20 Aug 2026. Checkout accepts PayNow and Cards.</p>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </DocExamplePage>
  )
}
