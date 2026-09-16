# Turso Query

MCP tool: `turso_query`

Proxy endpoint:

```text
POST /api/apps/{app}/integrations/turso/query
```

Authentication:

```http
Authorization: Bearer {appToken}
```

Use it for a parameterized SQL statement against the authenticated app
database. Runtime app code should use the server-only `db.execute()` facade,
which routes through the App Studio proxy.
