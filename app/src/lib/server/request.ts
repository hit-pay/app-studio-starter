import { getRequest } from '@tanstack/react-start/server'

import { type Provider } from '#/enums'
import { studioAppId } from '#/lib/utils'

type RequestInput = {
  endpoint: string
  provider?: Provider
}

type RequestInputWithBody = RequestInput & {
  body?: unknown
}

const USER_TOKEN_COOKIE = 'app_studio_user_token'
const tokenByRequest = new WeakMap<Request, Promise<string>>()

function endpointUrl(input: RequestInput): URL {
  const origin = process.env.APP_STUDIO_PROXY_URL?.trim()
  if (!origin) {
    throw new Error('APP_STUDIO_PROXY_URL is not configured.')
  }

  const appId = process.env.APP_STUDIO_APP_ID?.trim() || studioAppId()
  const endpoint = input.endpoint.startsWith('/') ? input.endpoint : `/${input.endpoint}`
  const suffix = input.provider ? `/integrations/${input.provider}${endpoint}` : endpoint
  return new URL(`/api/apps/${encodeURIComponent(appId)}${suffix}`, `${origin}/`)
}

function requestCookie(): string {
  const cookie = getRequest().headers.get('cookie')
  if (!cookie) throw new Error('Sign in to use this app.')
  return cookie
}

async function getToken(): Promise<string> {
  const incoming = getRequest()
  const cached = tokenByRequest.get(incoming)
  if (cached) return cached

  const pending = (async () => {
    const cookie = requestCookie()
    const hasUserToken = cookie
      .split(';')
      .map((item) => item.trim())
      .some((item) => item.startsWith(`${USER_TOKEN_COOKIE}=`) && item.length > USER_TOKEN_COOKIE.length + 1)

    if (!hasUserToken) {
      throw new Error('Studio user token cookie is missing.')
    }

    const headers: Record<string, string> = { cookie }
    const appSecret = process.env.APP_STUDIO_APP_SECRET?.trim()
    if (appSecret) {
      headers['x-app-studio-app-secret'] = appSecret
    }

    const response = await fetch(endpointUrl({ endpoint: '/token' }), {
      headers,
      signal: AbortSignal.timeout(15_000),
    })

    if (!response.ok) {
      throw new Error(`Unable to fetch Studio app token (HTTP ${response.status}).`)
    }

    const body = await response.json() as { token?: string }
    if (!body.token) {
      throw new Error('Studio token response is missing a token.')
    }

    return body.token
  })()

  tokenByRequest.set(incoming, pending)

  try {
    return await pending
  } catch (error) {
    tokenByRequest.delete(incoming)
    throw error
  }
}

async function send<T>(
  method: string,
  input: RequestInputWithBody,
): Promise<T> {
  const cookie = requestCookie()
  const token = await getToken()
  const headers = new Headers({
    accept: 'application/json',
    authorization: `Bearer ${token}`,
    cookie,
  })

  const init: RequestInit = { method, headers }
  if (input.body !== undefined) {
    headers.set('content-type', 'application/json')
    init.body = JSON.stringify(input.body)
  }

  const url = endpointUrl(input)
  const response = await fetch(url, init)
  if (!response.ok) {
    throw new Error(
      `Unable to load app data (HTTP ${response.status}, `
      + `method=${method}, path=${url.pathname}).`,
    )
  }

  if (response.status === 204) return undefined as T
  const text = await response.text()
  if (!text) return undefined as T
  try {
    return JSON.parse(text) as T
  } catch {
    throw new Error(
      `Unable to parse app data as JSON (method=${method}, path=${url.pathname}).`,
    )
  }
}

export const request = {
  get<T>(input: RequestInput): Promise<T> {
    return send<T>('GET', input)
  },
  post<T>(input: RequestInputWithBody): Promise<T> {
    return send<T>('POST', input)
  },
  patch<T>(input: RequestInputWithBody): Promise<T> {
    return send<T>('PATCH', input)
  },
  put<T>(input: RequestInputWithBody): Promise<T> {
    return send<T>('PUT', input)
  },
  delete<T>(input: RequestInput): Promise<T> {
    return send<T>('DELETE', input)
  },
}
