# Turso Query

No MCP tool, no proxy call. `TURSO_DATABASE_URL` / `TURSO_AUTH_TOKEN` are
baked into this sprite's env, so the server connects directly.

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
