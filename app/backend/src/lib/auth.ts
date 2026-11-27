import { HttpError } from './app.ts'
import type { User } from './types.ts'

// Set by the App Studio gateway on every request: the viewer it verified, as base64 JSON. The gateway removes any
// value a browser sends, so the app can trust it.
const USER_HEADER = 'x-app-studio-user'

/** The signed-in user of this request. route() calls it for every handler. */
export function viewerOf(req: Request): User {
  const header = req.headers.get(USER_HEADER)
  if (!header) throw new HttpError(401, 'Open this app from the HitPay dashboard.')
  return parseUser(header)
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
    throw new HttpError(401, 'Open this app from the HitPay dashboard.')
  }
}
