# Create Order

`POST /v1/orders` — create an order. Scope: `commerce:create`. JSON. OAuth cannot send `channel=store_checkout` (403). Do not fetch docs.hitpayapp.com.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const createOrder = createServerFn({ method: 'POST' })
  .inputValidator((data: Record<string, unknown>) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const response = await hitpayRequest('/v1/orders', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (response.status === 422) {
      const error = (await response.json()) as { message?: string }
      throw new Error(error.message ?? 'Order is invalid.')
    }
    if (!response.ok) throw new Error('Could not create order.')
    return response.json()
  })
```

## Body (`application/json`)

| Name | Type | Notes |
|---|---|---|
| `channel` | `point_of_sale` \| `quick_sale` \| `self_serve` | Do not send `store_checkout` |
| `amount` | number | Required for quick sale without line items |
| `currency` | string | |
| `remark` / `order_remark` | string | Max 255 |
| `location_id` | UUID | Exists on business; cashiers must be assigned |
| `customer_id` | UUID | Pick via ResourcePicker |
| `customer_pickup` | boolean | |
| `discount_amount` | number | 0–100 |
| `discount_reason` | string | Required with discount |
| `version` | `1.0` \| `2.0` | |
| `source` | string | Order source enum |
| `quick_sale_line_items` | array | Max 100 |

Pick products / customers / locations with ResourcePicker; POST those ids.

**200** — order object (same fields as `get-order-details` / `list-orders`).


## App rules

- Call only from `createServerFn`. Never return connector tokens to the browser.
- Never invent another path. Never implement HTTP DELETE.
