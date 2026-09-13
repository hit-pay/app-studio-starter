# List Invoices

`GET /v1/invoices` — list invoices with status and search filters. Public docs: get all invoices.

Call only from `createServerFn` via `hitpayRequest` in `#/lib/server/hitpay-api`. Do not fetch docs.hitpayapp.com from the running app. Scope: `commerce:read`.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const listInvoices = createServerFn({ method: 'GET' })
  .inputValidator((data: { status?: string; customer_email?: string; reference?: string } = {}) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const query = new URLSearchParams()
    query.set('per_page', '10')
    query.set('page', '1')
    if (data.status) query.set('status', data.status)
    if (data.customer_email) query.set('customer_email', data.customer_email)
    if (data.reference) query.set('reference', data.reference)
    const response = await hitpayRequest(`/v1/invoices?${query}`)
    if (!response.ok) throw new Error('Could not load invoices.')
    return response.json()
  })
```

## Query

| Name | Type | Notes |
|---|---|---|
| `per_page` | string / integer | Default `10`. One page only — do not walk every page. |
| `page` | string / integer | Default `1` |
| `status` | string | `draft`, `sent`, `pending`, `overdue`, `paid` (and other invoice / repeating statuses the API accepts) |
| `customer_email` | string | Exact email filter |
| `reference` | string | Invoice reference |
| `keywords` | string | Search (dashboard-style) |
| `type` | string | Invoice type |
| `parent_id` | string | Recurring parent |

No filter-by-invoice-id list. Do not invent `ids[]`.

## Response

Paginated collection (`data` + pagination meta). Use `data`.

### Invoice (list row)

| Field | Type | Notes |
|---|---|---|
| `id` | string | HitPay invoice id |
| `invoice_number` / `reference` | string | |
| `status` | string | |
| `currency` | string | |
| `amount` / `subtotal` / `amount_paid` / `balance_amount` | number | |
| `email` | string | |
| `invoice_date` / `due_date` | date | |
| `business_location_id` | string \| null | |
| `customer` | object \| null | When loaded |
| `type` / `channel` | string | |
| `created_at` / `updated_at` | datetime | |

## App rules

- Browse / add invoices: ResourcePicker `type: 'invoice'`. Call this list only from the picker loader, a receivables sheet, or a wake.
- Persist a **sheet** or this one page (default 10). Do not replica-sync all invoices.
- Never invent another invoices list path. Never return connector tokens to the browser.
