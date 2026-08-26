---
description: HitPay signed-in user, roles, and staff/members. Use only when the app needs who is logged in, role gates, or a teammate roster.
---

# HitPay

Import `#/lib/hitpay` in **client** components only (`useEffect` / clicks). Never from `createServerFn` or a loader (that throws “socket connection was closed”).

```ts
import { fetchUserInfo, fetchAppRoles, fetchAppMembers } from '#/lib/hitpay'
```

- **Auth / current user** — `fetchUserInfo()` → `{ id, email, name, role: { id, title } }`. Gate actions with `role.title`.
- **Roles** — `fetchAppRoles()` → `{ roles: [{ id, title }] }`
- **Staff / members** — `fetchAppMembers()` → `{ members: [{ id, email, name, role_id }] }`. Join `role_id` to `roles` for titles.

Do not invent login screens. Store app data in Turso, not in these endpoints.
