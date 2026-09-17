import { useEffect, useState } from 'react'
import { createServerFn } from '@tanstack/react-start'
import { appJson, getAppToken } from '#/server/lib/app-token'
import { getSession, type Session, type SessionRole } from '#/server/lib/session'

export type CurrentUser = Session
export type Role = SessionRole

export type StaffLocation = {
  id: string
  name: string | null
}

export type StaffAppMember = {
  id: string
  name: string | null
  role_id: string | null
  role: Role | null
  locations: StaffLocation[]
}

const loadUserInfo = createServerFn({ method: 'GET' }).handler(() => getSession())

const loadAppRoles = createServerFn({ method: 'GET' }).handler(async () =>
  appJson<{ roles: Role[] }>('/roles', await getAppToken()))

const loadStaffAppMembers = createServerFn({ method: 'GET' }).handler(async () =>
  appJson<{ members: StaffAppMember[] }>('/staff-app-members', await getAppToken()))

export const fetchUserInfo = () => loadUserInfo()
export const fetchAppRoles = () => loadAppRoles()
export const fetchStaffAppMembers = () => loadStaffAppMembers()

let userInfoRequest: ReturnType<typeof fetchUserInfo> | null = null

function fetchUserInfoOnce() {
  if (!userInfoRequest) {
    userInfoRequest = fetchUserInfo().catch((error) => {
      userInfoRequest = null
      throw error
    })
  }
  return userInfoRequest
}

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

    fetchUserInfoOnce()
      .then((next) => {
        if (!cancelled) {
          setUser(next)
        }
      })
      .catch((caught) => {
        if (!cancelled) {
          setUser(null)
          setError(caught instanceof Error ? caught.message : 'Failed to load user.')
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false)
        }
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
