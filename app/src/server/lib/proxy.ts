import { getRequest } from '@tanstack/react-start/server'
import { appApiUrl, getAppToken } from '#/server/lib/app-token'

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

/** Server-only App Studio proxy. Provider secrets stay in the proxy. */
export async function proxyRequest(path: string, init: RequestInit = {}): Promise<Response> {
  const request = getRequest()
  const url = new URL(path, request.url)
  const proxyPath = proxyPaths[url.pathname]

  if (!proxyPath) {
    throw new Error(`Unsupported proxy path: ${url.pathname}`)
  }

  const headers = new Headers(init.headers)
  headers.set('accept', 'application/json')
  headers.set('authorization', `Bearer ${await getAppToken()}`)
  const response = await fetch(appApiUrl(`${proxyPath}${url.search}`), {
    ...init,
    headers,
    signal: init.signal ?? AbortSignal.timeout(15_000),
  })
  if (response.status !== 401) return response

  headers.set('authorization', `Bearer ${await getAppToken()}`)
  const retry = await fetch(appApiUrl(`${proxyPath}${url.search}`), {
    ...init,
    headers,
    signal: init.signal ?? AbortSignal.timeout(15_000),
  })
  if (retry.status === 401) {
    throw new Error('Unable to authorize the App Studio proxy request.')
  }
  return retry
}
