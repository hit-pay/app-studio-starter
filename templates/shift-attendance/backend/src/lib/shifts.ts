import { HttpError } from './app.ts'
import type { Host } from './host.ts'
import { listIntegrations } from './integrations.ts'
import type { RoleTitle, Staff, User } from './types.ts'

// What the Shift & Attendance app stores, as the API returns it, and the helpers its routes share. Times are ISO
// 8601 instants: the browser turns its local week into instants, so a shift follows the business's clock.

/** Roles that plan shifts, approve swaps and see the timesheet. Everyone else sees the roster and clocks in. */
export const MANAGERS: RoleTitle[] = ['Owner', 'Admin', 'Manager']

/** Clocking in this long after a shift starts counts as late. */
export const LATE_AFTER_MINUTES = 5

export type Shift = {
  id: string
  locationId: string
  staffId: string
  staffName: string
  startsAt: string
  endsAt: string
  breakMinutes: number
  note: string | null
  inCalendar: boolean
}

export type Attendance = {
  id: string
  staffId: string
  staffName: string
  locationId: string
  shiftId: string | null
  clockInAt: string
  clockOutAt: string | null
  note: string | null
}

export type SwapStatus = 'pending' | 'approved' | 'rejected' | 'cancelled'

export type SwapRequest = {
  id: string
  shiftId: string
  shift: Pick<Shift, 'locationId' | 'startsAt' | 'endsAt'> | null
  fromStaffId: string
  fromStaffName: string
  toStaffId: string
  toStaffName: string
  reason: string | null
  status: SwapStatus
  decidedByName: string | null
  decidedAt: string | null
  createdAt: string
}

export type PayRate = { staffId: string; hourlyRate: number; commissionPercent: number }

export type TimesheetRow = {
  staffId: string
  staffName: string
  scheduledMinutes: number
  workedMinutes: number
  overtimeMinutes: number
  lateCount: number
  missedShifts: number
  hourlyRate: number
  commissionPercent: number
  pay: number
}

export function isManager(user: User): boolean {
  return (MANAGERS as readonly string[]).includes(user.role?.title ?? '')
}

export function displayName(user: User): string {
  return user.name?.trim() || user.email
}

/** An ISO 8601 instant from the browser, normalised to UTC. */
export function instant(value: unknown, field: string): string {
  const time = typeof value === 'string' ? Date.parse(value) : Number.NaN
  if (Number.isNaN(time)) throw new HttpError(400, `${field} must be a date and time.`)
  return new Date(time).toISOString()
}

export function minutesBetween(from: string, to: string): number {
  return Math.max(0, Math.round((Date.parse(to) - Date.parse(from)) / 60_000))
}

/** The business's staff who can use this app, by id. A staff id is the HitPay user id. */
export async function staffById(host: Host): Promise<Map<string, Staff>> {
  const { members } = await host.get<{ members: Staff[] }>('/staff-app-members')
  return new Map(members.map((member) => [member.id, member]))
}

export function staffName(staff: Staff | undefined, fallback = 'Unknown staff'): string {
  return staff?.name?.trim() || fallback
}

/**
 * Whether the owner allowed `key` for this app and it is connected. A route checks this before calling the
 * integration, so the page can show "Waiting for access" instead of an error.
 */
export async function integrationReady(host: Host, key: string): Promise<boolean> {
  const { integrations } = await listIntegrations(host)
  const integration = integrations.find((item) => item.key === key)
  return integration?.status === 'granted' && integration.connected && !integration.needs_reconnect
}
