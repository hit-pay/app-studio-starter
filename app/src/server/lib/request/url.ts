import { studioAppId } from '#/lib/utils'

import { originUrl } from './origin-url'

export type RequestProvider = 'hitpay'

export function appUrl(path: string): URL {
  const appId = process.env.APP_STUDIO_APP_ID?.trim() || studioAppId()
  const suffix = path.startsWith('/') ? path : `/${path}`
  return originUrl(`/api/apps/${encodeURIComponent(appId)}${suffix}`)
}

export function endpointUrl(input: {
  endpoint: string
  provider?: RequestProvider
}): URL {
  const endpoint = input.endpoint.startsWith('/') ? input.endpoint : `/${input.endpoint}`
  const path = input.provider ? `/integrations/${input.provider}${endpoint}` : endpoint
  return appUrl(path)
}
