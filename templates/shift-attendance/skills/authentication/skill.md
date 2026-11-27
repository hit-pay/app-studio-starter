---
name: authentication
description: Who is signed in, their role, and how to restrict what each role can see and do. Use when a feature depends on the user or their role.
---

# Authentication

The App Studio host signs the user in. Every request to the backend already carries them:

* Backend: `c.user` is `{ id, email, name, role: { id, title } | null }`.
* Frontend: `useCurrentUser()` from `@/lib/current-user` returns the same user (`data`, `isPending`, `error`).

Role titles: `Owner`, `Admin`, `Manager`, `Cashier` (`ROLES` in `@/lib/types`).

## Restrict an action

Always in the backend, with `requireRoles` on the route:

```ts
import { requireRoles } from '../lib/auth.ts'

router().delete('/:id', requireRoles('Owner', 'Manager'), async (c) => { … })
```

A user without the role gets a 403 with "You do not have permission to do this.", which the page can show.

## Adapt the UI

Hide or disable what the user cannot do, using `useCurrentUser().data?.role?.title`. This is only for a clearer page: the backend check is what protects the data.

## Record who did something

Store `c.user.id` with the row (e.g. `created_by`). Show names with `useStaff()`, matching on `id`.
