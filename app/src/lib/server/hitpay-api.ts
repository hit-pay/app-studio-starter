import { getRequest } from '@tanstack/react-start/server'
import { studioAppId } from '#/lib/studio-app-id'

const proxyPaths: Record<string, string> = {
  '/v1/products': '/integrations/hitpay/products',
  '/v1/customers': '/integrations/hitpay/customers',
  '/v1/orders': '/integrations/hitpay/orders',
  '/v1/charges': '/integrations/hitpay/charges',
  '/v1/invoices': '/integrations/hitpay/invoices',
  '/v1/product-category': '/integrations/hitpay/product-categories',
  '/v1/locations': '/integrations/hitpay/locations',
}

/**
 * Server-only HitPay access through App Studio.
 * The app sends only its short-lived appToken; provider secrets stay in the proxy.
 */
export async function hitpayRequest(path: string, init: RequestInit = {}): Promise<Response> {
  const request = getRequest()
  const appId = process.env.APP_STUDIO_APP_ID?.trim() || studioAppId()
  const url = new URL(path, request.url)
  const proxyPath = proxyPaths[url.pathname]

  if (!proxyPath) {
    throw new Error(`Unsupported HitPay proxy path: ${url.pathname}`)
  }

  const userInfo = await fetch(
    new URL(`/api/apps/${encodeURIComponent(appId)}/current-user`, request.url),
    { headers: { accept: 'application/json' } },
  )
  const user = await userInfo.json() as { appToken?: unknown }
  if (!userInfo.ok || typeof user.appToken !== 'string' || user.appToken === '') {
    throw new Error('Unable to authorize the App Studio proxy request.')
  }

  const headers = new Headers(init.headers)
  headers.set('accept', 'application/json')
  headers.set('authorization', `Bearer ${user.appToken}`)
  return fetch(
    new URL(`/api/apps/${encodeURIComponent(appId)}${proxyPath}${url.search}`, request.url),
    { ...init, headers, signal: init.signal ?? AbortSignal.timeout(15_000) },
  )
}
