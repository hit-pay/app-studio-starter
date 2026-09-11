# Update Store Links

`PUT /v1/store-links` — Scope: `commerce:update`. Manager roles. Store theme must be published. At least one group required. Do not DELETE.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_MANAGER_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const updateStoreLinks = createServerFn({ method: 'POST' })
  .inputValidator((data: Record<string, unknown>) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_MANAGER_ROLES)
    const response = await hitpayRequest('/v1/store-links', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('Could not update store links.')
    return response.json()
  })
```

## Body

Same shape as `get-store-links`: `navigation_menus`, `footer_link_1`, `footer_link_2`, `social_menus`, `link_in_bio`.


## App rules

- Call only from `createServerFn`. Never return connector tokens to the browser.
- Never invent another path. Never implement HTTP DELETE.
- Browse via ResourcePicker (matching type). This list path is for the picker loader or a one-page sheet/wake — not a generated catalog UI.
