# List Coupons

`GET /v1/coupons` — paginated coupons.

Call only from `createServerFn` via `hitpayRequest` in `#/lib/server/hitpay-api`.

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
| `keywords` | string | `name` LIKE |
| `perPage` / `per_page` | integer | Default `10`, max `100` |
| `page` | integer | |

Sorted by `id` desc. Promotions are eager-loaded internally but not in the list JSON.

## Response

Length-aware `{ data, links, meta }`.

### Coupon (list)

| Field | Type |
|---|---|
| `id` | UUID |
| `business_id` | UUID |
| `name` | string |
| `code` | string |
| `fixed_amount` | number \| null |
| `percentage` | number \| null |
| `coupons_left` | integer \| null |
| `is_promo_banner` | boolean |
| `banner_text` | string \| null |
| `created_at` / `updated_at` | datetime |
| `starts_at` / `ends_at` | datetime \| null |
| `coupon_type` | string \| null |
| `minimum_cart_amount` | number \| null |
| `deleted_at` | datetime \| null |

List rows do **not** include `applies_to_ids`.

## App rules

- ResourcePicker `coupon` is the only generated-screen list.
