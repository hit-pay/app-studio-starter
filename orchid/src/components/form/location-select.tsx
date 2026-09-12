'use client'

import { HitPayNamedSelect } from '@/components/form/hitpay-named-select'
import { loadLocationsForSelect } from '#/lib/hitpay-commerce-selects'

type LocationRow = { id: string; name?: string | null }

type LocationSelectProps = {
  name: string
  label?: string | false
  description?: string
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  multiple?: boolean
  value?: string | string[] | null
  defaultValue?: string | string[] | null
  onValueChange?: (value: string | string[] | null, selected: LocationRow | LocationRow[] | null) => void
  load?: () => Promise<{ items: LocationRow[] }>
  clearable?: boolean
}

function locationLabel(row: LocationRow) {
  return row.name?.trim() || row.id
}

function defaultLoad() {
  return loadLocationsForSelect()
}

function LocationSelect({
  label = 'Location',
  placeholder = 'Select location',
  load = defaultLoad,
  ...props
}: LocationSelectProps) {
  return (
    <HitPayNamedSelect
      {...props}
      label={label}
      placeholder={placeholder}
      empty="No locations."
      getLabel={locationLabel}
      load={load}
    />
  )
}

export { LocationSelect }
export type { LocationRow, LocationSelectProps }
