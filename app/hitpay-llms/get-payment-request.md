# Get Payment Request

`GET /v1/payment-requests/{payment_request_id}` — one request. Scope: `payments:read`. Do not DELETE / cancel (cancel is HTTP DELETE — forbidden).

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const getPaymentRequest = createServerFn({ method: 'GET' })
  .inputValidator((data: { paymentRequestId: string }) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const response = await hitpayRequest(`/v1/payment-requests/${data.paymentRequestId}`)
    if (response.status === 404) throw new Error('Payment request not found.')
    if (!response.ok) throw new Error('Could not load payment request.')
    return response.json()
  })
```

## Path

| Name | Type |
|---|---|
| `payment_request_id` | UUID |

## Response

**200**

| Field | Type | Notes |
|---|---|---|
| `id` | UUID | |
| `name` / `email` / `phone` | string | |
| `amount` | string | 2 decimal places |
| `currency` | string | |
| `is_currency_editable` | boolean | |
| `status` | string | |
| `purpose` / `reference_number` | string | |
| `payment_methods` | string[] | |
| `url` / `redirect_url` / `webhook` | string | |
| `send_sms` / `send_email` / `sms_status` / `email_status` | | |
| `allow_repeated_payments` | boolean | |
| `expiry_date` | datetime | |
| `address` / `line_items` | object / array | |
| `executor_id` / `staff_id` | UUID \| null | |
| `business_location_id` / `location` | | |
| `metadata` | object | |
| `payments` | array | `id`, `status`, `amount`, `currency`, `payment_type`, `fees`, `created_at` |
| `qr_code_data` / `direct_link` | | When generated |
| `created_at` / `updated_at` | datetime | |


## App rules

- Call only from `createServerFn`. Never return connector tokens to the browser.
- Never invent another path. Never implement HTTP DELETE.
