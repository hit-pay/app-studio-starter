import { type Provider } from '#/lib/enums'
import { studioAppId } from '#/lib/utils'

import { originUrl } from './origin-url'

export function endpointUrl(input: {
  endpoint: string
  provider?: Provider
}): URL {
  const appId = process.env.APP_STUDIO_APP_ID?.trim() || studioAppId()
  const endpoint = input.endpoint.startsWith('/') ? input.endpoint : `/${input.endpoint}`
  const suffix = input.provider ? `/integrations/${input.provider}${endpoint}` : endpoint
  return originUrl(`/api/apps/${encodeURIComponent(appId)}${suffix}`)
}
