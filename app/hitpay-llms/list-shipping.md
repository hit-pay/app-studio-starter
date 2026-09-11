# List Shipping

`GET /v1/shipping` — Scope: `commerce:read`. **Not paginated.**

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const listShipping = createServerFn({ method: 'GET' })
  .inputValidator((data: { currency?: string } = {}) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const query = new URLSearchParams()
    if (data.currency) query.set('currency', data.currency)
    const response = await hitpayRequest(`/v1/shipping?${query}`)
    if (!response.ok) throw new Error('Could not load shipping.')
    return response.json()
  })
```

## Query

| Name | Type | Notes |
|---|---|---|
| `currency` | string | Display conversion |

## Response

```json
{
  "is_enabled": true,
  "is_can_pick_up": false,
  "shippings": []
}
```

Shipping item: `id`, `calculation`, `name`, `description`, `formula`, `is_active`, `slots`, fulfilment times, `blackout_dates`, rate / country fields.


## App rules

- Call only from `createServerFn`. Never return connector tokens to the browser.
- Never invent another path. Never implement HTTP DELETE.
- Browse via ResourcePicker (matching type). This list path is for the picker loader or a one-page sheet/wake — not a generated catalog UI.
