# Database (Turso)

No MCP tool, no proxy call. `TURSO_DATABASE_URL` / `TURSO_AUTH_TOKEN` are
baked into this sprite's env, so the server connects directly.

## Query

Runtime app code should use the server-only `db.execute()` facade
(`#/server/lib/db`) for a single parameterized SQL statement. It applies
pending `migrations/` first, then runs the statement against Turso.

```ts
const result = await db.execute({
  sql: 'SELECT id, name FROM items WHERE status = ?',
  args: ['active'],
})

// result.rows[i] supports both array index and column-name access
result.rows[0].name
result.rows[0][1]
```

## Batch

Runtime app code should use the server-only `db.batch()` facade
(`#/server/lib/db`) for related parameterized SQL statements executed
together in a write transaction. It applies pending `migrations/` first.

```ts
await db.batch([
  { sql: 'UPDATE items SET status = ? WHERE id = ?', args: ['archived', id] },
  { sql: 'INSERT INTO item_events (item_id, type) VALUES (?, ?)', args: [id, 'archived'] },
])
```

## Migrations

Runtime: `db.execute()` / `db.batch()` already call `ensureMigrations()`
before touching the database, which applies any pending `migrations/*.sql`
files as one atomic batch and records the filename in `_migrations`.

Run `bun run migrate` to apply pending migrations standalone, before
`bun run build` — this surfaces a broken migration immediately instead of on
the app's first request.

Rules for `migrations/*.sql`:

- SQLite / libSQL only (not Postgres).
- New schema = a new numbered file (`002_….sql`). Do not rewrite a file that
  may already be recorded in `_migrations`.
- Prefer `CREATE TABLE IF NOT EXISTS` and `CREATE INDEX IF NOT EXISTS`.
- Do not wrap files in `BEGIN` / `COMMIT` — the runner applies statements as one
  migration batch and then records the filename.
