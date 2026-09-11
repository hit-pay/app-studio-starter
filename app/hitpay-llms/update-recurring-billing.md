# Update Recurring Billing

`PUT` or `PATCH /v1/recurring-billing/{recurring_billing_id}` — Scope: `payments:create`. Cannot update `completed` / `canceled`. Do not DELETE.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_MANAGER_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const updateRecurringBilling = createServerFn({ method: 'POST' })
  .inputValidator((data: { recurringBillingId: string } & Record<string, unknown>) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_MANAGER_ROLES)
    const { recurringBillingId, ...body } = data
    const response = await hitpayRequest(`/v1/recurring-billing/${recurringBillingId}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    })
    if (!response.ok) throw new Error('Could not update recurring billing.')
    return response.json()
  })
```
