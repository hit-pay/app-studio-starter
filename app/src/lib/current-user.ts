import { useEffect, useState } from 'react'
import { createServerFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'
import { studioAppId } from '#/lib/utils'
import { getAppToken } from '#/lib/server/app-token'

export {
  ALL_ROLES,
  MANAGER_ROLES,
  ROLE,
} from '@/lib/roles'
export type { RoleTitle } from '@/lib/roles'

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

function proxyUrl(path: string): URL {
  const appId = process.env.APP_STUDIO_APP_ID?.trim() || studioAppId()
  const origin = process.env.APP_STUDIO_PROXY_URL?.trim()

  if (!origin) {
    throw new Error('APP_STUDIO_PROXY_URL is not configured.')
  }

  return new URL(`/api/apps/${encodeURIComponent(appId)}${path}`, `${origin}/`)
}

async function proxyJson<T>(path: string, token?: string): Promise<T> {
  const headers = new Headers({ accept: 'application/json' })
  const cookie = getRequest().headers.get('cookie')

  if (cookie) {
    headers.set('cookie', cookie)
  }

  if (token) headers.set('authorization', `Bearer ${token}`)
  if (cookie) headers.set('cookie', cookie)
  const url = proxyUrl(path)
  const response = await fetch(url, { headers })
  if (!response.ok) {
    throw new Error(
      `Unable to load app data (HTTP ${response.status}, `
      + `path=${url.pathname}, hasCookie=${headers.has('cookie')}, `
      + `hasBearer=${headers.has('authorization')}).`,
    )
  }
  return response.json() as Promise<T>
}

const loadUserInfo = createServerFn({ method: 'GET' }).handler(() =>
  proxyJson<CurrentUser>('/current-user'))

const loadAppRoles = createServerFn({ method: 'GET' }).handler(async () =>
  proxyJson<{ roles: Role[] }>('/roles', await getAppToken()))

const loadStaffAppMembers = createServerFn({ method: 'GET' }).handler(async () =>
  proxyJson<{ members: StaffAppMember[] }>('/staff-app-members', await getAppToken()))

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
