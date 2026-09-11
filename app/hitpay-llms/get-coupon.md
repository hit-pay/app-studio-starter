# Get Coupon

`GET /v1/coupons/{coupon_id}` — Scope: `commerce:read`.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const getCoupon = createServerFn({ method: 'GET' })
  .inputValidator((data: { couponId: string }) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const response = await hitpayRequest(`/v1/coupons/${data.couponId}`)
    if (response.status === 404) throw new Error('Coupon not found.')
    if (!response.ok) throw new Error('Could not load coupon.')
    return response.json()
  })
```

## Response

Same fields as `list-coupons`.


## App rules

- Call only from `createServerFn`. Never return connector tokens to the browser.
- Never invent another path. Never implement HTTP DELETE.
- Browse via ResourcePicker (matching type). This list path is for the picker loader or a one-page sheet/wake — not a generated catalog UI.
