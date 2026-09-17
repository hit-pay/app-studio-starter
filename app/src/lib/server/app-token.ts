import { getRequest } from '@tanstack/react-start/server'
import { studioAppId } from '#/lib/studio-app-id'

const USER_TOKEN_COOKIE = 'app_studio_user_token'

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

/**
 * Short-lived app-level credential, minted on demand by the App Studio proxy's
 * `/token` endpoint from the caller's `app_studio_user_token` session cookie.
 */
export async function getAppToken(): Promise<string> {
  const appId = process.env.APP_STUDIO_APP_ID?.trim() || studioAppId()
  const userToken = cookieValue(USER_TOKEN_COOKIE)

  if (!userToken) {
    throw new Error('App Studio user token cookie is missing.')
  }

  const response = await fetch(proxyUrl(`/api/apps/${encodeURIComponent(appId)}/token`), {
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
