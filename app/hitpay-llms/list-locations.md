# List Locations

`GET /v1/locations` — paginated outlets.

Call only from `createServerFn` via `hitpayRequest` in `#/lib/server/hitpay-api`.

Cashiers and managers only receive locations assigned to them.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const listLocations = createServerFn({ method: 'GET' })
  .inputValidator((data: { keywords?: string } = {}) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const query = new URLSearchParams()
    query.set('perPage', '500')
    if (data.keywords) query.set('keywords', data.keywords)
    const response = await hitpayRequest(`/v1/locations?${query}`)
    if (!response.ok) throw new Error('Could not load locations.')
    return response.json()
  })
```

`perPage` and `per_page` both work.

## Query

| Name | Type | Notes |
|---|---|---|
| `keywords` | string | Exact UUID → `id`. Otherwise up to 3 space-separated words on `name` |
| `perPage` / `per_page` | integer | Default `500` |
| `page` | integer | Default `1` |

Sorted by `created_at` desc.

## Response

```ts
type ListLocationsResponse = {
  data: Location[]
  links: { first: string; last: string; prev: string | null; next: string | null }
  meta: {
    current_page: number
    from: number | null
    last_page: number
    path: string
    per_page: number
    to: number | null
    total: number
  }
}
```

### Location

| Field | Type | Notes |
|---|---|---|
| `id` | UUID | |
| `name` | string | |
| `street` | string \| null | |
| `postal_code` | string \| null | |
| `city` | string \| null | |
| `state` | string \| null | |
| `country` | string \| null | |
| `created_at` / `updated_at` | datetime | |
| `active` | boolean | |
| `business_id` | UUID | |
| `inventory` | omitted | Only when this location is nested on a product (pivot) |
| `pickups` | array | `[]` unless pickups were loaded |

## App rules

- ResourcePicker `location` is the only generated-screen list.
- Snapshot from the picker. Never invent another locations path.
