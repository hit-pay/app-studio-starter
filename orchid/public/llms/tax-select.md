<!-- Generated from content/docs/components/tax-select.mdx. Do not edit. -->

# Tax Select

Tax dropdown. Loads GET /v1/taxes.

## Interactive example

The interactive example is rendered on the Orchid documentation page. Use the usage guidance below and verify the installed component source for the exact API.

Tax dropdown. Loads `GET /v1/taxes`. Do not call `list-taxes` on the screen.

```tsx
import { TaxSelect } from '@/components/form/tax-select'

<TaxSelect name="tax_id" />
```

Persist `id` plus name snapshot. Optional: `multiple`.
