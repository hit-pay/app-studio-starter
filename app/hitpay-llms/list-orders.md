# List Orders

`GET /v1/orders` — paginated orders.

Call only from `createServerFn` via `hitpayRequest` in `#/lib/server/hitpay-api`.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const listOrders = createServerFn({ method: 'GET' })
  .validator((data: { keywords?: string; dateFrom?: string; dateTo?: string } = {}) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const query = new URLSearchParams()
    query.set('perPage', '25')
    if (data.keywords) query.set('keywords', data.keywords)
    if (data.dateFrom) query.set('dateFrom', data.dateFrom)
    if (data.dateTo) query.set('dateTo', data.dateTo)
    const response = await hitpayRequest(`/v1/orders?${query}`)
    if (!response.ok) throw new Error('Could not load orders.')
    return response.json()
  })
```

`perPage` is copied to `per_page`. Repeat `statuses` / `statuses[]` and `channels`.

## Query

| Name | Type | Notes |
|---|---|---|
| `page` | integer | Min `1` |
| `per_page` / `perPage` | integer | 1–100. If omitted, Laravel’s default page size applies |
| `version` | `1.0` \| `2.0` | Omit for all versions |
| `keywords` | string | Max 100. Numeric → `amount` LIKE; `Y-m-d` / datetime → `created_at`; UUID → order `id`; otherwise up to 3 words on `remark` and `customer_name` |
| `statuses` | array | `completed`, `pending`, `sent`, `draft`, `expired`, `canceled`. Max 10, distinct. `pending` → `requires_business_action`. `sent` → `requires_customer_action`. Omit → `canceled`, `completed`, `expired`, `requires_business_action` (draft/sent are **not** included by default) |
| `dateFrom` | date | `created_at` from start of that day |
| `dateTo` | date | Must be after `dateFrom`. `created_at` through end of that day |
| `online_store` | boolean | `channel=store_checkout` and a charge in succeeded / refunded / canceled / failed |
| `channels` | array | `point_of_sale`, `quick_sale`, `store_checkout`. Max 10 |
| `location_ids` | UUID[] | Outlet. ResourcePicker sends `location_ids[]` |
| `with` | string \| array | `customer`, `products`, `charges` (comma-separated). `products` is always loaded after paging. `charges` loads `charges.entityMetadata` |

Staff cashiers only see `store_checkout`. Managers are limited to their location ids.

## Response

```ts
type ListOrdersResponse = {
  data: Order[]
  links: { first: string; last: string; prev: string | null; next: string | null }
  meta: {
    current_page: number
    from: number | null
    last_page: number
    path: string
    per_page: number
    to: number | null
    total: number
  }
}
```

### Order

| Field | Type | Notes |
|---|---|---|
| `id` | UUID | |
| `order_display_number` | integer | |
| `business_id` | UUID | |
| `channel` | string | e.g. `point_of_sale`, `quick_sale`, `store_checkout` |
| `version` | string | |
| `customer_id` | UUID \| null | Same as `business_customer_id` |
| `business_customer_id` | UUID \| null | |
| `customer` | object \| null | `null` when both email and phone are empty. Else `{ name, email, phone_number, address, address_line }` |
| `customer_pickup` | boolean | |
| `currency` | string | |
| `checkout_currency` | string \| null | |
| `checkout_currency_decimal_places` | integer \| null | |
| `checkout_currency_amount` | number \| null | Major units |
| `checkout_exchange_rate` | number \| null | |
| `checkout_exchange_rate_adjustment` | number \| null | |
| `checkout_exchange_rate_display` | string \| null | |
| `checkout_use_live_exchange_rate` | boolean \| null | |
| `order_discount_name` | string \| null | |
| `status` | string | Stored value: `completed`, `draft`, `expired`, `canceled`, `requires_business_action`, `requires_customer_action`, `requires_payment_method`, `requires_point_of_sales_action` |
| `remark` | string \| null | |
| `created_at` / `updated_at` | datetime | Atom |
| `closed_at` | datetime \| null | Atom |
| `location_id` | UUID \| null | `business_location_id` |
| `location` | `{ id, name, address }` \| null | |
| `business_user_id` | UUID \| null | |
| `slot_date` | `Y-m-d` \| null | |
| `slot_time` | string \| null | |
| `messages` | unknown | |
| `products` | array | Always filled on this list |
| `is_digital_products` | boolean | |
| `charges` | array | `[]` unless `with` includes `charges` |
| `line_items` | array | |
| `order_form` | unknown | When `business` is loaded |
| `order_form_response` | array | |
| `coupon` | object \| null | Only if `coupon` is loaded (not on this list) |
| `pickup` | object \| null | From line items |
| `payment_status` | string \| null | |
| `fulfilment_status` | string \| null | |
| `fulfilment_type` | string \| null | |
| `line_items_total` | number | Major units |
| `order_discount_amount` | number | |
| `line_item_discount_amount` | number | |
| `line_item_tax_amount` | number | |
| `additional_discount_amount` | number | |
| `total_discount_amount` | number | |
| `line_item_price` | number | |
| `shipping_amount` | number | |
| `total_coupon_amount` | number | |
| `amount` | number | |
| `subtotal` | number | |

If `channel` is `link_sent` and `status` is `requires_customer_action`, an extra `link_sent` object is added (`charge_url`, `expires_at`).

`with_request_details=1` adds a `request` object (ip, method, url, device).

## App rules

- ResourcePicker `order` is the only generated-screen list.
- Snapshot from the picker. Never invent another orders path.
