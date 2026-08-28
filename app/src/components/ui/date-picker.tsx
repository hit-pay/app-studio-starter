import { useState } from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import type { DateRange, Matcher } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button } from './button'
import { Calendar } from './calendar'
import { Input } from './input'
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

type DateTimePickerProps = {
  className?: string
  selected?: Date
  defaultSelected?: Date
  onSelect?: (date: Date | undefined) => void
  disabled?: Matcher | Matcher[]
  placeholder?: string
}

function timeValue(date: Date | undefined) {
  if (!date) return '00:00'
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

function withTime(date: Date, time: string) {
  const [hours, minutes] = time.split(':').map(Number)
  const next = new Date(date)
  next.setHours(hours || 0, minutes || 0, 0, 0)
  return next
}

function DateTimePicker({
  className,
  selected,
  defaultSelected,
  onSelect,
  disabled,
  placeholder = 'Pick date and time',
}: DateTimePickerProps) {
  const [uncontrolled, setUncontrolled] = useState<Date | undefined>(defaultSelected)
  const date = selected ?? uncontrolled

  function commit(next: Date | undefined) {
    setUncontrolled(next)
    onSelect?.(next)
  }

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
        <span className="min-w-0 truncate">{date ? format(date, 'PPp') : placeholder}</span>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden rounded-sm p-0" align="start">
        <Calendar
          className="p-5"
          mode="single"
          selected={date}
          onSelect={(next) => {
            if (!next) {
              commit(undefined)
              return
            }
            commit(date ? withTime(next, timeValue(date)) : withTime(next, '09:00'))
          }}
          disabled={disabled}
        />
        <div className="border-t border-solid border-oc-border p-3">
          <Input
            type="time"
            value={timeValue(date)}
            disabled={!date}
            onChange={(event) => {
              if (!date) return
              commit(withTime(date, event.target.value))
            }}
          />
        </div>
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

export { DatePicker, DatePickerRange, DateTimePicker }
export type { DatePickerProps, DatePickerRangeProps, DateTimePickerProps }
