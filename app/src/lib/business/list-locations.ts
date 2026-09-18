import { useEffect, useState } from 'react'

import { listLocations } from '#/lib/server/business'

export type Location = Awaited<ReturnType<typeof listLocations>>[number]

let locationsRequest: ReturnType<typeof listLocations> | null = null

/** HitPay locations for this app. Browser only. Shares one in-flight request. */
export function useListLocations(): {
  locations: Location[] | null
  error: string | null
  loading: boolean
  retry: () => void
} {
  const [locations, setLocations] = useState<Location[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let cancelled = false

    setLoading(true)
    setError(null)

    if (!locationsRequest) {
      locationsRequest = listLocations().catch((caught) => {
        locationsRequest = null
        throw caught
      })
    }

    locationsRequest
      .then((next) => {
        if (!cancelled) setLocations(next)
      })
      .catch((caught) => {
        if (!cancelled) {
          setLocations(null)
          setError(caught instanceof Error ? caught.message : 'Failed to load locations.')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [attempt])

  return {
    locations,
    error,
    loading,
    retry: () => {
      locationsRequest = null
      setAttempt((value) => value + 1)
    },
  }
}
