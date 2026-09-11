# List Discounts

`GET /v1/discounts` — Scope: `commerce:read`.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const listDiscounts = createServerFn({ method: 'GET' })
  .inputValidator((data: { keywords?: string; currency?: string; pos_discount?: boolean } = {}) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const query = new URLSearchParams()
    query.set('per_page', '10')
    query.set('page', '1')
    if (data.keywords) query.set('keywords', data.keywords)
    if (data.currency) query.set('currency', data.currency)
    if (data.pos_discount != null) query.set('pos_discount', data.pos_discount ? '1' : '0')
    const response = await hitpayRequest(`/v1/discounts?${query}`)
    if (!response.ok) throw new Error('Could not load discounts.')
    return response.json()
  })
```

## Query

| Name | Type | Notes |
|---|---|---|
| `pos_discount` | boolean | POS-only discounts |
| `currency` | string | |
| `keywords` | string | |
| `page` / `current_page` | integer | |
| `per_page` | integer | Default 10 |

## Response

| Field | Type |
|---|---|
| `id` | UUID |
| `name` / `description` | string |
| `minimum_cart_amount` / `minimum_cart_amount_readable` | |
| `fixed_amount` / `fixed_amount_readable` | |
| `percentage` | number |
| `currency` | string |
| `is_currency_null` | boolean |
| `discount_type` | string |
| `pos_discount` | boolean |
| `applies_to_ids` | array |
| `created_at` / `updated_at` | datetime |


## App rules

- Call only from `createServerFn`. Never return connector tokens to the browser.
- Never invent another path. Never implement HTTP DELETE.
- Browse via ResourcePicker (matching type). This list path is for the picker loader or a one-page sheet/wake — not a generated catalog UI.
