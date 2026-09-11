# Get Location

`GET /v1/locations/{location_id}` — one outlet. Scope: `commerce:read`. Cashiers/managers only see assigned locations.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const getLocation = createServerFn({ method: 'GET' })
  .inputValidator((data: { locationId: string }) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const response = await hitpayRequest(`/v1/locations/${data.locationId}`)
    if (response.status === 404) throw new Error('Location not found.')
    if (!response.ok) throw new Error('Could not load location.')
    return response.json()
  })
```

Prefer ResourcePicker `location`. Do not list-sync then GET every id.

## Path

| Name | Type |
|---|---|
| `location_id` | UUID |

## Response

**200** — one location.

| Field | Type | Notes |
|---|---|---|
| `id` | UUID | |
| `business_id` | UUID | |
| `name` | string | |
| `street` / `city` / `state` / `country` / `postal_code` | string | |
| `active` | boolean | |
| `inventory` | object \| null | Pivot when loaded |
| `pickups` | array | |
| `created_at` / `updated_at` | datetime | |


## App rules

- Call only from `createServerFn`. Never return connector tokens to the browser.
- Never invent another path. Never implement HTTP DELETE.
