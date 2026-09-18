# Turso Migrations

No MCP tool, no proxy call. `TURSO_DATABASE_URL` / `TURSO_AUTH_TOKEN` are
baked into this sprite's env, so the server connects directly.

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
