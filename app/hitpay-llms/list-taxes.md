# List Taxes

`GET /v1/taxes` — tax settings. Scope: `commerce:read`. Default `per_page` 5, max 100.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const listTaxes = createServerFn({ method: 'GET' })
  .inputValidator((data: { keywords?: string } = {}) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const query = new URLSearchParams()
    query.set('per_page', '20')
    if (data.keywords) query.set('keywords', data.keywords)
    const response = await hitpayRequest(`/v1/taxes?${query}`)
    if (!response.ok) throw new Error('Could not load taxes.')
    return response.json()
  })
```

## Query

| Name | Type | Notes |
|---|---|---|
| `keywords` | string | |
| `per_page` | integer | Default 5, max 100 |

## Response

| Field | Type |
|---|---|
| `id` | UUID |
| `name` | string |
| `rate` | number |
| `tax_inclusive` | boolean |
| `created_at` / `updated_at` | datetime |


## App rules

- Call only from `createServerFn`. Never return connector tokens to the browser.
- Never invent another path. Never implement HTTP DELETE.
- Browse via ResourcePicker (matching type). This list path is for the picker loader or a one-page sheet/wake — not a generated catalog UI.
