# Get Subscription Plan

`GET /v1/subscription-plan/{subscription_plan_id}` — Scope: `payments:read`.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const getSubscriptionPlan = createServerFn({ method: 'GET' })
  .inputValidator((data: { planId: string }) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const response = await hitpayRequest(`/v1/subscription-plan/${data.planId}`)
    if (response.status === 404) throw new Error('Plan not found.')
    if (!response.ok) throw new Error('Could not load plan.')
    return response.json()
  })
```

## Path

| Name | Type |
|---|---|
| `subscription_plan_id` | UUID |

## Response

Same fields as `list-subscription-plans`.


## App rules

- Call only from `createServerFn`. Never return connector tokens to the browser.
- Never invent another path. Never implement HTTP DELETE.
