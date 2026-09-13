# List Products

`GET /v1/products` — list products. Same public OAuth handler as the dashboard (`ProductsController@index`, scope `commerce:read`). Response is `App\Http\Resources\Business\Product`, not the older `OldProduct` shape.

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
    if (data.keywords) query.set('keywords', data.keywords)
    const response = await hitpayRequest(`/v1/products?${query}`)
    if (!response.ok) throw new Error('Could not load products.')
    return response.json() as Promise<ListProductsResponse>
  })
```

`per_page` and `perPage` both work (1–100). Default page size is `10`. Array query params (`statuses`, `categories`, `location_ids`, `channels`, `sources`) are repeated keys, for example `statuses=published&statuses=draft`.

## Query

| Name | Type | Notes |
|---|---|---|
| `statuses` | `draft` \| `published` | Repeat for multiple |
| `categories` | UUID[] | Product category ids |
| `sources` | `shopify` \| `wooCommerce` | Repeat for multiple. Key is `sources`, not `source` |
| `inventory` | `in_stock` \| `out_of_stock` | Single value, not repeated |
| `location_ids` | UUID[] | Filter outlets. One id also scopes top-level `quantity` when inventories are loaded |
| `channels` | `pos` \| `invoice` \| `online_store` \| `self_serve` | Repeat for multiple |
| `keywords` | string | Space-split search on name |
| `ids` | UUID[] | Filter to these product ids |
| `stock_keeping_unit` | string | |
| `barcode` | string | Resolves to product ids via variations |
| `price_from` / `price_to` | number | Major units |
| `show_sold_out` | boolean | |
| `currency` | string | 3-letter display currency |
| `page` | number | Default `1` |
| `per_page` | number | Default `10` |

## Response

Paginated Laravel envelope. List **eager-loads** `locations`, `variations.locations`, `variations.variationValues`, images, categories, add-ons.

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

`GET /v1/products/{id}` returns **one** `HitPayProduct` (same resource, not wrapped in `{ data }`).

### Product

| Field | Type | Notes |
|---|---|---|
| `id` | string | HitPay product id |
| `business_id` | string | |
| `category_id` | Category[] | Loaded category **objects**, not UUID strings |
| `name` | string | |
| `headline` | string \| null | |
| `description` | string | May contain HTML |
| `stock_keeping_unit` | string \| null | |
| `barcode` | string \| null | Present when `defaultVariation` is loaded (show more often than list) |
| `business_currency_price` | object | `{ currency, price, price_display, price_stored }` in the business currency |
| `currency` | string | Display currency (request `currency` or business default) |
| `price` | number | Major units |
| `price_before_discount` | number \| null | |
| `price_display` | string | e.g. `SGD 15.00`; range when variants have different prices |
| `price_stored` | integer | Minor units |
| `is_unavailable_for_selected_currency` | boolean | |
| `is_manageable` | integer | `0` or `1` |
| `is_pinned` | boolean | |
| `status` | string | `draft` \| `published` |
| `product_weight` | integer \| null | Grams |
| `delivery_method_required` | boolean | |
| `has_variations` | boolean | |
| `is_shopify` | boolean | |
| `is_woocommerce` | boolean | |
| `order` | integer | |
| `quantity` | integer \| null | **Total** product qty (not a per-location breakdown) |
| `quantity_alert_level` | integer \| null | |
| `min_order_quantity` / `max_order_quantity` | integer \| null | |
| `emoji` | string \| null | |
| `open_amount` | boolean | |
| `product_url` | string | |
| `variations_count` | integer | |
| `variations` | Variation[] | Always present on this list |
| `images` | Image[] | Omitted when the product is Shopify-backed (`shopify` object instead) |
| `image` | string | Convenience URL |
| `shopify` | object \| omitted | `{ id, inventory_item_id, sku, image_url }` |
| `is_published` | boolean | |
| `published_at` | datetime \| null | |
| `created_at` / `updated_at` | datetime | |
| `allow_back_order` | boolean | |
| `available` | boolean | |
| `type` | string | Default `physical` |
| `password_protected` | boolean | |
| `digital_content` | object[] \| null | |
| `auto_tag_new_locations` | boolean | |
| `channels` | string[] | `pos`, `invoice`, `online_store`, `self_serve` |
| `locations` | Location[] | Per-outlet inventory (see below) |
| `is_inventory_tracked` | boolean | Any location has `manage_inventory` |
| `is_online_store_inventory_tracked` | boolean | |
| `product_unit` / `product_unit_abbreviation` / `product_unit_value` | mixed | |
| `handle` | string \| null | |
| `pos_color` | string \| null | From first category with a POS color |
| `product_add_ons` | object[] | Present when add-ons are loaded |
| `tax` | object | Only if `tax` is loaded (usually not on list) |

There are **no** `variation_key_1`…`3` on this resource. Option names live on each variation’s `values[]`.

`starts_at` / `ends_at` are **not** on this resource (they were on `OldProduct` only).

### Location (product or variation)

Included on list/show. Pivot stock is `inventory`:

```ts
type HitPayProductLocation = {
  id: string
  name: string
  street: string | null
  postal_code: string | null
  city: string | null
  state: string | null
  country: string | null
  active: boolean
  business_id: string
  created_at: string
  updated_at: string
  inventory: {
    manage_inventory: boolean
    quantity: number
    quantity_alert_level: number | null
  }
  pickups: unknown[]
}
```

Use `locations[].inventory.quantity` for stock **in that outlet**. Top-level `quantity` is the product/variation total.

### Variation

| Field | Type | Notes |
|---|---|---|
| `id` | string | Variation id |
| `stock_keeping_unit` | string \| null | |
| `barcode` | string \| null | |
| `description` | string \| null | |
| `values` | `{ key: string; value: string }[]` | e.g. `{ key: "Size", value: "M" }` |
| `business_currency_price` | object | |
| `price` / `price_display` / `price_stored` | number / string / integer | |
| `is_unavailable_for_selected_currency` | boolean | |
| `quantity` | integer \| null | Total for this variant |
| `quantity_alert_level` | integer \| null | |
| `image` | Image[] | |
| `product_variation_weight` | number \| null | |
| `open_amount` | boolean | |
| `order` | integer | |
| `locations` | Location[] | Same `inventory` shape as the product |

No `variation_value_1`…`3` or dimension fields (`weight`/`length`/`width`/`depth`) on this resource.

### Image

`id`, `caption`, `alt_text`, `group`, `order`, `extension`, `status`, `disk`, `url`, `created_at`, `other_dimensions[]` (`size` + `path`), `urls` map (`icon` \| `large` \| `small` \| `medium` \| `thumbnail`).

### Category (in `category_id`)

At least `id`, `name`, `handle`, `is_active`, `total_products`, plus other category columns the model serializes.

## App rules

- Snapshot listed products into Turso when the workflow needs a local working set (stock counter, browse cache). Keep the HitPay `id`. Persist `locations[].inventory` if the app cares about outlet stock.
- Do not refetch `/v1/products` on every row after a snapshot exists.
- Never invent another products path. Never return connector tokens to the browser.
