import { HttpError, json, route, type Json } from '../lib/app.ts'
import { db } from '../lib/db.ts'
import { displayName, isManager, staffById, staffName, type SwapRequest, type SwapStatus } from '../lib/shifts.ts'
import { jsonBody, oneOf, optionalString, requiredString } from '../lib/validate.ts'
import { findShift } from './shifts.ts'

// Swap requests: a staff member offers one of their upcoming shifts to a colleague, and a manager approves it, which
// moves the shift, or rejects it.

const STATUSES = ['pending', 'approved', 'rejected', 'cancelled'] as const

type Row = Record<string, unknown>

function toSwap(row: Row): SwapRequest {
  return {
    id: String(row.id),
    shiftId: String(row.shift_id),
    shift: row.starts_at == null ? null : { locationId: String(row.location_id), startsAt: String(row.starts_at), endsAt: String(row.ends_at) },
    fromStaffId: String(row.from_staff_id),
    fromStaffName: String(row.from_staff_name),
    toStaffId: String(row.to_staff_id),
    toStaffName: String(row.to_staff_name),
    reason: row.reason == null ? null : String(row.reason),
    status: row.status as SwapStatus,
    decidedByName: row.decided_by_name == null ? null : String(row.decided_by_name),
    decidedAt: row.decided_at == null ? null : String(row.decided_at),
    createdAt: String(row.created_at),
  }
}

const SELECT = `SELECT r.*, s.location_id, s.starts_at, s.ends_at FROM swap_requests r LEFT JOIN shifts s ON s.id = r.shift_id`

async function findSwap(id: string): Promise<SwapRequest> {
  const result = await db.execute({ sql: `${SELECT} WHERE r.id = ?`, args: [id] })
  const row = result.rows[0] as Row | undefined
  if (!row) throw new HttpError(404, 'Swap request not found.')
  return toSwap(row)
}

/** /api/swaps: requests (?status=; managers see all, staff their own), and asking for one. */
export const swaps = {
  GET: route(async (c) => {
    const status = c.query.get('status') ? oneOf(c.query.get('status'), 'Status', STATUSES) : null
    const own = !isManager(c.user)
    const where = [status ? 'r.status = ?' : null, own ? '(r.from_staff_id = ? OR r.to_staff_id = ?)' : null].filter(Boolean)
    const args = [...(status ? [status] : []), ...(own ? [c.user.id, c.user.id] : [])]
    const result = await db.execute({
      sql: `${SELECT}${where.length ? ` WHERE ${where.join(' AND ')}` : ''} ORDER BY r.created_at DESC LIMIT 200`,
      args,
    })
    return json(result.rows.map((row) => toSwap(row as Row)))
  }),

  /** `{ shiftId, toStaffId, reason? }`, for one of the viewer's upcoming shifts. */
  POST: route(async (c) => {
    const body = await jsonBody(c.req)
    const shift = await findShift(requiredString(body.shiftId, 'Shift', 100))
    if (shift.staffId !== c.user.id) throw new HttpError(403, 'You can only swap your own shifts.')
    if (Date.parse(shift.startsAt) <= Date.now()) throw new HttpError(400, 'This shift has already started.')

    const toStaffId = requiredString(body.toStaffId, 'Colleague', 100)
    if (toStaffId === c.user.id) throw new HttpError(400, 'Choose a colleague.')
    const colleague = (await staffById(c.host)).get(toStaffId)
    if (!colleague) throw new HttpError(400, 'That colleague cannot use this app.')

    const pending = await db.execute({ sql: `SELECT 1 FROM swap_requests WHERE shift_id = ? AND status = 'pending'`, args: [shift.id] })
    if (pending.rows.length > 0) throw new HttpError(409, 'This shift already has a swap request waiting.')

    const id = crypto.randomUUID()
    await db.execute({
      sql: `INSERT INTO swap_requests (id, shift_id, from_staff_id, from_staff_name, to_staff_id, to_staff_name, reason, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [id, shift.id, c.user.id, displayName(c.user), toStaffId, staffName(colleague), optionalString(body.reason, 'Reason', 300), new Date().toISOString()],
    })
    return json(await findSwap(id), 201)
  }),
}

/** /api/swaps/:id: `{ action: 'approve' | 'reject' }` (managers) or `{ action: 'cancel' }` (the requester). */
export const swap = {
  PATCH: route<'/api/swaps/:id', Json<SwapRequest>>(async (c) => {
    const action = oneOf((await jsonBody(c.req)).action, 'Action', ['approve', 'reject', 'cancel'] as const)
    const current = await findSwap(c.params.id)
    if (current.status !== 'pending') throw new HttpError(409, `This request is already ${current.status}.`)
    const now = new Date().toISOString()

    if (action === 'cancel') {
      if (current.fromStaffId !== c.user.id) throw new HttpError(403, 'Only the person who asked can cancel it.')
      await db.execute({ sql: `UPDATE swap_requests SET status = 'cancelled', decided_at = ? WHERE id = ?`, args: [now, current.id] })
      return json(await findSwap(current.id))
    }

    if (!isManager(c.user)) throw new HttpError(403, 'Only a manager can approve or reject a swap.')
    if (action === 'reject') {
      await db.execute({
        sql: `UPDATE swap_requests SET status = 'rejected', decided_by_name = ?, decided_at = ? WHERE id = ?`,
        args: [displayName(c.user), now, current.id],
      })
      return json(await findSwap(current.id))
    }

    const shift = await findShift(current.shiftId)
    const clash = await db.execute({
      sql: 'SELECT 1 FROM shifts WHERE staff_id = ? AND starts_at < ? AND ends_at > ? AND id != ? LIMIT 1',
      args: [current.toStaffId, shift.endsAt, shift.startsAt, shift.id],
    })
    if (clash.rows.length > 0) throw new HttpError(409, `${current.toStaffName} already has a shift at that time.`)

    await db.batch([
      {
        sql: 'UPDATE shifts SET staff_id = ?, staff_name = ?, calendar_event_id = NULL, updated_at = ? WHERE id = ?',
        args: [current.toStaffId, current.toStaffName, now, shift.id],
      },
      {
        sql: `UPDATE swap_requests SET status = 'approved', decided_by_name = ?, decided_at = ? WHERE id = ?`,
        args: [displayName(c.user), now, current.id],
      },
    ])
    return json(await findSwap(current.id))
  }),
}
