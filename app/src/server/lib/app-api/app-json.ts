import { getRequest } from '@tanstack/react-start/server'

import { appApiUrl } from './app-api-url'

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
