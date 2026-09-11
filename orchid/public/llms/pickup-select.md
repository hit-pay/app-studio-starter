<!-- Generated from content/docs/components/pickup-select.mdx. Do not edit. -->

# Pickup Select

Pickup dropdown. Loads GET /v1/pickups.

## Example

```tsx
import { useState } from 'react'

import { PickupSelect } from '@/components/form/pickup-select'
import { FieldGroup } from '@ui/form/field'

function PickupSelectDemo() {
  const [pickupId, setPickupId] = useState<string | null>(null)

  return (
    <FieldGroup className="max-w-sm">
      <PickupSelect
        name="pickup_id"
        value={pickupId}
        description="GET /v1/pickups"
        onValueChange={(value) => setPickupId(typeof value === 'string' ? value : null)}
      />
    </FieldGroup>
  )
}

export { PickupSelectDemo }
```

Pickup dropdown. Loads `GET /v1/pickups`. Do not call `list-pickups` on the screen.

```tsx
import { PickupSelect } from '@/components/form/pickup-select'

<PickupSelect name="pickup_id" />
```

Persist `id` plus name snapshot. Optional: `multiple`.
