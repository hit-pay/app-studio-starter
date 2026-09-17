import { useEffect, useState } from 'react'
import { studioAppId } from '#/lib/utils'

export type Role = {
  id: string
  title: string
}

export type CurrentUser = {
  id: string
  email: string
  name: string | null
  role: Role | null
}

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

function appStudioApi(path: '/current-user' | '/roles' | '/staff-app-members'): string {
  return `/api/apps/${encodeURIComponent(studioAppId())}${path}`
}

async function studioGet<T>(path: '/current-user' | '/roles' | '/staff-app-members'): Promise<T> {
  const response = await fetch(appStudioApi(path), {
    credentials: 'include',
    headers: { accept: 'application/json' },
  })

  if (!response.ok) throw new Error('Sign in to use this app.')

  return (await response.json()) as T
}

export const fetchUserInfo = () => studioGet<CurrentUser>('/current-user')

export const fetchAppRoles = () => studioGet<{ roles: Role[] }>('/roles')

export const fetchStaffAppMembers = () =>
  studioGet<{ members: StaffAppMember[] }>('/staff-app-members')

let userInfoRequest: ReturnType<typeof fetchUserInfo> | null = null

/** Who is signed in. Gate UI with `user.role.title`. */
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
      userInfoRequest = fetchUserInfo().catch((caught) => {
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
