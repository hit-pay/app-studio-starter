# Update Invoice

`PUT /v1/invoices/{invoice_id}` — update an invoice. Scope: `commerce:update`. Same body as `create-invoice`. Paid or locked invoices may reject edits. Do not DELETE.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_MANAGER_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const updateInvoice = createServerFn({ method: 'POST' })
  .inputValidator((data: { invoiceId: string } & Record<string, unknown>) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_MANAGER_ROLES)
    const { invoiceId, ...body } = data
    const response = await hitpayRequest(`/v1/invoices/${invoiceId}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (response.status === 422) {
      const error = (await response.json()) as { message?: string }
      throw new Error(error.message ?? 'Invoice is invalid.')
    }
    if (!response.ok) throw new Error('Could not update invoice.')
    return response.json()
  })
```

## Path

| Name | Type |
|---|---|
| `invoice_id` | UUID |

## Body

Same fields as `create-invoice`. Load first with `get-invoice-details`.

**200** — updated invoice.


## App rules

- Call only from `createServerFn`. Never return connector tokens to the browser.
- Never invent another path. Never implement HTTP DELETE.
