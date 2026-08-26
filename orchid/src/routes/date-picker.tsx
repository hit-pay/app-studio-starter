import { createFileRoute } from '@tanstack/react-router'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DatePicker, DatePickerRange } from '@/components/ui/date-picker'

export const Route = createFileRoute('/date-picker')({
  component: DatePickerExamplesPage,
})

function DatePickerExamplesPage() {
  return (
    <DocExamplePage to="/date-picker">
      <div className="space-y-8">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Basic
          </p>
          <DatePicker />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Range
          </p>
          <DatePickerRange
            defaultSelected={{
              from: new Date(2026, 0, 20),
              to: new Date(2026, 1, 9),
            }}
          />
        </div>
      </div>
    </DocExamplePage>
  )
}
