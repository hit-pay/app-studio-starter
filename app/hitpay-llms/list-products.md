# List Products

`GET /v1/products` — paginated products.

Call only from `createServerFn` via `hitpayRequest` in `#/lib/server/hitpay-api`.

## Quick decision

Use this endpoint only inside the product `ResourcePicker` loader or for a
totals-only calculation. Do not use it to populate a visible product table or
to rebuild products already persisted in Turso. For one known product id, use
`get-product-details`.

## Stock shape

Stock is location- and variation-aware. Do not hardcode outlet ids, outlet
names, variant ids, or quantity values. Select the outlet at runtime and pass
its id as the single `location_ids[]` filter when the screen needs
location-specific stock.

Read the returned quantity according to the product shape:

- no variants: use `locations[].inventory.quantity`;
- with variants: use `variations[].locations[].inventory.quantity`;
- top-level `quantity` is an aggregate, or the selected outlet quantity when
  exactly one `location_ids[]` is sent.

The picker result keeps the original HitPay row in `resource`. Persist the
selected product/variation ids and the relevant stock snapshot in Turso; do
not treat the example values in this document as application data.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const listProducts = createServerFn({ method: 'GET' })
  .validator((data: { page?: number; keywords?: string } = {}) => data)
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

Repeat array filters with bracket syntax (`statuses[]=published&statuses[]=draft`). The API validates `statuses` as an array; sending a scalar `statuses=published` is invalid. `per_page` and `perPage` both set page size (1–100). Default page size is `10`.

## Query

| Name | Type | Notes |
|---|---|---|
| `page` | integer | Default `1` |
| `per_page` / `perPage` | integer | Default `10`, max `100` |
| `keywords` | string | Space-split; matches `name`, `emoji`, `stock_keeping_unit` |
| `statuses[]` | `draft` \| `published` | Repeat for multiple; Laravel validates this as an array |
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

type Money = {
  currency: string
  price: number
  price_stored: number
  price_display: string
  price_before_discount?: number
  price_before_discount_stored?: number
  price_before_discount_display?: string
}

type SupportedCurrencyPrice = {
  currency: string
  price: number
  price_stored: number
  price_display: string
  price_before_discount?: number
  price_before_discount_stored?: number
  price_before_discount_display?: string
}

type Inventory = {
  manage_inventory: boolean
  quantity: number
  quantity_alert_level: number | null
}

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
  inventory: Inventory
  pickups: []
}

type ImageDimension = { size: string; path: string }

type Image = {
  id: string
  caption: string | null
  alt_text: string | null
  group: string | null
  order: number
  extension: string | null
  status: string | null
  disk: string | null
  url: string
  other_dimensions: ImageDimension[]
  urls?: Record<string, string> // icon, large, small, medium, thumbnail, …
  created_at: string
  pivot?: Record<string, unknown>
}

type Category = {
  id: string
  business_id: string
  name: string
  handle: string | null
  description: string | null
  active: boolean
  is_active: boolean
  order: number
  parent_id: string | null
  total_products: number
  emoji: string | null
  pos_color: string | null
  created_at: string
  updated_at: string
}

type Variation = {
  id: string
  stock_keeping_unit: string | null
  barcode: string | null
  description: string | null
  values: { key: string; value: string }[]
  business_currency_price: Money
  price: number
  price_display: string
  price_stored: number
  is_unavailable_for_selected_currency: boolean
  price_source?: string
  quantity: number | null
  quantity_alert_level: number | null
  image: Image[]
  product_variation_weight: number | null
  open_amount: boolean
  order: number
  locations: ProductLocation[]
  supported_currency_prices?: SupportedCurrencyPrice[]
}

type Shopify = {
  id: string
  inventory_item_id: string | null
  sku: string | null
  image_url: string | null
}

type DigitalContent = {
  name: string
  order: number
  type: 'file' | 'link'
  link?: string
  file?: unknown
}

type AddOnOptionValue = {
  option_value: string
  option_price: number | null
  price_source?: string
  is_unavailable_for_selected_currency?: boolean
}

type ProductAddOn = {
  id: string
  business_id: string
  name: string
  option_type: string
  option_values: AddOnOptionValue[] | null
  min_selection: number | null
  max_selection: number | null
  is_required: boolean | number
  created_at: string
  updated_at: string
  pivot?: Record<string, unknown>
}

type Tax = {
  id: string
  name: string
  applies_overseas: boolean
  applies_locally: boolean
  rate: number // percent (stored rate × 100)
}

