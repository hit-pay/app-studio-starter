import { createFileRoute } from '@tanstack/react-router'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Radio, RadioGroup } from '@/components/ui/radio-group'

export const Route = createFileRoute('/radio-group')({
  component: RadioGroupExamplesPage,
})

function RadioGroupExamplesPage() {
  return (
    <DocExamplePage to="/radio-group">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Vertical
          </p>
          <RadioGroup label="Payment Channel" alignment="Vertical" defaultValue="paynow">
            <Radio value="paynow">PayNow</Radio>
            <Radio value="cards">Cards</Radio>
            <Radio value="link">Payment Link</Radio>
            <Radio value="pos">Point of Sale</Radio>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Horizontal
          </p>
          <RadioGroup label="Currency" alignment="Horizontal" defaultValue="sgd">
            <Radio value="sgd">SGD</Radio>
            <Radio value="usd">USD</Radio>
            <Radio value="myr">MYR</Radio>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            States
          </p>
          <RadioGroup defaultValue="active">
            <Radio value="default">Draft invoice</Radio>
            <Radio value="active">Sent</Radio>
            <Radio value="error" error>
              Failed PayNow
            </Radio>
            <Radio value="disabled" disabled>
              Voided
            </Radio>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Description
          </p>
          <RadioGroup defaultValue="invoice">
            <Radio
              value="invoice"
              description="Create INV-2026-0842 and email it to the customer."
            >
              Invoice
            </Radio>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Recurring interval
          </p>
          <RadioGroup label="Billing cycle" alignment="Vertical" defaultValue="monthly">
            <Radio value="weekly">Weekly</Radio>
            <Radio value="monthly">Monthly</Radio>
            <Radio value="yearly">Yearly</Radio>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Storefront
          </p>
          <RadioGroup label="Sell from" defaultValue="online-store">
            <Radio value="online-store" description="Publish SKUs on your Online Store.">
              Online Store
            </Radio>
            <Radio value="pos" description="Charge SGD at the counter.">
              Point of Sale
            </Radio>
          </RadioGroup>
        </div>
      </div>
    </DocExamplePage>
  )
}
