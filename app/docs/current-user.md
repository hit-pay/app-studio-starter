# App Studio Current User

Endpoint:

```text
GET /api/apps/{app}/current-user
```

This endpoint uses the `app_studio_user_token` HttpOnly cookie. Do not send
the Dashboard session cookie or a Bearer token to this endpoint. The `{app}`
value comes from `APP_STUDIO_APP_ID`; do not accept an app ID from user input.

The response contains the current user, the effective app role, and a
short-lived app token:

```json
{
  "id": "user_123",
  "email": "owner@example.com",
  "name": "Example Owner",
  "role": {
    "id": "role_123",
    "title": "Owner"
  },
  "appToken": "<short-lived-app-token>"
}
```

Field meanings:

- `id`: authenticated Laravel user ID.
- `email`: authenticated user's email address.
- `name`: user's display name, or `null`.
- `role`: effective role for this app, or `null`.
- `role.id`: role ID.
- `role.title`: role title used by the starter's role checks.
- `appToken`: token for subsequent proxy API and MCP requests.

Use the app token only as:

```http
Authorization: Bearer <appToken>
```

The starter runtime manages the `app_studio_user_token` cookie. Keep the app
token server-side. Never log, persist, or send it to a provider. Never request or expose
HitPay API keys, Turso URLs, or Turso auth tokens from the starter app.

On success, the endpoint returns `200` with JSON. A missing or expired HitPay
session returns an authentication error. An invalid app access grant must not
be treated as a valid user response.
