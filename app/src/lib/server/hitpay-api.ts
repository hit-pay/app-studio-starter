import { getConnectorValue } from '#/lib/server/hitpay'

export async function hitpayRequest(path: string, init: RequestInit = {}): Promise<Response> {
  const base = (await getConnectorValue('HITPAY_API_URL')).replace(/\/$/, '')
  const token = await getConnectorValue('HITPAY_ACCESS_TOKEN')
  const suffix = path.startsWith('/') ? path : `/${path}`

  if (path.startsWith('http://') || path.startsWith('https://')) {
    throw new Error('hitpayRequest expects a path like /v1/products, not a full URL.')
  }

  const headers = new Headers(init.headers)
  headers.set('authorization', `Bearer ${token}`)

  if (!headers.has('accept')) {
    headers.set('accept', 'application/json')
  }

  return fetch(`${base}${suffix}`, {
    ...init,
    headers,
    signal: init.signal ?? AbortSignal.timeout(15_000),
  })
}
