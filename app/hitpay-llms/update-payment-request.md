# Update Payment Request

`PUT` or `PATCH /v1/payment-requests/{payment_request_id}` — update an unpaid request. Scope: `payments:create`. **202**. Completed requests cannot be edited. Do not DELETE.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_MANAGER_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const updatePaymentRequest = createServerFn({ method: 'POST' })
  .inputValidator((data: { paymentRequestId: string } & Record<string, unknown>) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_MANAGER_ROLES)
    const { paymentRequestId, ...body } = data
    const response = await hitpayRequest(`/v1/payment-requests/${paymentRequestId}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!response.ok) throw new Error('Could not update payment request.')
    return response.json()
  })
```

## Body

Same fields as `create-payment-request` (except `staff_id` is POST-only).


## App rules

- Call only from `createServerFn`. Never return connector tokens to the browser.
- Never invent another path. Never implement HTTP DELETE.
