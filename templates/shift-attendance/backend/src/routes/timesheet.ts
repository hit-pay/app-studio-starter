import { HttpError, json, route } from '../lib/app.ts'
import { db } from '../lib/db.ts'
import { IntegrationError, nangoRequest } from '../lib/integrations.ts'
import type { Host } from '../lib/host.ts'
import { BREAK_AFTER_MINUTES, integrationReady, LATE_AFTER_MINUTES, MANAGERS, minutesBetween, staffById, staffName, type TimesheetRow } from '../lib/shifts.ts'
import { jsonBody, optionalString } from '../lib/validate.ts'
import { toAttendance } from './attendance.ts'
import { range, shiftsBetween } from './shifts.ts'
import { payRates } from './team.ts'

// The timesheet: per staff member, the planned and worked minutes of a period, late arrivals, missed shifts and
// the pay they come to; plus each one's HitPay sales and commission.

/** Builds the timesheet for shifts and clock-ins in [from, to), optionally at one location. */
export async function timesheet(host: Host, from: string, to: string, locationId: string | null): Promise<TimesheetRow[]> {
  const [shifts, attendanceRows, staff, rates] = await Promise.all([
    shiftsBetween(from, to, locationId),
    db.execute({
      sql: `SELECT * FROM attendance WHERE clock_in_at >= ? AND clock_in_at < ?${locationId ? ' AND location_id = ?' : ''}`,
      args: locationId ? [from, to, locationId] : [from, to],
    }),
    staffById(host),
    payRates(),
  ])
  const attendance = attendanceRows.rows.map((row) => toAttendance(row as Record<string, unknown>))
  const shiftById = new Map(shifts.map((shift) => [shift.id, shift]))
  const attended = new Set(attendance.flatMap((item) => (item.shiftId ? [item.shiftId] : [])))
  const now = new Date().toISOString()

  const rows = new Map<string, TimesheetRow>()
  const row = (staffId: string, fallbackName: string) => {
    let found = rows.get(staffId)
    if (!found) {
      const rate = rates.get(staffId)
      found = {
        staffId,
        staffName: staffName(staff.get(staffId), fallbackName),
        scheduledMinutes: 0,
        workedMinutes: 0,
        overtimeMinutes: 0,
        lateCount: 0,
        missedShifts: 0,
        hourlyRate: rate?.hourlyRate ?? 0,
        commissionPercent: rate?.commissionPercent ?? 0,
        pay: 0,
      }
      rows.set(staffId, found)
    }
    return found
  }

  for (const shift of shifts) {
    const entry = row(shift.staffId, shift.staffName)
    entry.scheduledMinutes += Math.max(0, minutesBetween(shift.startsAt, shift.endsAt) - shift.breakMinutes)
    if (shift.endsAt < now && !attended.has(shift.id)) entry.missedShifts++
  }
  for (const item of attendance) {
    const entry = row(item.staffId, item.staffName)
    const shift = item.shiftId ? shiftById.get(item.shiftId) : undefined
    // Someone still clocked in counts up to now. A short stint keeps all its minutes: the break is only taken off
    // once they worked long enough to have had it.
    const clocked = minutesBetween(item.clockInAt, item.clockOutAt ?? now)
    entry.workedMinutes += clocked >= BREAK_AFTER_MINUTES ? Math.max(0, clocked - (shift?.breakMinutes ?? 0)) : clocked
    if (shift && Date.parse(item.clockInAt) - Date.parse(shift.startsAt) > LATE_AFTER_MINUTES * 60_000) entry.lateCount++
  }
  for (const entry of rows.values()) {
    entry.overtimeMinutes = Math.max(0, entry.workedMinutes - entry.scheduledMinutes)
    entry.pay = Math.round((entry.workedMinutes / 60) * entry.hourlyRate * 100) / 100
  }
  return [...rows.values()].sort((a, b) => a.staffName.localeCompare(b.staffName))
}

/** /api/timesheet?from=&to=&locationId= (managers). */
export const timesheetRoute = {
  GET: route(
    async (c) => {
      const { from, to } = range(c.query)
      return json(await timesheet(c.host, from, to, optionalString(c.query.get('locationId'), 'Location', 100)))
    },
    { roles: MANAGERS },
  ),
}

type Charge = { amount: number | string; currency: string; executor?: { id: string } | null }
type ChargePage = { data: Charge[]; meta?: { next_cursor?: string | null } }

export type StaffSales = { staffId: string; total: number; count: number; commission: number }

// HitPay pages charges by cursor, 99 at most. A request has 30 seconds, so at most this many pages are read.
const MAX_PAGES = 5

