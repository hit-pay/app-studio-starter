import { useQuery } from '@tanstack/react-query'

import { api, call } from '@/lib/api'

/** The business's locations (outlets). */
export function useLocations() {
  return useQuery({ queryKey: ['locations'], queryFn: () => call(api.locations.$get()), staleTime: 5 * 60_000 })
}
