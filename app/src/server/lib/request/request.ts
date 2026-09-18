import { type Provider } from '#/lib/enums'

import { getToken, requestCookie } from './get-token'
import { endpointUrl } from './url'

type RequestInput = {
  endpoint: string
  provider?: Provider
}

type RequestInputWithBody = RequestInput & {
  body?: unknown
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
