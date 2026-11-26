import { createServerFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'

import { request } from '#/lib/server/request'
import type { User, UserRole } from '#/types'

const currentUserByRequest = new WeakMap<Request, Promise<User>>()

// Set by the App Studio host on every request it forwards: the viewer it already verified, as base64 JSON in
// the shape /current-user returns. Reading it saves a call back to the host on every role check. The host
// removes any value the browser sends, so only its own reaches the app.
const VERIFIED_USER_HEADER = 'x-app-studio-user'

function toUser(parsed: unknown): User {
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('The current-user response is malformed.')
  }
  const value = parsed as Record<string, unknown>
  if (typeof value.id !== 'string' || typeof value.email !== 'string') {
    throw new Error('The current-user response is malformed.')
  }

  const role = value.role
  return {
    id: value.id,
    email: value.email,
    name: typeof value.name === 'string' ? value.name : null,
    role:
      role !== null
      && typeof role === 'object'
      && !Array.isArray(role)
      && typeof (role as UserRole).id === 'string'
      && typeof (role as UserRole).title === 'string'
        ? { id: (role as UserRole).id, title: (role as UserRole).title }
        : null,
  }
}

function verifiedUser(incoming: Request): User | null {
  const header = incoming.headers.get(VERIFIED_USER_HEADER)
  if (!header) return null
  try {
    return toUser(JSON.parse(Buffer.from(header, 'base64').toString('utf8')))
  } catch {
    return null
  }
}

/** Trusted identity: the header the App Studio host sets, or GET /api/apps/{app}/current-user. */
export const getCurrentUser = createServerFn({ method: 'GET' }).handler(async (): Promise<User> => {
  const incoming = getRequest()
  const cached = currentUserByRequest.get(incoming)
  if (cached) return cached

  const fromHost = verifiedUser(incoming)
  if (fromHost) return fromHost

  // Not sent yet (the host has not cached this viewer), or a script with no browser request: ask the host.
  const pending = (async (): Promise<User> => toUser(await request.get<unknown>({ endpoint: '/current-user' })))()

  currentUserByRequest.set(incoming, pending)

  try {
    return await pending
  } catch (error) {
    currentUserByRequest.delete(incoming)
    throw error
  }
})

export async function requireRoles(allowedTitles: readonly string[]): Promise<User> {
  const user = await getCurrentUser()
  const title = user.role?.title
  if (!title || !allowedTitles.includes(title)) {
    throw new Error('You do not have permission to do this.')
  }
  return user
}
