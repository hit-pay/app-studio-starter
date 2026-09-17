# Turso Migrations

MCP tool: `turso_apply_migrations`

Proxy endpoint:

```text
POST /api/apps/{app}/integrations/turso/migrations
```

Authentication:

```http
Authorization: Bearer {appToken}
```

Runtime: `db.execute()` / `db.batch()` already call `ensureMigrations()` before
talking to the proxy. Credentials stay in the proxy.

Rules for `migrations/*.sql`:

- SQLite / libSQL only (not Postgres).
- New schema = a new numbered file (`002_….sql`). Do not rewrite a file that
  may already be recorded in `_migrations`.
- Prefer `CREATE TABLE IF NOT EXISTS` and `CREATE INDEX IF NOT EXISTS`.
- Do not wrap files in `BEGIN` / `COMMIT` — the runner applies statements as one
  migration batch and then records the filename.
