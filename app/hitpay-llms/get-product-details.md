# Get Product Details

`GET /v1/products/{product_id}` — one product including variants and images.

Call only from `createServerFn` via `hitpayRequest` in `#/lib/server/hitpay-api`. Do not fetch docs.hitpayapp.com from the running app.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const getProduct = createServerFn({ method: 'GET' })
  .inputValidator((data: { productId: string }) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const response = await hitpayRequest(`/v1/products/${data.productId}`)
    if (response.status === 404) throw new Error('Product not found.')
    if (!response.ok) throw new Error('Could not load product.')
    return response.json()
  })
```

`product_id` is required. Do not call `GET /v1/products` for a single record.

## Path

| Name | Type | Notes |
|---|---|---|
| `product_id` | string | HitPay product id |

## Responses

**200** — one product object (not wrapped in `{ data }`). Same fields as a `list-products` item: `id`, `name`, `headline`, `description`, `currency`, `price`, `price_display`, `price_stored`, `category_id`, `status`, `has_variations`, `variations`, `variation_key_1`…`3`, `images`, `is_published`, `created_at`, `updated_at`, `starts_at`, `ends_at`. `product_weight` and `delivery_method_required` may be null.

**404** — missing product:

```json
{ "message": "No query results for model [App\\Business\\Product]." }
```

## App rules

- Use this for show/edit loaders. Use `list-products` for browse.
- You may snapshot the product into Turso for a local working set. Keep the HitPay `id`.
- Prefer the Turso snapshot on later reads when the workflow does not need a fresh catalog pull.
- Never invent another product-detail path. Never return connector tokens to the browser.
