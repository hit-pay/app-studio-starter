---
description: Turso queries. Open only if the prompt stores data.
---

# Database

Server only: `#/lib/db`, `#/lib/migrate`. No `db` in client components. No extra ORM.

New schema → new `migrations/00N_name.sql` (do not edit old ones). `?` params. SQLite types. `await ensureMigrations()` before queries.

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
