import { createHmac, timingSafeEqual } from 'node:crypto'
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

const sessionByRequest = new WeakMap<Request, Promise<HitPaySession>>()

function resolveAppId(request: Request): string {
  const fromEnv = process.env.APP_STUDIO_APP_ID?.trim()
  if (fromEnv) return fromEnv

  const first = new URL(request.url).pathname.split('/').filter(Boolean)[0]
  if (first && first !== 'api') return first

  throw new Error('HitPay app context is missing.')
}

function signaturesMatch(left: string, right: string): boolean {
  const a = Buffer.from(left)
  const b = Buffer.from(right)

  return a.length === b.length && timingSafeEqual(a, b)
}

function readSignedSession(token: string): HitPaySession | null {
  const secret = process.env.HITPAY_SESSION_SECRET?.trim()
  const [payload, signature] = token.trim().split('.')

  if (!secret) {
    throw new Error('HITPAY_SESSION_SECRET is not set on this server.')
  }

  if (!payload || !signature || token.trim().split('.').length !== 2) {
    throw new Error('The HitPay session header is malformed.')
  }

  // Host contract: HMAC-SHA256 hex of the base64url payload (not JWT base64url sig).
  const expected = createHmac('sha256', secret).update(payload).digest('hex')

  if (!signaturesMatch(expected, signature)) {
    throw new Error('The HitPay session signature is invalid.')
  }

  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as HitPaySession & {
      exp?: number
    }

    if (typeof parsed.exp === 'number' && parsed.exp * 1000 < Date.now()) {
      return null
    }

    if (typeof parsed.id !== 'string' || typeof parsed.email !== 'string') {
      return null
    }

    return {
      id: parsed.id,
      email: parsed.email,
      name: parsed.name ?? null,
      role: parsed.role ?? null,
    }
  } catch {
    return null
  }
}

/**
 * Trusted HitPay identity for createServerFn.
 * Production: signed X-HitPay-Session from the host proxy.
 * Local preview: GET /user/info with the request cookie.
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
  const signed = (
    getRequestHeader('x-hitpay-session') ?? request.headers.get('x-hitpay-session') ?? ''
  ).trim()

  if (signed) {
    const fromProxy = readSignedSession(signed)

    if (fromProxy) {
      return fromProxy
    }

    throw new Error('The HitPay session signature is invalid.')
  }

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
