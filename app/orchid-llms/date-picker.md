<!-- Generated from content/docs/components/date-picker.mdx. Do not edit. -->

# Date Picker

Date, range, and date-time selection with popover and calendar helpers.

## Example

```tsx
import { DatePicker, DatePickerRange, DateTimePicker } from '@/components/form/date-picker'
import { Label } from '@ui/form/label'

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
            Date of birth
          </p>
          <Label>Date of birth</Label>
          <DatePicker
            placeholder="Select date"
            defaultSelected={new Date(1994, 5, 15)}
            startMonth={new Date(1900, 0)}
            endMonth={new Date()}
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
```

## Variants

```tsx
import {
  DatePicker,
  DatePickerRange,
  DateTimePicker,
} from '@/components/form/date-picker'

<DatePicker placeholder="Invoice due date" />
<DatePickerRange placeholder="Settlement period" />
<DateTimePicker placeholder="Delivery date and time" />
```

Click the month/year caption to open a month grid. Click the year in that panel to jump by 12-year pages. Default is `captionLayout="dropdown"`; use `captionLayout="label"` for chevrons only. `startMonth` / `endMonth` limit the range (default 1900 through current year + 10). Use **Clear** to reset the value and **Done** to close the picker. Range pickers include left-side shortcuts: Today, Yesterday, This week, This month, and Last month.
