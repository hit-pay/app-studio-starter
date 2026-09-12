<!-- Generated from content/docs/components/discount-select.mdx. Do not edit. -->

# Discount Select

Discount dropdown. Loads GET /v1/discounts.

## Interactive example

The interactive example is rendered on the Orchid documentation page. Use the usage guidance below and verify the installed component source for the exact API.

Discount dropdown. Loads `GET /v1/discounts`. Do not call `list-discounts` on the screen.

```tsx
import { DiscountSelect } from '@/components/form/discount-select'

<DiscountSelect name="discount_id" />
```

Persist `id` plus name snapshot. Optional: `multiple`.
