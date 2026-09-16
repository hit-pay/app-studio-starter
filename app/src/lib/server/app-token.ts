import { getCookie, getRequest, setCookie } from '@tanstack/react-start/server'

const TOKEN_COOKIE = 'app-studio-token'
const USER_TOKEN_COOKIE = 'app_studio_user_token'
const TOKEN_MAX_AGE = 60 * 60

type CurrentUserResponse = {
  appToken?: unknown
  userToken?: unknown
}

function appId(): string {
  const value = process.env.APP_STUDIO_APP_ID?.trim()

  if (!value) {
    throw new Error('APP_STUDIO_APP_ID is not configured.')
  }

  return value
}

export function proxyUrl(path: string): URL {
  const request = getRequest()
  const origin = process.env.APP_STUDIO_PROXY_URL?.trim() || new URL(request.url).origin

  return new URL(path, `${origin}/`)
}

export async function getAppToken(forceRefresh = false): Promise<string> {
  if (!forceRefresh) {
    const cached = getCookie(TOKEN_COOKIE)

    if (cached) {
      return cached
    }
  }

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

  setCookie(TOKEN_COOKIE, body.appToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: TOKEN_MAX_AGE,
  })

  if (typeof (body as { userToken?: unknown }).userToken === 'string') {
    setCookie(USER_TOKEN_COOKIE, (body as { userToken: string }).userToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: TOKEN_MAX_AGE,
    })
  }

  return body.appToken
}

export function getUserToken(): string | undefined {
  return getCookie(USER_TOKEN_COOKIE)
}

export function invalidateAppToken(): void {
  setCookie(TOKEN_COOKIE, '', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
}
