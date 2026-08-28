import { createFileRoute } from '@tanstack/react-router'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { DatePicker, DatePickerRange, DateTimePicker } from '@/components/ui/date-picker'
import { Label } from '@/components/ui/label'

export const Route = createFileRoute('/date-picker')({
  component: DatePickerExamplesPage,
})

function DatePickerExamplesPage() {
  return (
    <DocExamplePage
      to="/date-picker"
      usage={`'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

function DatePickerDemo() {
  const [date, setDate] = useState<Date | undefined>()

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            data-empty={!date}
            className={cn(
              'justify-start text-left font-normal',
              'data-[empty=true]:text-oc-muted-foreground',
            )}
          />
        }
      >
        <CalendarIcon data-icon="inline-start" />
        {date ? format(date, 'PPP') : <span>Pick a date</span>}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          className="p-5"
          mode="single"
          selected={date}
          onSelect={setDate}
        />
      </PopoverContent>
    </Popover>
  )
}`}
      extraUsage={[
        {
          title: 'Orchid helper components',
          filename: 'date-picker-helpers.tsx',
          code: `import {
  DatePicker,
  DatePickerRange,
  DateTimePicker,
} from '@/components/ui/date-picker'

<DatePicker placeholder="Invoice due date" />
<DatePickerRange placeholder="Settlement period" />
<DateTimePicker placeholder="Delivery date and time" />`,
        },
      ]}
    >
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
    </DocExamplePage>
  )
}
