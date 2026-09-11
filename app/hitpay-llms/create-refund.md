# Create Refund

`POST /v1/refunds` (also `POST /v1/refund`) — full or partial refund. Scope: `payments:refund`. **201**. Confirm with `@/components/overlays/confirmation-modal`. Manager roles.

Call only from `createServerFn` via `hitpayRequest` in `#/lib/server/hitpay-api`.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_MANAGER_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const createRefund = createServerFn({ method: 'POST' })
  .inputValidator((data: { payment_id: string; amount?: number; comment?: string }) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_MANAGER_ROLES)
    const response = await hitpayRequest('/v1/refunds', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('Could not refund.')
    return response.json()
  })
```

## Body

| Name | Type | Notes |
|---|---|---|
| `payment_id` | UUID | Charge id |
| `amount` | number | Omit for full refund |
| `comment` | string | |

**201** — refund, or a void payload if the charge was delayed-capture and cancelled.

| Field | Type |
|---|---|
| `refunded_by` | string |
| `amount_refunded` / `total_amount` | number |
| `refunded_at` / `created_at` | datetime |
