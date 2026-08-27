import { useEffect, useState, type ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        refetchOnWindowFocus: false,
      },
    },
  })
}

let browserClient: QueryClient | undefined

export function getQueryClient() {
  if (typeof document === 'undefined') return makeQueryClient()
  browserClient ??= makeQueryClient()
  return browserClient
}

export function QueryProvider({ children }: { children: ReactNode }) {
  const [client] = useState(getQueryClient)
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

export function useDebouncedValue<T>(value: T, ms = 300) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), ms)
    return () => window.clearTimeout(id)
  }, [value, ms])
  return debounced
}
