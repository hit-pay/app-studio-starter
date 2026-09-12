# Get Add-on

`GET /v1/add-ons/{add_on}` — one add-on.

Call only from `createServerFn` via `hitpayRequest` in `#/lib/server/hitpay-api`.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const getAddOn = createServerFn({ method: 'GET' })
  .validator((data: { addOnId: string; withProducts?: boolean }) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const query = new URLSearchParams()
    if (data.withProducts) query.set('with_products', '1')
    const suffix = query.size ? `?${query}` : ''
    const response = await hitpayRequest(`/v1/add-ons/${data.addOnId}${suffix}`)
    if (response.status === 404) throw new Error('Add-on not found.')
    if (!response.ok) throw new Error('Could not load add-on.')
    return response.json()
  })
```

## Path

| Name | Type |
|---|---|
| `add_on` | UUID |

## Query

| Name | Type | Notes |
|---|---|---|
| `with_products` | boolean | `1` / `true` loads `products[]` |

## Response

**200** — one add-on object (not wrapped in `{ data }`).

Same columns as a list row (`id`, `business_id`, `name`, `option_type`, `option_values`, `min_selection`, `max_selection`, `is_required`, timestamps). Empty `option_values` become `null`. `products` is present only when `with_products` is true (`id`, `name`, pivot `order_weight`).

**403** — add-on belongs to another business. **404** — missing.

## App rules

- Use after the merchant already has the id (picker or Turso).
