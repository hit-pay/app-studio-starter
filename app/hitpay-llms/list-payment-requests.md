# List Payment Requests

`GET /v1/payment-requests` — paginated payment requests. Scope: `payments:read`. One page unless the user asked for another. No filter-by-id list.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const listPaymentRequests = createServerFn({ method: 'GET' })
  .inputValidator((data: { page?: number; search?: string } = {}) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const query = new URLSearchParams()
    query.set('current_page', String(data.page ?? 1))
    query.set('per_page', '10')
    if (data.search) query.set('search', data.search)
    const response = await hitpayRequest(`/v1/payment-requests?${query}`)
    if (!response.ok) throw new Error('Could not load payment requests.')
    return response.json()
  })
```

## Query

| Name | Type | Notes |
|---|---|---|
| `per_page` | integer | Default `10`, max `100` |
| `current_page` | integer | Default `1` |
| `search` | string | Max 255 |
| `is_default` | boolean | Filter custom/link channel |
| `metadata` | object | Key-value filter |

## Response

Paginated `{ data, links, meta }`. Each item is a payment request (see `get-payment-request`).


## App rules

- Call only from `createServerFn`. Never return connector tokens to the browser.
- Never invent another path. Never implement HTTP DELETE.
