---
description: HitPay signed-in user, roles, and staff/members. Use only when the app needs who is logged in, role gates, or a teammate roster.
---

# HitPay

Import `#/lib/hitpay` in **client** components only (`useEffect` / clicks). Never from `createServerFn` or a loader (that throws “socket connection was closed”).

```ts
import { fetchUserInfo, fetchAppRoles, fetchAppMembers } from '#/lib/hitpay'
```

- **Auth / current user** — `fetchUserInfo()` → `{ id, email, name, role: { id, title } }`. Gate UI with `role.title`.
- **Roles** — `fetchAppRoles()` → `{ roles: [{ id, title }] }`
- **Staff / members** — `fetchAppMembers()` → `{ members: [{ id, email, name, role_id }] }`. Join `role_id` to `roles` for titles.

Role-based apps need **frontend and backend**. UI gates (`disabled`, hidden nav) are not sufficient. Mutating `createServerFn` handlers must receive `role.title` from the client (after `fetchUserInfo`) and reject if it is not in the allowlist for that action. Do not skip the server check.

Do not invent login screens. Store app data in Turso, not in these endpoints.
