import { getRequest } from '@tanstack/react-start/server'
import { studioAppId } from '#/lib/utils'

const USER_TOKEN_COOKIE = 'app_studio_user_token'

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
  const cookie = getRequest().headers.get('cookie') ?? ''
  const userToken = cookie
    .split(';')
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${USER_TOKEN_COOKIE}=`))
    ?.slice(`${USER_TOKEN_COOKIE}=`.length)

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

export async function appJson<T>(path: string, token?: string): Promise<T> {
  const headers = new Headers({ accept: 'application/json' })
  const cookie = getRequest().headers.get('cookie')

  if (cookie) headers.set('cookie', cookie)
  if (token) headers.set('authorization', `Bearer ${token}`)

  const url = appApiUrl(path)
  const response = await fetch(url, { headers })
  if (!response.ok) {
    throw new Error(
      `Unable to load app data (HTTP ${response.status}, `
      + `path=${url.pathname}, hasCookie=${headers.has('cookie')}, `
      + `hasBearer=${headers.has('authorization')}).`,
    )
  }
  return response.json() as Promise<T>
}
