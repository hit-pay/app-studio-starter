import { useEffect, useState } from 'react'

import { getCurrentUser, type CurrentUser, type CurrentUserRole } from '#/lib/server/current-user'

export type { CurrentUser }
export type Role = CurrentUserRole

let userInfoRequest: ReturnType<typeof getCurrentUser> | null = null

/** Who is signed in. Browser only. Gate UI with `user.role.title`. */
export function useCurrentUser(): {
  user: CurrentUser | null
  error: string | null
  loading: boolean
  retry: () => void
} {
  const [user, setUser] = useState<CurrentUser | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let cancelled = false

    setLoading(true)
    setError(null)

    if (!userInfoRequest) {
      userInfoRequest = getCurrentUser().catch((caught) => {
        userInfoRequest = null
        throw caught
      })
    }

    userInfoRequest
      .then((next) => {
        if (!cancelled) setUser(next)
      })
      .catch((caught) => {
        if (!cancelled) {
          setUser(null)
          setError(caught instanceof Error ? caught.message : 'Failed to load user.')
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
    user,
    error,
    loading,
    retry: () => {
      userInfoRequest = null
      setAttempt((value) => value + 1)
    },
  }
}
