# Get Invoice Details

`GET /v1/invoices/{invoice_id}` — one invoice.

Call only from `createServerFn` via `hitpayRequest` in `#/lib/server/hitpay-api`.

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

Do not list `/v1/invoices` to load one id.

## Path

| Name | Type |
|---|---|
| `invoice_id` | UUID |

## Response

**200** — one invoice object (not wrapped in `{ data }`). Same nested fields as each `list-invoices` `data[]` item.

**403 / 404** — not owned or missing.

## App rules

- Use after the merchant already has the id (picker or Turso).
- Never invent another invoice-detail path.
