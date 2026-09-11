# Get Charge Details

`GET /v1/charges/{charge_id}` — one charge including customer, location, refunds, and fees.

Call only from `createServerFn` via `hitpayRequest` in `#/lib/server/hitpay-api`. Scope: `payments:read`. Do not fetch docs.hitpayapp.com from the running app.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const getCharge = createServerFn({ method: 'GET' })
  .inputValidator((data: { chargeId: string }) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const response = await hitpayRequest(`/v1/charges/${data.chargeId}`)
    if (response.status === 404) throw new Error('Charge not found.')
    if (!response.ok) throw new Error('Could not load charge.')
    return response.json()
  })
```

Do not call `GET /v1/charges` for a single record.

## Path

| Name | Type | Notes |
|---|---|---|
| `charge_id` | UUID | HitPay charge id |

## Response

**200** — one charge object (not a `{ data }` list).

| Field | Type | Notes |
|---|---|---|
| `id` | UUID | |
| `currency` / `home_currency` | string | |
| `amount` / `home_currency_amount` | number | Display amounts |
| `exchange_rate` | string \| null | |
| `fixed_fee` / `discount_fee` / `discount_fee_rate` | number | |
| `refunded_amount` | number | |
| `amount_without_fees` | number | |
| `remark` | string | |
| `status` | string | e.g. `succeeded`, `refunded`, `partially_refunded` |
| `supports_partial_refund` / `can_refund` / `refund_available` | boolean | |
| `refund_blocked_message` | string \| null | |
| `payment_method` | object | `code`, `name`, `type`, `display_logo`, `method_logo`, `data`, `provider_reference`, `reference_number` |
| `customer_id` / `customer` | string / object \| null | |
| `payment_request_id` / `payment_request` | UUID / object \| null | |
| `location` | `{ id, name, address }` \| null | |
| `executor` | object \| null | |
| `channel` | string | |
| `admin_fee` | boolean | |
| `refunds` / `auto_refunds` | array | |
| `webhook_logs` | array | |
| `webhook_status` | boolean | |
| `order_reference_number` / `payment_reference_number` | string | |
| `fees` | object | Grouped by fee type |
| `closed_at` / `created_at` / `updated_at` / `refunded_at` | datetime \| null | |
| `is_captured` / `was_delayed` / `xborder` | boolean | |


## App rules

- Call only from `createServerFn`. Never return connector tokens to the browser.
- Never invent another path. Never implement HTTP DELETE.
