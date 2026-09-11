'use client'

import { HitPayNamedSelect } from '@/components/form/hitpay-named-select'
import { loadDiscountsForSelect } from '#/lib/hitpay-commerce-selects'

type DiscountRow = { id: string; name?: string | null }

type DiscountSelectProps = {
  name: string
  label?: string | false
  description?: string
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  multiple?: boolean
  value?: string | string[] | null
  defaultValue?: string | string[] | null
  onValueChange?: (value: string | string[] | null, selected: DiscountRow | DiscountRow[] | null) => void
  load?: () => Promise<{ items: DiscountRow[] }>
}

function discountLabel(row: DiscountRow) {
  return row.name?.trim() || row.id
}

function defaultLoad() {
  return loadDiscountsForSelect()
}

function DiscountSelect({
  label = 'Discount',
  placeholder = 'Select discount',
  load = defaultLoad,
  ...props
}: DiscountSelectProps) {
  return (
    <HitPayNamedSelect
      {...props}
      label={label}
      placeholder={placeholder}
      empty="No discounts."
      getLabel={discountLabel}
      load={load}
    />
  )
}

export { DiscountSelect }
export type { DiscountRow, DiscountSelectProps }
