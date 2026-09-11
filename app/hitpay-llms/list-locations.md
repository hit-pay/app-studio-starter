# List Locations

`GET /v1/locations` — paginated locations for the authenticated business.

Call only from `createServerFn` via `hitpayRequest` in `#/lib/server/hitpay-api`. Do not fetch docs.hitpayapp.com from the running app.

Cashiers and managers only see locations assigned to them.

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
    if (response.status === 401) throw new Error('HitPay location access was denied.')
    if (!response.ok) throw new Error('Could not load locations.')
    return response.json() as Promise<ListLocationsResponse>
  })
```

Use `perPage` (camelCase), not `per_page`.

## Query

| Name | Type | Notes |
|---|---|---|
| `keywords` | string | Location name (space-separated) or exact UUID |
| `perPage` | integer | Default `500`, min `1` |

## Responses

**200** — paginated envelope:

```ts
type ListLocationsResponse = {
  data: HitPayLocation[]
  links: {
    first: string
    last: string
    prev: string | null
    next: string | null
  }
  meta: {
    current_page: number
    per_page: number
    from: number
    to: number
    total: number
    last_page: number
    path: string
  }
}
```

### Location

| Field | Type | Notes |
|---|---|---|
| `id` | UUID | Location id |
| `business_id` | UUID | Owning business |
| `name` | string | e.g. `Main Store` |
| `street` | string | |
| `city` | string | |
| `state` | string | |
| `country` | string | Code or name, e.g. `SG` |
| `postal_code` | string | |
| `active` | boolean | |
| `pickups` | array | Pickup configs; empty when not loaded |
| `created_at` / `updated_at` | datetime | |

**401** — missing or invalid API key / OAuth token:

```json
{ "message": "…" }
```

## App rules

- Use location `id` values as `location_ids` on products and as `location_id` on orders.
- Snapshot locations into Turso when the workflow needs a local working set (outlet picker, stock counter). Keep the HitPay `id`.
- Do not refetch `/v1/locations` on every row after a snapshot exists.
- Never invent another locations list path. Never return connector tokens to the browser.
