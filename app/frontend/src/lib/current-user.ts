import { useQuery } from '@tanstack/react-query'

import { call } from '@/lib/api'

/** Who is signed in, with their role. Gate UI with `data.role?.title`; the backend enforces it too. */
export function useCurrentUser() {
  return useQuery({ queryKey: ['me'], queryFn: () => call('GET', '/api/me'), staleTime: Infinity })
}
