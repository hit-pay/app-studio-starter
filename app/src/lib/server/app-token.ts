import { getRequest } from '@tanstack/react-start/server'

const USER_TOKEN_COOKIE = 'app_studio_user_token'

type CurrentUserResponse = {
  appToken?: unknown
}

function appId(): string {
  const value = process.env.APP_STUDIO_APP_ID?.trim()

  if (!value) {
    throw new Error('APP_STUDIO_APP_ID is not configured.')
  }

  return value
}

export function proxyUrl(path: string): URL {
  const origin = process.env.APP_STUDIO_PROXY_URL?.trim()

  if (!origin) {
    throw new Error('APP_STUDIO_PROXY_URL is not configured.')
  }

  return new URL(path, `${origin}/`)
}

export async function getAppToken(): Promise<string> {
  const response = await fetch(
    proxyUrl(`/api/apps/${encodeURIComponent(appId())}/current-user`),
    {
      headers: {
        accept: 'application/json',
        ...(getRequest().headers.get('cookie')
          ? { cookie: getRequest().headers.get('cookie')! }
          : {}),
      },
    },
  )
  const body = await response.json() as CurrentUserResponse

  if (!response.ok || typeof body.appToken !== 'string' || body.appToken === '') {
    throw new Error(
      `Unable to authorize the App Studio proxy request `
      + `(HTTP ${response.status}, path=${new URL(response.url).pathname}, `
      + `hasCookie=${response.url !== '' && getRequest().headers.has('cookie')}, `
      + `hasToken=${typeof body.appToken === 'string' && body.appToken !== ''}).`,
    )
  }

  return body.appToken
}

export function getUserToken(): string | undefined {
  const cookie = getRequest().headers.get('cookie') ?? ''

  return cookie
    .split(';')
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${USER_TOKEN_COOKIE}=`))
    ?.slice(`${USER_TOKEN_COOKIE}=`.length)
}

