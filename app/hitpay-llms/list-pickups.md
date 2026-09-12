# List Pickups

`GET /v1/pickups` — paginated pickup methods that have a location.

Call only from `createServerFn` via `hitpayRequest` in `#/lib/server/hitpay-api`.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const listPickups = createServerFn({ method: 'GET' })
  .validator((data: { page?: number } = {}) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const query = new URLSearchParams()
    query.set('per_page', '20')
    query.set('page', String(data.page ?? 1))
    const response = await hitpayRequest(`/v1/pickups?${query}`)
    if (!response.ok) throw new Error('Could not load pickups.')
    return response.json()
  })
```

## Query

| Name | Type | Notes |
|---|---|---|
| `perPage` / `per_page` | integer | Default `20`, max `100` |
| `page` | integer | |

No keyword filter. Only pickups whose location belongs to the business. Sorted by `created_at` desc.

## Response

Length-aware `{ data, links, meta }`.

### Pickup

| Field | Type | Notes |
|---|---|---|
| `id` | UUID | |
| `name` | string | |
| `address` | string \| null | Location full address, else stored pickup address |
| `slots` | unknown | |
| `fulfilment_time_min` / `fulfilment_time_max` | integer \| null | |
| `cut_off_time` | string \| null | |
| `blackout_dates` | unknown | |
| `status` | `active` \| `inactive` | `inactive` if the location is inactive |
| `location` | Location \| `1` | Location object when loaded; `1` if the relation is missing |
| `created_at` / `updated_at` | datetime \| null | Atom |

Location object (when present) is the same location shape as `list-locations` (no product `inventory` pivot).

## App rules

- `PickupSelect` is the only generated-screen list.
