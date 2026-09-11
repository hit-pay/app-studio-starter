# List Recurring Billings

`GET /v1/recurring-billing` — Scope: `payments:read`. One page. Prefer wake `data` for `failed_recurring` over paging history.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const listRecurringBillings = createServerFn({ method: 'GET' })
  .inputValidator((data: { status?: string; customer_email?: string; reference?: string } = {}) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const query = new URLSearchParams()
    query.set('per_page', '10')
    if (data.status) query.set('status', data.status)
    if (data.customer_email) query.set('customer_email', data.customer_email)
    if (data.reference) query.set('reference', data.reference)
    const response = await hitpayRequest(`/v1/recurring-billing?${query}`)
    if (!response.ok) throw new Error('Could not load recurring billings.')
    return response.json()
  })
```

## Query

| Name | Type | Notes |
|---|---|---|
| `per_page` / `perPage` | number | 1–100, default `10` |
| `status` | string | Single or comma-separated |
| `business_recurring_plans_id` | UUID | Plan id |
| `customer_email` | string | |
| `reference` | string | |

## Response

Paginated. `meta` echoes filters.

| Field | Type | Notes |
|---|---|---|
| `id` | UUID | |
| `business_recurring_plans_id` | UUID \| null | |
| `customer_name` / `customer_email` | string | |
| `name` / `description` / `reference` | string | |
| `pause_from` / `pause_until` / `expires_at` | datetime \| null | |
