import { env } from './env.ts'

// The App Studio host API: /staff-app-members, /locations, /roles, /integrations. Every call carries the viewer's
// cookie (or, in an agent script, the run's token) and the app token the host issues for the app secret.

const USER_TOKEN_COOKIE = 'app_studio_user_token'
// Refresh this long before the token expires.
const REFRESH_EARLY_MS = 30_000
// Without an integration session, ask again after this long, so a newly allowed integration shows up.
const NO_INTEGRATION_RECHECK_MS = 60_000

export type NangoSession = { mcpUrl: string; token: string; expiresAt: number }

type AppToken = { token: string; expiresAt: number; nango: NangoSession | null; grants: string | null }

// One app token per worker: it belongs to the app, not to a viewer.
let cached: AppToken | null = null
let inflight: Promise<AppToken> | null = null

export type Host = {
  get<T>(endpoint: string): Promise<T>
  post<T>(endpoint: string, body?: unknown): Promise<T>
  /** The Nango session for the integrations the owner allowed, or null before any is allowed. Server only. */
  nangoSession(): Promise<NangoSession | null>
}

/**
 * A host client for one caller. `cookie` is the viewer's Cookie header; `grants` is the
 * x-app-studio-grants header the gateway sent, which changes when the owner allows or removes an integration.
 */
export function createHost({ cookie, grants }: { cookie: string; grants: string | null }): Host {
  async function appToken(): Promise<AppToken> {
    if (!cookie.split(';').some((part) => part.trim().startsWith(`${USER_TOKEN_COOKIE}=`))) {
      throw new Error('Open this app from the HitPay dashboard.')
    }
    if (cached && grants !== null && grants !== cached.grants) cached = null
    if (cached && Date.now() < cached.expiresAt - REFRESH_EARLY_MS) return cached

    inflight ??= fetchAppToken(cookie).finally(() => {
      inflight = null
    })
    try {
      cached = await inflight
      return cached
    } catch (error) {
      cached = null
      throw error
    }
  }

  async function send<T>(method: string, endpoint: string, body?: unknown): Promise<T> {
    const { token } = await appToken()
    const headers = new Headers({ accept: 'application/json', authorization: `Bearer ${token}`, cookie })
    if (body !== undefined) headers.set('content-type', 'application/json')

    const response = await fetch(endpointUrl(endpoint), { method, headers, body: body === undefined ? undefined : JSON.stringify(body) })
    if (!response.ok) {
      throw new Error(`The HitPay request failed (HTTP ${response.status}, ${method} ${endpoint}).`)
    }
    if (response.status === 204) return undefined as T

    return (await response.json()) as T
  }

  return {
    get: (endpoint) => send('GET', endpoint),
    post: (endpoint, body) => send('POST', endpoint, body),
    nangoSession: async () => (await appToken()).nango,
  }
}

/** The host client an agent script uses during generation: it acts as the person who started the run. */
export function createRunHost(): Host {
  return createHost({ cookie: `${USER_TOKEN_COOKIE}=${env('APP_STUDIO_USER_TOKEN')}`, grants: null })
}

function endpointUrl(endpoint: string): string {
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  return new URL(`/api/apps/${encodeURIComponent(env('APP_STUDIO_APP_ID'))}${path}`, `${env('APP_STUDIO_PROXY_URL')}/`).toString()
}

async function fetchAppToken(cookie: string): Promise<AppToken> {
  const response = await fetch(endpointUrl('/token'), {
    headers: { cookie, authorization: `Bearer ${env('APP_STUDIO_APP_SECRET')}` },
  })
  if (!response.ok) {
    throw new Error(`Unable to get the app token (HTTP ${response.status}).`)
  }

  const body = (await response.json()) as { token?: string; expiresIn?: number; nango?: unknown; grants?: unknown }
  if (!body.token) throw new Error('The app token response has no token.')

  const nango = parseNango(body.nango)
  const expiresIn = typeof body.expiresIn === 'number' && body.expiresIn > 0 ? body.expiresIn : 0

  return {
    token: body.token,
    expiresAt: Math.min(Date.now() + expiresIn * 1000, nango?.expiresAt ?? Date.now() + NO_INTEGRATION_RECHECK_MS + REFRESH_EARLY_MS),
    nango,
    grants: typeof body.grants === 'string' ? body.grants : null,
  }
}

function parseNango(value: unknown): NangoSession | null {
  if (value === null || typeof value !== 'object') return null
  const { mcp_url: mcpUrl, token, expires_at: expiresAt } = value as Record<string, unknown>
  if (typeof mcpUrl !== 'string' || typeof token !== 'string' || typeof expiresAt !== 'string') return null
  const expiresAtMs = Date.parse(expiresAt)

  return Number.isNaN(expiresAtMs) ? null : { mcpUrl, token, expiresAt: expiresAtMs }
}
