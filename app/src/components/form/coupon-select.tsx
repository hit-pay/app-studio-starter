'use client'

import { HitPayNamedSelect } from '@/components/form/hitpay-named-select'
import { loadCouponsForSelect } from '#/lib/hitpay-commerce-selects'

type CouponRow = { id: string; name?: string | null; code?: string | null }

type CouponSelectProps = {
  name: string
  label?: string | false
  description?: string
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  multiple?: boolean
  value?: string | string[] | null
  defaultValue?: string | string[] | null
  onValueChange?: (value: string | string[] | null, selected: CouponRow | CouponRow[] | null) => void
  load?: () => Promise<{ items: CouponRow[] }>
}

function couponLabel(row: CouponRow) {
  return row.name?.trim() || row.code?.trim() || row.id
}

function defaultLoad() {
  return loadCouponsForSelect()
}

function CouponSelect({
  label = 'Coupon',
  placeholder = 'Select coupon',
  load = defaultLoad,
  ...props
}: CouponSelectProps) {
  return (
    <HitPayNamedSelect
      {...props}
      label={label}
      placeholder={placeholder}
      empty="No coupons."
      getLabel={couponLabel}
      load={load}
    />
  )
}

export { CouponSelect }
export type { CouponRow, CouponSelectProps }
