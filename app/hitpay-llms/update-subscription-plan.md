# Update Subscription Plan

`PUT` or `PATCH /v1/subscription-plan/{subscription_plan_id}` — Scope: `payments:create`. All body fields optional. Do not DELETE.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_MANAGER_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const updateSubscriptionPlan = createServerFn({ method: 'POST' })
  .inputValidator((data: { planId: string } & Record<string, unknown>) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_MANAGER_ROLES)
    const { planId, ...body } = data
    const response = await hitpayRequest(`/v1/subscription-plan/${planId}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!response.ok) throw new Error('Could not update plan.')
    return response.json()
  })
```

## Body

`name`, `currency`, `amount`, `reference`, `cycle`, `description`, `cycle_repeat`, `cycle_frequency`, `redirect_url`, `start_date_method`, `fixed_date`, `times_to_be_charged`.


## App rules

- Call only from `createServerFn`. Never return connector tokens to the browser.
- Never invent another path. Never implement HTTP DELETE.
