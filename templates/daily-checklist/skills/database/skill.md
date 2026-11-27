---
name: database
description: Store and query the app's data in its database (Turso/SQLite), and change its schema with migrations. Use when a feature keeps data.
---

# Database

Each app has its own SQLite database (Turso). Only the backend reaches it, through `db` in `backend/src/lib/db.ts`:

```ts
import { db } from '../lib/db.ts'

const { rows } = await db.execute({ sql: 'SELECT id, name FROM items WHERE location_id = ? LIMIT ? OFFSET ?', args: [locationId, 50, 0] })
await db.batch([
  { sql: 'INSERT INTO orders (id, total) VALUES (?, ?)', args: [orderId, total] },
  { sql: 'INSERT INTO order_items (order_id, item_id) VALUES (?, ?)', args: [orderId, itemId] },
])
```

* Always pass values as `args` (the `?` placeholders), never inside the SQL text.
* `batch` runs every statement in one transaction: all apply, or none.
* Rows support `row.column` and `row[0]`. Convert values (`String(row.id)`, `Number(row.total)`) before returning them.
* Ids: `crypto.randomUUID()`.

## Schema

Add a numbered file in `backend/migrations/`, e.g. `002_shifts.sql`:

```sql
CREATE TABLE IF NOT EXISTS shifts (
  id TEXT PRIMARY KEY,
  staff_id TEXT NOT NULL,
  starts_at TEXT NOT NULL,
  created_by TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_shifts_starts_at ON shifts(starts_at);
```

Then run `bun run migrate`. The published app applies pending migrations before its first query. Never edit a migration that already exists; add a new one.

## Limits on the published app

* Lists: page with `LIMIT ? OFFSET ?` and select only the columns the page shows.
* Files: use `useFiles` and `/api/files`. Do not store files or base64 text in other tables.