/**
 * /api/timesheet/sales?fromDay=&toDay=: successful HitPay charges per staff member (the user who took them) in
 * the days, with their commission (managers). Null-status "waiting" until the owner allows HitPay.
 */
export const timesheetSales = {
  GET: route(
    async (c) => {
      const day = (value: string | null, field: string) => {
        if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new HttpError(400, `${field} must be a date (YYYY-MM-DD).`)
        return value
      }
      const fromDay = day(c.query.get('fromDay'), 'From')
      const toDay = day(c.query.get('toDay'), 'To')
      if (!(await integrationReady(c.host, 'hitpay'))) return json({ status: 'waiting' as const })

      const totals = new Map<string, { cents: number; count: number }>()
      let currency: string | null = null
      let cursor: string | null = null
      let pages = 0
      try {
        do {
          const query: Record<string, string | number> = { per_page: 99, status: 'succeeded', date_from: fromDay, date_to: toDay }
          if (cursor) query.cursor = cursor
          const response: { body: ChargePage } | null = await nangoRequest<ChargePage>(c.host, { integration: 'hitpay', path: '/v1/charges', query })
          if (!response) return json({ status: 'waiting' as const })
          for (const charge of response.body.data) {
            const staffId = charge.executor?.id
            if (!staffId) continue
            currency ??= charge.currency?.toUpperCase() ?? null
            const entry = totals.get(staffId) ?? { cents: 0, count: 0 }
            entry.cents += Math.round(Number(charge.amount) * 100)
            entry.count++
            totals.set(staffId, entry)
          }
          cursor = response.body.meta?.next_cursor ?? null
          pages++
        } while (cursor && pages < MAX_PAGES)
      } catch (error) {
        if (error instanceof IntegrationError) throw new HttpError(502, `HitPay: ${error.message}`)
        throw error
      }

      const rates = await payRates()
      const sales: StaffSales[] = [...totals].map(([staffId, entry]) => {
        const total = entry.cents / 100
        return { staffId, total, count: entry.count, commission: Math.round(total * (rates.get(staffId)?.commissionPercent ?? 0)) / 100 }
      })
      return json({ status: 'ready' as const, currency, sales, partial: cursor !== null })
    },
    { roles: MANAGERS },
  ),
}

const SHEET = 'Timesheet'

/** /api/timesheet/export: `{ from, to, label }`, writes the timesheet to a new Google Sheets spreadsheet (managers). */
export const timesheetExport = {
  POST: route(
    async (c) => {
      const body = await jsonBody(c.req)
      const { from, to } = range(new URLSearchParams({ from: String(body.from ?? ''), to: String(body.to ?? '') }))
      const label = optionalString(body.label, 'Label', 80) ?? `${from.slice(0, 10)} to ${to.slice(0, 10)}`
      if (!(await integrationReady(c.host, 'google-sheet'))) return json({ status: 'waiting' as const })

      const rows = await timesheet(c.host, from, to, optionalString(body.locationId, 'Location', 100))
      const hours = (minutes: number) => Math.round((minutes / 60) * 100) / 100
      const values = [
        ['Staff', 'Scheduled hours', 'Worked hours', 'Overtime hours', 'Late', 'Missed shifts', 'Hourly rate', 'Pay'],
        ...rows.map((row) => [
          row.staffName,
          hours(row.scheduledMinutes),
          hours(row.workedMinutes),
          hours(row.overtimeMinutes),
          row.lateCount,
          row.missedShifts,
          row.hourlyRate,
          row.pay,
        ]),
      ]

      try {
        const created = await nangoRequest<{ spreadsheetId: string; spreadsheetUrl: string }>(c.host, {
          integration: 'google-sheet',
          method: 'POST',
          path: '/v4/spreadsheets',
          body: { properties: { title: `Timesheet ${label}` }, sheets: [{ properties: { title: SHEET } }] },
        })
        if (!created) return json({ status: 'waiting' as const })
        await nangoRequest(c.host, {
          integration: 'google-sheet',
          method: 'PUT',
          path: `/v4/spreadsheets/${created.body.spreadsheetId}/values/${encodeURIComponent(`${SHEET}!A1`)}`,
          query: { valueInputOption: 'RAW' },
          body: { values },
        })
        return json({ status: 'ready' as const, url: created.body.spreadsheetUrl, rows: rows.length })
      } catch (error) {
        if (error instanceof IntegrationError) throw new HttpError(502, `Google Sheets: ${error.message}`)
        throw error
      }
    },
    { roles: MANAGERS },
  ),
}
