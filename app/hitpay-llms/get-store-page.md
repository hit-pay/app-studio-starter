# Get Store Page

`GET /v1/store-pages/{store_page}` — Scope: `commerce:read`.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const getStorePage = createServerFn({ method: 'GET' })
  .inputValidator((data: { pageId: string }) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const response = await hitpayRequest(`/v1/store-pages/${data.pageId}`)
    if (response.status === 404) throw new Error('Store page not found.')
    if (!response.ok) throw new Error('Could not load store page.')
    return response.json()
  })
```

Same list fields; may include page `content` on show.


## App rules

- Call only from `createServerFn`. Never return connector tokens to the browser.
- Never invent another path. Never implement HTTP DELETE.
- Browse via ResourcePicker (matching type). This list path is for the picker loader or a one-page sheet/wake — not a generated catalog UI.
