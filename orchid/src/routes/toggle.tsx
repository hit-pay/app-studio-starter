import { createFileRoute } from '@tanstack/react-router'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Label } from '@/components/ui/label'
import { Toggle } from '@/components/ui/toggle'

export const Route = createFileRoute('/toggle')({
  component: ToggleExamplesPage,
})

function ToggleRow({
  id,
  label,
  defaultChecked,
  disabled,
  size,
}: {
  id: string
  label: string
  defaultChecked?: boolean
  disabled?: boolean
  size?: 'Default' | 'Small'
}) {
  return (
    <div className="flex items-center gap-3">
      <Toggle
        id={id}
        size={size}
        defaultChecked={defaultChecked}
        disabled={disabled}
      />
      <Label htmlFor={id}>{label}</Label>
    </div>
  )
}

function ToggleExamplesPage() {
  return (
    <DocExamplePage to="/toggle">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Default
          </p>
          <div className="flex items-center gap-4">
            <Toggle />
            <Toggle defaultChecked />
            <Toggle disabled />
            <Toggle defaultChecked disabled />
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Small
          </p>
          <div className="flex items-center gap-4">
            <Toggle size="Small" />
            <Toggle size="Small" defaultChecked />
            <Toggle size="Small" disabled />
            <Toggle size="Small" defaultChecked disabled />
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Payment Channels
          </p>
          <div className="flex flex-col gap-3">
            <ToggleRow id="paynow" label="Accept PayNow" defaultChecked />
            <ToggleRow id="cards" label="Accept Cards" defaultChecked />
            <ToggleRow id="wechat" label="Accept WeChat Pay" />
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Commerce
          </p>
          <div className="flex flex-col gap-3">
            <ToggleRow id="recurring" label="Enable Recurring billing" defaultChecked />
            <ToggleRow id="store" label="Publish Online Store" defaultChecked />
            <ToggleRow id="pos" label="Point of Sale tips" size="Small" defaultChecked />
          </div>
        </div>
      </div>
    </DocExamplePage>
  )
}
