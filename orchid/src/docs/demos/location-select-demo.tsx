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
