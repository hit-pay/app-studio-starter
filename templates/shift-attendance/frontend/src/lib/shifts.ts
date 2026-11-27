import { useCurrentUser } from '@/lib/current-user'

/** Roles that plan shifts and see the timesheet; the backend enforces the same list. */
const MANAGERS = ['Owner', 'Admin', 'Manager']

export function useIsManager(): boolean {
  const { data } = useCurrentUser()
  return MANAGERS.includes(data?.role?.title ?? '')
}

/** Monday 00:00 of the week `date` is in, on this device's clock. */
export function weekStart(date: Date): Date {
  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  start.setDate(start.getDate() - ((start.getDay() + 6) % 7))
  return start
}

export function addDays(date: Date, days: number): Date {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

export function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

/** `YYYY-MM-DD` of a local date, as HitPay's date filters take it. */
export function dayString(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

/** `HH:MM` of an instant on this device's clock, as an `<input type="time">` takes it. */
export function timeString(iso: string): string {
  const date = new Date(iso)
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

/** The instant of `time` (`HH:MM`) on the local `day`. */
export function at(day: Date, time: string): Date {
  const [hours, minutes] = time.split(':').map(Number) as [number, number]
  return new Date(day.getFullYear(), day.getMonth(), day.getDate(), hours, minutes)
}

export function formatDay(date: Date, options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' }): string {
  return new Intl.DateTimeFormat(undefined, options).format(date)
}

export function formatTime(iso: string): string {
  return new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit' }).format(new Date(iso))
}

export function formatRange(startsAt: string, endsAt: string): string {
  return `${formatTime(startsAt)}–${formatTime(endsAt)}`
}

export function formatHours(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  return rest === 0 ? `${hours}h` : `${hours}h ${rest}m`
}

export function formatMoney(amount: number, currency: string | null): string {
  if (!currency) return new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount)
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(amount)
  } catch {
    return `${currency} ${amount.toFixed(2)}`
  }
}
