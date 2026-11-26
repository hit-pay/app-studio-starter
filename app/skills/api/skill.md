---
name: api
description: Add a backend API route with Hono and call it from a page with the typed client. Use when a feature reads or writes data, checks permissions, or talks to HitPay or an integration.
---

# API

The backend is Hono, under `/api`. One resource per file in `backend/src/routes`, mounted in `backend/src/index.ts`. The frontend calls it through `api` and `call` from `@/lib/api`, typed from the routes, so a route change shows up as a type error in the page that calls it.

## 1. Route (backend)

`backend/src/routes/shifts.ts`:

```ts
import { validator } from 'hono/validator'

import { router } from '../lib/app.ts'
import { requireRoles } from '../lib/auth.ts'
import { db } from '../lib/db.ts'
import { object, requiredString } from '../lib/validate.ts'

export const shifts = router()
  .get('/', async (c) => {
    const { rows } = await db.execute('SELECT id, staff_id, starts_at FROM shifts ORDER BY starts_at DESC LIMIT 50')
    return c.json(rows.map((row) => ({ id: String(row.id), staffId: String(row.staff_id), startsAt: String(row.starts_at) })))
  })
  .post(
    '/',
    requireRoles('Owner', 'Manager'),
    validator('json', (body) => {
      const input = object(body)
      return { staffId: requiredString(input.staffId, 'Staff'), startsAt: requiredString(input.startsAt, 'Start time') }
    }),
    async (c) => {
      const { staffId, startsAt } = c.req.valid('json')
      const id = crypto.randomUUID()
      await db.execute({ sql: 'INSERT INTO shifts (id, staff_id, starts_at, created_by) VALUES (?, ?, ?, ?)', args: [id, staffId, startsAt, c.var.user.id] })
      return c.json({ id }, 201)
    },
  )
```

Mount it in `backend/src/index.ts` with `.route('/shifts', shifts)`, chained with the others so its type reaches the frontend.

Rules:

* Return JSON with `c.json(...)`. For a problem the user should see, `throw new HTTPException(400, { message: '…' })` (from `hono/http-exception`); the message reaches the page.
* What the validator returns is what the route sees and what the typed client expects. Never trust input that did not pass a validator.
* HitPay data: `await c.var.host.get<{ members: Staff[] }>('/staff-app-members')`.
* Integrations: `callNangoTool(c.var.host, 'tool-name', { … })` from `../lib/integrations.ts`.

## 2. Page (frontend)

```tsx
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { api, call } from '@/lib/api'

function Shifts() {
  const queryClient = useQueryClient()
  const shifts = useQuery({ queryKey: ['shifts'], queryFn: () => call(api.shifts.$get()) })
  const add = useMutation({
    mutationFn: (input: { staffId: string; startsAt: string }) => call(api.shifts.$post({ json: input })),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['shifts'] }),
  })
  // shifts.isPending → loading, shifts.error?.message → error, shifts.data?.length === 0 → empty,
  // add.error?.message → show next to the form, add.isPending → disable the button.
}
```

Path params: `api.shifts[':id'].$delete({ param: { id } })`. Query strings: `api.files.$get({ query: { … } })`.
