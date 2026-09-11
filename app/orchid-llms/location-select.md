<!-- Generated from content/docs/components/location-select.mdx. Do not edit. -->

# Location Select

Location dropdown. Loads GET /v1/locations.

## Example

```tsx
import { useState } from 'react'

import { LocationSelect } from '@/components/form/location-select'
import { FieldGroup } from '@ui/form/field'

function LocationSelectDemo() {
  const [locationId, setLocationId] = useState<string | null>(null)

  return (
    <FieldGroup className="max-w-sm">
      <LocationSelect
        name="location_id"
        value={locationId}
        description="GET /v1/locations"
        onValueChange={(value) => setLocationId(typeof value === 'string' ? value : null)}
      />
    </FieldGroup>
  )
}

export { LocationSelectDemo }
```

Location dropdown. Loads `GET /v1/locations`. Do not call `list-locations` on the screen.

```tsx
import { LocationSelect } from '@/components/form/location-select'

<LocationSelect name="location_id" />
```

Persist `id` plus name snapshot. Optional: `multiple`.
