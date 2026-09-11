# Update Customer

`PATCH /v1/customers/{customer_id}` — update name, email, or phone.

Call only from `createServerFn` via `hitpayRequest` in `#/lib/server/hitpay-api`. Body is JSON. Do not fetch docs.hitpayapp.com from the running app.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const updateCustomer = createServerFn({ method: 'POST' })
  .inputValidator((data: { customerId: string; name?: string; email?: string; phone_number?: string }) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const { customerId, ...fields } = data
    const response = await hitpayRequest(`/v1/customers/${customerId}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(fields),
    })
    if (response.status === 404) throw new Error('Customer not found.')
    if (!response.ok) throw new Error('Could not update customer.')
    return response.json()
  })
```

This is a real HTTP `PATCH` (not product update's `POST` + `_method`). Load the current record with `get-customer-details` before editing.

## Path

| Name | Type | Notes |
|---|---|---|
| `customer_id` | string | HitPay customer id |

## Body (`application/json`)

All fields optional. Send only what changed.

| Name | Type | Notes |
|---|---|---|
| `name` | string | |
| `email` | string | |
| `phone_number` | string | |
| `phone_number_country_code` | string | |
| `remark` | string | |
| `birth_date` | date | `YYYY-MM-DD` |
| `gender` | string | |
| `address` | object | If sent, requires `city`, `state`, `street`, `postal_code`; `country` optional |

## Responses

**200** — updated customer (same shape as `get-customer-details`).

**404** — missing customer:

```json
{ "message": "No query results for model [App\\Business\\Customer] 973ee456-d28f-4418-93c5-d37e4b311685" }
```

## App rules

- After a successful update, refresh any Turso snapshot that stores that HitPay `id`.
- Never invent another update-customer path. Never return connector tokens to the browser.
