# Turso Batch

MCP tool: `turso_batch`

Proxy endpoint:

```text
POST /api/apps/{app}/integrations/turso/batch
```

Authentication:

```http
Authorization: Bearer {appToken}
```

Use it for related parameterized SQL operations. Runtime app code should use
the server-only `db.batch()` facade.
