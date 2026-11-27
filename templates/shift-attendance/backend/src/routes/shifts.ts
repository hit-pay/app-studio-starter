import { HttpError, json, route, type Json } from '../lib/app.ts'
import { db, type Statement } from '../lib/db.ts'
import { IntegrationError, nangoRequest } from '../lib/integrations.ts'
import { instant, integrationReady, MANAGERS, staffById, staffName, type Shift } from '../lib/shifts.ts'
import type { Location } from '../lib/types.ts'
import { jsonBody, optionalString, requiredNumber, requiredString } from '../lib/validate.ts'

const MAX_SHIFT_HOURS = 16
const MAX_RANGE_DAYS = 62
const WEEK_MS = 7 * 24 * 60 * 60 * 1000

type Row = Record<string, unknown>

function toShift(row: Row): Shift {
  return {
    id: String(row.id),
    locationId: String(row.location_id),
    staffId: String(row.staff_id),
    staffName: String(row.staff_name),
    startsAt: String(row.starts_at),
    endsAt: String(row.ends_at),
    breakMinutes: Number(row.break_minutes),
    note: row.note == null ? null : String(row.note),
    inCalendar: row.calendar_event_id != null,
  }
}

/** Shifts that start in [from, to), optionally at one location. */
export async function shiftsBetween(from: string, to: string, locationId: string | null = null): Promise<Shift[]> {
  const result = await db.execute({
    sql: `SELECT * FROM shifts WHERE starts_at >= ? AND starts_at < ?${locationId ? ' AND location_id = ?' : ''} ORDER BY starts_at, staff_name`,
    args: locationId ? [from, to, locationId] : [from, to],
  })
  return result.rows.map((row) => toShift(row as Row))
}

export async function findShift(id: string): Promise<Shift> {
  const result = await db.execute({ sql: 'SELECT * FROM shifts WHERE id = ?', args: [id] })
  const row = result.rows[0] as Row | undefined
  if (!row) throw new HttpError(404, 'Shift not found.')
  return toShift(row)
}

/** `from` and `to` of a query, at most MAX_RANGE_DAYS apart. */
export function range(query: URLSearchParams): { from: string; to: string } {
  const from = instant(query.get('from'), 'From')
  const to = instant(query.get('to'), 'To')
  if (Date.parse(to) <= Date.parse(from)) throw new HttpError(400, 'To must be after From.')
  if (Date.parse(to) - Date.parse(from) > MAX_RANGE_DAYS * 24 * 60 * 60 * 1000) throw new HttpError(400, `Pick at most ${MAX_RANGE_DAYS} days.`)
  return { from, to }
}

/** Another shift of the same staff member that overlaps [startsAt, endsAt). */
async function overlapping(staffId: string, startsAt: string, endsAt: string, exceptId: string | null): Promise<Shift | null> {
  const result = await db.execute({
    sql: `SELECT * FROM shifts WHERE staff_id = ? AND starts_at < ? AND ends_at > ?${exceptId ? ' AND id != ?' : ''} LIMIT 1`,
    args: exceptId ? [staffId, endsAt, startsAt, exceptId] : [staffId, endsAt, startsAt],
  })
  const row = result.rows[0] as Row | undefined
  return row ? toShift(row) : null
}

type Input = { locationId: string; staffId: string; staffName: string; startsAt: string; endsAt: string; breakMinutes: number; note: string | null }

async function readInput(req: Request, host: Parameters<typeof staffById>[0], exceptId: string | null): Promise<Input> {
  const body = await jsonBody(req)
  const staffId = requiredString(body.staffId, 'Staff', 100)
  const startsAt = instant(body.startsAt, 'Start')
  const endsAt = instant(body.endsAt, 'End')
  const hours = (Date.parse(endsAt) - Date.parse(startsAt)) / 3_600_000
  if (hours <= 0) throw new HttpError(400, 'The shift must end after it starts.')
  if (hours > MAX_SHIFT_HOURS) throw new HttpError(400, `A shift is at most ${MAX_SHIFT_HOURS} hours.`)
  const breakMinutes = Math.round(requiredNumber(body.breakMinutes ?? 0, 'Break', { min: 0, max: hours * 60 - 1 }))

  const staff = (await staffById(host)).get(staffId)
  if (!staff) throw new HttpError(400, 'That staff member cannot use this app.')
  const clash = await overlapping(staffId, startsAt, endsAt, exceptId)
  if (clash) throw new HttpError(409, `${staffName(staff)} already has a shift at that time.`)

  return {
    locationId: requiredString(body.locationId, 'Location', 100),
    staffId,
    staffName: staffName(staff),
    startsAt,
    endsAt,
    breakMinutes,
    note: optionalString(body.note, 'Note', 300),
  }
}

