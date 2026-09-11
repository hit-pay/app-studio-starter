'use client'

import { HitPayNamedSelect } from '@/components/form/hitpay-named-select'
import { loadPickupsForSelect } from '#/lib/hitpay-commerce-selects'

type PickupRow = { id: string; name?: string | null; address?: string | null }

type PickupSelectProps = {
  name: string
  label?: string | false
  description?: string
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  multiple?: boolean
  value?: string | string[] | null
  defaultValue?: string | string[] | null
  onValueChange?: (value: string | string[] | null, selected: PickupRow | PickupRow[] | null) => void
  load?: () => Promise<{ items: PickupRow[] }>
}

function pickupLabel(row: PickupRow) {
  return row.name?.trim() || row.address?.trim() || row.id
}

function defaultLoad() {
  return loadPickupsForSelect()
}

function PickupSelect({
  label = 'Pickup',
  placeholder = 'Select pickup',
  load = defaultLoad,
  ...props
}: PickupSelectProps) {
  return (
    <HitPayNamedSelect
      {...props}
      label={label}
      placeholder={placeholder}
      empty="No pickups."
      getLabel={pickupLabel}
      load={load}
    />
  )
}

export { PickupSelect }
export type { PickupRow, PickupSelectProps }
