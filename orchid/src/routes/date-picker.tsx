import { createFileRoute } from '@tanstack/react-router'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DatePicker, DatePickerRange } from '@/components/ui/date-picker'
import { Label } from '@/components/ui/label'

export const Route = createFileRoute('/date-picker')({
  component: DatePickerExamplesPage,
})

function DatePickerExamplesPage() {
  return (
    <DocExamplePage to="/date-picker">
      <div className="space-y-8">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Basic
          </p>
          <Label>Invoice due date</Label>
          <DatePicker />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Range
          </p>
          <p className="text-xs text-oc-muted-foreground">Settlement period for PayNow and Cards</p>
          <DatePickerRange
            defaultSelected={{
              from: new Date(2026, 0, 20),
              to: new Date(2026, 1, 9),
            }}
          />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Payment Link expiry
          </p>
          <Label>Link expires on</Label>
          <DatePicker defaultSelected={new Date(2026, 8, 15)} />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Recurring start
          </p>
          <p className="text-xs text-oc-muted-foreground">First charge window for monthly membership</p>
          <DatePickerRange
            defaultSelected={{
              from: new Date(2026, 8, 1),
              to: new Date(2026, 8, 30),
            }}
          />
        </div>
      </div>
    </DocExamplePage>
  )
}
