# Get Order Details

`GET /v1/orders/{order_id}` — one order.

Call only from `createServerFn` via `hitpayRequest` in `#/lib/server/hitpay-api`.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const getOrder = createServerFn({ method: 'GET' })
  .inputValidator((data: { orderId: string }) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const response = await hitpayRequest(`/v1/orders/${data.orderId}`)
    if (response.status === 404) throw new Error('Order not found.')
    if (!response.ok) throw new Error('Could not load order.')
    return response.json()
  })
```

Do not list `/v1/orders` to load one id.

## Path

| Name | Type |
|---|---|
| `order_id` | UUID |

## Query

| Name | Type | Notes |
|---|---|---|
| `with_request_details` | boolean | Adds `request` (ip, method, url, device) |

## Response

**200** — one order object (not wrapped in `{ data }`). Same nested fields as each `list-orders` `data[]` item.

**404** — order not found.

## App rules

- Use after the merchant already has the id (picker or Turso).
- Never invent another order-detail path.
