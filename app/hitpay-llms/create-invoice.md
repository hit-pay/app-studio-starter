# Create Invoice

`POST /v1/invoices` — create an invoice. Scope: `commerce:create`. Body is JSON (or multipart if attaching a file). Business must be verified. Do not fetch docs.hitpayapp.com.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_MANAGER_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const createInvoice = createServerFn({ method: 'POST' })
  .inputValidator((data: Record<string, unknown>) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_MANAGER_ROLES)
    const response = await hitpayRequest('/v1/invoices', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (response.status === 422) {
      const error = (await response.json()) as { message?: string }
      throw new Error(error.message ?? 'Invoice is invalid.')
    }
    if (!response.ok) throw new Error('Could not create invoice.')
    return response.json()
  })
```

## Body (`application/json`)

Required: `payment_by`, `currency`, `invoice_date`, and either `customer_id` or `customer.email`.

| Name | Type | Notes |
|---|---|---|
| `payment_by` | `product` \| `amount` | Required |
| `currency` | string | Required; business-available currency |
| `invoice_date` | `YYYY-MM-DD` | Required |
| `customer_id` | UUID | Required without `customer` |
| `customer` | object | `customer.email` required without `customer_id` |
| `amount` / `subtotal` | number | Required when `payment_by=amount` |
| `products` | array (max 100) | Required when `payment_by=product` |
| `products[].product_id` | UUID | |
| `products[].name` | string | |
| `products[].price` | number | |
| `products[].quantity` | number | |
| `products[].variation_id` | UUID \| null | |
| `products[].description` | string | |
| `products[].discount` / `percentage_discount` | number | |
| `due_date` | `YYYY-MM-DD` | |
| `reference` / `description` / `memo` / `footer` | string | |
| `tax_setting` | UUID | Exclusive tax only |
| `type` | `invoice` \| `repeating_invoice` | |
| `cycle` / `cycle_repeat` / `cycle_frequency` | | Required for repeating |
| `repeating_due_date` / `due_date_after_number` / `delivery_options` | | Repeating |
| `allow_partial_payments` | boolean | Then `partial_payments[]` with `amount`, `due_date` |
| `stackable_discounts[]` | array | `name`, `discount`, `percentage_discount`, `order` |
| `payment_methods[]` | string[] | Checkout methods |
| `location_id` | UUID | Active location |
| `recipients[]` | array | `email`, `customer_id` |
| `send_email` | boolean | |
| `webhook` | url | |
| `status` | string | Invoice / repeating status |
| `late_fee_type` / `late_fee_percentage` / `late_fee_fixed_amount` / `late_fee_grace_period` | | |

Pick `customer_id` / products via ResourcePicker. Prefer picker payload over list-sync.

**200** — created invoice (same shape as `get-invoice-details`).


## App rules

- Call only from `createServerFn`. Never return connector tokens to the browser.
- Never invent another path. Never implement HTTP DELETE.
