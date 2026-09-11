# Get Store Settings

`GET /v1/store-settings` — Scope: `commerce:read`. Read-only (no public OAuth update).

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const getStoreSettings = createServerFn({ method: 'GET' }).handler(async () => {
  await requireHitPayRoles(HITPAY_ALL_ROLES)
  const response = await hitpayRequest('/v1/store-settings')
  if (!response.ok) throw new Error('Could not load store settings.')
  return response.json()
})
```

## Response

```json
{ "store_settings": { } }
```

`store_settings` fields include: `id`, `meta_title`, `meta_description`, `sitemap_verification_tag`, `shop_state`, `slots`, `can_pick_up`, `seller_notes`, `enable_datetime` / `enable_date` / `enable_time`, `enabled_shipping`, `get_started`, `all_product_description`, `thank_message`, redirect flags, `tax_applies_to`, `tax_settings_id`, `tax_setting`, `hide_sold_out_products`, `order_form`, `google_analytics_id`, `pixel_id`, `access_protected`, `access_code_message`, `button_labels`, `custom_code`, `favicon_url`, `default_currency`. Public OAuth hides `access_code`.


## App rules

- Call only from `createServerFn`. Never return connector tokens to the browser.
- Never invent another path. Never implement HTTP DELETE.
- Browse via ResourcePicker (matching type). This list path is for the picker loader or a one-page sheet/wake — not a generated catalog UI.
