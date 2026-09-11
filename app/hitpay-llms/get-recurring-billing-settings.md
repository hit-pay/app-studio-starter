# Get Recurring Billing Settings

`GET /v1/recurring-billing-settings` — Scope: `payments:read`.

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const getRecurringBillingSettings = createServerFn({ method: 'GET' })
  .handler(async () => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const response = await hitpayRequest('/v1/recurring-billing-settings')
    if (!response.ok) throw new Error('Could not load recurring billing settings.')
    return response.json()
  })
```

Typical fields: `renewal_reminders` (boolean), `status_after_retrying` (recurring plan status, not `active`).
