import { useQuery } from '@tanstack/react-query'

import { call } from '@/lib/api'

/** The business's staff who can use this app, with their role and locations. */
export function useStaff() {
  return useQuery({ queryKey: ['staff'], queryFn: () => call('GET', '/api/staff'), staleTime: 5 * 60_000 })
}
