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
