---
description: Turso queries. Open only if the prompt stores data.
---

# Database

Server only: `#/lib/db`, `#/lib/migrate`. No Turso `db` in client components. No extra ORM. Do not rewrite `src/lib/db.ts`.

Client lists: `#/lib/query` (`useQuery`, `useDebouncedValue`). Query **does not** keep Turso connected — it only caches. Persistence: `createServerFn` + Turso. SchemaTable receives rows. Follow `lists.md`. Do not add TanStack DB / `DbProvider` unless the prompt needs optimistic collections.

This app already talks to Turso over **HTTP** (`db.execute` / `db.batch`). Do **not** add `@tursodatabase/database`, `@tursodatabase/sync`, WASM, MCP, vector, FTS, or encryption unless the user prompt asks for those.

New schema → new `migrations/00N_name.sql` (do not edit old ones). `await ensureMigrations()` before the first query.

SQL: SQLite types (`TEXT`, `INTEGER`, `REAL`). Parameterized `?` only — never string-concat values. Tables need a rowid (use `INTEGER PRIMARY KEY`; no `WITHOUT ROWID`). UTF-8. One statement per `db.execute()`; several writes → `db.batch`. Migrations may use `executeMultiple`.

```ts
import { createServerFn } from '@tanstack/react-start'
import { db } from '#/lib/db'
import { ensureMigrations } from '#/lib/migrate'

export const listItems = createServerFn({ method: 'GET' }).handler(async () => {
  await ensureMigrations()
  const result = await db.execute({
    sql: 'SELECT id, title FROM items ORDER BY created_at DESC',
  })
  return result.rows
})

export const insertItem = createServerFn({ method: 'POST' }).handler(
  async ({ data }: { data: { title: string } }) => {
    await ensureMigrations()
    await db.execute({
      sql: 'INSERT INTO items (title) VALUES (?)',
      args: [data.title],
    })
  },
)
```

Do not put `TURSO_*` in source or chat. “Unable to connect” = fix the server handler, do not skip the database.
