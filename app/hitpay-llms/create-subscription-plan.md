# Create Subscription Plan

`POST /v1/subscription-plan` — Scope: `payments:create`. **201**. Manager roles.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_MANAGER_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const createSubscriptionPlan = createServerFn({ method: 'POST' })
  .inputValidator((data: { name: string; amount: number; cycle: string; currency?: string }) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_MANAGER_ROLES)
    const response = await hitpayRequest('/v1/subscription-plan', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('Could not create subscription plan.')
    return response.json()
  })
```

## Body

Required: `name`, `amount`, `cycle`.

| Name | Type | Notes |
|---|---|---|
| `name` | string | Max 128 |
| `amount` | number | 0.5–9999999.99 |
| `cycle` | enum | `weekly`, `biweekly`, `monthly`, `quarterly`, `yearly`, `save_card`, `custom` |
| `currency` | string(3) | Default business currency |
| `reference` | string | Max 255 |
| `description` | string | |
| `cycle_repeat` | integer | 1–1000; required if `cycle=custom` |
| `cycle_frequency` | string | Required if custom |
| `times_to_be_charged` | integer | 1–1000 |
| `start_date_method` | string | Recurring start enum |
| `fixed_date` | integer | 1–28 if fixed start |
| `redirect_url` | url | |

**201** — plan (see `list-subscription-plans` fields).


## App rules

- Call only from `createServerFn`. Never return connector tokens to the browser.
- Never invent another path. Never implement HTTP DELETE.