/** /api/shifts: shifts in a range (?from=&to=&locationId=), and planning one (managers). */
export const shifts = {
  GET: route(async (c) => {
    const { from, to } = range(c.query)
    return json(await shiftsBetween(from, to, optionalString(c.query.get('locationId'), 'Location', 100)))
  }),

  POST: route(
    async (c) => {
      const input = await readInput(c.req, c.host, null)
      const id = crypto.randomUUID()
      const now = new Date().toISOString()
      await db.execute({
        sql: `INSERT INTO shifts (id, location_id, staff_id, staff_name, starts_at, ends_at, break_minutes, note, created_by, created_at, updated_at)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [id, input.locationId, input.staffId, input.staffName, input.startsAt, input.endsAt, input.breakMinutes, input.note, c.user.id, now, now],
      })
      return json(await findShift(id), 201)
    },
    { roles: MANAGERS },
  ),
}

/** /api/shifts/:id: changing a shift and removing it (managers). */
export const shift = {
  PUT: route<'/api/shifts/:id', Json<Shift>>(
    async (c) => {
      const current = await findShift(c.params.id)
      const input = await readInput(c.req, c.host, current.id)
      // A changed shift is sent to the calendar again.
      await db.execute({
        sql: `UPDATE shifts SET location_id = ?, staff_id = ?, staff_name = ?, starts_at = ?, ends_at = ?, break_minutes = ?, note = ?,
              calendar_event_id = NULL, updated_at = ? WHERE id = ?`,
        args: [input.locationId, input.staffId, input.staffName, input.startsAt, input.endsAt, input.breakMinutes, input.note, new Date().toISOString(), current.id],
      })
      return json(await findShift(current.id))
    },
    { roles: MANAGERS },
  ),

  DELETE: route<'/api/shifts/:id', Json<null>>(
    async (c) => {
      await db.batch([
        { sql: `UPDATE swap_requests SET status = 'cancelled' WHERE shift_id = ? AND status = 'pending'`, args: [c.params.id] },
        { sql: 'DELETE FROM shifts WHERE id = ?', args: [c.params.id] },
      ])
      return new Response(null, { status: 204 }) as Json<null>
    },
    { roles: MANAGERS },
  ),
}

/** /api/shifts/copy-week: `{ from }`, copies the week starting at `from` to the week after, skipping clashes. */
export const copyWeek = {
  POST: route(
    async (c) => {
      const from = instant((await jsonBody(c.req)).from, 'From')
      const to = new Date(Date.parse(from) + WEEK_MS).toISOString()
      const source = await shiftsBetween(from, to)
      const now = new Date().toISOString()

      const statements: Statement[] = []
      let skipped = 0
      for (const item of source) {
        const startsAt = new Date(Date.parse(item.startsAt) + WEEK_MS).toISOString()
        const endsAt = new Date(Date.parse(item.endsAt) + WEEK_MS).toISOString()
        if (await overlapping(item.staffId, startsAt, endsAt, null)) {
          skipped++
          continue
        }
        statements.push({
          sql: `INSERT INTO shifts (id, location_id, staff_id, staff_name, starts_at, ends_at, break_minutes, note, created_by, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          args: [crypto.randomUUID(), item.locationId, item.staffId, item.staffName, startsAt, endsAt, item.breakMinutes, item.note, c.user.id, now, now],
        })
      }
      if (statements.length > 0) await db.batch(statements)
      return json({ copied: statements.length, skipped })
    },
    { roles: MANAGERS },
  ),
}

type CalendarEvent = { id: string }

/**
 * /api/shifts/send-to-calendar: `{ from, to }`, adds every shift in the range not sent yet to the connected Google
 * Calendar, one event per shift. Managers.
 */
export const sendToCalendar = {
  POST: route(
    async (c) => {
      const body = await jsonBody(c.req)
      const from = instant(body.from, 'From')
      const to = instant(body.to, 'To')
      if (!(await integrationReady(c.host, 'google-calendar'))) return json({ status: 'waiting' as const })

      const pending = (await shiftsBetween(from, to)).filter((item) => !item.inCalendar)
      const { locations } = await c.host.get<{ locations: Location[] }>('/locations')
      const names = new Map(locations.map((location) => [location.id, location.name ?? 'Location']))

      let sent = 0
      try {
        // One at a time: a request has 30 seconds, so a long week stops early and the rest goes on the next click.
        const deadline = Date.now() + 20_000
        for (const item of pending) {
          if (Date.now() > deadline) break
          const event = await nangoRequest<CalendarEvent>(c.host, {
            integration: 'google-calendar',
            method: 'POST',
            path: '/calendar/v3/calendars/primary/events',
            body: {
              summary: `Shift: ${item.staffName} at ${names.get(item.locationId) ?? 'Location'}`,
              description: item.note ?? undefined,
              start: { dateTime: item.startsAt },
              end: { dateTime: item.endsAt },
            },
          })
          if (!event) return json({ status: 'waiting' as const })
          await db.execute({ sql: 'UPDATE shifts SET calendar_event_id = ? WHERE id = ?', args: [event.body.id, item.id] })
          sent++
        }
      } catch (error) {
        if (error instanceof IntegrationError) throw new HttpError(502, `Google Calendar: ${error.message}`)
        throw error
      }
      return json({ status: 'ready' as const, sent, remaining: pending.length - sent })
    },
    { roles: MANAGERS },
  ),
}
