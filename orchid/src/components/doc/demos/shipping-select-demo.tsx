import { useState } from 'react'

import { ShippingSelect } from '@/components/form/shipping-select'
import { FieldGroup } from '@ui/form/field'

function ShippingSelectDemo() {
  const [shippingId, setShippingId] = useState<string | null>(null)

  return (
    <FieldGroup className="max-w-sm">
      <ShippingSelect
        name="shipping_id"
        value={shippingId}
        description="GET /v1/shipping"
        onValueChange={(value) => setShippingId(typeof value === 'string' ? value : null)}
      />
    </FieldGroup>
  )
}

export { ShippingSelectDemo }
