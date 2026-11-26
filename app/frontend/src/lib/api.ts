import type { AppType } from 'backend'
import { hc, type ClientResponse } from 'hono/client'

/**
 * The app's API, typed from the backend routes, e.g. `call(api.staff.$get())` or
 * `call(api.files.$get({ query: { entityType: 'order', entityId: id } }))`.
 */
export const api = hc<AppType>('/').api

/** The response's JSON, or an Error with the API's message so the UI can show it. */
export async function call<T>(request: Promise<ClientResponse<T, number, string>>): Promise<T> {
  const response = await request
  if (!response.ok) throw await errorOf(response)
  if (response.status === 204) return undefined as T

  return (await response.json()) as T
}

export async function errorOf(response: Response): Promise<Error> {
  try {
    const body = (await response.json()) as { error?: unknown }
    if (typeof body.error === 'string') return new Error(body.error)
  } catch {
    // Not JSON: fall through to the status.
  }
  return new Error(`The request failed (HTTP ${response.status}).`)
}
