import { HttpError, json, route, type Json } from '../lib/app.ts'
import { day, displayName, isManager, PHOTO_ENTITY, photoOwner, type RunDetail, type RunItem, type RunSummary } from '../lib/checklists.ts'
import { db } from '../lib/db.ts'
import { jsonBody, oneOf, optionalString, requiredNumber, requiredString } from '../lib/validate.ts'
import { loadChecklists } from './checklists.ts'
import { cashSales } from './sales.ts'

const PAGE_SIZE = 20

// `done` counts ticked items that are still on the checklist, `total` the items on it now.
const SUMMARY_COLUMNS = `r.id, r.checklist_id, c.title, c.kind, c.cash_count, r.location_id, r.run_date, r.status,
  r.completed_by_name, r.completed_at, r.cash_counted, r.cash_expected, r.currency, r.note,
  (SELECT COUNT(*) FROM checklist_run_items ri JOIN checklist_items i ON i.id = ri.item_id
     WHERE ri.run_id = r.id AND i.removed_at IS NULL) AS done,
  (SELECT COUNT(*) FROM checklist_items i WHERE i.checklist_id = r.checklist_id AND i.removed_at IS NULL) AS total`

type Row = Record<string, unknown>

function toSummary(row: Row): RunSummary {
  return {
    id: String(row.id),
    checklistId: String(row.checklist_id),
    title: String(row.title),
    kind: row.kind as RunSummary['kind'],
    locationId: String(row.location_id),
    date: String(row.run_date),
    status: row.status as RunSummary['status'],
    done: Number(row.done),
    total: Number(row.total),
    completedByName: row.completed_by_name == null ? null : String(row.completed_by_name),
    completedAt: row.completed_at == null ? null : String(row.completed_at),
  }
}

/** Runs matching `where` (on `r`, the run, and `c`, its checklist). */
export async function runSummaries(where: string, args: (string | number)[], tail = ''): Promise<RunSummary[]> {
  const result = await db.execute({
    sql: `SELECT ${SUMMARY_COLUMNS} FROM checklist_runs r JOIN checklists c ON c.id = r.checklist_id WHERE ${where} ${tail}`,
    args,
  })
  return result.rows.map((row) => toSummary(row as Row))
}

async function loadRun(id: string): Promise<RunDetail> {
  const result = await db.execute({
    sql: `SELECT ${SUMMARY_COLUMNS} FROM checklist_runs r JOIN checklists c ON c.id = r.checklist_id WHERE r.id = ?`,
    args: [id],
  })
  const row = result.rows[0] as Row | undefined
  if (!row) throw new HttpError(404, 'Checklist not found.')

  // The checklist's items now, plus any removed item this run ticked before it was removed.
  const items = await db.execute({
    sql: `SELECT i.id, i.label, i.requires_photo, ri.done_by_name, ri.done_at
          FROM checklist_items i LEFT JOIN checklist_run_items ri ON ri.item_id = i.id AND ri.run_id = ?
          WHERE i.checklist_id = ? AND (i.removed_at IS NULL OR ri.item_id IS NOT NULL)
          ORDER BY i.position`,
    args: [id, String(row.checklist_id)],
  })

  return {
    ...toSummary(row),
    cashCount: Number(row.cash_count) === 1,
    cashCounted: row.cash_counted == null ? null : Number(row.cash_counted),
    cashExpected: row.cash_expected == null ? null : Number(row.cash_expected),
    currency: row.currency == null ? null : String(row.currency),
    note: row.note == null ? null : String(row.note),
    items: items.rows.map(
      (item): RunItem => ({
        id: String(item.id),
        label: String(item.label),
        requiresPhoto: Number(item.requires_photo) === 1,
        done: item.done_at != null,
        doneByName: item.done_by_name == null ? null : String(item.done_by_name),
        doneAt: item.done_at == null ? null : String(item.done_at),
      }),
    ),
  }
}

async function openRun(id: string): Promise<RunDetail> {
  const run = await loadRun(id)
  if (run.status !== 'open') throw new HttpError(409, 'This checklist is already completed.')
  return run
}

/** /api/today?locationId=&date=: the checklists for one location and day, with their progress. */
export const today = {
  GET: route(async (c) => {
    const locationId = requiredString(c.query.get('locationId'), 'Location', 100)
    const date = day(c.query.get('date'))

    const [checklists, runs] = await Promise.all([
      loadChecklists(),
      runSummaries('r.run_date = ? AND r.location_id = ?', [date, locationId]),
    ])
    const byChecklist = new Map(runs.map((run) => [run.checklistId, run]))

    return json(
      checklists
        .filter((checklist) => checklist.locationId === null || checklist.locationId === locationId)
        .map((checklist) => ({
          checklist: { id: checklist.id, title: checklist.title, kind: checklist.kind, itemCount: checklist.items.length },
          run: byChecklist.get(checklist.id) ?? null,
        })),
    )
  }),
}

