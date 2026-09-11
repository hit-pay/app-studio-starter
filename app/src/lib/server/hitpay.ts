/**
 * createServerFn only. Hopped session + connector env.
 * getConnectorValue('KEY') / getConnectors() / getConnector('slug')
 * getHitPaySession() / requireHitPayRoles(HITPAY_ALL_ROLES | HITPAY_MANAGER_ROLES)
 */
import { createHmac, timingSafeEqual } from 'node:crypto'
import { getRequest, getRequestHeader } from '@tanstack/react-start/server'

export type ConnectorValues = Record<string, string>

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

const connectorsByRequest = new WeakMap<Request, Promise<ConnectorValues>>()
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
  if (trimmed.length > 65_536) {
    throw new Error('The App Studio header is too large.')
  }

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

  let parsed: unknown

  try {
    parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as unknown
  } catch {
    throw new Error('The App Studio header is malformed.')
  }

  if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('The HitPay header is malformed.')
  }

  const claims = parsed as { exp?: unknown; iat?: unknown }
  const exp = claims.exp
  const iat = claims.iat
  const now = Math.floor(Date.now() / 1000)

  if (
    typeof iat !== 'number'
    || !Number.isInteger(iat)
    || iat > now + 60
    || iat < now - 300
  ) {
    throw new Error('The App Studio header timestamp is invalid.')
  }

  if (typeof exp !== 'number' || !Number.isInteger(exp) || exp <= now) {
    throw new Error('The HitPay header has expired.')
  }

  return parsed as Record<string, unknown>
}

function stringMap(value: unknown): ConnectorValues {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    return {}
  }

  const connectors: ConnectorValues = {}

  for (const [key, item] of Object.entries(value)) {
    if (
      Object.keys(connectors).length < 100
      && /^[A-Z][A-Z0-9_]*$/.test(key)
      && typeof item === 'string'
      && item !== ''
      && item.length <= 16_384
    ) {
      connectors[key] = item
    }
  }

  return connectors
}

function localDevConnectors(): ConnectorValues {
  const connectors: ConnectorValues = {}

  for (const [key, value] of Object.entries(process.env)) {
    if (
      typeof value === 'string'
      && value !== ''
      && /^(?:DATABASE_URL|TURSO_[A-Z0-9_]+|[A-Z][A-Z0-9]*_(?:DATABASE_URL|AUTH_TOKEN|ACCESS_TOKEN|API_KEY|WEBHOOK_URL|CONNECTION_URL|API_URL))$/.test(key)
    ) {
      connectors[key] = value
    }
  }

  return connectors
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
 * Connector + Turso values. Sprite server/SSR only. Signed X-App-Studio-Connectors from the Bun hop.
 * Never import this module from browser code or return connector values to the client.
 * Local `bun dev`: process.env.
 */
export async function getConnectors(): Promise<ConnectorValues> {
  const request = getRequest()
  const cached = connectorsByRequest.get(request)

  if (cached) {
    return cached
  }

  const pending = (async () => {
    const signed = (getRequestHeader('x-app-studio-connectors') ?? '').trim()

    if (!signed) {
      return localDevConnectors()
    }

    return stringMap(readSignedHeader(signed).env)
  })()

  connectorsByRequest.set(request, pending)

  try {
    return await pending
  } catch (error) {
    connectorsByRequest.delete(request)
    throw error
  }
}

export async function getConnectorValue(key: string): Promise<string> {
  const value = (await getConnectors())[key] ?? ''

  if (value === '') {
    throw new Error(
      `${key} is not configured for this app. Ask the merchant to connect this provider in Settings → Connectors.`,
    )
  }

  return value
}

export async function getConnector(provider: string): Promise<ConnectorValues> {
  const prefix = `${provider.trim().toUpperCase().replace(/[^A-Z0-9]+/g, '_')}_`
  const connectors = await getConnectors()
  const next: ConnectorValues = {}

  for (const [key, value] of Object.entries(connectors)) {
    if (key.startsWith(prefix)) {
      next[key] = value
    }
  }

  return next
}

/** Trusted identity. createServerFn only. Signed X-App-Studio-Session from the Bun hop. */
export async function getHitPaySession(): Promise<HitPaySession> {
  const request = getRequest()
  const cached = sessionByRequest.get(request)

  if (cached) {
    return cached
  }

  const pending = (async () => {
    const signed = (getRequestHeader('x-app-studio-session') ?? '').trim()

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
