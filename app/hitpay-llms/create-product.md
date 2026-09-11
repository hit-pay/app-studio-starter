# Create Product

`POST /v1/products` — create a product with name, price, and optional variants.

Call only from `createServerFn` via `hitpayRequest` in `#/lib/server/hitpay-api`. Body is `multipart/form-data`. Do not fetch docs.hitpayapp.com from the running app.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_MANAGER_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const createProduct = createServerFn({ method: 'POST' })
  .inputValidator((data: { name: string; price: number; currency?: string }) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_MANAGER_ROLES)
    const body = new FormData()
    body.set('name', data.name)
    body.set('price', String(data.price))
    if (data.currency) body.set('currency', data.currency)
    const response = await hitpayRequest('/v1/products', { method: 'POST', body })
    if (response.status === 422) {
      const error = (await response.json()) as { message?: string }
      throw new Error(error.message ?? 'Product is invalid.')
    }
    if (!response.ok) throw new Error('Could not create product.')
    return response.json()
  })
```

Do not set `Content-Type` yourself when using `FormData` — `fetch` must set the multipart boundary. Repeat array fields (`category_ids`, `channels`, `location_ids`) as multiple keys.

## Body (`multipart/form-data`)

Required: `name`, `price`.

| Name | Type | Notes |
|---|---|---|
| `name` | string | Product name |
| `price` | number | Major units, e.g. `15` |
| `description` | string | May contain HTML |
| `barcode` | string | Max 255 |
| `headline` | string | |
| `stock_keeping_unit` | string | Max 255 |
| `quantity` | number | Min `0` |
| `quantity_alert_level` | number | Min `0`; send when using quantity alerts |
| `currency` | string | e.g. `sgd` |
| `category_ids` | UUID[] | Business product category ids |
| `channels` | `online_store` \| `pos` \| `invoice` | Repeat for multiple |
| `location_ids` | UUID[] | |
| `locations` | object[] | Per-location stock (see below) |
| `open_amount` | `'1'` \| `'0'` | Default `'0'` |
| `is_manageable` | `'1'` \| `'0'` | Default `'1'` |
| `is_pinned` | `'1'` \| `'0'` | Default `'0'` |
| `product_weight` | integer | Grams |
| `delivery_method_required` | boolean | Default `true` |
| `variations` | object[] | See below |
| `image` | file[] | Binary parts |
| `publish` | `'1'` \| `'0'` | Default `'1'` |

### `locations[]`

| Field | Type | Notes |
|---|---|---|
| `id` | UUID | Location id |
| `manage_inventory` | `'1'` \| `'0'` | Default `'1'` |
| `quantity` | integer | Min `0` |
| `quantity_alert_level` | integer | Min `0` |

### `variations[]`

Required per variation: `price`, `quantity`, `quantity_alert_level`.

| Field | Type | Notes |
|---|---|---|
| `image` | file | Binary |
| `price` | number | |
| `quantity` | integer | |
| `quantity_alert_level` | integer | |
| `product_variation_weight` | integer \| null | Grams |
| `variation_value_1` | string | |
| `variation_value_2` | string \| null | |
| `variation_value_3` | string \| null | |

## Responses

**201** — created product (same shape as a list-products item: `id`, `name`, `price`, `price_display`, `variations`, `images`, `status`, …). Not wrapped in `{ data }`.

**422** — validation error:

```json
{ "message": "The given data was invalid.", "errors": { "name": ["The name field is required."] } }
```

## App rules

- Creating a catalog product is a manager action: `HITPAY_MANAGER_ROLES`.
- After a successful create, you may snapshot the returned product into Turso (keep the HitPay `id`) if the app will list or count it locally.
- Prefer JSON/text fields first. Upload images only when the workflow needs them; use the existing `files` / `FileStorage` path, then append binaries to `FormData`.
- Never invent another create-product path. Never return connector tokens to the browser.
