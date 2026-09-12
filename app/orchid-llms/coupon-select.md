<!-- Generated from content/docs/components/coupon-select.mdx. Do not edit. -->

# Coupon Select

Coupon dropdown. Loads GET /v1/coupons.

## Interactive example

The interactive example is rendered on the Orchid documentation page. Use the usage guidance below and verify the installed component source for the exact API.

Coupon dropdown. Loads `GET /v1/coupons`. Do not call `list-coupons` on the screen.

```tsx
import { CouponSelect } from '@/components/form/coupon-select'

<CouponSelect name="coupon_id" />
```

Persist `id` plus name snapshot. Optional: `multiple`.
