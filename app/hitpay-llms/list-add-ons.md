# List Add-ons

`GET /v1/add-ons` — Scope: `commerce:read`.

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

## Query

| Name | Type | Notes |
|---|---|---|
| `product_id` | UUID | Add-ons for one product |
| `per_page` | integer | 1–100, default 20 |
| `page` | integer | |
| `keywords` | string | |
| `exclude_product_ids[]` | UUID[] | |
| `with_products` | boolean | Include `products[]` |

Paginated add-on rows; optional `products` / `pivot` when `with_products`.


## App rules

- Call only from `createServerFn`. Never return connector tokens to the browser.
- Never invent another path. Never implement HTTP DELETE.
- Browse via ResourcePicker (matching type). This list path is for the picker loader or a one-page sheet/wake — not a generated catalog UI.
