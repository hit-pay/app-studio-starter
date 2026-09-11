# Get Product Details

`GET /v1/products/{product_id}` — one product.

Call only from `createServerFn` via `hitpayRequest` in `#/lib/server/hitpay-api`.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const getProduct = createServerFn({ method: 'GET' })
  .inputValidator((data: { productId: string; currency?: string }) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const query = new URLSearchParams()
    if (data.currency) query.set('currency', data.currency.toLowerCase())
    const suffix = query.size ? `?${query}` : ''
    const response = await hitpayRequest(`/v1/products/${data.productId}${suffix}`)
    if (response.status === 404) throw new Error('Product not found.')
    if (!response.ok) throw new Error('Could not load product.')
    return response.json()
  })
```

Do not call `GET /v1/products` to load one id.

## Path

| Name | Type |
|---|---|
| `product_id` | UUID |

## Query

| Name | Type | Notes |
|---|---|---|
| `currency` | string | Optional 3-letter display currency |
| `location_ids` | UUID[] | Optional. Exactly one UUID scopes top-level `quantity` |

## Response

**200** — one product object (not wrapped in `{ data }`). Same fields as each `list-products` `data[]` item, including `category_id` (category objects), `variations[].values[]`, `locations[].inventory`, images, and `product_add_ons`.

**404** — product not found.

## App rules

- Use after the merchant already has the id (picker or Turso snapshot).
- Never invent another product-detail path. Never return connector tokens to the browser.
