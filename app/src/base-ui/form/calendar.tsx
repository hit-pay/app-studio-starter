'use client'

import * as React from 'react'
import {
  DayPicker,
  getDefaultClassNames,
  useDayPicker,
  type DayButton,
  type Locale,
  type MonthCaptionProps,
} from 'react-day-picker'
import {
  DownRegular,
  LeftRegular,
  RightRegular,
} from '@mingcute/react/core-regular'

import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/base-ui/actions/button'

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  locale,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant']
}) {
  const defaultClassNames = getDefaultClassNames()
  const isMultipleMonths = (props.numberOfMonths ?? 1) > 1

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        'group/calendar bg-oc-background p-0 [--cell-size:2rem]',
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout === 'dropdown' ? 'label' : captionLayout}
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
          buttonVariants({ variant: buttonVariant, size: 'icon-xs' }),
          'size-5 min-w-5 p-0 text-oc-foreground select-none aria-disabled:opacity-35',
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant, size: 'icon-xs' }),
          'size-5 min-w-5 p-0 text-oc-foreground select-none aria-disabled:opacity-35',
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          'relative flex h-8 w-full items-center',
          isMultipleMonths ? 'justify-center px-8' : 'justify-start',
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          'flex h-8 w-full items-center justify-start gap-2 text-sm font-medium',
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          'relative rounded-md border border-solid border-oc-border bg-oc-background px-1.5 has-focus-visible:border-oc-ring',
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn(
          'absolute inset-0 cursor-pointer opacity-0',
          defaultClassNames.dropdown,
        ),
        caption_label: cn(
          'text-sm font-medium text-oc-foreground select-none',
          captionLayout === 'label'
            ? ''
            : 'flex items-center gap-1 [&>svg]:size-3.5 [&>svg]:text-oc-muted-foreground',
          defaultClassNames.caption_label,
        ),
        month_grid: cn('w-full border-collapse', defaultClassNames.month_grid),
        weekdays: cn('flex', defaultClassNames.weekdays),
        weekday: cn(
          'size-8 text-xs font-medium text-oc-foreground select-none',
          defaultClassNames.weekday,
        ),
        week: cn('mt-2 flex w-full', defaultClassNames.week),
        week_number_header: cn('w-8 select-none', defaultClassNames.week_number_header),
        week_number: cn(
          'text-xs text-oc-muted-foreground select-none',
          defaultClassNames.week_number,
        ),
        day: cn(
          'group/day relative size-8 p-0 text-center select-none',
          defaultClassNames.day,
        ),
        range_start: cn(
          'relative after:absolute after:inset-y-0 after:left-1/2 after:right-0 after:bg-oc-primary/10 [&.rdp-range_start.rdp-range_end]:after:hidden',
          defaultClassNames.range_start,
        ),
        range_middle: cn('bg-oc-primary/10', defaultClassNames.range_middle),
        range_end: cn(
          'relative after:absolute after:inset-y-0 after:left-0 after:right-1/2 after:bg-oc-primary/10 [&.rdp-range_start.rdp-range_end]:after:hidden',
          defaultClassNames.range_end,
        ),
        today: cn('text-oc-foreground', defaultClassNames.today),
        outside: cn('text-oc-muted-foreground opacity-35', defaultClassNames.outside),
        disabled: cn('text-oc-foreground opacity-35', defaultClassNames.disabled),
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
            return <LeftRegular className={cn('size-5', className)} {...props} />
          }

          if (orientation === 'right') {
            return <RightRegular className={cn('size-5', className)} {...props} />
          }

          return <DownRegular className={cn('size-4', className)} {...props} />
        },
        DayButton: ({ ...props }) => <CalendarDayButton locale={locale} {...props} />,
        ...(captionLayout === 'dropdown' ? { MonthCaption: CalendarMonthCaption } : {}),
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

const YEAR_PAGE_SIZE = 12

function startOfYearPage(year: number) {
  return Math.floor(year / YEAR_PAGE_SIZE) * YEAR_PAGE_SIZE
}

function monthShortNames(locale?: Partial<Locale>) {
  return Array.from({ length: 12 }, (_, month) =>
    new Date(2026, month, 1).toLocaleString(locale?.code ?? 'en-US', { month: 'short' }),
  )
}

