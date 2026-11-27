---
name: api
description: Add a backend API route with Bun.serve's routes and call it from a page with the typed client. Use when a feature reads or writes data, checks permissions, or talks to HitPay or an integration.
---

# API

The backend is Bun.serve's own router, under `/api`. One resource per file in `backend/src/routes`, exporting its handlers by method, and its path mapped in `backend/src/index.ts`. The frontend calls it through `call` from `@/lib/api`, typed from that map, so a route change shows up as a type error in the page that calls it.

## 1. Route (backend)

`backend/src/routes/shifts.ts`:

```ts
import { json, route } from '../lib/app.ts'
import { db } from '../lib/db.ts'
import { jsonBody, requiredString } from '../lib/validate.ts'

type Shift = { id: string; staffId: string; startsAt: string }

/** /api/shifts */
export const shifts = {
  GET: route(async () => {
    const { rows } = await db.execute('SELECT id, staff_id, starts_at FROM shifts ORDER BY starts_at DESC LIMIT 50')
    return json<Shift[]>(rows.map((row) => ({ id: String(row.id), staffId: String(row.staff_id), startsAt: String(row.starts_at) })))
  }),

  POST: route(
    async (c) => {
      const input = await jsonBody(c.req)
      const staffId = requiredString(input.staffId, 'Staff')
      const startsAt = requiredString(input.startsAt, 'Start time')
      const id = crypto.randomUUID()
      await db.execute({ sql: 'INSERT INTO shifts (id, staff_id, starts_at, created_by) VALUES (?, ?, ?, ?)', args: [id, staffId, startsAt, c.user.id] })
      return json({ id }, 201)
    },
    { roles: ['Owner', 'Manager'] },
  ),
}

/** /api/shifts/:id */
export const shift = {
  DELETE: route<'/api/shifts/:id', Response>(async (c) => {
    await db.execute({ sql: 'DELETE FROM shifts WHERE id = ?', args: [c.params.id] })
    return new Response(null, { status: 204 })
  }),
}
```

Map them in `backend/src/index.ts`, above `'/api/*'`: `'/api/shifts': shifts, '/api/shifts/:id': shift`.

Rules:

* Every handler is made with `route()`. It reads the signed-in user (`c.user`), gives the host client (`c.host`), and checks `roles` when given.
* `c` also has `c.req` (the Request), `c.params` (`:id` and the like, typed from the path you pass as `route<'/api/shifts/:id', …>`) and `c.query` (URLSearchParams).
* Return JSON with `json(data)` or `json(data, 201)`: its type is what the page's `call()` gets.
* For a problem the user should see, `throw new HttpError(400, '…')` (from `../lib/app.ts`). The message reaches the page.
* Read input only through `backend/src/lib/validate.ts`: `jsonBody(c.req)` for a JSON body, then `requiredString`, `optionalString`, `requiredNumber`, `oneOf`. A bad value answers 400. Never trust input that did not pass them.
* HitPay data: `await c.host.get<{ members: Staff[] }>('/staff-app-members')`.
* Integrations: `nangoAction(c.host, 'google-mail__list-messages', { maxResults: 20 })` or `nangoRequest(c.host, { integration: 'hitpay', path: '/v1/products' })` from `../lib/integrations.ts`. See the Integrations section of `AGENTS.md`.

## 2. Page (frontend)

```tsx
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { call } from '@/lib/api'

function Shifts() {
  const queryClient = useQueryClient()
  const shifts = useQuery({ queryKey: ['shifts'], queryFn: () => call('GET', '/api/shifts') })
  const add = useMutation({
    mutationFn: (input: { staffId: string; startsAt: string }) => call('POST', '/api/shifts', { body: input }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['shifts'] }),
  })
  // shifts.isPending → loading, shifts.error?.message → error, shifts.data?.length === 0 → empty,
  // add.error?.message → show next to the form, add.isPending → disable the button.
}
```

Path params: `call('DELETE', '/api/shifts/:id', { params: { id } })`. Query strings: `call('GET', '/api/files', { query: { … } })`.
