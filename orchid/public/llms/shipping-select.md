<!-- Generated from content/docs/components/shipping-select.mdx. Do not edit. -->

# Shipping Select

Shipping method dropdown. Loads GET /v1/shipping.

## Interactive example

The interactive example is rendered on the Orchid documentation page. Use the usage guidance below and verify the installed component source for the exact API.

Shipping method dropdown. Loads `GET /v1/shipping`. Do not call `list-shipping` on the screen.

```tsx
import { ShippingSelect } from '@/components/form/shipping-select'

<ShippingSelect name="shipping_id" />
```

Persist `id` plus name snapshot. Optional: `multiple`.