function CalendarMonthCaption({
  calendarMonth,
  displayIndex,
  className,
  ...props
}: MonthCaptionProps) {
  const { goToMonth, dayPickerProps, formatters } = useDayPicker()
  const locale = dayPickerProps.locale as Partial<Locale> | undefined
  const startMonth = dayPickerProps.startMonth
  const endMonth = dayPickerProps.endMonth
  const [open, setOpen] = React.useState(false)
  const [view, setView] = React.useState<'months' | 'years'>('months')
  const [viewYear, setViewYear] = React.useState(calendarMonth.date.getFullYear())
  const rootRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!open) {
      setView('months')
      setViewYear(calendarMonth.date.getFullYear())
    }
  }, [calendarMonth.date, open])

  React.useEffect(() => {
    if (!open) return

    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const displayed = calendarMonth.date
  const yearPageStart = startOfYearPage(viewYear)
  const yearPageEnd = yearPageStart + YEAR_PAGE_SIZE - 1
  const minYear = startMonth?.getFullYear()
  const maxYear = endMonth?.getFullYear()

  function isMonthDisabled(month: number) {
    const first = new Date(viewYear, month, 1)
    const last = new Date(viewYear, month + 1, 0)
    if (startMonth && last < new Date(startMonth.getFullYear(), startMonth.getMonth(), 1)) {
      return true
    }
    if (endMonth && first > new Date(endMonth.getFullYear(), endMonth.getMonth(), 1)) {
      return true
    }
    return false
  }

  function isYearDisabled(year: number) {
    if (minYear !== undefined && year < minYear) return true
    if (maxYear !== undefined && year > maxYear) return true
    return false
  }

  const canPrevYear = minYear === undefined || viewYear - 1 >= minYear
  const canNextYear = maxYear === undefined || viewYear + 1 <= maxYear
  const canPrevYearPage = minYear === undefined || yearPageStart - 1 >= minYear
  const canNextYearPage = maxYear === undefined || yearPageEnd + 1 <= maxYear

  return (
    <div
      ref={rootRef}
      className={cn(
        'relative flex h-8 items-center [&_button]:cursor-pointer [&_button:disabled]:cursor-not-allowed',
        className,
      )}
      data-display-index={displayIndex}
      {...props}
    >
      <button
        type="button"
        className="rounded-md text-sm font-medium text-oc-foreground select-none hover:text-oc-primary"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((current) => !current)}
      >
        {formatters.formatCaption(displayed, { locale: locale as Locale | undefined })}
      </button>
      {open ? (
        <div
          role="dialog"
          aria-label="Select month and year"
          className="absolute top-[calc(100%+0.375rem)] left-0 z-50 w-56 rounded-lg border border-solid border-oc-border bg-oc-background p-2.5 shadow-oc-popup"
        >
          <div className="relative mb-1.5 h-0 w-full">
            <span className="absolute -top-3.5 left-6 size-2.5 rotate-45 border-t border-l border-solid border-oc-border bg-oc-background" />
          </div>
          <div className="mb-2 flex items-center justify-between gap-1">
            <button
              type="button"
              className="inline-flex size-7 items-center justify-center rounded-md text-oc-foreground disabled:opacity-35"
              disabled={view === 'months' ? !canPrevYear : !canPrevYearPage}
              aria-label={view === 'months' ? 'Previous year' : 'Previous years'}
              onClick={() =>
                setViewYear((year) =>
                  view === 'months' ? year - 1 : year - YEAR_PAGE_SIZE,
                )
              }
            >
              <LeftRegular className="size-4" />
            </button>
            {view === 'months' ? (
              <button
                type="button"
                className="rounded-md px-2 py-0.5 text-sm font-semibold text-oc-foreground hover:bg-oc-muted"
                onClick={() => setView('years')}
              >
                {viewYear}
              </button>
            ) : (
              <button
                type="button"
                className="rounded-md border border-solid border-oc-primary px-2 py-0.5 text-sm font-semibold text-oc-foreground"
                onClick={() => setView('months')}
              >
                {yearPageStart} - {yearPageEnd}
              </button>
            )}
            <button
              type="button"
              className="inline-flex size-7 items-center justify-center rounded-md text-oc-foreground disabled:opacity-35"
              disabled={view === 'months' ? !canNextYear : !canNextYearPage}
              aria-label={view === 'months' ? 'Next year' : 'Next years'}
              onClick={() =>
                setViewYear((year) =>
                  view === 'months' ? year + 1 : year + YEAR_PAGE_SIZE,
                )
              }
            >
              <RightRegular className="size-4" />
            </button>
          </div>
          {view === 'months' ? (
            <div className="grid grid-cols-3 gap-1">
              {monthShortNames(locale).map((label, month) => {
                const selected =
                  displayed.getFullYear() === viewYear && displayed.getMonth() === month
                const disabled = isMonthDisabled(month)
                return (
                  <button
                    key={label}
                    type="button"
                    disabled={disabled}
                    className={cn(
                      'h-8 rounded-md text-sm font-medium text-oc-foreground hover:bg-oc-primary/10 focus-visible:border focus-visible:border-solid focus-visible:border-oc-primary',
                      selected && 'bg-oc-primary/10',
                      disabled && 'text-oc-muted-foreground opacity-50',
                    )}
                    onClick={() => {
                      goToMonth(new Date(viewYear, month, 1))
                      setOpen(false)
                    }}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-1">
              {Array.from({ length: YEAR_PAGE_SIZE }, (_, index) => yearPageStart + index).map(
                (year) => {
                  const selected = displayed.getFullYear() === year
                  const disabled = isYearDisabled(year)
                  return (
                    <button
                      key={year}
                      type="button"
                      disabled={disabled}
                      className={cn(
                        'h-8 rounded-md text-sm font-medium text-oc-foreground hover:bg-oc-primary/10 focus-visible:border focus-visible:border-solid focus-visible:border-oc-primary',
                        selected && 'bg-oc-primary/10',
                        disabled && 'text-oc-muted-foreground opacity-50',
                      )}
                      onClick={() => {
                        setViewYear(year)
                        setView('months')
                      }}
                    >
                      {year}
                    </button>
                  )
                },
              )}
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
  const defaultClassNames = getDefaultClassNames()
  const ref = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
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
        'relative isolate z-10 size-8 min-w-8 rounded-full border-0 p-0 text-sm font-normal text-oc-foreground hover:bg-oc-primary/10',
        'data-[selected-single=true]:bg-oc-primary data-[selected-single=true]:text-oc-primary-foreground data-[selected-single=true]:hover:bg-oc-primary',
        'data-[range-start=true]:bg-oc-primary data-[range-start=true]:text-oc-primary-foreground data-[range-start=true]:hover:bg-oc-primary',
        'data-[range-end=true]:bg-oc-primary data-[range-end=true]:text-oc-primary-foreground data-[range-end=true]:hover:bg-oc-primary',
        'data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-transparent data-[range-middle=true]:text-oc-foreground data-[range-middle=true]:hover:bg-transparent',
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
