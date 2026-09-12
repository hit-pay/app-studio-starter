<!-- Generated from content/docs/components/date-picker.mdx. Do not edit. -->

# Date Picker

Date, range, and date-time selection with popover and calendar helpers.

## Interactive example

The interactive example is rendered on the Orchid documentation page. Use the usage guidance below and verify the installed component source for the exact API.

Use `DatePicker`, `DatePickerRange`, or `DateTimePicker`. Do not import `@ui/form/calendar`.

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
