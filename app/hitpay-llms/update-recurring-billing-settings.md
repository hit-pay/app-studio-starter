# Update Recurring Billing Settings

`PUT /v1/recurring-billing-settings` — Scope: `payments:create`. **202**. Do not `DELETE` this resource.

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_MANAGER_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const updateRecurringBillingSettings = createServerFn({ method: 'POST' })
  .inputValidator((data: { renewal_reminders?: boolean; status_after_retrying?: string }) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_MANAGER_ROLES)
    const response = await hitpayRequest('/v1/recurring-billing-settings', {
      method: 'PUT',
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('Could not update recurring billing settings.')
    return response.json()
  })
```

| Name | Type | Notes |
|---|---|---|
| `status_after_retrying` | string | Required; recurring plan status except `active` |
