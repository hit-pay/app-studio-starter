# HitPay Roles

MCP tool: `hitpay_list_roles`

Proxy endpoint:

```text
GET /api/apps/{app}/roles
```

The response is scoped to the currently authenticated user, business, and
App Studio app:

```json
{
  "roles": [
    {
      "id": "role_123",
      "title": "Admin"
    }
  ]
}
```

Each role contains:

- `id`: role ID.
- `title`: display title used by the starter role checks.

The endpoint returns at most the roles available to the authenticated
business/app context. Do not accept a role ID or business ID from untrusted
client input as proof of authorization.

The request requires the short-lived App Studio `appToken`:

```http
Authorization: Bearer {appToken}
```

The MCP tool currently has no arguments. Use the schema advertised by the MCP
server as the runtime source of truth.
