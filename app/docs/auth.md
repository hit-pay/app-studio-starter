# App Studio Auth / Current User

Endpoint:

```text
GET /api/apps/{app}/current-user
```

This endpoint uses the `app_studio_user_token` HttpOnly cookie. `{app}` is
`APP_STUDIO_APP_ID`.

The response is the current user and their effective app role:

```json
{
  "id": "user_123",
  "email": "owner@example.com",
  "name": "Example Owner",
  "role": {
    "id": "role_123",
    "title": "Owner"
  }
}
```

Field meanings:

- `id`: authenticated Laravel user ID.
- `email`: authenticated user's email address.
- `name`: user's display name, or `null`.
- `role`: effective role for this app, or `null`.
- `role.id`: role ID.
- `role.title`: role title used by the starter's role checks.

This endpoint returns user profile only. Proxy Bearer tokens come from
`getAppToken()` in `#/server/lib/app-api`. Keep tokens on the server.

Success is `200` JSON. Missing or expired session is an auth error.
