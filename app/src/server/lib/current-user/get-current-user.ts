import { getRequest } from '@tanstack/react-start/server'

import { request } from '#/server/lib/request'

export type CurrentUserRole = {
  id: string
  title: string
}

export type CurrentUser = {
  id: string
  email: string
  name: string | null
  role: CurrentUserRole | null
}

const currentUserByRequest = new WeakMap<Request, Promise<CurrentUser>>()

/** Trusted identity from GET /api/apps/{app}/current-user. */
export async function getCurrentUser(): Promise<CurrentUser> {
  const incoming = getRequest()
  const cached = currentUserByRequest.get(incoming)
  if (cached) return cached

  const pending = loadCurrentUser()
  currentUserByRequest.set(incoming, pending)

  try {
    return await pending
  } catch (error) {
    currentUserByRequest.delete(incoming)
    throw error
  }
}

async function loadCurrentUser(): Promise<CurrentUser> {
  const parsed = await request.get<Record<string, unknown>>({ endpoint: '/current-user' })
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('The current-user response is malformed.')
  }
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
      && typeof (role as CurrentUserRole).id === 'string'
      && typeof (role as CurrentUserRole).title === 'string'
        ? { id: (role as CurrentUserRole).id, title: (role as CurrentUserRole).title }
        : null,
  }
}
