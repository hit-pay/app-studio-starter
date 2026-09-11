# List Coupons

`GET /v1/coupons` — Scope: `commerce:read`. Paginated, default `per_page` 10, max 100.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const listCoupons = createServerFn({ method: 'GET' })
  .inputValidator((data: { keywords?: string } = {}) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const query = new URLSearchParams()
    query.set('per_page', '10')
    if (data.keywords) query.set('keywords', data.keywords)
    const response = await hitpayRequest(`/v1/coupons?${query}`)
    if (!response.ok) throw new Error('Could not load coupons.')
    return response.json()
  })
```

## Query

| Name | Type | Notes |
|---|---|---|
| `keywords` | string | Search |
| `per_page` | integer | Default 10, max 100 |
| `page` | integer | |

## Response

Paginated. Coupon fields:

| Field | Type | Notes |
|---|---|---|
| `id` / `business_id` | UUID | |
| `name` / `code` | string | |
| `fixed_amount` / `percentage` | number | |
| `coupons_left` | integer \| null | |
| `is_promo_banner` / `banner_text` | | |
| `coupon_type` | string | |
| `minimum_cart_amount` | number | |
| `applies_to_ids` | array | |
| `starts_at` / `ends_at` / `created_at` / `updated_at` | datetime | |


## App rules

- Call only from `createServerFn`. Never return connector tokens to the browser.
- Never invent another path. Never implement HTTP DELETE.
- Browse via ResourcePicker (matching type). This list path is for the picker loader or a one-page sheet/wake — not a generated catalog UI.
