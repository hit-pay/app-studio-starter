import { HttpError, json, route, type Json } from '../lib/app.ts'
import { db } from '../lib/db.ts'
import { MANAGERS, staffById, staffName, type PayRate } from '../lib/shifts.ts'
import type { Staff } from '../lib/types.ts'
import { jsonBody, requiredNumber } from '../lib/validate.ts'

export type TeamMember = PayRate & { name: string; role: string | null; locationIds: string[] }

/** Every staff member's pay rate; one never set is 0. */
export async function payRates(): Promise<Map<string, PayRate>> {
  const result = await db.execute('SELECT staff_id, hourly_rate, commission_percent FROM pay_rates')
  return new Map(
    result.rows.map((row) => [
      String(row.staff_id),
      { staffId: String(row.staff_id), hourlyRate: Number(row.hourly_rate), commissionPercent: Number(row.commission_percent) },
    ]),
  )
}

function member(staff: Staff, rate: PayRate | undefined): TeamMember {
  return {
    staffId: staff.id,
    name: staffName(staff),
    role: staff.role?.title ?? null,
    locationIds: staff.locations.map((location) => location.id),
    hourlyRate: rate?.hourlyRate ?? 0,
    commissionPercent: rate?.commissionPercent ?? 0,
  }
}

/** /api/team: the staff who can use the app, with their pay rate (managers). */
export const team = {
  GET: route(
    async (c) => {
      const [staff, rates] = await Promise.all([staffById(c.host), payRates()])
      return json([...staff.values()].map((item) => member(item, rates.get(item.id))))
    },
    { roles: MANAGERS },
  ),
}

/** /api/team/:staffId: `{ hourlyRate, commissionPercent }` (managers). */
export const teamMember = {
  PUT: route<'/api/team/:staffId', Json<TeamMember>>(
    async (c) => {
      const staff = (await staffById(c.host)).get(c.params.staffId)
      if (!staff) throw new HttpError(404, 'Staff member not found.')
      const body = await jsonBody(c.req)
      const hourlyRate = requiredNumber(body.hourlyRate, 'Hourly rate', { min: 0, max: 100_000 })
      const commissionPercent = requiredNumber(body.commissionPercent, 'Commission', { min: 0, max: 100 })

      await db.execute({
        sql: `INSERT INTO pay_rates (staff_id, hourly_rate, commission_percent, updated_at) VALUES (?, ?, ?, ?)
              ON CONFLICT (staff_id) DO UPDATE SET hourly_rate = excluded.hourly_rate,
              commission_percent = excluded.commission_percent, updated_at = excluded.updated_at`,
        args: [staff.id, hourlyRate, commissionPercent, new Date().toISOString()],
      })
      return json(member(staff, { staffId: staff.id, hourlyRate, commissionPercent }))
    },
    { roles: MANAGERS },
  ),
}
