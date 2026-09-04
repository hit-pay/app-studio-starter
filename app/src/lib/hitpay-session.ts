import { getRequest, getRequestHeader } from '@tanstack/react-start/server'

export type HitPaySessionRole = {
  id: string
  title: string
}

export type HitPaySession = {
  id: string
  email: string
  name: string | null
  role: HitPaySessionRole | null
}

function resolveAppId(request: Request): string {
  const fromEnv = process.env.APP_STUDIO_APP_ID?.trim()
  if (fromEnv) return fromEnv

  const first = new URL(request.url).pathname.split('/').filter(Boolean)[0]
  if (first && first !== 'api') return first

  throw new Error('HitPay app context is missing.')
}

/**
 * Trusted HitPay identity for createServerFn.
 * Forwards the incoming request cookies to /api/apps/{appId}/user/info.
 * Never accept role, user id, or actor name from the browser payload.
 */
export async function getHitPaySession(): Promise<HitPaySession> {
  const request = getRequest()
  const cookie = getRequestHeader('cookie') ?? request.headers.get('cookie') ?? ''

  if (!cookie) {
    throw new Error('Sign in to HitPay to use this app.')
  }

  const appId = resolveAppId(request)
  const origin = new URL(request.url).origin
  const response = await fetch(`${origin}/api/apps/${appId}/user/info`, {
    headers: {
      accept: 'application/json',
      cookie,
    },
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

  return (await response.json()) as HitPaySession
}

export async function requireHitPayRoles(
  allowedTitles: readonly string[],
): Promise<HitPaySession> {
  const session = await getHitPaySession()
  const title = session.role?.title

  if (!title || !allowedTitles.includes(title)) {
    throw new Error('You do not have permission to do this.')
  }

  return session
}
