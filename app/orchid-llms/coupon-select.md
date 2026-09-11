<!-- Generated from content/docs/components/coupon-select.mdx. Do not edit. -->

# Coupon Select

Coupon dropdown. Loads GET /v1/coupons.

## Example

```tsx
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
```

Coupon dropdown. Loads `GET /v1/coupons`. Do not call `list-coupons` on the screen.

```tsx
import { CouponSelect } from '@/components/form/coupon-select'

<CouponSelect name="coupon_id" />
```

Persist `id` plus name snapshot. Optional: `multiple`.
