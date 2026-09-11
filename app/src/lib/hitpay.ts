import { useEffect, useState } from 'react'
import { studioAppId } from '#/lib/studio-app-id'

export {
  HITPAY_ALL_ROLES,
  HITPAY_MANAGER_ROLES,
  HITPAY_ROLE,
} from '#/lib/hitpay-roles'
export type { HitPayRoleTitle } from '#/lib/hitpay-roles'

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
  email: string | null
  name: string | null
  role_id: string | null
  role: HitPayRole | null
  locations: HitPayStaffLocation[]
}

/** @deprecated Use HitPayStaffAppMember */
export type HitPayMember = HitPayStaffAppMember

function assertBrowser(): void {
  if (typeof window === 'undefined') {
    throw new Error(
      'useHitPayUser and fetch* are browser-only. In createServerFn import getHitPaySession from #/lib/server/hitpay.',
    )
  }
}

function appStudioApi(path: '/user/info' | '/roles' | '/staff-app-members'): string {
  return `/api/apps/${encodeURIComponent(studioAppId())}${path}`
}

async function hitpayGet<T>(path: '/user/info' | '/roles' | '/staff-app-members'): Promise<T> {
  assertBrowser()

  const response = await fetch(appStudioApi(path), {
    credentials: 'include',
    headers: { accept: 'application/json' },
  })

  if (response.status === 401) {
    throw new Error('Sign in to HitPay to use this app.')
  }

  if (response.status >= 500) {
    throw new Error('HitPay is temporarily unavailable. Try again shortly.')
  }

  if (!response.ok) {
    throw new Error('You do not have access to this app.')
  }

  return (await response.json()) as T
}

export const fetchUserInfo = () => hitpayGet<HitPayUser>('/user/info')

export const fetchAppRoles = () => hitpayGet<{ roles: HitPayRole[] }>('/roles')

export const fetchStaffAppMembers = () =>
  hitpayGet<{ members: HitPayStaffAppMember[] }>('/staff-app-members')

/** @deprecated Use fetchStaffAppMembers */
export const fetchAppMembers = fetchStaffAppMembers

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

    fetchUserInfo()
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

  return { user, error, loading, retry: () => setAttempt((value) => value + 1) }
}
