# Get Customer Details

`GET /v1/customers/{customer_id}` — one customer's full details.

Call only from `createServerFn` via `hitpayRequest` in `#/lib/server/hitpay-api`. Do not fetch docs.hitpayapp.com from the running app.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const getCustomer = createServerFn({ method: 'GET' })
  .inputValidator((data: { customerId: string }) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const response = await hitpayRequest(`/v1/customers/${data.customerId}`)
    if (response.status === 404) throw new Error('Customer not found.')
    if (!response.ok) throw new Error('Could not load customer.')
    return response.json()
  })
```

`customer_id` is required. Do not call `GET /v1/customers` for a single record.

## Path

| Name | Type | Notes |
|---|---|---|
| `customer_id` | string | HitPay customer id |

## Responses

**201** (documented success) — one customer object (same fields as `list-customers`). Treat any 2xx as success. Not wrapped in `{ data }`.

**404** — missing customer:

```json
{ "message": "No query results for model [App\\Business\\Customer] 973ee456-d28f-4418-93c5-d37e4b311685" }
```

## App rules

- Use this for show/edit loaders. Use `list-customers` for browse.
- You may snapshot the customer into Turso. Keep the HitPay `id`.
- Prefer the Turso snapshot on later reads when the workflow does not need a fresh pull.
- Never invent another customer-detail path. Never return connector tokens to the browser.
