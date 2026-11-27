import type { Location } from 'backend/types'

import { Select } from '@/components/form/select'
import { cn } from '@/lib/utils'

const ALL = 'all'

/** Picks one of the business's locations; `allLabel` adds an option for every location (value null). */
export function LocationSelect({
  locations,
  value,
  onChange,
  allLabel,
  className,
}: {
  locations: Location[]
  value: string | null
  onChange: (locationId: string | null) => void
  allLabel?: string
  className?: string
}) {
  const options = [
    ...(allLabel ? [{ value: ALL, label: allLabel }] : []),
    ...locations.map((location) => ({ value: location.id, label: location.name ?? 'Unnamed location' })),
  ]

  return (
    <Select
      className={cn('w-56', className)}
      options={options}
      value={value ?? (allLabel ? ALL : null)}
      placeholder="Choose a location"
      onValueChange={(next) => {
        const picked = typeof next === 'string' ? next : null
        onChange(picked === ALL ? null : picked)
      }}
    />
  )
}
