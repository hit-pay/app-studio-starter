# Update Product

`POST /v1/products/{product_id}` — update name, price, description, or existing variants.

Call only from `createServerFn` via `hitpayRequest` in `#/lib/server/hitpay-api`. Body is `multipart/form-data`. Send `_method=PATCH`. Do not fetch docs.hitpayapp.com from the running app.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_MANAGER_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const updateProduct = createServerFn({ method: 'POST' })
  .inputValidator((data: { productId: string; name: string; price: number }) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_MANAGER_ROLES)
    const body = new FormData()
    body.set('_method', 'PATCH')
    body.set('name', data.name)
    body.set('price', String(data.price))
    const response = await hitpayRequest(`/v1/products/${data.productId}`, {
      method: 'POST',
      body,
    })
    if (response.status === 422) {
      const error = (await response.json()) as { message?: string }
      throw new Error(error.message ?? 'Product is invalid.')
    }
    if (!response.ok) throw new Error('Could not update product.')
    return response.json()
  })
```

Do not set `Content-Type` yourself when using `FormData`. Load the current record with `get-product-details` before editing. This is not `PUT` / `PATCH` on the HTTP method — the path is `POST` plus `_method=PATCH`.

## Path

| Name | Type | Notes |
|---|---|---|
| `product_id` | string | HitPay product id |

## Body (`multipart/form-data`)

Required: `name`, `price`. Always send `_method=PATCH`.

| Name | Type | Notes |
|---|---|---|
| `_method` | string | Always `PATCH` |
| `name` | string | Required |
| `price` | number | Required, major units |
| `description` | string | May contain HTML |
| `headline` | string | |
| `quantity` | number | Min `0` |
| `quantity_alert_level` | number | Min `0`; send when using quantity alerts |
| `currency` | string | e.g. `sgd` |
| `category_ids` | UUID[] | Repeat keys |
| `is_manageable` | `'1'` \| `'0'` | Default `'1'` |
| `is_pinned` | `'1'` \| `'0'` | Default `'0'` |
| `product_weight` | integer \| null | Grams |
| `delivery_method_required` | boolean \| null | |
| `existing_variation` | object[] | Update variants already on the product |
| `images` | file[] | New image binaries |
| `publish` | `'1'` \| `'0'` | Default `'1'` |

### `existing_variation[]`

Required per row: `id`, `price`, `quantity`, `quantity_alert_level`.

| Field | Type | Notes |
|---|---|---|
| `id` | UUID | Existing variation id |
| `image` | file | Optional replacement |
| `price` | number | |
| `quantity` | integer | |
| `quantity_alert_level` | integer | |
| `product_variation_weight` | integer \| null | Grams |
| `variation_value_1` | string | |
| `variation_value_2` | string \| null | |
| `variation_value_3` | string \| null | |

Do not use the create-product `variations` field here. Update existing rows with `existing_variation`.

## Responses

**200** — updated product (same shape as `get-product-details`). Not wrapped in `{ data }`.

**422** — validation error:

```json
{ "message": "The given data was invalid.", "errors": { "name": ["The name field is required."] } }
```

## App rules

- Updating a catalog product is a manager action: `HITPAY_MANAGER_ROLES`.
- After a successful update, refresh any Turso snapshot that stores that HitPay `id`.
- Prefer JSON/text fields first. Upload images only when the workflow needs them.
- Never invent another update-product path. Never return connector tokens to the browser.
