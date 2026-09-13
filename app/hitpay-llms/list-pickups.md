# List Pickups

`GET /v1/pickups` — Scope: `commerce:read`. Paginated, default 20.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const listPickups = createServerFn({ method: 'GET' }).handler(async () => {
  await requireHitPayRoles(HITPAY_ALL_ROLES)
  const query = new URLSearchParams({ per_page: '20', page: '1' })
  const response = await hitpayRequest(`/v1/pickups?${query}`)
  if (!response.ok) throw new Error('Could not load pickups.')
  return response.json()
})
```

## Response

| Field | Type |
|---|---|
| `id` | UUID |
| `name` / `address` | string |
| `slots` | array |
| `fulfilment_time_min` / `fulfilment_time_max` | |
| `cut_off_time` | |
| `blackout_dates` | array |
| `status` | string |
| `location` | object \| null |
| `created_at` / `updated_at` | datetime |


## App rules

- Call only from `createServerFn`. Never return connector tokens to the browser.
- Never invent another path. Never implement HTTP DELETE.
- Browse via ResourcePicker (matching type). This list path is for the picker loader or a one-page sheet/wake — not a generated catalog UI.
