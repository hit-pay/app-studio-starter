# Update Order

`PATCH /v1/orders/{order_id}` — update an order. Scope: `commerce:update`. Closed / paid orders may reject line changes. Do not DELETE.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const updateOrder = createServerFn({ method: 'POST' })
  .inputValidator((data: { orderId: string; customer_id?: string; remark?: string; discount_amount?: number; discount_reason?: string }) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const { orderId, ...body } = data
    const response = await hitpayRequest(`/v1/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!response.ok) throw new Error('Could not update order.')
    return response.json()
  })
```

## Path

| Name | Type |
|---|---|
| `order_id` | UUID |

## Body

| Name | Type | Notes |
|---|---|---|
| `customer_id` | UUID | |
| `remark` | string | Max 255 |
| `discount_amount` | number | 0–100 |
| `discount_reason` | string | Required with discount |

**200** — updated order.


## App rules

- Call only from `createServerFn`. Never return connector tokens to the browser.
- Never invent another path. Never implement HTTP DELETE.