/** /api/runs: past runs (history), and starting a checklist for a location and day. */
export const runs = {
  /** ?from=&to=&locationId=&page=, newest first. */
  GET: route(async (c) => {
    const from = day(c.query.get('from'), 'From')
    const to = day(c.query.get('to'), 'To')
    const locationId = optionalString(c.query.get('locationId'), 'Location', 100)
    const page = Math.max(1, Math.floor(Number(c.query.get('page') ?? '1')) || 1)

    const where = `r.run_date BETWEEN ? AND ?${locationId ? ' AND r.location_id = ?' : ''}`
    const args = locationId ? [from, to, locationId] : [from, to]
    const [count, rows] = await Promise.all([
      db.execute({ sql: `SELECT COUNT(*) AS total FROM checklist_runs r WHERE ${where}`, args }),
      runSummaries(where, args, `ORDER BY r.run_date DESC, c.title LIMIT ${PAGE_SIZE} OFFSET ${(page - 1) * PAGE_SIZE}`),
    ])
    const total = Number(count.rows[0]?.total ?? 0)

    return json({ runs: rows, page, lastPage: Math.max(1, Math.ceil(total / PAGE_SIZE)), total })
  }),

  /** Starts the checklist at the location for the day, or returns the run already started. */
  POST: route(async (c) => {
    const body = await jsonBody(c.req)
    const checklistId = requiredString(body.checklistId, 'Checklist', 100)
    const locationId = requiredString(body.locationId, 'Location', 100)
    const date = day(body.date)

    const [checklist] = await loadChecklists(checklistId)
    if (!checklist) throw new HttpError(404, 'Checklist not found.')
    if (checklist.locationId !== null && checklist.locationId !== locationId) {
      throw new HttpError(400, 'This checklist is not used at that location.')
    }

    await db.execute({
      sql: `INSERT INTO checklist_runs (id, checklist_id, location_id, run_date, started_by, started_at)
            VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT (checklist_id, location_id, run_date) DO NOTHING`,
      args: [crypto.randomUUID(), checklistId, locationId, date, c.user.id, new Date().toISOString()],
    })
    const found = await db.execute({
      sql: 'SELECT id FROM checklist_runs WHERE checklist_id = ? AND location_id = ? AND run_date = ?',
      args: [checklistId, locationId, date],
    })
    return json(await loadRun(String(found.rows[0]!.id)))
  }),
}

/** /api/runs/:id: one run, and completing or reopening it. */
export const run = {
  GET: route<'/api/runs/:id', Json<RunDetail>>(async (c) => json(await loadRun(c.params.id))),

  /** `{ action: 'complete', cashCounted?, note? }`, or `{ action: 'reopen' }` (managers). */
  PATCH: route<'/api/runs/:id', Json<RunDetail>>(async (c) => {
    const body = await jsonBody(c.req)
    const action = oneOf(body.action, 'Action', ['complete', 'reopen'] as const)

    if (action === 'reopen') {
      if (!isManager(c.user)) throw new HttpError(403, 'Only a manager can reopen a completed checklist.')
      await db.execute({
        sql: `UPDATE checklist_runs SET status = 'open', completed_by = NULL, completed_by_name = NULL, completed_at = NULL
              WHERE id = ?`,
        args: [c.params.id],
      })
      return json(await loadRun(c.params.id))
    }

    const current = await openRun(c.params.id)
    const missing = current.items.filter((item) => !item.done)
    if (missing.length > 0) throw new HttpError(400, `Tick every item first. Still open: ${missing.map((item) => item.label).join(', ')}.`)

    const needPhoto = current.items.filter((item) => item.requiresPhoto)
    if (needPhoto.length > 0) {
      const owners = needPhoto.map((item) => photoOwner(current.id, item.id))
      const photos = await db.execute({
        sql: `SELECT DISTINCT entity_id FROM files WHERE entity_type = ? AND entity_id IN (${owners.map(() => '?').join(', ')})`,
        args: [PHOTO_ENTITY, ...owners],
      })
      const withPhoto = new Set(photos.rows.map((row) => String(row.entity_id)))
      const without = needPhoto.filter((item) => !withPhoto.has(photoOwner(current.id, item.id)))
      if (without.length > 0) throw new HttpError(400, `Add a photo for: ${without.map((item) => item.label).join(', ')}.`)
    }

    let cashCounted: number | null = null
    let expected: { total: number; currency: string | null } | null = null
    if (current.cashCount) {
      cashCounted = requiredNumber(body.cashCounted, 'Counted cash', { min: 0, max: 1_000_000_000 })
      // The comparison is a convenience: a HitPay that is not allowed or not answering must not block closing.
      expected = await cashSales(c.host, current.locationId, current.date).catch((error) => {
        console.error(error)
        return null
      })
    }

    await db.execute({
      sql: `UPDATE checklist_runs SET status = 'completed', completed_by = ?, completed_by_name = ?, completed_at = ?,
            cash_counted = ?, cash_expected = ?, currency = ?, note = ? WHERE id = ? AND status = 'open'`,
      args: [
        c.user.id,
        displayName(c.user),
        new Date().toISOString(),
        cashCounted,
        expected?.total ?? null,
        expected?.currency ?? null,
        optionalString(body.note, 'Note', 500),
        current.id,
      ],
    })
    return json(await loadRun(current.id))
  }),
}

/** /api/runs/:id/items/:itemId: ticking an item, and unticking it. */
export const runItem = {
  PUT: route<'/api/runs/:id/items/:itemId', Json<RunDetail>>(async (c) => {
    const current = await openRun(c.params.id)
    if (!current.items.some((item) => item.id === c.params.itemId)) throw new HttpError(404, 'Item not found.')

    await db.execute({
      sql: `INSERT INTO checklist_run_items (run_id, item_id, done_by, done_by_name, done_at) VALUES (?, ?, ?, ?, ?)
            ON CONFLICT (run_id, item_id) DO NOTHING`,
      args: [current.id, c.params.itemId, c.user.id, displayName(c.user), new Date().toISOString()],
    })
    return json(await loadRun(current.id))
  }),

  DELETE: route<'/api/runs/:id/items/:itemId', Json<RunDetail>>(async (c) => {
    const current = await openRun(c.params.id)
    await db.execute({ sql: 'DELETE FROM checklist_run_items WHERE run_id = ? AND item_id = ?', args: [current.id, c.params.itemId] })
    return json(await loadRun(current.id))
  }),
}
