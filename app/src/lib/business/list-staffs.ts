import { useEffect, useState } from 'react'

import { listStaffs } from '#/lib/business/server'
import type { Staff } from '#/types'

export type { Staff } from '#/types'

let staffsRequest: ReturnType<typeof listStaffs> | null = null

/** Staff on this app. Browser only. Shares one in-flight request. */
export function useListStaffs(): {
  staffs: Staff[] | null
  error: string | null
  loading: boolean
  retry: () => void
} {
  const [staffs, setStaffs] = useState<Staff[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let cancelled = false

    setLoading(true)
    setError(null)

    if (!staffsRequest) {
      staffsRequest = listStaffs().catch((caught) => {
        staffsRequest = null
        throw caught
      })
    }

    staffsRequest
      .then((next) => {
        if (!cancelled) setStaffs(next)
      })
      .catch((caught) => {
        if (!cancelled) {
          setStaffs(null)
          setError(caught instanceof Error ? caught.message : 'Failed to load staff.')
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
    staffs,
    error,
    loading,
    retry: () => {
      staffsRequest = null
      setAttempt((value) => value + 1)
    },
  }
}
