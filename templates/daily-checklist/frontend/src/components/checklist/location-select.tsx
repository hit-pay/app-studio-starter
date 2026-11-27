import type { Location } from 'backend/types'

import { inputSurface } from '@ui/input'
import { cn } from '@/lib/utils'

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
  return (
    <select
      aria-label="Location"
      className={cn(inputSurface, 'w-auto min-w-48 pr-8', className)}
      value={value ?? ''}
      onChange={(event) => onChange(event.target.value || null)}
    >
      {allLabel ? <option value="">{allLabel}</option> : null}
      {locations.map((location) => (
        <option key={location.id} value={location.id}>
          {location.name ?? 'Unnamed location'}
        </option>
      ))}
    </select>
  )
}
