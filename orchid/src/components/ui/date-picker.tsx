import { useState } from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import type { DateRange, Matcher } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button } from './button'
import { Calendar } from './calendar'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

type DatePickerProps = {
  className?: string
  selected?: Date
  defaultSelected?: Date
  onSelect?: (date: Date | undefined) => void
  disabled?: Matcher | Matcher[]
  placeholder?: string
}

function DatePicker({
  className,
  selected,
  defaultSelected,
  onSelect,
  disabled,
  placeholder = 'Pick a date',
}: DatePickerProps) {
  const [uncontrolled, setUncontrolled] = useState<Date | undefined>(defaultSelected)
  const date = selected ?? uncontrolled

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="Secondary"
            style="Border"
            data-empty={!date}
            className={cn(
              'w-full min-w-0 shrink justify-start overflow-hidden text-left font-normal data-[empty=true]:text-oc-muted-foreground',
              className,
            )}
          />
        }
      >
        <CalendarIcon />
        <span className="min-w-0 truncate">{date ? format(date, 'PPP') : placeholder}</span>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden rounded-sm p-0" align="start">
        <Calendar
          className="p-5"
          mode="single"
          selected={date}
          onSelect={(next) => {
            setUncontrolled(next)
            onSelect?.(next)
          }}
          disabled={disabled}
        />
      </PopoverContent>
    </Popover>
  )
}

type DatePickerRangeProps = {
  className?: string
  selected?: DateRange
  defaultSelected?: DateRange
  onSelect?: (range: DateRange | undefined) => void
  disabled?: Matcher | Matcher[]
  placeholder?: string
}

function DatePickerRange({
  className,
  selected,
  defaultSelected,
  onSelect,
  disabled,
  placeholder = 'Pick a date',
}: DatePickerRangeProps) {
  const [uncontrolled, setUncontrolled] = useState<DateRange | undefined>(defaultSelected)
  const range = selected ?? uncontrolled

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="Secondary"
            style="Border"
            data-empty={!range?.from}
            className={cn(
              'w-full min-w-0 shrink justify-start overflow-hidden text-left font-normal data-[empty=true]:text-oc-muted-foreground',
              className,
            )}
          />
        }
      >
        <CalendarIcon />
        <span className="min-w-0 truncate">
          {range?.from
            ? range.to
              ? `${format(range.from, 'LLL dd, y')} - ${format(range.to, 'LLL dd, y')}`
              : format(range.from, 'LLL dd, y')
            : placeholder}
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden rounded-sm p-0" align="start">
        <Calendar
          className="p-5"
          mode="range"
          numberOfMonths={2}
          showOutsideDays
          defaultMonth={range?.from}
          selected={range}
          onSelect={(next) => {
            setUncontrolled(next)
            onSelect?.(next)
          }}
          disabled={disabled}
        />
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker, DatePickerRange }
export type { DatePickerProps, DatePickerRangeProps }
