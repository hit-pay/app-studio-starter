# Resume Recurring Billing

`POST /v1/recurring-billing/{recurring_billing_id}/resume` — Scope: `payments:create`.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_MANAGER_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const resumeRecurringBilling = createServerFn({ method: 'POST' })
  .inputValidator((data: { recurringBillingId: string; status?: string; next_charge_date?: string }) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_MANAGER_ROLES)
    const { recurringBillingId, ...body } = data
    const response = await hitpayRequest(`/v1/recurring-billing/${recurringBillingId}/resume`, {
      method: 'POST',
      body: JSON.stringify(body),
    })
    if (!response.ok) throw new Error('Could not resume recurring billing.')
    return response.json()
  })
```

| Name | Type | Notes |
|---|---|---|
| `status` | string | Optional; must not be paused |
