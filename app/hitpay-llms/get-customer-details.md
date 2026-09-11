# Get Customer Details

`GET /v1/customers/{customer_id}` — one customer.

Call only from `createServerFn` via `hitpayRequest` in `#/lib/server/hitpay-api`.

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

Do not list `/v1/customers` to load one id.

## Path

| Name | Type |
|---|---|
| `customer_id` | UUID |

## Response

**200** — one customer object (not wrapped in `{ data }`). Same fields as each `list-customers` `data[]` item.

**404** — customer not found or not owned by the business.

## App rules

- Use after the merchant already has the id (picker or Turso).
- Never invent another customer-detail path.
