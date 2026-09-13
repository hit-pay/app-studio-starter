# Get Invoice Details

`GET /v1/invoices/{invoice_id}` — one invoice including customer, products, and payment requests.

Call only from `createServerFn` via `hitpayRequest` in `#/lib/server/hitpay-api`. Scope: `commerce:read`. Do not fetch docs.hitpayapp.com from the running app.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const getInvoice = createServerFn({ method: 'GET' })
  .inputValidator((data: { invoiceId: string }) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const response = await hitpayRequest(`/v1/invoices/${data.invoiceId}`)
    if (response.status === 404) throw new Error('Invoice not found.')
    if (!response.ok) throw new Error('Could not load invoice.')
    return response.json()
  })
```

## Path

| Name | Type | Notes |
|---|---|---|
| `invoice_id` | UUID | HitPay invoice id |

## Response

**200** — one invoice object.

| Field | Type | Notes |
|---|---|---|
| `id` | UUID | |
| `business_id` | UUID | |
| `type` / `invoice_type` | string | `invoice` or `repeating_invoice` |
| `invoice_number` / `reference` | string | |
| `status` | string | `draft`, `sent`, `pending`, `overdue`, `paid`, … |
| `currency` | string | |
| `amount` / `subtotal` / `amount_paid` / `balance_amount` / `amount_no_tax` | number | |
| `email` | string | |
| `business_customer_id` / `customer` | UUID / object \| null | |
| `location_id` / `location` | UUID / object \| null | |
| `invoice_date` / `due_date` | `YYYY-MM-DD` | |
| `products` | array | Line SKUs |
| `stackable_discounts` | array | |
| `tax_settings_id` / `tax_setting` | UUID / object \| null | |
| `payment_methods` | string[] | |
| `payment_requests` / `charges` | array | |
| `allow_partial_payments` / `partial_payments` | boolean / array | |
| `invoice_link` | string | |
| `memo` / `footer` / `description` | string | |
| `custom_fields` / `custom_fields_config` | array / object | |
| `recipients` | array | |
| `send_email` / `webhook` / `channel` | | |
| `created_at` / `updated_at` | datetime | |
| void / late-fee / repeating cycle fields | | When applicable |


## App rules

- Call only from `createServerFn`. Never return connector tokens to the browser.
- Never invent another path. Never implement HTTP DELETE.
