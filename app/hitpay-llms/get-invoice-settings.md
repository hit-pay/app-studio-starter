# Get Invoice Settings

`GET /v1/invoice-settings` — Scope: `commerce:read`.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const getInvoiceSettings = createServerFn({ method: 'GET' }).handler(async () => {
  await requireHitPayRoles(HITPAY_ALL_ROLES)
  const response = await hitpayRequest('/v1/invoice-settings')
  if (!response.ok) throw new Error('Could not load invoice settings.')
  return response.json()
})
```

## Response

Object keyed by setting. Keys: `title`, `description`, `footer`, `late_fee`, `custom_fields`.

```json
{
  "title": { "value": "Invoice" },
  "description": { "value": "" },
  "footer": { "value": "" },
  "late_fee": { "value": {} },
  "custom_fields": { "value": [] }
}
```


## App rules

- Call only from `createServerFn`. Never return connector tokens to the browser.
- Never invent another path. Never implement HTTP DELETE.
- Browse via ResourcePicker (matching type). This list path is for the picker loader or a one-page sheet/wake — not a generated catalog UI.
