# List Taxes

`GET /v1/taxes` — paginated tax settings.

Call only from `createServerFn` via `hitpayRequest` in `#/lib/server/hitpay-api`.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const listTaxes = createServerFn({ method: 'GET' })
  .inputValidator((data: { keywords?: string } = {}) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const query = new URLSearchParams()
    query.set('per_page', '25')
    if (data.keywords) query.set('keywords', data.keywords)
    const response = await hitpayRequest(`/v1/taxes?${query}`)
    if (!response.ok) throw new Error('Could not load taxes.')
    return response.json()
  })
```

## Query

| Name | Type | Notes |
|---|---|---|
| `keywords` | string | Space-split; each token is `name` LIKE (AND) |
| `perPage` / `per_page` | integer | Default `5`, max `100` |
| `page` | integer | |

Sorted by `created_at` desc.

## Response

Length-aware `{ data, links, meta }`.

### Tax

| Field | Type | Notes |
|---|---|---|
| `id` | UUID | |
| `name` | string | |
| `rate` | number | Stored rate (not multiplied by 100) |
| `tax_inclusive` | `0` \| `1` | |
| `created_at` / `updated_at` | datetime | Atom |

## App rules

- `TaxSelect` is the only generated-screen list.
