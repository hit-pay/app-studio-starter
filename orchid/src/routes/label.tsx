import { createFileRoute } from '@tanstack/react-router'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export const Route = createFileRoute('/label')({
  component: LabelExamplesPage,
})

function LabelExamplesPage() {
  return (
    <DocExamplePage
      to="/label"
      usage={`import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>`}
    >
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Invoice
        </p>
        <div className="flex items-center gap-2">
          <Checkbox id="gst" defaultChecked />
          <Label htmlFor="gst">Add GST to this invoice</Label>
        </div>
      </div>
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Recurring
        </p>
        <div className="flex items-center gap-2">
          <Checkbox id="auto-charge" />
          <Label htmlFor="auto-charge">Charge the card on file each billing cycle</Label>
        </div>
      </div>
    </DocExamplePage>
  )
}
