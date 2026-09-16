import { useEffect, useState } from 'react'
import { createServerFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'
import { studioAppId } from '@/lib/studio-app-id'

export {
  HITPAY_ALL_ROLES,
  HITPAY_MANAGER_ROLES,
  HITPAY_ROLE,
} from '@/lib/hitpay-roles'
export type { HitPayRoleTitle } from '@/lib/hitpay-roles'

export type HitPayRole = {
  id: string
  title: string
}

export type HitPayUser = {
  id: string
  email: string
  name: string | null
  role: HitPayRole | null
}

export type HitPayStaffLocation = {
  id: string
  name: string | null
}

export type HitPayStaffAppMember = {
  id: string
  name: string | null
  role_id: string | null
  role: HitPayRole | null
  locations: HitPayStaffLocation[]
}

function proxyUrl(path: string): URL {
  const request = getRequest()
  const appId = process.env.APP_STUDIO_APP_ID?.trim() || studioAppId()
  const origin = process.env.APP_STUDIO_PROXY_URL?.trim() || new URL(request.url).origin

  return new URL(`/api/apps/${encodeURIComponent(appId)}${path}`, `${origin}/`)
}

async function proxyJson<T>(path: string, token?: string): Promise<T> {
  const headers = new Headers({ accept: 'application/json' })
  const cookie = getRequest().headers.get('cookie')

  if (cookie) {
    headers.set('cookie', cookie)
  }

  if (token) headers.set('authorization', `Bearer ${token}`)
  const response = await fetch(proxyUrl(path), { headers })
  if (!response.ok) throw new Error('Unable to load HitPay app data.')
  return response.json() as Promise<T>
}

const loadUserInfo = createServerFn({ method: 'GET' }).handler(() =>
  proxyJson<HitPayUser & { appToken?: string }>('/current-user'))

const loadAppRoles = createServerFn({ method: 'GET' }).handler(async () => {
  const user = await proxyJson<{ appToken?: string }>('/current-user')
  if (!user.appToken) throw new Error('Unable to authorize HitPay app data.')
  return proxyJson<{ roles: HitPayRole[] }>('/roles', user.appToken)
})

const loadStaffAppMembers = createServerFn({ method: 'GET' }).handler(async () => {
  const user = await proxyJson<{ appToken?: string }>('/current-user')
  if (!user.appToken) throw new Error('Unable to authorize HitPay app data.')
  return proxyJson<{ members: HitPayStaffAppMember[] }>('/staff-app-members', user.appToken)
})

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
export function useHitPayUser(): {
  user: HitPayUser | null
  error: string | null
  loading: boolean
  retry: () => void
} {
  const [user, setUser] = useState<HitPayUser | null>(null)
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
