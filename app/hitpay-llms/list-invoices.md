# List Invoices

`GET /v1/invoices` — cursor-paginated invoices.

Call only from `createServerFn` via `hitpayRequest` in `#/lib/server/hitpay-api`.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const listInvoices = createServerFn({ method: 'GET' })
  .inputValidator((data: { status?: string; keywords?: string; cursor?: string } = {}) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const query = new URLSearchParams()
    query.set('per_page', '10')
    if (data.cursor) query.set('cursor', data.cursor)
    if (data.status) query.set('status', data.status)
    if (data.keywords) query.set('keywords', data.keywords)
    const response = await hitpayRequest(`/v1/invoices?${query}`)
    if (!response.ok) throw new Error('Could not load invoices.')
    return response.json()
  })
```

This list is **cursor** pagination. `page` is ignored.

## Query

| Name | Type | Notes |
|---|---|---|
| `per_page` | integer | Default `25`. Allowed: `5`, `10`, `20`, `25`, `50`, `100`, `1000` |
| `cursor` | string | |
| `status` | string | Regular: `pending`, `sent`, `paid`, `all`, `overdue`, `draft`, `partiality_paid`, `voided`. Repeating (with `type=repeating_invoice`): `all`, `active`, `canceled`, `paused`, `paid`, `completed` |
| `customer_email` | email | Exact `email` column |
| `reference` | string | Exact `reference` |
| `keywords` | string | Comma-separated. Matches `invoice_number`, `reference`, customer name; exact customer email when a token is an email |
| `type` | string | e.g. `invoice`, `repeating_invoice` |
| `parent_id` | string | Child invoices of a repeating parent |

After paging, the controller also loads children, payment requests + charges, recipients, line items, and partial-payment requests.

## Response

Cursor envelope: `{ data, links, meta }`.

### Invoice

| Field | Type | Notes |
|---|---|---|
| `id` | UUID | |
| `business_id` | UUID | |
| `type` | string | |
| `business_customer_id` | UUID \| null | |
| `location_id` | UUID \| null | |
| `reference` / `invoice_number` | string \| null | |
| `email` | string \| null | |
| `status` | string | Computed display status |
| `currency` | string | |
| `amount` / `balance_amount` / `amount_paid` / `amount_no_tax` / `subtotal` | number | Major units |
| `customer` | object \| null | Same customer object as `list-customers` |
| `send_email_by_default` / `send_email` / `webhook` | boolean | |
| `channel` | string | Default `dashboard` |
| `tax_settings_id` | UUID \| null | |
| `tax_setting` | object \| null | |
| `products` | array | Line SKUs |
| `stackable_discounts` | array | |
| `invoice_type` / `payment_by` | string | |
| `memo` / `footer` / `attached_file` | string \| null | |
| `created_at` / `updated_at` | datetime | Atom |
| `invoice_date` / `due_date` | date \| null | |
| `payment_requests` | array | |
| `charges` | array | |
| `allow_partial_payments` | boolean | |
| `partial_payments` / `payment_detail_pending` / `payment_detail_paid` | | Only when partial payments are enabled |
| `invoice_link` | string | |
| `custom_fields` | array | |
| `custom_fields_config` | array | Empty on list unless set |
| `payment_methods` | string[] \| null | |
| `recipients` | array | |
| `location` | object \| null | |
| `void_reason` / `voided_by_user_id` / `voided_at` | | |
| repeating / late-fee fields | | When that invoice type has them |

## App rules

- ResourcePicker `invoice` is the only generated-screen list.
- Snapshot from the picker. Never invent another invoices path.
