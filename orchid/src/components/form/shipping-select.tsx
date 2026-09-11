'use client'

import { HitPayNamedSelect } from '@/components/form/hitpay-named-select'
import { loadShippingsForSelect } from '#/lib/hitpay-commerce-selects'

type ShippingRow = { id: string; name?: string | null }

type ShippingSelectProps = {
  name: string
  label?: string | false
  description?: string
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  multiple?: boolean
  value?: string | string[] | null
  defaultValue?: string | string[] | null
  onValueChange?: (value: string | string[] | null, selected: ShippingRow | ShippingRow[] | null) => void
  load?: () => Promise<{ items: ShippingRow[] }>
}

function shippingLabel(row: ShippingRow) {
  return row.name?.trim() || row.id
}

function defaultLoad() {
  return loadShippingsForSelect()
}

function ShippingSelect({
  label = 'Shipping',
  placeholder = 'Select shipping',
  load = defaultLoad,
  ...props
}: ShippingSelectProps) {
  return (
    <HitPayNamedSelect
      {...props}
      label={label}
      placeholder={placeholder}
      empty="No shipping methods."
      getLabel={shippingLabel}
      load={load}
    />
  )
}

export { ShippingSelect }
export type { ShippingRow, ShippingSelectProps }
