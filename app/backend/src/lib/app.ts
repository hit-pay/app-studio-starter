import type { BunRequest } from 'bun'

import { viewerOf } from './auth.ts'
import { createHost, type Host } from './host.ts'
import type { RoleTitle, User } from './types.ts'

// The backend is Bun.serve's own router: src/index.ts maps each path to its handlers, and every handler is made
// with route(), which signs in the viewer, checks roles, and turns errors into JSON the page can show.

/** A problem the user should see: the message reaches the page, with this HTTP status. */
export class HttpError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message)
  }
}

/** A JSON response that carries its body's type, so the frontend's `call()` knows what it gets back. */
export type Json<T> = Response & { readonly __body?: T }

export function json<T>(data: T, status = 200): Json<T> {
  return Response.json(data, { status }) as Json<T>
}

/** What a handler gets: the request, its path params and query, the signed-in user, and the host client. */
export type Context<Path extends string> = {
  req: BunRequest<Path>
  params: BunRequest<Path>['params']
  query: URLSearchParams
  user: User
  host: Host
}

/**
 * A route handler for Bun.serve. Every route needs a signed-in user (from the gateway's viewer header); pass
 * `roles` to allow only those roles. Throw HttpError for a problem the user should see.
 */
export function route<Path extends string, R extends Response>(
  handle: (c: Context<Path>) => R | Promise<R>,
  options: { roles?: RoleTitle[] } = {},
): (req: BunRequest<Path>) => Promise<R> {
  return async (req) => {
    try {
      const user = viewerOf(req)
      if (options.roles) {
        const title = user.role?.title
        if (!title || !(options.roles as readonly string[]).includes(title)) {
          throw new HttpError(403, 'You do not have permission to do this.')
        }
      }
      const host = createHost({ cookie: req.headers.get('cookie') ?? '', grants: req.headers.get('x-app-studio-grants') })
      return await handle({ req, params: req.params, query: new URL(req.url).searchParams, user, host })
    } catch (error) {
      return errorResponse(error) as R
    }
  }
}

/** The JSON error the page shows: the HttpError's message, or a generic one for anything unexpected. */
export function errorResponse(error: unknown): Response {
  if (error instanceof HttpError) return Response.json({ error: error.message }, { status: error.status })
  console.error(error)
  return Response.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
}

/** For any /api path no route matches. */
export function notFound(): Response {
  return Response.json({ error: 'Not found.' }, { status: 404 })
}
