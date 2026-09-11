# Pause Recurring Billing

`POST /v1/recurring-billing/{recurring_billing_id}/pause` — Scope: `payments:cancel`. Confirm first. Not HTTP DELETE.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_MANAGER_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const pauseRecurringBilling = createServerFn({ method: 'POST' })
  .inputValidator((data: { recurringBillingId: string; from_date: string; to_date?: string; next_charge_date?: string }) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_MANAGER_ROLES)
    const { recurringBillingId, ...body } = data
    const response = await hitpayRequest(`/v1/recurring-billing/${recurringBillingId}/pause`, {
      method: 'POST',
      body: JSON.stringify(body),
    })
    if (!response.ok) throw new Error('Could not pause recurring billing.')
    return response.json()
  })
```

**200** — recurring billing resource.
