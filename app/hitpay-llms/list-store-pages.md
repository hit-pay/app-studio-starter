# List Store Pages

`GET /v1/store-pages` — Scope: `commerce:read`. List rows omit `content`.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const listStorePages = createServerFn({ method: 'GET' })
  .inputValidator((data: { keywords?: string; status?: 'published' | 'draft' } = {}) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const query = new URLSearchParams()
    query.set('per_page', '20')
    if (data.keywords) query.set('keywords', data.keywords)
    if (data.status) query.set('status', data.status)
    const response = await hitpayRequest(`/v1/store-pages?${query}`)
    if (!response.ok) throw new Error('Could not load store pages.')
    return response.json()
  })
```

## Query

| Name | Type | Notes |
|---|---|---|
| `keywords` | string | |
| `status` | `published` \| `draft` | |
| `per_page` | integer | |

## Response

| Field | Type |
|---|---|
| `id` / `business_id` | UUID |
| `title` / `description` | string |
| `enabled` | boolean |
| `page_path` | string |
| `page_cover_id` / `page_cover_url` | |
| `created_at` / `updated_at` | datetime |


## App rules

- Call only from `createServerFn`. Never return connector tokens to the browser.
- Never invent another path. Never implement HTTP DELETE.
- Browse via ResourcePicker (matching type). This list path is for the picker loader or a one-page sheet/wake — not a generated catalog UI.
