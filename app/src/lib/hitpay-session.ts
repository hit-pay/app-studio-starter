import { createHash } from 'node:crypto'
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

/** Avoid a /user/info hop on every createServerFn. Role changes apply after this window. */
const SESSION_TTL_MS = 45_000

type CachedSession = {
  session: HitPaySession
  expiresAt: number
}

const sessionByRequest = new WeakMap<Request, Promise<HitPaySession>>()
const sessionByCookie = new Map<string, CachedSession>()

function resolveAppId(request: Request): string {
  const fromEnv = process.env.APP_STUDIO_APP_ID?.trim()
  if (fromEnv) return fromEnv

  const first = new URL(request.url).pathname.split('/').filter(Boolean)[0]
  if (first && first !== 'api') return first

  throw new Error('HitPay app context is missing.')
}

function cookieCacheKey(cookie: string): string {
  return createHash('sha256').update(cookie).digest('hex')
}

function readCachedSession(key: string): HitPaySession | null {
  const entry = sessionByCookie.get(key)
  if (!entry) return null
  if (entry.expiresAt <= Date.now()) {
    sessionByCookie.delete(key)
    return null
  }
  return entry.session
}

/**
 * Trusted HitPay identity for createServerFn.
 * Forwards request cookies to /api/apps/{appId}/user/info.
 * Cached in memory for SESSION_TTL_MS, and once per request.
 * Never accept role, user id, or actor name from the browser payload.
 */
export async function getHitPaySession(): Promise<HitPaySession> {
  const request = getRequest()
  const cached = sessionByRequest.get(request)
  if (cached) return cached

  const pending = loadHitPaySession(request)
  sessionByRequest.set(request, pending)

  try {
    return await pending
  } catch (error) {
    sessionByRequest.delete(request)
    throw error
  }
}

async function loadHitPaySession(request: Request): Promise<HitPaySession> {
  const cookie = getRequestHeader('cookie') ?? request.headers.get('cookie') ?? ''

  if (!cookie) {
    throw new Error('Sign in to HitPay to use this app.')
  }

  const cacheKey = cookieCacheKey(cookie)
  const cached = readCachedSession(cacheKey)
  if (cached) return cached

  const appId = resolveAppId(request)
  const origin = new URL(request.url).origin
  const response = await fetch(`${origin}/api/apps/${appId}/user/info`, {
    headers: {
      accept: 'application/json',
      cookie,
    },
  })

  if (response.status === 401) {
    sessionByCookie.delete(cacheKey)
    throw new Error('Sign in to HitPay to use this app.')
  }

  if (response.status >= 500) {
    throw new Error('HitPay is temporarily unavailable. Try again shortly.')
  }

  if (!response.ok) {
    sessionByCookie.delete(cacheKey)
    throw new Error('You do not have access to this app.')
  }

  const session = (await response.json()) as HitPaySession
  sessionByCookie.set(cacheKey, {
    session,
    expiresAt: Date.now() + SESSION_TTL_MS,
  })
  return session
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
