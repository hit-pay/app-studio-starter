import { useState } from 'react'

import { DiscountSelect } from '@/components/form/discount-select'
import { FieldGroup } from '@ui/form/field'

function DiscountSelectDemo() {
  const [discountId, setDiscountId] = useState<string | null>(null)

  return (
    <FieldGroup className="max-w-sm">
      <DiscountSelect
        name="discount_id"
        value={discountId}
        description="GET /v1/discounts"
        onValueChange={(value) => setDiscountId(typeof value === 'string' ? value : null)}
      />
    </FieldGroup>
  )
}

export { DiscountSelectDemo }
