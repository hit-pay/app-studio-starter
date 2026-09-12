<!-- Generated from content/docs/components/pickup-select.mdx. Do not edit. -->

# Pickup Select

Pickup dropdown. Loads GET /v1/pickups.

## Interactive example

The interactive example is rendered on the Orchid documentation page. Use the usage guidance below and verify the installed component source for the exact API.

Pickup dropdown. Loads `GET /v1/pickups`. Do not call `list-pickups` on the screen.

```tsx
import { PickupSelect } from '@/components/form/pickup-select'

<PickupSelect name="pickup_id" />
```

Persist `id` plus name snapshot. Optional: `multiple`.
