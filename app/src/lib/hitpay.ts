import { useEffect, useState } from 'react'

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

export type HitPayMember = {
  id: string
  email: string
  name: string | null
  role_id: string | null
}

function assertBrowser(): void {
  if (typeof window === 'undefined') {
    throw new Error(
      'HitPay /api/apps/{appId}/user/info, /roles, and /members must be fetched in the browser, not from createServerFn or a loader.',
    )
  }
}

function appStudioApi(path: '/user/info' | '/roles' | '/members'): string {
  const appId = window.location.pathname.split('/').filter(Boolean)[0]

  return `/api/apps/${appId}${path}`
}

async function hitpayGet<T>(path: '/user/info' | '/roles' | '/members'): Promise<T> {
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

export const fetchAppMembers = () => hitpayGet<{ members: HitPayMember[] }>('/members')

/**
 * Who is signed in. Browser only. Opening the app is gated by the proxy
 * (user/info must succeed). Gate in-app actions with `user.role.title`.
 */
export function useHitPayUser(): {
  user: HitPayUser | null
  error: string | null
} {
  const [user, setUser] = useState<HitPayUser | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    fetchUserInfo()
      .then((next) => {
        if (!cancelled) {
          setUser(next)
        }
      })
      .catch((caught) => {
        if (!cancelled) {
          setError(caught instanceof Error ? caught.message : 'Failed to load user.')
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { user, error }
}
