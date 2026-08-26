import { createFileRoute } from '@tanstack/react-router'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Checkbox, CheckboxGroup } from '@/components/ui/checkbox'

export const Route = createFileRoute('/checkbox')({
  component: CheckboxExamplesPage,
})

function CheckboxExamplesPage() {
  return (
    <DocExamplePage to="/checkbox">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Vertical
          </p>
          <CheckboxGroup label="Payment Channels" alignment="Vertical" defaultValue={['paynow']}>
            <Checkbox value="paynow">PayNow</Checkbox>
            <Checkbox value="cards">Cards</Checkbox>
            <Checkbox value="grabpay">GrabPay</Checkbox>
            <Checkbox value="wechat">WeChat Pay</Checkbox>
          </CheckboxGroup>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Horizontal
          </p>
          <CheckboxGroup label="Commerce" alignment="Horizontal" defaultValue={['invoice']}>
            <Checkbox value="invoice">Invoice</Checkbox>
            <Checkbox value="link">Payment Link</Checkbox>
            <Checkbox value="pos">Point of Sale</Checkbox>
          </CheckboxGroup>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            States
          </p>
          <div className="flex flex-col gap-2">
            <Checkbox>Send receipt by email</Checkbox>
            <Checkbox defaultChecked>Collect Customer Data</Checkbox>
            <Checkbox indeterminate>Partial SKU selection</Checkbox>
            <Checkbox error>Missing billing address</Checkbox>
            <Checkbox disabled>PayNow (not available)</Checkbox>
            <Checkbox defaultChecked disabled>
              Cards (locked)
            </Checkbox>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Description
          </p>
          <Checkbox description="Include SKU, quantity, and SGD amount on INV-2026-0842.">
            Attach Product Data
          </Checkbox>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Recurring notifications
          </p>
          <CheckboxGroup label="Alerts" alignment="Vertical" defaultValue={['failed']}>
            <Checkbox value="failed">Failed Recurring charge</Checkbox>
            <Checkbox value="upcoming">Upcoming renewal</Checkbox>
            <Checkbox value="pos">Point of Sale daily summary</Checkbox>
          </CheckboxGroup>
        </div>
      </div>
    </DocExamplePage>
  )
}
