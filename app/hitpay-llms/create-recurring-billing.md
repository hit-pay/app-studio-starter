# Create Recurring Billing

`POST /v1/recurring-billing` — Scope: `payments:create`. **201**. Manager roles.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_MANAGER_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const createRecurringBilling = createServerFn({ method: 'POST' })
  .inputValidator((data: Record<string, unknown>) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_MANAGER_ROLES)
    const response = await hitpayRequest('/v1/recurring-billing', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('Could not create recurring billing.')
    return response.json()
  })
```
