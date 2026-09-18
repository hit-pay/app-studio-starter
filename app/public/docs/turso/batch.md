# Turso Batch

No MCP tool, no proxy call. `TURSO_DATABASE_URL` / `TURSO_AUTH_TOKEN` are
baked into this sprite's env, so the server connects directly.

Runtime app code should use the server-only `db.batch()` facade
(`#/server/lib/db`) for related parameterized SQL statements executed
together in a write transaction. It applies pending `migrations/` first.

```ts
await db.batch([
  { sql: 'UPDATE items SET status = ? WHERE id = ?', args: ['archived', id] },
  { sql: 'INSERT INTO item_events (item_id, type) VALUES (?, ?)', args: [id, 'archived'] },
])
```
