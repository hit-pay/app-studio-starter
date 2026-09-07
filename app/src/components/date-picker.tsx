'use client'

import { useState, type ComponentProps } from 'react'
import {
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
} from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import type { DateRange, Matcher } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

type CaptionLayout = NonNullable<ComponentProps<typeof Calendar>['captionLayout']>

const YEAR_START = new Date(1900, 0)

function yearEnd() {
  return new Date(new Date().getFullYear() + 10, 11)
}

function DatePickerActions({
  onClear,
  onDone,
}: {
  onClear: () => void
  onDone: () => void
}) {
  return (
    <div className="flex justify-end gap-2 border-t border-solid border-oc-border px-3 py-2.5">
      <Button type="button" variant="outline" size="sm" onClick={onClear}>
        Clear
      </Button>
      <Button type="button" size="sm" onClick={onDone}>
        Done
      </Button>
    </div>
  )
}

type DatePickerProps = {
  className?: string
  selected?: Date
  defaultSelected?: Date
  onSelect?: (date: Date | undefined) => void
  disabled?: Matcher | Matcher[]
  placeholder?: string
  captionLayout?: CaptionLayout
  startMonth?: Date
  endMonth?: Date
}

function DatePicker({
  className,
  selected,
  defaultSelected,
  onSelect,
  disabled,
  placeholder = 'Pick a date',
  captionLayout = 'dropdown',
  startMonth = YEAR_START,
  endMonth,
}: DatePickerProps) {
  const [open, setOpen] = useState(false)
  const [uncontrolled, setUncontrolled] = useState<Date | undefined>(defaultSelected)
  const date = selected ?? uncontrolled

  function commit(next: Date | undefined) {
    setUncontrolled(next)
    onSelect?.(next)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            data-empty={!date}
            className={cn(
              'w-full min-w-0 shrink justify-start overflow-hidden text-left font-normal data-[empty=true]:text-oc-muted-foreground',
              className,
            )}
          />
        }
      >
        <CalendarIcon data-icon="inline-start" />
        {date ? (
          <span className="min-w-0 truncate">{format(date, 'PPP')}</span>
        ) : (
          <span className="min-w-0 truncate">{placeholder}</span>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          className="p-5"
          mode="single"
          captionLayout={captionLayout}
          startMonth={startMonth}
          endMonth={endMonth ?? yearEnd()}
          selected={date}
          onSelect={commit}
          disabled={disabled}
        />
        <DatePickerActions onClear={() => commit(undefined)} onDone={() => setOpen(false)} />
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
  captionLayout?: CaptionLayout
  startMonth?: Date
  endMonth?: Date
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
  captionLayout = 'dropdown',
  startMonth = YEAR_START,
  endMonth,
}: DateTimePickerProps) {
  const [open, setOpen] = useState(false)
  const [uncontrolled, setUncontrolled] = useState<Date | undefined>(defaultSelected)
  const date = selected ?? uncontrolled

  function commit(next: Date | undefined) {
    setUncontrolled(next)
    onSelect?.(next)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            data-empty={!date}
            className={cn(
              'w-full min-w-0 shrink justify-start overflow-hidden text-left font-normal data-[empty=true]:text-oc-muted-foreground',
              className,
            )}
          />
        }
      >
        <CalendarIcon data-icon="inline-start" />
        {date ? (
          <span className="min-w-0 truncate">{format(date, 'PPp')}</span>
        ) : (
          <span className="min-w-0 truncate">{placeholder}</span>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          className="p-5"
          mode="single"
          captionLayout={captionLayout}
          startMonth={startMonth}
          endMonth={endMonth ?? yearEnd()}
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
            aria-label="Time"
            value={timeValue(date)}
            disabled={!date}
            onChange={(event) => {
              if (!date) return
              commit(withTime(date, event.target.value))
            }}
          />
        </div>
        <DatePickerActions onClear={() => commit(undefined)} onDone={() => setOpen(false)} />
      </PopoverContent>
    </Popover>
  )
}

const WEEK_STARTS_ON = 1 as const

const RANGE_PRESETS = [
  {
    label: 'Today',
    range: () => {
      const today = startOfDay(new Date())
      return { from: today, to: today }
    },
  },
  {
    label: 'Yesterday',
    range: () => {
      const yesterday = startOfDay(subDays(new Date(), 1))
      return { from: yesterday, to: yesterday }
    },
  },
  {
    label: 'This week',
    range: () => ({
      from: startOfWeek(new Date(), { weekStartsOn: WEEK_STARTS_ON }),
      to: endOfWeek(new Date(), { weekStartsOn: WEEK_STARTS_ON }),
    }),
  },
  {
    label: 'This month',
    range: () => ({
      from: startOfMonth(new Date()),
      to: endOfMonth(new Date()),
    }),
  },
  {
    label: 'Last month',
    range: () => {
      const last = subMonths(new Date(), 1)
      return { from: startOfMonth(last), to: endOfMonth(last) }
    },
  },
] as const

function isSameRange(left?: DateRange, right?: DateRange) {
  if (!left?.from || !left.to || !right?.from || !right.to) return false
  return isSameDay(left.from, right.from) && isSameDay(left.to, right.to)
}

type DatePickerRangeProps = {
  className?: string
  selected?: DateRange
  defaultSelected?: DateRange
  onSelect?: (range: DateRange | undefined) => void
  disabled?: Matcher | Matcher[]
  placeholder?: string
  captionLayout?: CaptionLayout
  startMonth?: Date
  endMonth?: Date
}

function DatePickerRange({
  className,
  selected,
  defaultSelected,
  onSelect,
  disabled,
  placeholder = 'Pick a date',
  captionLayout = 'dropdown',
  startMonth = YEAR_START,
  endMonth,
}: DatePickerRangeProps) {
  const [open, setOpen] = useState(false)
  const [uncontrolled, setUncontrolled] = useState<DateRange | undefined>(defaultSelected)
  const range = selected ?? uncontrolled
  const [visibleMonth, setVisibleMonth] = useState<Date>(range?.from ?? new Date())

  function commit(next: DateRange | undefined) {
    setUncontrolled(next)
    onSelect?.(next)
    if (next?.from) setVisibleMonth(next.from)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            data-empty={!range?.from}
            className={cn(
              'w-full min-w-0 shrink justify-start overflow-hidden text-left font-normal data-[empty=true]:text-oc-muted-foreground',
              className,
            )}
          />
        }
      >
        <CalendarIcon data-icon="inline-start" />
        <span className="min-w-0 truncate">
          {range?.from
            ? range.to
              ? `${format(range.from, 'LLL dd, y')} - ${format(range.to, 'LLL dd, y')}`
              : format(range.from, 'LLL dd, y')
            : placeholder}
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <div className="flex">
          <div className="flex w-36 shrink-0 flex-col gap-0.5 border-r border-solid border-oc-border p-2">
            {RANGE_PRESETS.map((preset) => {
              const next = preset.range()
              const active = isSameRange(range, next)
              return (
                <button
                  key={preset.label}
                  type="button"
                  className={cn(
                    'cursor-pointer rounded-md px-2.5 py-1.5 text-left text-sm font-medium text-oc-foreground',
                    active ? 'bg-oc-primary/10' : 'hover:bg-oc-muted',
                  )}
                  onClick={() => commit(next)}
                >
                  {preset.label}
                </button>
              )
            })}
          </div>
          <div>
            <Calendar
              className="p-5"
              mode="range"
              numberOfMonths={2}
              showOutsideDays
              captionLayout={captionLayout}
              startMonth={startMonth}
              endMonth={endMonth ?? yearEnd()}
              month={visibleMonth}
              onMonthChange={setVisibleMonth}
              selected={range}
              onSelect={commit}
              disabled={disabled}
            />
            <DatePickerActions onClear={() => commit(undefined)} onDone={() => setOpen(false)} />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker, DatePickerRange, DateTimePicker }
export type { DatePickerProps, DatePickerRangeProps, DateTimePickerProps }
