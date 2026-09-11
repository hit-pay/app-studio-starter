# List Products

`GET /v1/products` — paginated products.

Call only from `createServerFn` via `hitpayRequest` in `#/lib/server/hitpay-api`.

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
    return response.json()
  })
```

Repeat array filters as the same key (`statuses=published&statuses=draft`). `per_page` and `perPage` both set page size (1–100). Default page size is `10`.

## Query

| Name | Type | Notes |
|---|---|---|
| `page` | integer | Default `1` |
| `per_page` / `perPage` | integer | Default `10`, max `100` |
| `keywords` | string | Space-split; matches `name`, `emoji`, `stock_keeping_unit` |
| `statuses` | `draft` \| `published` | Repeat for multiple |
| `categories` | UUID[] | Category ids |
| `ids` | UUID[] | Limit to these product ids |
| `stock_keeping_unit` | string | Exact match, max 100 |
| `barcode` | string | Resolves matching variation barcodes to product `ids` (max 100 products) |
| `sources` | `shopify` \| `wooCommerce` | Repeat. Key is `sources` |
| `inventory` | `in_stock` \| `out_of_stock` | Single value |
| `location_ids` | UUID[] | Products tagged to these outlets. Exactly one UUID also scopes top-level `quantity` |
| `channels` | `pos` \| `invoice` \| `online_store` \| `self_serve` | Repeat |
| `price_from` / `price_to` | number | Major units in the business currency |
| `show_sold_out` | boolean | |
| `currency` | string | 3-letter lowercase display currency |
| `order_by[field]` | `asc` \| `desc` | Fields: `id`, `name`, `price`, `order`, `created_at`, `updated_at`, `published_at`, `is_pinned`. Default `id` desc |

## Response

```ts
type ListProductsResponse = {
  data: Product[]
  links: {
    first: string
    last: string
    prev: string | null
    next: string | null
  }
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

List loads categories, images, add-ons, locations, and variations (values, images, locations).

### Product

| Field | Type | Notes |
|---|---|---|
| `id` | UUID | |
| `business_id` | UUID | |
| `category_id` | Category[] | Category **objects**, not UUID strings |
| `name` | string | |
| `headline` | string \| null | |
| `description` | string | May contain HTML |
| `stock_keeping_unit` | string \| null | |
| `barcode` | string \| null | From the default variation when that relation is loaded |
| `business_currency_price` | object | `{ currency, price, price_stored, price_display }` plus optional `price_before_discount`, `price_before_discount_stored`, `price_before_discount_display` |
| `supported_currency_prices` | object[] \| omitted | When supported-currency prices are loaded |
| `currency` | string | Display currency (`currency` query or business default) |
| `price` | number | Major units |
| `price_before_discount` | number \| null | |
| `price_display` | string | Range string when variants have different prices |
| `price_stored` | integer | Minor units |
| `is_unavailable_for_selected_currency` | boolean | |
| `price_source` | string \| omitted | Only when a converted price was used |
| `is_manageable` | `0` \| `1` | |
| `is_pinned` | boolean | |
| `status` | `draft` \| `published` | |
| `product_weight` | integer \| null | Grams |
| `delivery_method_required` | boolean | |
| `has_variations` | boolean | |
| `is_shopify` | boolean | |
| `is_woocommerce` | boolean | |
| `order` | integer | |
| `quantity` | integer \| null | Product total, or one outlet when a single `location_ids` is sent |
| `quantity_alert_level` | integer \| null | |
| `min_order_quantity` / `max_order_quantity` | integer \| null | |
| `emoji` | string \| null | |
| `open_amount` | boolean | |
| `product_url` | string | |
| `variations_count` | integer | |
| `variations` | Variation[] | Present when variations are loaded |
| `images` | Image[] | Omitted when `shopify` is present |
| `image` | string | Convenience URL |
| `shopify` | object \| omitted | `{ id, inventory_item_id, sku, image_url }` when the product has a Shopify id |
| `is_published` | boolean | |
| `published_at` | datetime \| null | Atom |
| `created_at` / `updated_at` | datetime | Atom |
| `order_in_category` | integer \| null | Category pivot order; usually `null` on this list |
| `allow_back_order` | boolean | |
| `available` | boolean | |
| `type` | string | Default `physical` |
| `password_protected` | boolean | |
| `digital_content` | object[] \| null | Sorted by `order` |
| `auto_tag_new_locations` | boolean | |
| `channels` | string[] | `pos`, `invoice`, `online_store`, `self_serve` |
| `locations` | Location[] | Per-outlet inventory |
| `product_unit` | string \| null | |
| `product_unit_abbreviation` | string \| null | |
| `product_unit_value` | number \| null | |
| `handle` | string \| null | |
| `pos_color` | string \| null | First category that has a POS color |
| `product_add_ons` | object[] | Present when add-ons are loaded |
| `is_inventory_tracked` | boolean | Any loaded location has `manage_inventory` |
| `is_online_store_inventory_tracked` | boolean | |
| `tax` | object \| omitted | Only if `tax` was loaded (not on this list) |

Option names live on each variation’s `values[]`. There are no `variation_key_*` / `variation_value_*` fields.

### Location (product or variation)

```ts
type ProductLocation = {
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

Use `locations[].inventory.quantity` for that outlet. Top-level `quantity` is the total (or the one filtered outlet).

### Variation

| Field | Type | Notes |
|---|---|---|
| `id` | UUID | |
| `stock_keeping_unit` | string \| null | |
| `barcode` | string \| null | |
| `description` | string \| null | |
| `values` | `{ key: string; value: string }[]` | Sorted by `key` |
| `business_currency_price` | object | Same shape as the product’s business-currency price |
| `price` / `price_display` / `price_stored` | number / string / integer | |
| `is_unavailable_for_selected_currency` | boolean | |
| `price_source` | string \| omitted | |
| `quantity` | integer \| null | |
| `quantity_alert_level` | integer \| null | |
| `image` | Image[] | |
| `product_variation_weight` | number \| null | |
| `open_amount` | boolean | Same as the parent product |
| `order` | integer | |
| `locations` | Location[] | Same `inventory` shape |
| `supported_currency_prices` | object[] \| omitted | |

### Image

| Field | Type |
|---|---|
| `id` | UUID |
| `caption` | string \| null |
| `alt_text` | string \| null |
| `group` | string \| null |
| `order` | integer |
| `extension` | string \| null |
| `status` | string \| null |
| `disk` | string \| null |
| `url` | string | Original |
| `other_dimensions` | `{ size: string; path: string }[]` |
| `urls` | Record of size → URL (`icon`, `large`, `small`, `medium`, `thumbnail`, …) |
| `created_at` | datetime |
| `pivot` | object \| omitted |

### Category (in `category_id`)

Includes at least `id`, `name`, `handle`, `is_active`, `total_products`, plus the other category columns on the model.

## App rules

- ResourcePicker `product` is the only way generated screens list products. This file is for the picker loader or a totals-only sheet.
- Snapshot into Turso from the picker payload (`id` + `resource`). Persist `locations[].inventory` if the app needs outlet stock.
- Never invent another products path. Never return connector tokens to the browser.
