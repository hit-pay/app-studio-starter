# List Products

`GET /v1/products` — list all products. Filter by status, category, inventory, channel, source, location, and keywords.

Call only from `createServerFn` via `hitpayRequest` in `#/lib/server/hitpay-api`. Do not fetch docs.hitpayapp.com from the running app.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const listProducts = createServerFn({ method: 'GET' })
  .inputValidator((data: { page?: number; keywords?: string } = {}) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const query = new URLSearchParams()
    query.set('page', String(data.page ?? 1))
    query.set('per_page', '25')
    if (data.keywords) query.append('keywords', data.keywords)
    const response = await hitpayRequest(`/v1/products?${query}`)
    if (!response.ok) throw new Error('Could not load products.')
    return response.json() as Promise<ListProductsResponse>
  })
```

Array query params (`statuses`, `categories`, `keywords`, …) are repeated keys, for example `statuses=published&statuses=draft`.

## Query

| Name | Type | Notes |
|---|---|---|
| `statuses` | `draft` \| `published` | Repeat for multiple |
| `categories` | UUID[] | Product category ids |
| `source` | `shopify` \| `wooCommerce` | Repeat for multiple |
| `inventory` | `in_stock` \| `out_of_stock` | Repeat for multiple |
| `location_ids` | UUID[] | Outlet / location ids |
| `channels` | `pos` \| `invoice` \| `online_store` | Repeat for multiple |
| `keywords` | string[] | Name / search terms |
| `page` | number | Default `1` |
| `per_page` | number | Default `10` |

## Response

Paginated envelope:

```ts
type ListProductsResponse = {
  data: HitPayProduct[]
  links: {
    first: string
    last: string
    prev: string | null
    next: string | null
  }
  meta: {
    current_page: number
    from: number
    last_page: number
    path: string
    per_page: number
    to: number
    total: number
  }
}
```

### Product

| Field | Type | Notes |
|---|---|---|
| `id` | string | HitPay product id |
| `business_id` | string | |
| `category_id` | string[] | Category UUIDs |
| `name` | string | |
| `headline` | string \| null | |
| `description` | string | May contain HTML |
| `currency` | string | e.g. `SGD` |
| `price` | number | Major units |
| `price_display` | string | e.g. `SGD 15.00` |
| `price_stored` | integer | Minor units |
| `tax_id` | string \| null | |
| `is_manageable` | integer | |
| `is_pinned` | boolean | |
| `status` | string | e.g. `published` |
| `product_weight` | integer \| null | Grams |
| `delivery_method_required` | boolean | |
| `has_variations` | boolean | |
| `is_shopify` | boolean | |
| `product_url` | string | |
| `variations_count` | integer | |
| `variations` | Variation[] | |
| `variation_key_1` … `variation_key_3` | string \| null | e.g. `Size` |
| `images` | Image[] | |
| `is_published` | boolean | |
| `created_at` / `updated_at` | datetime | |
| `starts_at` / `ends_at` | datetime \| null | |

### Variation

`id`, `stock_keeping_unit`, `description`, `price`, `price_display`, `price_stored`, `quantity`, `quantity_alert_level`, `product_variation_weight`, `variation_value_1` … `variation_value_3`, optional dimensions (`weight`, `length`, `width`, `depth`).

### Image

`id`, `caption`, `url`, `other_dimensions[]` with `size` (`icon` \| `large` \| `small` \| `medium` \| `thumbnail`) and `path`.

## App rules

- Snapshot listed products into Turso when the workflow needs a local working set (stock counter, browse cache). Keep the HitPay `id`.
- Do not refetch `/v1/products` on every row after a snapshot exists.
- Never invent another products path. Never return connector tokens to the browser.
