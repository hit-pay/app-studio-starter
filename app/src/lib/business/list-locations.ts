import { useEffect, useState } from 'react'
import { createServerFn } from '@tanstack/react-start'

import { appJson, getAppToken } from '#/server/lib/app-token'

export type Location = {
  id: string
  name: string | null
}

function asLocations(body: unknown): Location[] {
  if (Array.isArray(body)) return body as Location[]
  if (body && typeof body === 'object') {
    const record = body as Record<string, unknown>
    if (Array.isArray(record.data)) return record.data as Location[]
    if (Array.isArray(record.locations)) return record.locations as Location[]
  }
  return []
}

export const listLocations = createServerFn({ method: 'GET' }).handler(async () => {
  const body = await appJson<unknown>(
    '/integrations/hitpay/locations',
    await getAppToken(),
  )
  return asLocations(body)
})

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
