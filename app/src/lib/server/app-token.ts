import { getRequest } from '@tanstack/react-start/server'

const USER_TOKEN_COOKIE = 'app_studio_user_token'
const APP_TOKEN_COOKIE = 'app_studio_app_token'

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

/** Shared app-level credential, set as a cookie by the App Studio proxy on sprite bootstrap. */
export function getAppToken(): string {
  const token = cookieValue(APP_TOKEN_COOKIE)

  if (!token) {
    throw new Error('App Studio app token cookie is missing.')
  }

  return token
}

export function getUserToken(): string | undefined {
  return cookieValue(USER_TOKEN_COOKIE)
}
