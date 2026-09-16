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

Apply ordered migration statements with a migration name. Generated app code
must call `ensureMigrations()` before database access; credentials remain in
the proxy.
