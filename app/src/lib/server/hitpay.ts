import { createHmac, timingSafeEqual } from 'node:crypto'
import { getRequest, getRequestHeader } from '@tanstack/react-start/server'

export type HitPayEnv = Record<string, string>

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

const envByRequest = new WeakMap<Request, Promise<HitPayEnv>>()
const sessionByRequest = new WeakMap<Request, Promise<HitPaySession>>()

function signaturesMatch(left: string, right: string): boolean {
  const a = Buffer.from(left)
  const b = Buffer.from(right)

  return a.length === b.length && timingSafeEqual(a, b)
}

function readSignedHeader(token: string): Record<string, unknown> {
  const secret = process.env.HITPAY_SESSION_SECRET?.trim()

  if (!secret) {
    throw new Error('HITPAY_SESSION_SECRET is not set on this server.')
  }

  const trimmed = token.trim()
  const dot = trimmed.lastIndexOf('.')
  const payload = dot > 0 ? trimmed.slice(0, dot) : ''
  const signature = dot > 0 ? trimmed.slice(dot + 1) : ''

  if (payload === '' || signature === '' || trimmed.includes('..')) {
    throw new Error('The HitPay header is malformed.')
  }

  const expected = createHmac('sha256', secret).update(payload).digest('hex')

  if (!signaturesMatch(expected, signature)) {
    throw new Error('The HitPay header signature is invalid.')
  }

  const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as unknown

  if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('The HitPay header is malformed.')
  }

  const exp = (parsed as { exp?: unknown }).exp

  if (typeof exp === 'number' && exp * 1000 < Date.now()) {
    throw new Error('The HitPay header has expired.')
  }

  return parsed as Record<string, unknown>
}

function stringMap(value: unknown): HitPayEnv {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    return {}
  }

  const env: HitPayEnv = {}

  for (const [key, item] of Object.entries(value)) {
    if (key !== '' && typeof item === 'string' && item !== '') {
      env[key] = item
    }
  }

  return env
}

function localDevEnv(): HitPayEnv {
  const env: HitPayEnv = {}

  for (const [key, value] of Object.entries(process.env)) {
    if (
      typeof value === 'string'
      && value !== ''
      && key !== 'HITPAY_SESSION_SECRET'
      && key !== 'APP_STUDIO_APP_ID'
      && /^[A-Z][A-Z0-9]*_[A-Z0-9_]+$/.test(key)
      && !/^(NODE|BUN|npm|VITE|NITRO)_/.test(key)
    ) {
      env[key] = value
    }
  }

  return env
}

function sessionFromPayload(parsed: Record<string, unknown>): HitPaySession | null {
  if (typeof parsed.id !== 'string' || typeof parsed.email !== 'string') {
    return null
  }

  const role = parsed.role

  return {
    id: parsed.id,
    email: parsed.email,
    name: typeof parsed.name === 'string' ? parsed.name : null,
    role:
      role !== null
      && typeof role === 'object'
      && !Array.isArray(role)
      && typeof (role as HitPaySessionRole).id === 'string'
      && typeof (role as HitPaySessionRole).title === 'string'
        ? { id: (role as HitPaySessionRole).id, title: (role as HitPaySessionRole).title }
        : null,
  }
}

/**
 * Connector + Turso env. createServerFn only. Signed X-HitPay-Env from the Bun hop.
 * Local `bun dev`: process.env.
 */
export async function getHitPayEnv(): Promise<HitPayEnv> {
  const request = getRequest()
  const cached = envByRequest.get(request)

  if (cached) {
    return cached
  }

  const pending = (async () => {
    const signed = (getRequestHeader('x-hitpay-env') ?? '').trim()

    if (!signed) {
      return localDevEnv()
    }

    return stringMap(readSignedHeader(signed).env)
  })()

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
    throw new Error(
      `${key} is not configured for this app. Ask the merchant to connect this provider in Settings → Connectors.`,
    )
  }

  return value
}

export async function getConnector(provider: string): Promise<HitPayEnv> {
  const prefix = `${provider.trim().toUpperCase().replace(/[^A-Z0-9]+/g, '_')}_`
  const env = await getHitPayEnv()
  const next: HitPayEnv = {}

  for (const [key, value] of Object.entries(env)) {
    if (key.startsWith(prefix)) {
      next[key] = value
    }
  }

  return next
}

/** Trusted identity. createServerFn only. Signed X-HitPay-Session from the Bun hop. */
export async function getHitPaySession(): Promise<HitPaySession> {
  const request = getRequest()
  const cached = sessionByRequest.get(request)

  if (cached) {
    return cached
  }

  const pending = (async () => {
    const signed = (getRequestHeader('x-hitpay-session') ?? '').trim()

    if (!signed) {
      throw new Error('Sign in to HitPay to use this app.')
    }

    const session = sessionFromPayload(readSignedHeader(signed))

    if (session === null) {
      throw new Error('The HitPay session header is malformed.')
    }

    return session
  })()

  sessionByRequest.set(request, pending)

  try {
    return await pending
  } catch (error) {
    sessionByRequest.delete(request)
    throw error
  }
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
