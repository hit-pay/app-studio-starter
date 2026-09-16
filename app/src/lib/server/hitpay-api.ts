import { getRequest } from '@tanstack/react-start/server'
import { studioAppId } from '#/lib/studio-app-id'
import { getAppToken, invalidateAppToken } from '#/lib/server/app-token'

const proxyPaths: Record<string, string> = {
  '/v1/products': '/integrations/hitpay/products',
  '/v1/customers': '/integrations/hitpay/customers',
  '/v1/orders': '/integrations/hitpay/orders',
  '/v1/charges': '/integrations/hitpay/charges',
  '/v1/invoices': '/integrations/hitpay/invoices',
  '/v1/product-category': '/integrations/hitpay/product-categories',
  '/v1/locations': '/integrations/hitpay/locations',
  '/v1/coupons': '/integrations/hitpay/coupons',
  '/v1/discounts': '/integrations/hitpay/discounts',
  '/v1/taxes': '/integrations/hitpay/taxes',
  '/v1/pickups': '/integrations/hitpay/pickups',
  '/v1/shipping': '/integrations/hitpay/shipping',
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

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const headers = new Headers(init.headers)
    headers.set('accept', 'application/json')
    headers.set('authorization', `Bearer ${await getAppToken(attempt === 1)}`)
    const response = await fetch(
      new URL(`/api/apps/${encodeURIComponent(appId)}${proxyPath}${url.search}`, request.url),
      { ...init, headers, signal: init.signal ?? AbortSignal.timeout(15_000) },
    )

    if (response.status !== 401 || attempt === 1) {
      return response
    }

    invalidateAppToken()
  }

  throw new Error('Unable to authorize the App Studio proxy request.')
}
