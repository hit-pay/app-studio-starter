# Charge Recurring Billing

`POST /v1/charge/recurring-billing/{recurring_billing_id}` — collect now. Scope: `payments:create`. Confirm first.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_MANAGER_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const chargeRecurringBilling = createServerFn({ method: 'POST' })
  .inputValidator((data: { recurringBillingId: string; amount: number; currency: string }) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_MANAGER_ROLES)
    const { recurringBillingId, amount, currency } = data
    const response = await hitpayRequest(`/v1/charge/recurring-billing/${recurringBillingId}`, {
      method: 'POST',
      body: JSON.stringify({ amount, currency }),
    })
    if (!response.ok) throw new Error('Could not charge recurring billing.')
    return response.json()
  })
```

```json
{
  "recurring_billing_id": "uuid"
}
```
