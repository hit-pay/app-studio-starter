import { useState } from 'react'

import { CouponSelect } from '@/components/form/coupon-select'
import { FieldGroup } from '@ui/form/field'

function CouponSelectDemo() {
  const [couponId, setCouponId] = useState<string | null>(null)

  return (
    <FieldGroup className="max-w-sm">
      <CouponSelect
        name="coupon_id"
        value={couponId}
        description="GET /v1/coupons"
        onValueChange={(value) => setCouponId(typeof value === 'string' ? value : null)}
      />
    </FieldGroup>
  )
}

export { CouponSelectDemo }
