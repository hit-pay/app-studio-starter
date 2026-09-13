# List Orders

`GET /v1/orders` — list orders with status and date filters.

Call only from `createServerFn` via `hitpayRequest` in `#/lib/server/hitpay-api`. Do not fetch docs.hitpayapp.com from the running app.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const listOrders = createServerFn({ method: 'GET' })
  .inputValidator((data: { keywords?: string; dateFrom?: string; dateTo?: string } = {}) => data)
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

Repeat `statuses[]` for multiple statuses, for example `statuses[]=completed&statuses[]=sent`.

## Query

| Name | Type | Notes |
|---|---|---|
| `perPage` | integer | Default `25`, max `100` |
| `version` | `'1.0'` \| `'2.0'` | Omit to return all versions |
| `keywords` | string | Search amount, `created_at`, order id, remark, `customer_name` |
| `statuses[]` | `completed` \| `sent` \| `draft` \| `expired` \| `canceled` | Repeat for multiple |
| `dateFrom` | string | `YYYY-MM-DD`, e.g. `2023-04-18` |
| `dateTo` | string | `YYYY-MM-DD` |
| `with` | string | `products`, `charges`, or `products,charges` to include those relations |

## Response

Documented **200** body is an order object (see fields below). If the live payload is a collection (`data` + `meta` / `links`), use `data` as the list — do not invent another path.

### Order

| Field | Type | Notes |
|---|---|---|
| `id` | string | HitPay order id |
| `order_display_number` | integer | Visible order number |
| `business_id` | string | |
| `channel` | string | e.g. `point_of_sale` |
| `version` | string | e.g. `'1.0'` |
| `customer_id` | string \| null | |
| `business_customer_id` | string \| null | |
| `customer` | object \| null | |
| `customer_pickup` | boolean | |
| `currency` | string | e.g. `sgd` |
| `order_discount_name` | string \| null | |
| `status` | string | e.g. `draft` |
| `remark` | string | |
| `created_at` / `updated_at` | datetime | |
| `closed_at` | datetime \| null | |
| `location_id` / `location` | string / object \| null | |
| `business_user_id` | string | |
| `slot_date` / `slot_time` | string \| null | |
| `messages` | unknown \| null | |
| `products` | array | Empty unless `with` includes `products` |
| `charges` | array | Empty unless `with` includes `charges` |
| `line_items` | array | |
| `order_form` | object | Custom form fields |
| `order_form_response` | array | |
| `coupon` | object \| null | |
| `payment_status` | string \| null | |
| `fulfilment_status` | string | |
| `line_items_total` | number | |
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

## App rules

- Use this for browse. Use `get-order-details` for one order.
- Snapshot orders into Turso when the workflow needs a local working set. Keep the HitPay `id`.
- Do not refetch `/v1/orders` on every row after a snapshot exists.
- Never invent another orders list path. Never return connector tokens to the browser.
