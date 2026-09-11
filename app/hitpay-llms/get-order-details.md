# Get Order Details

`GET /v1/orders/{order_id}` — one order including line items and payments.

Call only from `createServerFn` via `hitpayRequest` in `#/lib/server/hitpay-api`. Do not fetch docs.hitpayapp.com from the running app.

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

`order_id` is required (UUID). Do not call `GET /v1/orders` for a single record.

## Path

| Name | Type | Notes |
|---|---|---|
| `order_id` | UUID | HitPay order id |

## Responses

**200** — one order object (not a `{ data }` list). Same fields as `list-orders`: `id`, `order_display_number`, `channel`, `status`, `currency`, `amount`, `subtotal`, `line_items`, `products`, `charges`, `customer`, `payment_status`, `fulfilment_status`, totals, `order_form`, dates.

**404** — missing order:

```json
{ "message": "No query results for model [App\\Business\\Order] 99daaa99-0ccb-4e46-82bd-7a4347957e0a" }
```

## App rules

- Use this for show/edit loaders. Use `list-orders` for browse.
- You may snapshot the order into Turso for a local working set. Keep the HitPay `id`.
- Prefer the Turso snapshot on later reads when the workflow does not need a fresh pull.
- Never invent another order-detail path. Never return connector tokens to the browser.
