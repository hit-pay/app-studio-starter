---
name: database
description: Turso/libSQL helpers, migrations, and server-only persistence. Use when adding tables, queries, createServerFn data access, or persisting user-created data.
---

# Database

Use existing server helpers and Turso patterns. Keep secrets and server-only code under `src/lib/server`. UI must not import `#/lib/server`.

Read `process.env` only in `#/lib/server`. Turso uses `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` from the host process. Do not create a `.env` file.

## Helpers

`#/lib/server/db` exports `db` and `ensureMigrations`.

```ts
const result = await db.execute({ sql: 'SELECT id, name FROM items WHERE status = ?', args: ['active'] })
result.rows[0].name

await db.batch([
  { sql: 'UPDATE items SET status = ? WHERE id = ?', args: ['archived', id] },
  { sql: 'INSERT INTO item_events (item_id, type) VALUES (?, ?)', args: [id, 'archived'] },
])
```

`db.execute` / `db.batch` apply pending `migrations/*.sql` first (filename stored in `_migrations`).

## Published app limits

The published app runs in a sandbox (see "Published app runtime" in `AGENTS.md`):

- Ids: `randomUUID()`. For bulk inserts, SQLite can also create the id: `INSERT INTO items (id, name) VALUES (lower(hex(randomblob(16))), ?)`.
- Lists: page with `LIMIT ? OFFSET ?` and select only the columns the page shows.
- Files: use `useFiles` from `#/lib/files`. Do not store files or base64 text in other tables.

## Migrations

- New schema = new numbered file (`002_….sql`).
- Never modify an already-applied migration.
- Prefer `IF NOT EXISTS`.
- Do not wrap files in `BEGIN` / `COMMIT`.
- SQLite / libSQL only.

After schema work: `bun run migrate`, then `bun run build`. Fix failures.

Persist user-created data when the request requires persistence.
