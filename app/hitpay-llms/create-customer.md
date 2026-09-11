# Create Customer

`POST /v1/customers` — create a customer with name, email, and phone.

Call only from `createServerFn` via `hitpayRequest` in `#/lib/server/hitpay-api`. Body is JSON. Do not fetch docs.hitpayapp.com from the running app.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const createCustomer = createServerFn({ method: 'POST' })
  .inputValidator((data: { email: string; phone_number: string; name?: string }) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const response = await hitpayRequest('/v1/customers', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('Could not create customer.')
    return response.json()
  })
```

## Body (`application/json`)

Required: `email`, `phone_number`.

| Name | Type | Notes |
|---|---|---|
| `name` | string | |
| `email` | string | Required |
| `phone_number` | string | Required |
| `phone_number_country_code` | string | |
| `remark` | string | Max 255 |
| `birth_date` | date | `YYYY-MM-DD` |
| `gender` | string | |
| `address` | object | If sent, requires `city`, `state`, `street`, `postal_code`; `country` optional |

## Response

**201** — created customer (same shape as a list-customers item). Not wrapped in `{ data }`.

## App rules

- After a successful create, you may snapshot the returned customer into Turso (keep the HitPay `id`).
- Never invent another create-customer path. Never return connector tokens to the browser.
