# List Customers

`GET /v1/customers` — cursor-paginated customers.

Call only from `createServerFn` via `hitpayRequest` in `#/lib/server/hitpay-api`.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const listCustomers = createServerFn({ method: 'GET' })
  .validator((data: { cursor?: string; keywords?: string } = {}) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const query = new URLSearchParams()
    query.set('per_page', '25')
    if (data.cursor) query.set('cursor', data.cursor)
    if (data.keywords) query.set('keywords', data.keywords)
    const response = await hitpayRequest(`/v1/customers?${query}`)
    if (!response.ok) throw new Error('Could not load customers.')
    return response.json()
  })
```

This list is **cursor** pagination. `page` is ignored. Use `per_page` (underscore).

## Query

| Name | Type | Notes |
|---|---|---|
| `per_page` | integer | Default `25`. Allowed: `5`, `10`, `20`, `25`, `50`, `100` |
| `cursor` | string | From `meta.next_cursor` / `links.next` |
| `keywords` | string | Max 100. Comma-separated. Email → `email` LIKE; UUID → `id`; otherwise `name` or `phone_number` LIKE |

Sorted by `created_at` desc.

## Response

```ts
type ListCustomersResponse = {
  data: Customer[]
  links: {
    first: string | null
    last: string | null
    prev: string | null
    next: string | null
  }
  meta: {
    path: string
    per_page: number
    next_cursor: string | null
    prev_cursor: string | null
  }
}
```

### Customer

| Field | Type |
|---|---|
| `id` | UUID |
| `name` | string \| null |
| `birth_date` | string \| null |
| `gender` | string \| null |
| `email` | string | Empty string when missing |
| `phone_number` | string \| null |
| `phone_number_country_code` | string \| null |
| `remark` | string \| null |
| `address` | `{ street, building, street_2, city, state, postal_code, country }` |
| `address_line` | string |
| `created_at` / `updated_at` | datetime | Atom |

`hotglue_customer_id` is selected internally and is **not** in the JSON.

## App rules

- ResourcePicker `customer` is the only generated-screen list.
- Snapshot from the picker. Never invent another customers path.
