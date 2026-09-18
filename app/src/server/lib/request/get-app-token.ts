import { getRequest } from '@tanstack/react-start/server'

import { appUrl } from './url'

const USER_TOKEN_COOKIE = 'app_studio_user_token'

const tokenByRequest = new WeakMap<Request, Promise<string>>()

/** Full Cookie header from the incoming browser request. Required on every outbound call. */
export function requestCookie(): string {
  const cookie = getRequest().headers.get('cookie')
  if (!cookie) throw new Error('Sign in to use this app.')
  return cookie
}

/**
 * Short-lived app-level credential from the host `/token` endpoint.
 * Forwards the full incoming cookie (not a single name).
 */
export async function getAppToken(): Promise<string> {
  const incoming = getRequest()
  const cached = tokenByRequest.get(incoming)
  if (cached) return cached

  const pending = mintAppToken()
  tokenByRequest.set(incoming, pending)

  try {
    return await pending
  } catch (error) {
    tokenByRequest.delete(incoming)
    throw error
  }
}

async function mintAppToken(): Promise<string> {
  const cookie = requestCookie()
  const hasUserToken = cookie
    .split(';')
    .map((item) => item.trim())
    .some((item) => item.startsWith(`${USER_TOKEN_COOKIE}=`) && item.length > USER_TOKEN_COOKIE.length + 1)

  if (!hasUserToken) {
    throw new Error('App Studio user token cookie is missing.')
  }

  const response = await fetch(appUrl('/token'), {
    headers: { cookie },
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
