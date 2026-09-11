# List Add-ons

`GET /v1/add-ons` — paginated add-ons.

Call only from `createServerFn` via `hitpayRequest` in `#/lib/server/hitpay-api`.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const listAddOns = createServerFn({ method: 'GET' })
  .inputValidator((data: { product_id?: string; keywords?: string } = {}) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const query = new URLSearchParams()
    query.set('per_page', '20')
    query.set('page', '1')
    if (data.product_id) query.set('product_id', data.product_id)
    if (data.keywords) query.set('keywords', data.keywords)
    const response = await hitpayRequest(`/v1/add-ons?${query}`)
    if (!response.ok) throw new Error('Could not load add-ons.')
    return response.json()
  })
```

The list returns a **model paginator** (not the show resource wrapper).

## Query

| Name | Type | Notes |
|---|---|---|
| `product_id` | UUID | Add-ons linked to that product. 404 if the product is not on this business |
| `per_page` / `perPage` | integer | Default `20`, max `100` |
| `page` | integer | Min `1` |
| `keywords` | string | Max 255. Space-split `name` LIKE |
| `exclude_product_ids` | UUID[] | Exclude add-ons linked to these products |
| `with_products` | boolean | Adds `products_count` only — does **not** embed `products[]` |

Sorted by `created_at` desc.

## Response

Length-aware `{ data, links, meta }`.

### Add-on (list)

| Field | Type | Notes |
|---|---|---|
| `id` | UUID | |
| `business_id` | UUID | |
| `name` | string | |
| `option_type` | string | |
| `option_values` | array \| null | JSON options |
| `min_selection` / `max_selection` | integer \| null | |
| `is_required` | boolean | |
| `created_at` / `updated_at` | datetime | |
| `products_count` | integer \| omitted | Only when `with_products` |

## App rules

- ResourcePicker `add-on` is the only generated-screen list.
