import { useQuery } from '@tanstack/react-query'

import { call } from '@/lib/api'

/** The business's locations (outlets). */
export function useLocations() {
  return useQuery({ queryKey: ['locations'], queryFn: () => call('GET', '/api/locations'), staleTime: 5 * 60_000 })
}
