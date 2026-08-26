import * as React from 'react'
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
  type Locale,
} from 'react-day-picker'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button, buttonVariants } from './button'

const navButtonClass = buttonVariants({
  type: 'Secondary',
  style: 'Transparent',
  size: 'Small',
  iconOnly: true,
})

function Calendar({
  className,
  classNames,
  showOutsideDays = false,
  captionLayout = 'label',
  locale,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  const defaultClassNames = getDefaultClassNames()
  const isMultipleMonths = (props.numberOfMonths ?? 1) > 1

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        'group/calendar bg-background p-0 [--cell-size:2rem]',
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString(locale?.code, { month: 'short' }),
        formatWeekdayName: (date) =>
          date.toLocaleDateString(locale?.code ?? 'en-US', { weekday: 'short' }).slice(0, 2),
        ...formatters,
      }}
      classNames={{
        root: cn('w-fit', defaultClassNames.root),
        months: cn(
          'relative flex flex-col gap-6',
          isMultipleMonths && 'sm:flex-row',
          defaultClassNames.months,
        ),
        month: cn('flex w-full flex-col gap-6', defaultClassNames.month),
        nav: cn(
          'absolute inset-x-0 top-0 flex items-center gap-2',
          isMultipleMonths ? 'justify-between' : 'justify-end',
          defaultClassNames.nav,
        ),
        button_previous: cn(
          navButtonClass,
          'size-5 p-0 text-foreground select-none aria-disabled:opacity-35',
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          navButtonClass,
          'size-5 p-0 text-foreground select-none aria-disabled:opacity-35',
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          'flex h-8 w-full items-center',
          isMultipleMonths ? 'justify-center px-8' : 'justify-start',
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          'flex h-8 w-full items-center justify-start gap-1 text-sm font-medium',
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn('relative rounded-lg', defaultClassNames.dropdown_root),
        dropdown: cn('absolute inset-0 bg-background opacity-0', defaultClassNames.dropdown),
        caption_label: cn(
          'text-sm font-medium text-foreground select-none',
          captionLayout === 'label'
            ? ''
            : 'flex items-center gap-1 rounded-lg [&>svg]:size-3.5 [&>svg]:text-muted-foreground',
          defaultClassNames.caption_label,
        ),
        month_grid: cn('w-full border-collapse', defaultClassNames.month_grid),
        weekdays: cn('flex', defaultClassNames.weekdays),
        weekday: cn(
          'size-8 text-xs font-medium text-foreground select-none',
          defaultClassNames.weekday,
        ),
        week: cn('mt-2 flex w-full', defaultClassNames.week),
        week_number_header: cn('w-8 select-none', defaultClassNames.week_number_header),
        week_number: cn(
          'text-xs text-muted-foreground select-none',
          defaultClassNames.week_number,
        ),
        day: cn(
          'group/day relative size-8 p-0 text-center select-none',
          defaultClassNames.day,
        ),
        range_start: cn(
          'relative after:absolute after:inset-y-0 after:left-1/2 after:right-0 after:bg-primary/10 [&.rdp-range_start.rdp-range_end]:after:hidden',
          defaultClassNames.range_start,
        ),
        range_middle: cn('bg-primary/10', defaultClassNames.range_middle),
        range_end: cn(
          'relative after:absolute after:inset-y-0 after:left-0 after:right-1/2 after:bg-primary/10 [&.rdp-range_start.rdp-range_end]:after:hidden',
          defaultClassNames.range_end,
        ),
        today: cn('text-foreground', defaultClassNames.today),
        outside: cn('text-muted-foreground opacity-35', defaultClassNames.outside),
        disabled: cn('text-foreground opacity-35', defaultClassNames.disabled),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === 'left') {
            return <ChevronLeftIcon className={cn('size-5', className)} {...props} />
          }

          if (orientation === 'right') {
            return <ChevronRightIcon className={cn('size-5', className)} {...props} />
          }

          return <ChevronDownIcon className={cn('size-4', className)} {...props} />
        },
        DayButton: ({ ...props }) => <CalendarDayButton locale={locale} {...props} />,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-8 items-center justify-center text-center">{children}</div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  type: _type,
  style: _style,
  ...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <Button
      {...props}
      htmlType="button"
      type="Secondary"
      style="Transparent"
      size="Small"
      iconOnly
      shape="Circle"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        'relative isolate z-10 size-8 min-w-8 rounded-full border-0 p-0 text-sm font-normal text-foreground hover:bg-primary/10',
        'data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[selected-single=true]:hover:bg-primary',
        'data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-start=true]:hover:bg-primary',
        'data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-end=true]:hover:bg-primary',
        'data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-transparent data-[range-middle=true]:text-foreground data-[range-middle=true]:hover:bg-transparent',
        defaultClassNames.day,
        className,
      )}
    />
  )
}

export { Calendar, CalendarDayButton }
