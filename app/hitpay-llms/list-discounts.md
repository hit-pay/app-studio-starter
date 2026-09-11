# List Discounts

`GET /v1/discounts` — paginated discounts.

Call only from `createServerFn` via `hitpayRequest` in `#/lib/server/hitpay-api`.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const listDiscounts = createServerFn({ method: 'GET' })
  .inputValidator((data: { keywords?: string; pos_discount?: boolean } = {}) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const query = new URLSearchParams()
    query.set('per_page', '10')
    if (data.keywords) query.set('keywords', data.keywords)
    if (data.pos_discount === true) query.set('pos_discount', '1')
    if (data.pos_discount === false) query.set('pos_discount', '0')
    const response = await hitpayRequest(`/v1/discounts?${query}`)
    if (!response.ok) throw new Error('Could not load discounts.')
    return response.json()
  })
```

## Query

| Name | Type | Notes |
|---|---|---|
| `pos_discount` | boolean | `1` POS, `0` not POS |
| `currency` | string | 3-letter, lowercased. Filters discounts for that checkout currency |
| `keywords` | string | `name` or `description` LIKE |
| `perPage` / `per_page` | integer | Default `10`, max `100` |
| `page` / `current_page` | integer | Default `1` |

Sorted by `id` desc.

## Response

Length-aware `{ data, links, meta }`.

### Discount

| Field | Type | Notes |
|---|---|---|
| `id` | UUID | |
| `business_id` | UUID | |
| `name` | string | |
| `description` | string \| null | |
| `minimum_cart_amount` | integer \| null | Minor units |
| `fixed_amount` | integer \| null | Minor units |
| `fixed_amount_readable` | number | Major units |
| `minimum_cart_amount_readable` | number | Major units |
| `percentage` | number \| null | |
| `currency` | string \| null | Effective currency |
| `is_currency_null` | boolean | Legacy row with null stored currency |
| `is_promo_banner` | boolean | |
| `banner_text` | string \| null | |
| `created_at` / `updated_at` | datetime | |
| `starts_at` / `ends_at` | datetime \| null | |
| `discount_type` | string | |
| `deleted_at` | datetime \| null | |
| `applies_to_ids` | array \| null | |
| `applies_to_type_name` | string | Display name for `discount_type` |
| `pos_discount` | boolean | |

## App rules

- ResourcePicker `discount` is the only generated-screen list.