type Product = {
  id: string
  business_id: string
  category_id: Category[]
  name: string
  headline: string | null
  description: string
  stock_keeping_unit: string | null
  barcode: string | null
  business_currency_price: Money
  supported_currency_prices?: SupportedCurrencyPrice[]
  currency: string
  price: number
  price_before_discount: number | null
  price_display: string
  price_stored: number
  is_unavailable_for_selected_currency: boolean
  price_source?: string
  is_manageable: 0 | 1
  is_pinned: boolean
  status: 'draft' | 'published'
  product_weight: number | null
  delivery_method_required: boolean
  has_variations: boolean
  is_shopify: boolean
  is_woocommerce: boolean
  order: number
  quantity: number | null
  quantity_alert_level: number | null
  min_order_quantity: number | null
  max_order_quantity: number | null
  emoji: string | null
  open_amount: boolean
  product_url: string
  variations_count: number
  variations: Variation[]
  images?: Image[]
  image?: string
  shopify?: Shopify
  is_published: boolean
  published_at: string | null
  created_at: string
  updated_at: string
  order_in_category: number | null
  allow_back_order: boolean
  available: boolean
  type: string
  password_protected: boolean
  digital_content: DigitalContent[] | null
  auto_tag_new_locations: boolean
  channels: Array<'pos' | 'invoice' | 'online_store' | 'self_serve'>
  locations: ProductLocation[]
  product_unit: string | null
  product_unit_abbreviation: string | null
  product_unit_value: number | null
  handle: string | null
  pos_color: string | null
  product_add_ons: ProductAddOn[]
  is_inventory_tracked: boolean
  is_online_store_inventory_tracked: boolean
  tax?: Tax
}
```

If the product has a Shopify id, `shopify` is present and `images` / `image` are omitted. Otherwise `images` + `image` are present.

Option names live on `variations[].values[]` (`{ key, value }`). There are no `variation_key_*` / `variation_value_*` fields. `tax` is not in this response.

### Inventory

Every product has `locations[]`. Every variation has `variations[].locations[]`. Each location object includes `inventory`:

```ts
inventory: {
  manage_inventory: boolean
  quantity: number
  quantity_alert_level: number | null
}
```

Read stock from those nested objects. Top-level `quantity` / `quantity_alert_level` are totals (or one outlet when the request sends exactly one `location_ids`).

```json
{
  "id": "9c1e0001-0000-4000-8000-000000000001",
  "quantity": 15,
  "quantity_alert_level": 3,
  "is_manageable": 1,
  "is_inventory_tracked": true,
  "is_online_store_inventory_tracked": true,
  "has_variations": true,
  "locations": [
    {
      "id": "9c1e0002-0000-4000-8000-000000000001",
      "name": "Main Store",
      "street": "1 Harbourfront",
      "postal_code": "098632",
      "city": "Singapore",
      "state": null,
      "country": "sg",
      "active": true,
      "business_id": "9c1e0000-0000-4000-8000-000000000001",
      "created_at": "2026-01-01T00:00:00+00:00",
      "updated_at": "2026-01-02T00:00:00+00:00",
      "inventory": {
        "manage_inventory": true,
        "quantity": 15,
        "quantity_alert_level": 3
      },
      "pickups": []
    }
  ],
  "variations": [
    {
      "id": "9c1e0003-0000-4000-8000-000000000011",
      "values": [{ "key": "Size", "value": "M" }],
      "quantity": 10,
      "quantity_alert_level": 2,
      "locations": [
        {
          "id": "9c1e0002-0000-4000-8000-000000000001",
          "name": "Main Store",
          "street": "1 Harbourfront",
          "postal_code": "098632",
          "city": "Singapore",
          "state": null,
          "country": "sg",
          "active": true,
          "business_id": "9c1e0000-0000-4000-8000-000000000001",
          "created_at": "2026-01-01T00:00:00+00:00",
          "updated_at": "2026-01-02T00:00:00+00:00",
          "inventory": {
            "manage_inventory": true,
            "quantity": 10,
            "quantity_alert_level": 2
          },
          "pickups": []
        }
      ]
    }
  ]
}
```

| Path | Meaning |
|---|---|
| `quantity` / `quantity_alert_level` | Product total. One `location_ids` → that outlet only |
| `is_manageable` | `1` if inventory is managed for the (filtered) location |
| `is_inventory_tracked` | `true` if any `locations[].inventory.manage_inventory` is true |
| `is_online_store_inventory_tracked` | `false` if any online-store qty is `null` |
| `locations[]` | Outlets tagged on the product |
| `locations[].inventory` | Stock for that product × outlet |
| `locations[].inventory.manage_inventory` | Whether this outlet tracks stock |
| `locations[].inventory.quantity` | Units in that outlet (`0` if qty is null) |
| `locations[].inventory.quantity_alert_level` | Low-stock threshold |
| `locations[].pickups` | Always `[]` |
| `variations[].quantity` / `quantity_alert_level` | Variant total (or one outlet when a single `location_ids` is sent) |
| `variations[].locations[]` | Same location shape for that variant × outlet |
| `variations[].locations[].inventory` | Stock for that variant × outlet |

No-variant product: use `locations[].inventory`. Product with variants: use `variations[].locations[].inventory`. `inventory` has only those three keys.

## App rules

- ResourcePicker `product` is the only way generated screens list products. This file is for the picker loader or a totals-only sheet.
- Snapshot into Turso from the picker payload (`id` + `resource`). Persist `locations[].inventory` if the app needs outlet stock.
- Never invent another products path. Never return connector tokens to the browser.
