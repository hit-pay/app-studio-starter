# List Shipping

`GET /v1/shipping` — all shipping methods (not paginated). Path is singular.

Call only from `createServerFn` via `hitpayRequest` in `#/lib/server/hitpay-api`.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const listShipping = createServerFn({ method: 'GET' })
  .inputValidator((data: { currency?: string } = {}) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const query = new URLSearchParams()
    if (data.currency) query.set('currency', data.currency.toLowerCase())
    const response = await hitpayRequest(`/v1/shipping?${query}`)
    if (!response.ok) throw new Error('Could not load shipping.')
    return response.json()
  })
```

## Query

| Name | Type | Notes |
|---|---|---|
| `currency` | string | Optional 3-letter display currency (query string only) |

## Response

```ts
type ListShippingResponse = {
  is_enabled: boolean
  is_can_pick_up: boolean
  shippings: Shipping[]
}
```

Not a `{ data, meta }` list. Use `shippings`.

### Shipping

| Field | Type | Notes |
|---|---|---|
| `id` | UUID | |
| `calculation` | string | |
| `name` | string | |
| `description` | string \| null | |
| `formula` | string \| null | |
| `is_active` | boolean | From `active` |
| `slots` | unknown | |
| `fulfilment_time_min` / `fulfilment_time_max` | integer \| null | |
| `cut_off_time` | string \| null | |
| `blackout_dates` | unknown | |
| `business_currency_price` | object | When the business currency is known |
| `currency` | string \| omitted | Display currency |
| `rate` | integer \| null | Minor units in the display currency |
| `weight_range_pricing` | array \| null | |
| `is_unavailable_for_selected_currency` | boolean | |
| `price_source` | string \| omitted | |
| `countries` | `{ country: string; states: unknown }[]` | Always loaded on this list |
| `created_at` / `updated_at` | datetime | Atom |

## App rules

- `ShippingSelect` is the only generated-screen list.
