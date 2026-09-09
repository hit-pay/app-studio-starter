import { createHmac, timingSafeEqual } from 'node:crypto'
import { getRequest, getRequestHeader } from '@tanstack/react-start/server'

export type HitPayEnv = Record<string, string>

const envByRequest = new WeakMap<Request, Promise<HitPayEnv>>()

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

function readSignedEnv(token: string): HitPayEnv | null {
  const secret = process.env.HITPAY_SESSION_SECRET?.trim()
  const [payload, signature] = token.trim().split('.')

  if (!secret) {
    throw new Error('HITPAY_SESSION_SECRET is not set on this server.')
  }

  if (!payload || !signature || token.trim().split('.').length !== 2) {
    throw new Error('The HitPay env header is malformed.')
  }

  const expected = createHmac('sha256', secret).update(payload).digest('hex')

  if (!signaturesMatch(expected, signature)) {
    throw new Error('The HitPay env signature is invalid.')
  }

  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as {
      env?: unknown
      exp?: number
    }

    if (typeof parsed.exp === 'number' && parsed.exp * 1000 < Date.now()) {
      return null
    }

    if (parsed.env === null || typeof parsed.env !== 'object' || Array.isArray(parsed.env)) {
      return null
    }

    const env: HitPayEnv = {}

    for (const [key, value] of Object.entries(parsed.env)) {
      if (key !== '' && typeof value === 'string' && value !== '') {
        env[key] = value
      }
    }

    return env
  } catch {
    return null
  }
}

function envFromHeader(request: Request): HitPayEnv | null {
  const signed = (
    getRequestHeader('x-hitpay-env') ?? request.headers.get('x-hitpay-env') ?? ''
  ).trim()

  if (!signed) {
    return null
  }

  const fromProxy = readSignedEnv(signed)

  if (fromProxy) {
    return fromProxy
  }

  throw new Error('The HitPay env signature is invalid.')
}

function localDevEnv(): HitPayEnv {
  const env: HitPayEnv = {}

  for (const [key, value] of Object.entries(process.env)) {
    if (typeof value !== 'string' || value === '') {
      continue
    }

    if (key === 'HITPAY_SESSION_SECRET') {
      continue
    }

    if (key.startsWith('TURSO_') || key.startsWith('HITPAY_')) {
      env[key] = value
    }
  }

  return env
}

/**
 * Connector + Turso env for createServerFn / db.
 * Preview: signed X-HitPay-Env from the host proxy.
 * If the header is missing, GET /api/apps/{appId}/env with the request cookie.
 * Local `bun dev`: falls back to process.env.
 */
export async function getHitPayEnv(): Promise<HitPayEnv> {
  const request = getRequest()
  const cached = envByRequest.get(request)
  if (cached) return cached

  const pending = loadHitPayEnv(request)
  envByRequest.set(request, pending)

  try {
    return await pending
  } catch (error) {
    envByRequest.delete(request)
    throw error
  }
}

export async function getHitPayEnvValue(key: string): Promise<string> {
  const value = (await getHitPayEnv())[key] ?? ''

  if (value === '') {
    throw new Error(`${key} is not configured for this app.`)
  }

  return value
}

async function loadHitPayEnv(request: Request): Promise<HitPayEnv> {
  const fromHeader = envFromHeader(request)

  if (fromHeader !== null) {
    return fromHeader
  }

  const cookie = getRequestHeader('cookie') ?? request.headers.get('cookie') ?? ''

  if (cookie) {
    const appId = resolveAppId(request)
    const origin = new URL(request.url).origin
    const response = await fetch(`${origin}/api/apps/${appId}/env`, {
      headers: {
        accept: 'application/json',
        cookie,
      },
    })

    if (response.ok) {
      const body = (await response.json()) as unknown

      if (body !== null && typeof body === 'object' && !Array.isArray(body)) {
        const env: HitPayEnv = {}

        for (const [key, value] of Object.entries(body)) {
          if (typeof value === 'string' && value !== '') {
            env[key] = value
          }
        }

        return env
      }
    }
  }

  return localDevEnv()
}
