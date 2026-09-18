import { studioAppId } from '#/lib/utils'

import { proxyUrl } from './proxy-url'

export function appApiUrl(path: string): URL {
  const appId = process.env.APP_STUDIO_APP_ID?.trim() || studioAppId()
  const suffix = path.startsWith('/') ? path : `/${path}`
  return proxyUrl(`/api/apps/${encodeURIComponent(appId)}${suffix}`)
}
