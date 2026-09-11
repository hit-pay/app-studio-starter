# Get Product Category

`GET /v1/product-category/{product_category_id}` — one category (path is singular). Scope: `commerce:read`.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const getProductCategory = createServerFn({ method: 'GET' })
  .inputValidator((data: { categoryId: string }) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const response = await hitpayRequest(`/v1/product-category/${data.categoryId}`)
    if (response.status === 404) throw new Error('Category not found.')
    if (!response.ok) throw new Error('Could not load category.')
    return response.json()
  })
```

Prefer ResourcePicker `product-category`.

## Path

| Name | Type |
|---|---|
| `product_category_id` | UUID |

## Response

**200** — one category (children and images loaded).

| Field | Type | Notes |
|---|---|---|
| `id` | UUID | |
| `name` / `handle` / `description` | string | |
| `is_active` | boolean | |
| `order` | integer | |
| `children` | Category[] | Nested |
| `total_products` | integer | |
| `is_parent` | boolean | |
| `image` | object \| null | |
| `channels` | array | |
| `emoji` / `pos_color` | string \| null | |


## App rules

- Call only from `createServerFn`. Never return connector tokens to the browser.
- Never invent another path. Never implement HTTP DELETE.
