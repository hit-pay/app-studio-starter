import { getRequest } from '@tanstack/react-start/server'

const USER_TOKEN_COOKIE = 'app_studio_user_token'

export function studioAppId(): string {
  if (typeof window !== 'undefined') {
    const fromPath = window.location.pathname.split('/').filter(Boolean)[0]

    if (fromPath && fromPath !== 'api') return fromPath
  }

  const fromEnv =
    (typeof process !== 'undefined' ? process.env.APP_STUDIO_APP_ID : undefined)?.trim() ||
    String(import.meta.env.APP_STUDIO_APP_ID ?? '').trim()

  return fromEnv || 'local'
}

export function studioStorageKey(suffix: string): string {
  const part = suffix.replace(/^:+/, '')

  if (!part) {
    throw new Error('Storage key suffix is required.')
  }

  return `app-studio:${studioAppId()}:${part}`
}

function cookieValue(name: string): string | undefined {
  const cookie = getRequest().headers.get('cookie') ?? ''

  return cookie
    .split(';')
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${name}=`))
    ?.slice(`${name}=`.length)
}

export function proxyUrl(path: string): URL {
  const origin = process.env.APP_STUDIO_PROXY_URL?.trim()

  if (!origin) {
    throw new Error('APP_STUDIO_PROXY_URL is not configured.')
  }

  return new URL(path, `${origin}/`)
}

export function appApiUrl(path: string): URL {
  const appId = process.env.APP_STUDIO_APP_ID?.trim() || studioAppId()
  const suffix = path.startsWith('/') ? path : `/${path}`
  return proxyUrl(`/api/apps/${encodeURIComponent(appId)}${suffix}`)
}

/**
 * Short-lived app-level credential, minted on demand by the App Studio proxy's
 * `/token` endpoint from the caller's `app_studio_user_token` session cookie.
 */
export async function getAppToken(): Promise<string> {
  const userToken = cookieValue(USER_TOKEN_COOKIE)

  if (!userToken) {
    throw new Error('App Studio user token cookie is missing.')
  }

  const response = await fetch(appApiUrl('/token'), {
    headers: { cookie: `${USER_TOKEN_COOKIE}=${userToken}` },
    signal: AbortSignal.timeout(15_000),
  })

  if (!response.ok) {
    throw new Error(`Unable to fetch App Studio app token (HTTP ${response.status}).`)
  }

  const body = await response.json() as { token?: string }

  if (!body.token) {
    throw new Error('App Studio token response is missing a token.')
  }

  return body.token
}

export function getUserToken(): string | undefined {
  return cookieValue(USER_TOKEN_COOKIE)
}
