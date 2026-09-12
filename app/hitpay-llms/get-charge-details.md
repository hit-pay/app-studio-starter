# Get Charge Details

`GET /v1/charges/{charge_id}` — one charge.

Call only from `createServerFn` via `hitpayRequest` in `#/lib/server/hitpay-api`.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const getCharge = createServerFn({ method: 'GET' })
  .validator((data: { chargeId: string }) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const response = await hitpayRequest(`/v1/charges/${data.chargeId}`)
    if (response.status === 404) throw new Error('Charge not found.')
    if (!response.ok) throw new Error('Could not load charge.')
    return response.json()
  })
```

Do not list `/v1/charges` to load one id.

## Path

| Name | Type |
|---|---|
| `charge_id` | UUID |

## Response

**200** — one charge object (not wrapped in `{ data }`).

List fields plus:

| Field | Type | Notes |
|---|---|---|
| `request` | object \| omitted | Request details when present |
| `amount_without_fees` | number | Home currency |
| `refunded_amount` | number | Charge currency |
| `supports_partial_refund` / `can_refund` / `refund_available` | boolean | |
| `refund_blocked_message` | string \| null | |
| `payment_request` | object \| omitted | |
| `target_id` / `target_type` | string \| null | |
| `refunds` | array | |
| `auto_refunds` | array | Only if that relation is loaded |
| `webhook_logs` | array | |
| `terminal_id` | string \| null | |
| `refunded_at` | datetime \| null | Atom |
| `was_delayed` | boolean | |
| `is_captured` | boolean | |
| `payout` | object \| null | |
| `fees` | object | Grouped by fee type |

**403 / 404** — not allowed or missing.

## App rules

- Use after the merchant already has the id (picker or Turso).
- Never invent another charge-detail path.
