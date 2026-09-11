# Get Refund

`GET /v1/refunds/{refund_id}` (also `/v1/refund/{refund_id}`). Scope: `payments:read` or `payments:refund`.

Call only from `createServerFn` via `hitpayRequest` in `#/lib/server/hitpay-api`.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const getRefund = createServerFn({ method: 'GET' })
  .inputValidator((data: { refundId: string }) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const response = await hitpayRequest(`/v1/refunds/${data.refundId}`)
    if (!response.ok) throw new Error('Could not load refund.')
    return response.json()
  })
```

| Field | Type |
|---|---|
| `refund_id` | UUID |

Same fields as `create-refund`. Use when you already have the id (create response or charge details).
