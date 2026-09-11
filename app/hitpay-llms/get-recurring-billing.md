# Get Recurring Billing

`GET /v1/recurring-billing/{recurring_billing_id}` — Scope: `payments:read`.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const getRecurringBilling = createServerFn({ method: 'GET' })
  .inputValidator((data: { recurringBillingId: string }) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const response = await hitpayRequest(`/v1/recurring-billing/${data.recurringBillingId}`)
    if (!response.ok) throw new Error('Could not load recurring billing.')
    return response.json()
  })
```

Same fields as `list-recurring-billings`, plus optional `qr_code_data`, `direct_link`, `instructions`, `payment_method.card`.
