import type { ChecklistKind } from 'backend'

import { useCurrentUser } from '@/lib/current-user'

/** Roles that manage checklists; the backend enforces the same list. */
const MANAGERS = ['Owner', 'Admin', 'Manager']

export function useIsManager(): boolean {
  const { data } = useCurrentUser()
  return MANAGERS.includes(data?.role?.title ?? '')
}

/** Today on this device, as `YYYY-MM-DD`: the business's day, not the server's. */
export function todayDate(): string {
  return toDate(new Date())
}

export function toDate(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

/** A `YYYY-MM-DD` day as a local Date, for the date pickers. */
export function fromDate(date: string): Date {
  const [year, month, dayOfMonth] = date.split('-').map(Number) as [number, number, number]
  return new Date(year, month - 1, dayOfMonth)
}

export function addDays(date: string, days: number): string {
  const day = fromDate(date)
  day.setDate(day.getDate() + days)
  return toDate(day)
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat(undefined, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }).format(fromDate(date))
}

export function itemCount(count: number): string {
  return count === 1 ? '1 item' : `${count} items`
}

export function formatTime(iso: string): string {
  return new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit' }).format(new Date(iso))
}

export function formatMoney(amount: number, currency: string | null): string {
  if (!currency) return amount.toFixed(2)
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(amount)
  } catch {
    return `${currency} ${amount.toFixed(2)}`
  }
}

export const KIND_LABEL: Record<ChecklistKind, string> = { opening: 'Opening', closing: 'Closing', other: 'Other' }
