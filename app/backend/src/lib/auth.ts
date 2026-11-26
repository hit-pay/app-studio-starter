import { createMiddleware } from 'hono/factory'
import { HTTPException } from 'hono/http-exception'

import type { AppEnv } from './app.ts'
import { createHost } from './host.ts'
import type { RoleTitle, User } from './types.ts'

// Set by the App Studio gateway on every request: the viewer it verified, as base64 JSON. The gateway removes any
// value a browser sends, so the app can trust it.
const USER_HEADER = 'x-app-studio-user'
const GRANTS_HEADER = 'x-app-studio-grants'

/** Puts the signed-in user and a host client on every request. Mounted once in src/index.ts. */
export const viewer = createMiddleware<AppEnv>(async (c, next) => {
  const header = c.req.header(USER_HEADER)
  if (!header) throw new HTTPException(401, { message: 'Open this app from the HitPay dashboard.' })

  c.set('user', parseUser(header))
  c.set('host', createHost({ cookie: c.req.header('cookie') ?? '', grants: c.req.header(GRANTS_HEADER) ?? null }))
  await next()
})

/** Lets the request through only for these roles. Check on the server, not only in the UI. */
export function requireRoles(...roles: RoleTitle[]) {
  return createMiddleware<AppEnv>(async (c, next) => {
    const title = c.var.user.role?.title
    if (!title || !(roles as readonly string[]).includes(title)) {
      throw new HTTPException(403, { message: 'You do not have permission to do this.' })
    }
    await next()
  })
}

function parseUser(header: string): User {
  try {
    const bytes = Uint8Array.from(atob(header), (char) => char.charCodeAt(0))
    const value = JSON.parse(new TextDecoder().decode(bytes)) as Record<string, unknown>
    const role = value.role as Record<string, unknown> | null | undefined
    if (typeof value.id !== 'string' || typeof value.email !== 'string') throw new Error('malformed')

    return {
      id: value.id,
      email: value.email,
      name: typeof value.name === 'string' ? value.name : null,
      role: role && typeof role.id === 'string' && typeof role.title === 'string' ? { id: role.id, title: role.title } : null,
    }
  } catch {
    throw new HTTPException(401, { message: 'Open this app from the HitPay dashboard.' })
  }
}
