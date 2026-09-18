import { getRequest } from '@tanstack/react-start/server'

import { appApiUrl } from '#/server/lib/app-api'

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
  const request = getRequest()
  const cached = currentUserByRequest.get(request)

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
        && typeof (role as CurrentUserRole).id === 'string'
        && typeof (role as CurrentUserRole).title === 'string'
          ? { id: (role as CurrentUserRole).id, title: (role as CurrentUserRole).title }
          : null,
    }
  })()

  currentUserByRequest.set(request, pending)

  try {
    return await pending
  } catch (error) {
    currentUserByRequest.delete(request)
    throw error
  }
}
