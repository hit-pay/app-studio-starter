import { getRequest } from '@tanstack/react-start/server'
import { appApiUrl } from '#/server/lib/app-token'

export type SessionRole = {
  id: string
  title: string
}

export type Session = {
  id: string
  email: string
  name: string | null
  role: SessionRole | null
}

const sessionByRequest = new WeakMap<Request, Promise<Session>>()

/** Trusted identity from GET /api/apps/{app}/current-user. */
export async function getSession(): Promise<Session> {
  const request = getRequest()
  const cached = sessionByRequest.get(request)

  if (cached) return cached

  const pending = (async () => {
    const cookie = request.headers.get('cookie')
    if (!cookie) throw new Error('Sign in to use this app.')

    const response = await fetch(appApiUrl('/current-user'), {
      headers: { accept: 'application/json', cookie },
    })
    if (!response.ok) throw new Error('Sign in to use this app.')

    const parsed = await response.json() as Record<string, unknown>
    if (typeof parsed.id !== 'string' || typeof parsed.email !== 'string') {
      throw new Error('The current-user response is malformed.')
    }

    const role = parsed.role
    return {
      id: parsed.id,
      email: parsed.email,
      name: typeof parsed.name === 'string' ? parsed.name : null,
      role:
        role !== null
        && typeof role === 'object'
        && !Array.isArray(role)
        && typeof (role as SessionRole).id === 'string'
        && typeof (role as SessionRole).title === 'string'
          ? { id: (role as SessionRole).id, title: (role as SessionRole).title }
          : null,
    }
  })()

  sessionByRequest.set(request, pending)

  try {
    return await pending
  } catch (error) {
    sessionByRequest.delete(request)
    throw error
  }
}

export async function requireRoles(allowedTitles: readonly string[]): Promise<Session> {
  const session = await getSession()
  const title = session.role?.title
  if (!title || !allowedTitles.includes(title)) {
    throw new Error('You do not have permission to do this.')
  }
  return session
}
