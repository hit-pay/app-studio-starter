# Get Store Links

`GET /v1/store-links` — Scope: `commerce:read`.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const getStoreLinks = createServerFn({ method: 'GET' }).handler(async () => {
  await requireHitPayRoles(HITPAY_ALL_ROLES)
  const response = await hitpayRequest('/v1/store-links')
  if (!response.ok) throw new Error('Could not load store links.')
  return response.json()
})
```

## Response

| Field | Type | Notes |
|---|---|---|
| `navigation_menus` | array | Nested menu items |
| `footer_link_1` / `footer_link_2` | object | `enabled`, `title`, `menus` |
| `social_menus` | array | |
| `link_in_bio` | object | `enabled`, `icon_links`, `button_links` |


## App rules

- Call only from `createServerFn`. Never return connector tokens to the browser.
- Never invent another path. Never implement HTTP DELETE.
- Browse via ResourcePicker (matching type). This list path is for the picker loader or a one-page sheet/wake — not a generated catalog UI.
