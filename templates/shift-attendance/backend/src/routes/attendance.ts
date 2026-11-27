import { HttpError, json, route } from '../lib/app.ts'
import { db } from '../lib/db.ts'
import { displayName, type Attendance, type Shift } from '../lib/shifts.ts'
import { jsonBody, optionalString } from '../lib/validate.ts'
import { findShift } from './shifts.ts'

// Clocking in and out. A clock-in is linked to the viewer's shift running now (or starting within the hour), so the
// timesheet can tell late arrivals and missed shifts; without a shift the staff member picks the location.

const EARLY_MINUTES = 60
const RECENT = 10

type Row = Record<string, unknown>

export function toAttendance(row: Row): Attendance {
  return {
    id: String(row.id),
    staffId: String(row.staff_id),
    staffName: String(row.staff_name),
    locationId: String(row.location_id),
    shiftId: row.shift_id == null ? null : String(row.shift_id),
    clockInAt: String(row.clock_in_at),
    clockOutAt: row.clock_out_at == null ? null : String(row.clock_out_at),
    note: row.note == null ? null : String(row.note),
  }
}

async function openAttendance(staffId: string): Promise<Attendance | null> {
  const result = await db.execute({
    sql: 'SELECT * FROM attendance WHERE staff_id = ? AND clock_out_at IS NULL ORDER BY clock_in_at DESC LIMIT 1',
    args: [staffId],
  })
  const row = result.rows[0] as Row | undefined
  return row ? toAttendance(row) : null
}

/** The viewer's shift running now or starting soon, else their next shift today. */
async function currentShift(staffId: string): Promise<Shift | null> {
  const now = Date.now()
  const result = await db.execute({
    sql: 'SELECT id FROM shifts WHERE staff_id = ? AND ends_at > ? AND starts_at < ? ORDER BY starts_at LIMIT 1',
    args: [staffId, new Date(now).toISOString(), new Date(now + 18 * 60 * 60 * 1000).toISOString()],
  })
  const row = result.rows[0] as Row | undefined
  return row ? findShift(String(row.id)) : null
}

function startsSoon(shift: Shift): boolean {
  return Date.parse(shift.startsAt) - Date.now() <= EARLY_MINUTES * 60_000
}

/** /api/attendance/me: whether the viewer is clocked in, their shift, and their recent clock-ins. */
export const myAttendance = {
  GET: route(async (c) => {
    const [open, shift, recent] = await Promise.all([
      openAttendance(c.user.id),
      currentShift(c.user.id),
      db.execute({ sql: 'SELECT * FROM attendance WHERE staff_id = ? ORDER BY clock_in_at DESC LIMIT ?', args: [c.user.id, RECENT] }),
    ])
    return json({ open, shift, recent: recent.rows.map((row) => toAttendance(row as Row)) })
  }),
}

/** /api/attendance/clock-in: `{ locationId? }`; the location comes from the shift when there is one. */
export const clockIn = {
  POST: route(async (c) => {
    if (await openAttendance(c.user.id)) throw new HttpError(409, 'You are already clocked in.')
    const body = await jsonBody(c.req)
    const shift = await currentShift(c.user.id)
    const linked = shift && startsSoon(shift) ? shift : null
    const locationId = linked?.locationId ?? optionalString(body.locationId, 'Location', 100)
    if (!locationId) throw new HttpError(400, 'You have no shift now: choose the location you are working at.')

    const id = crypto.randomUUID()
    await db.execute({
      sql: 'INSERT INTO attendance (id, staff_id, staff_name, location_id, shift_id, clock_in_at) VALUES (?, ?, ?, ?, ?, ?)',
      args: [id, c.user.id, displayName(c.user), locationId, linked?.id ?? null, new Date().toISOString()],
    })
    return json((await openAttendance(c.user.id))!, 201)
  }),
}

/** /api/attendance/clock-out: `{ note? }`. */
export const clockOut = {
  POST: route(async (c) => {
    const open = await openAttendance(c.user.id)
    if (!open) throw new HttpError(409, 'You are not clocked in.')
    const note = optionalString((await jsonBody(c.req)).note, 'Note', 300)
    await db.execute({
      sql: 'UPDATE attendance SET clock_out_at = ?, note = ? WHERE id = ?',
      args: [new Date().toISOString(), note, open.id],
    })
    const result = await db.execute({ sql: 'SELECT * FROM attendance WHERE id = ?', args: [open.id] })
    return json(toAttendance(result.rows[0] as Row))
  }),
}
