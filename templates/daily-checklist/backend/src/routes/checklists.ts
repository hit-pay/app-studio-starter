import { HttpError, json, route, type Json } from '../lib/app.ts'
import { KINDS, MANAGERS, type Checklist, type ChecklistItem } from '../lib/checklists.ts'
import { db, type Statement } from '../lib/db.ts'
import { jsonBody, oneOf, optionalString, requiredString } from '../lib/validate.ts'

const MAX_ITEMS = 50

/** Every active checklist with its items, or only `id`. Checklists are few, so one query each is enough. */
export async function loadChecklists(id?: string): Promise<Checklist[]> {
  const where = id ? 'AND id = ?' : ''
  const checklists = await db.execute({
    sql: `SELECT id, title, kind, location_id, cash_count FROM checklists WHERE archived_at IS NULL ${where} ORDER BY kind, title`,
    args: id ? [id] : [],
  })
  const items = await db.execute({
    sql: `SELECT id, checklist_id, label, requires_photo FROM checklist_items
          WHERE removed_at IS NULL ${id ? 'AND checklist_id = ?' : ''} ORDER BY checklist_id, position`,
    args: id ? [id] : [],
  })

  const byChecklist = new Map<string, ChecklistItem[]>()
  for (const row of items.rows) {
    const list = byChecklist.get(String(row.checklist_id)) ?? []
    list.push({ id: String(row.id), label: String(row.label), requiresPhoto: Number(row.requires_photo) === 1 })
    byChecklist.set(String(row.checklist_id), list)
  }

  return checklists.rows.map((row) => ({
    id: String(row.id),
    title: String(row.title),
    kind: row.kind as Checklist['kind'],
    locationId: row.location_id == null ? null : String(row.location_id),
    cashCount: Number(row.cash_count) === 1,
    items: byChecklist.get(String(row.id)) ?? [],
  }))
}

type Input = Omit<Checklist, 'id' | 'items'> & { items: (Omit<ChecklistItem, 'id'> & { id: string | null })[] }

async function readInput(req: Request): Promise<Input> {
  const body = await jsonBody(req)
  const kind = oneOf(body.kind, 'Type', KINDS)
  if (!Array.isArray(body.items) || body.items.length === 0) throw new HttpError(400, 'Add at least one item.')
  if (body.items.length > MAX_ITEMS) throw new HttpError(400, `A checklist has at most ${MAX_ITEMS} items.`)

  return {
    title: requiredString(body.title, 'Title', 80),
    kind,
    locationId: optionalString(body.locationId, 'Location', 100),
    // Counting cash only makes sense when closing.
    cashCount: kind === 'closing' && body.cashCount === true,
    items: body.items.map((value, index) => {
      const item = (value ?? {}) as Record<string, unknown>
      return {
        id: optionalString(item.id, 'Item id', 100),
        label: requiredString(item.label, `Item ${index + 1}`, 200),
        requiresPhoto: item.requiresPhoto === true,
      }
    }),
  }
}

/** /api/checklists: the active checklists, and creating one (managers). */
export const checklists = {
  GET: route(async () => json(await loadChecklists())),

  POST: route(
    async (c) => {
      const input = await readInput(c.req)
      const id = crypto.randomUUID()
      const now = new Date().toISOString()

      await db.batch([
        {
          sql: 'INSERT INTO checklists (id, title, kind, location_id, cash_count, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
          args: [id, input.title, input.kind, input.locationId, input.cashCount ? 1 : 0, c.user.id, now],
        },
        ...input.items.map((item, position) => ({
          sql: 'INSERT INTO checklist_items (id, checklist_id, position, label, requires_photo) VALUES (?, ?, ?, ?, ?)',
          args: [crypto.randomUUID(), id, position, item.label, item.requiresPhoto ? 1 : 0],
        })),
      ])
      const [created] = await loadChecklists(id)
      return json(created!, 201)
    },
    { roles: MANAGERS },
  ),
}

/** /api/checklists/:id: one checklist, changing it and archiving it (managers). */
export const checklist = {
  GET: route<'/api/checklists/:id', Json<Checklist>>(async (c) => {
    const [found] = await loadChecklists(c.params.id)
    if (!found) throw new HttpError(404, 'Checklist not found.')
    return json(found)
  }),

  PUT: route<'/api/checklists/:id', Json<Checklist>>(
    async (c) => {
      const [current] = await loadChecklists(c.params.id)
      if (!current) throw new HttpError(404, 'Checklist not found.')
      const input = await readInput(c.req)
      const now = new Date().toISOString()

      // Items keep their id when edited, so runs that ticked them stay linked; an item left out is removed.
      const existing = new Set(current.items.map((item) => item.id))
      const kept = new Set(input.items.flatMap((item) => (item.id && existing.has(item.id) ? [item.id] : [])))
      const statements: Statement[] = [
        {
          sql: 'UPDATE checklists SET title = ?, kind = ?, location_id = ?, cash_count = ? WHERE id = ?',
          args: [input.title, input.kind, input.locationId, input.cashCount ? 1 : 0, current.id],
        },
        ...current.items
          .filter((item) => !kept.has(item.id))
          .map((item) => ({ sql: 'UPDATE checklist_items SET removed_at = ? WHERE id = ?', args: [now, item.id] })),
        ...input.items.map((item, position) =>
          item.id && kept.has(item.id)
            ? {
                sql: 'UPDATE checklist_items SET position = ?, label = ?, requires_photo = ? WHERE id = ?',
                args: [position, item.label, item.requiresPhoto ? 1 : 0, item.id],
              }
            : {
                sql: 'INSERT INTO checklist_items (id, checklist_id, position, label, requires_photo) VALUES (?, ?, ?, ?, ?)',
                args: [crypto.randomUUID(), current.id, position, item.label, item.requiresPhoto ? 1 : 0],
              },
        ),
      ]
      await db.batch(statements)

      const [updated] = await loadChecklists(current.id)
      return json(updated!)
    },
    { roles: MANAGERS },
  ),

  /** Archives it: past runs keep their history, and it stops appearing for new days. */
  DELETE: route<'/api/checklists/:id', Json<null>>(
    async (c) => {
      await db.execute({ sql: 'UPDATE checklists SET archived_at = ? WHERE id = ? AND archived_at IS NULL', args: [new Date().toISOString(), c.params.id] })
      return new Response(null, { status: 204 }) as Json<null>
    },
    { roles: MANAGERS },
  ),
}
