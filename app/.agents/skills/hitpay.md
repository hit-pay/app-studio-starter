---
description: Logged-in user and roles. Open only if the prompt needs auth or role gates.
---

# HitPay

Browser only (`useEffect` / clicks). Never import from `createServerFn` / loaders.

```ts
import { fetchUserInfo, fetchAppRoles, fetchAppMembers, useHitPayUser } from '#/lib/hitpay'
```

`fetchUserInfo()` → `{ id, email, name, role: { id, title } }`. Gate UI with `role.title`. If the prompt has roles, also check `role.title` in mutating server handlers (pass it from the client; HitPay cannot run on the server).

No login screen. Layout is still `AppShell` (`screens.md`). Do **not** render a user card in `AppShell` — the dashboard chrome already shows the signed-in user. App data stays in Turso.
