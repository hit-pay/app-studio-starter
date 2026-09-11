# List Subscription Plans

`GET /v1/subscription-plan` — Scope: `payments:read`. One page.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const listSubscriptionPlans = createServerFn({ method: 'GET' })
  .inputValidator((data: { reference?: string } = {}) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const query = new URLSearchParams()
    query.set('per_page', '10')
    if (data.reference) query.set('reference', data.reference)
    const response = await hitpayRequest(`/v1/subscription-plan?${query}`)
    if (!response.ok) throw new Error('Could not load subscription plans.')
    return response.json()
  })
```

## Query

| Name | Type | Notes |
|---|---|---|
| `per_page` | number | 1–100, default `10` |
| `reference` | string | Filter |

## Response

Paginated `{ data, links, meta }`. `meta.reference` echoes the filter.

| Field | Type | Notes |
|---|---|---|
| `id` | UUID | |
| `name` / `description` | string | |
| `cycle` | string | `weekly`, `biweekly`, `monthly`, `quarterly`, `yearly`, `save_card`, `custom` |
| `cycle_repeat` / `cycle_frequency` | | Custom cycle |
| `currency` | string | |
| `price` / `amount` | number | |
| `reference` | string | |
| `status` | string | |
| `shortcut` / `share_id` / `url` / `redirect_url` | | |
| `start_date_method` / `fixed_date` | | |
| `times_to_be_charged` | integer \| null | |
| `payment_methods` | array | |
| `order` | integer | |
| `save_card` | boolean | |
| `created_at` / `updated_at` | datetime | |


## App rules

- Call only from `createServerFn`. Never return connector tokens to the browser.
- Never invent another path. Never implement HTTP DELETE.
