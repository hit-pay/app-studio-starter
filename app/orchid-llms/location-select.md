<!-- Generated from content/docs/components/location-select.mdx. Do not edit. -->

# Location Select

Location dropdown. Loads GET /v1/locations.

## Interactive example

The interactive example is rendered on the Orchid documentation page. Use the usage guidance below and verify the installed component source for the exact API.

Location dropdown. Loads `GET /v1/locations`. Do not call `list-locations` on the screen.

```tsx
import { LocationSelect } from '@/components/form/location-select'

<LocationSelect name="location_id" />
```

Persist `id` plus name snapshot. Optional: `multiple`.
