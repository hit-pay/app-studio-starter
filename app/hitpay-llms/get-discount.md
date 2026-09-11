# Get Discount

`GET /v1/discounts/{discount_id}` — Scope: `commerce:read`.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const getDiscount = createServerFn({ method: 'GET' })
  .inputValidator((data: { discountId: string }) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const response = await hitpayRequest(`/v1/discounts/${data.discountId}`)
    if (response.status === 404) throw new Error('Discount not found.')
    if (!response.ok) throw new Error('Could not load discount.')
    return response.json()
  })
```

Same fields as `list-discounts`.


## App rules

- Call only from `createServerFn`. Never return connector tokens to the browser.
- Never invent another path. Never implement HTTP DELETE.
- Browse via ResourcePicker (matching type). This list path is for the picker loader or a one-page sheet/wake — not a generated catalog UI.
