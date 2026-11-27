import type { Api, Json } from 'backend'

// The app's API, typed from the backend's route map (backend/src/index.ts): the path, its :params and what each
// method returns all come from there, so a backend change shows up as a type error in the page that calls it.
//
//   call('GET', '/api/staff')
//   call('GET', '/api/files', { query: { entityType: 'order', entityId: id } })
//   call('DELETE', '/api/files/:id', { params: { id } })
//   call('POST', '/api/shifts', { body: { staffId, startsAt } })

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
type Path = { [P in keyof Api]: Api[P] extends Record<string, unknown> ? P : never }[keyof Api]
type MethodOf<P extends Path> = Extract<keyof Api[P], Method>

/** What a handler answers with: the type json() was given. */
type Result<P extends Path, M extends MethodOf<P>> = Api[P][M] extends (...args: never[]) => Promise<infer R>
  ? R extends Json<infer T>
    ? T
    : unknown
  : never

/** `/api/files/:id` → `{ id: string }`. */
type Params<P extends string> = P extends `${string}:${infer Name}/${infer Rest}`
  ? { [K in Name]: string } & Params<`/${Rest}`>
  : P extends `${string}:${infer Name}`
    ? { [K in Name]: string }
    : Record<string, never>

type Options<P extends string> = {
  query?: Record<string, string | number | null | undefined>
  body?: unknown
} & (P extends `${string}:${string}` ? { params: Params<P> } : { params?: never })

/** Calls one API route and returns its JSON, or throws an Error with the API's message so the UI can show it. */
export async function call<P extends Path, M extends MethodOf<P>>(
  method: M,
  path: P,
  ...[options]: P extends `${string}:${string}` ? [Options<P>] : [Options<P>?]
): Promise<Result<P, M>> {
  let url: string = path
  for (const [name, value] of Object.entries((options?.params ?? {}) as Record<string, string>)) {
    url = url.replace(`:${name}`, encodeURIComponent(value))
  }
  const query = new URLSearchParams()
  for (const [name, value] of Object.entries(options?.query ?? {})) {
    if (value !== null && value !== undefined) query.set(name, String(value))
  }
  if (query.size > 0) url += `?${query}`

  const hasBody = options?.body !== undefined
  const response = await fetch(url, {
    method,
    headers: hasBody ? { 'content-type': 'application/json' } : undefined,
    body: hasBody ? JSON.stringify(options.body) : undefined,
  })
  if (!response.ok) throw await errorOf(response)
  if (response.status === 204) return undefined as Result<P, M>

  return (await response.json()) as Result<P, M>
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
