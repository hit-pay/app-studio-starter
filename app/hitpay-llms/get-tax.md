# Get Tax

`GET /v1/taxes/{taxsetting}` — Scope: `commerce:read`.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const getTax = createServerFn({ method: 'GET' })
  .inputValidator((data: { taxId: string }) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const response = await hitpayRequest(`/v1/taxes/${data.taxId}`)
    if (response.status === 404) throw new Error('Tax not found.')
    if (!response.ok) throw new Error('Could not load tax.')
    return response.json()
  })
```

Same fields as `list-taxes`.


## App rules

- Call only from `createServerFn`. Never return connector tokens to the browser.
- Never invent another path. Never implement HTTP DELETE.
- Browse via ResourcePicker (matching type). This list path is for the picker loader or a one-page sheet/wake — not a generated catalog UI.
