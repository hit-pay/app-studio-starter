# List Customers

`GET /v1/customers` — list all customers with pagination.

Call only from `createServerFn` via `hitpayRequest` in `#/lib/server/hitpay-api`. Do not fetch docs.hitpayapp.com from the running app.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const listCustomers = createServerFn({ method: 'GET' })
  .inputValidator((data: { page?: number } = {}) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const query = new URLSearchParams()
    query.set('page', String(data.page ?? 1))
    query.set('per_page', '25')
    const response = await hitpayRequest(`/v1/customers?${query}`)
    if (!response.ok) throw new Error('Could not load customers.')
    return response.json() as Promise<ListCustomersResponse>
  })
```

Use `per_page` (underscore), not `perPage`.

## Query

| Name | Type | Notes |
|---|---|---|
| `page` | number | Default `1` |
| `per_page` | number | Default `10` |

## Response

```ts
type ListCustomersResponse = {
  data: HitPayCustomer[]
  links: { first: unknown; last: unknown; prev: unknown; next: string | null }
  meta: {
    path: string
    per_page: number
    next_cursor: string | null
    prev_cursor: unknown
  }
}
```

### Customer

| Field | Type |
|---|---|
| `id` | string |
| `name` | string |
| `birth_date` | string |
| `gender` | string |
| `email` | string |
| `phone_number` | string |
| `phone_number_country_code` | string |
| `remark` | string |
| `address` | `{ city, state, street, postal_code, country? }` |
| `created_at` / `updated_at` | string |

## App rules

- Use this for browse / pickers. Use `get-customer-details` for one customer.
- Snapshot customers into Turso when the workflow needs a local working set. Keep the HitPay `id`.
- Do not refetch `/v1/customers` on every row after a snapshot exists.
- Never invent another customers list path. Never return connector tokens to the browser.
