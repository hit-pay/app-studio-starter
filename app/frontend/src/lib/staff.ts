import { useQuery } from '@tanstack/react-query'

import { api, call } from '@/lib/api'

/** The business's staff who can use this app, with their role and locations. */
export function useStaff() {
  return useQuery({ queryKey: ['staff'], queryFn: () => call(api.staff.$get()), staleTime: 5 * 60_000 })
}
