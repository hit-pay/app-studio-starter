import { DatePicker, DatePickerRange, DateTimePicker } from '@/components/date-picker'
import { Label } from '@/components/ui/label'

function DatePickerDemo() {
  return (
    <>
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
            Date and time
          </p>
          <Label>Delivery at</Label>
          <DateTimePicker defaultSelected={new Date(2026, 8, 15, 9, 30)} />
        </div>
      </div>
    </>
  )
}

export { DatePickerDemo }
