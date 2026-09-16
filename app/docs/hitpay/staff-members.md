# HitPay Staff App Members

MCP tool: `hitpay_list_staff_members`

Proxy endpoint:

```text
GET /api/apps/{app}/staff-app-members
```

The response contains staff members available to the current business/app
context:

```json
{
  "members": [
    {
      "id": "user_123",
      "name": "Staff Member",
      "role_id": "role_123",
      "role": {
        "id": "role_123",
        "title": "Manager"
      },
      "locations": [
        {
          "id": "location_123",
          "name": "Main outlet"
        }
      ]
    }
  ]
}
```

Each member contains:

- `id`: HitPay user ID.
- `name`: display name, or `null`.
- `role_id`: role ID, or `null`.
- `role`: role object, or `null`.
- `locations`: locations assigned to the staff member.

The endpoint returns at most 500 members. Do not trust a client-provided
`userId`, `staffName`, role, or location as proof of identity or permission.
Use the authenticated session and server-side role checks.

The request requires the short-lived App Studio `appToken`:

```http
Authorization: Bearer {appToken}
```

The MCP tool currently has no arguments. Use the schema advertised by the MCP
server as the runtime source of truth.
