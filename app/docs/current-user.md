# App Studio Current User

Endpoint:

```text
GET /api/apps/{app}/current-user
```

This endpoint uses the `app_studio_user_token` HttpOnly cookie. Do not send
the Dashboard session cookie or a Bearer token to this endpoint. The `{app}`
value comes from `APP_STUDIO_APP_ID`; do not accept an app ID from user input.

The response contains only the current user and their effective app role:

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

This endpoint does not return an app token. The short-lived app token is
delivered separately as the `app_studio_app_token` HttpOnly cookie, set by
the App Studio proxy on sprite bootstrap. Read it server-side with
`getAppToken()` from `#/lib/server/app-token` — never fetch this endpoint to
obtain it. Use the app token only as:

```http
Authorization: Bearer <appToken>
```

The starter runtime manages both the `app_studio_user_token` and
`app_studio_app_token` cookies. Keep the app token server-side. Never log,
persist, or send it to a provider. Never request or expose HitPay API keys,
Turso URLs, or Turso auth tokens from the starter app.

On success, the endpoint returns `200` with JSON. A missing or expired HitPay
session returns an authentication error. An invalid app access grant must not
be treated as a valid user response.
