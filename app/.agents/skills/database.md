---
description: Turso / libSQL schema, migrations, and queries. Use when the app stores data.
---

# Database

Use `#/lib/db` and `#/lib/migrate` on the **server** (`loader` / `createServerFn`). Do not import `db` in client components. Do not add another client or ORM.

- One statement per `db.execute()`. Several writes → `db.batch`. Migration files may have multiple statements (`ensureMigrations` uses `executeMultiple`).
- New schema → new `migrations/00N_name.sql`. Do not edit or delete an existing migration. Prefer additive columns (nullable).
- Parameterized SQL (`?`). SQLite types (`TEXT`, `INTEGER`), not Postgres.
- Call `await ensureMigrations()` before the first query.
- Do not put `TURSO_*` in source or chat. “Unable to connect” means a server function threw — fix the handler, do not skip the database.

```ts
import { createServerFn } from '@tanstack/react-start'
import { db } from '#/lib/db'
import { ensureMigrations } from '#/lib/migrate'

export const listItems = createServerFn({ method: 'GET' }).handler(async () => {
  await ensureMigrations()
  const result = await db.execute('SELECT id, title FROM items ORDER BY created_at DESC')
  return result.rows
})
```
