# Create Payment Request

`POST /v1/payment-requests` — collect a payment. Scope: `payments:create`. **201**. Do not rebuild hosted checkout UI unless the merchant asked to collect money in-app.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_MANAGER_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const createPaymentRequest = createServerFn({ method: 'POST' })
  .inputValidator((data: { currency: string; amount?: number } & Record<string, unknown>) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_MANAGER_ROLES)
    const response = await hitpayRequest('/v1/payment-requests', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('Could not create payment request.')
    return response.json()
  })
```

## Body (`application/json`)

Required: `currency`. `amount` required when `generate_qr` or `generate_direct_link` is true.

| Name | Type | Notes |
|---|---|---|
| `currency` | string(3) | Required |
| `amount` | number | 0.3–999999999.99 |
| `name` / `email` / `phone` | string | Payer; phone 0–15 |
| `purpose` / `reference_number` | string | Max 255 |
| `payment_methods` | string[] | Must be enabled on the business |
| `redirect_url` | url | Required if `generate_direct_link` |
| `webhook` / `failed_webhook` | url | Max 1028 |
| `send_sms` / `send_email` | boolean | Default false |
| `allow_repeated_payments` | boolean | |
| `expiry_date` | `Y-m-d H:i:s` | After now |
| `expires_after` | string | e.g. `30 mins`, `2 hours`, `7 days` |
| `channel` | string | Plugin channel |
| `is_currency_editable` / `add_admin_fee` | boolean | |
| `wifi_terminal_id` | string | If wifi card reader |
| `address` | object | `line1`, `line2`, `city`, `state`, `country`, `postal_code` |
| `line_items[]` | array | `id`, `name`, `price`, `quantity`, `description`, `sku`, `category`, `url` |
| `generate_qr` / `generate_direct_link` | boolean | Mutual exclusive |
| `staff_id` | UUID | POST only |
| `business_location_id` / `location_id` | UUID | Active location |
| `metadata` | object | |

**201** — payment request + optional `qr_code_data`, `direct_link`.


## App rules

- Call only from `createServerFn`. Never return connector tokens to the browser.
- Never invent another path. Never implement HTTP DELETE.
