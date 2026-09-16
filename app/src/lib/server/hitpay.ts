import { getRequest } from '@tanstack/react-start/server'
import { proxyUrl } from '#/lib/server/app-token'

export type HitPaySessionRole = {
  id: string
  title: string
}

export type HitPaySession = {
  id: string
  email: string
  name: string | null
  role: HitPaySessionRole | null
}

const sessionByRequest = new WeakMap<Request, Promise<HitPaySession>>()

function sessionFromPayload(parsed: Record<string, unknown>): HitPaySession | null {
  if (typeof parsed.id !== 'string' || typeof parsed.email !== 'string') {
    return null
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
      && typeof (role as HitPaySessionRole).id === 'string'
      && typeof (role as HitPaySessionRole).title === 'string'
        ? { id: (role as HitPaySessionRole).id, title: (role as HitPaySessionRole).title }
        : null,
  }
}

/** Trusted identity loaded through the App Studio user-info proxy. */
export async function getHitPaySession(): Promise<HitPaySession> {
  const request = getRequest()
  const cached = sessionByRequest.get(request)

  if (cached) {
    return cached
  }

  const pending = (async () => {
    const appId = process.env.APP_STUDIO_APP_ID?.trim() ?? ''

    if (!appId) {
      throw new Error('Sign in to HitPay to use this app.')
    }

    const cookie = request.headers.get('cookie')
    const response = await fetch(
      proxyUrl(`/api/apps/${encodeURIComponent(appId)}/current-user`),
      {
        headers: {
          accept: 'application/json',
          ...(cookie ? { cookie } : {}),
        },
      },
    )

    if (!response.ok) {
      throw new Error('Sign in to HitPay to use this app.')
    }

    const body = await response.json() as Record<string, unknown>
    const session = sessionFromPayload(body)

    if (session === null) {
      throw new Error('The HitPay user response is malformed.')
    }

    return session
  })()

  sessionByRequest.set(request, pending)

  try {
    return await pending
  } catch (error) {
    sessionByRequest.delete(request)
    throw error
  }
}

export async function requireHitPayRoles(
  allowedTitles: readonly string[],
): Promise<HitPaySession> {
  const session = await getHitPaySession()
  const title = session.role?.title

  if (!title || !allowedTitles.includes(title)) {
    throw new Error('You do not have permission to do this.')
  }

  return session
}
