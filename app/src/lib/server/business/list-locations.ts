import { createServerFn } from '@tanstack/react-start'

import { request } from '#/lib/server/request'
import type { Location } from '#/lib/types'

export const listLocations = createServerFn({ method: 'GET' }).handler(async () => {
  const body = await request.get<Location[] | { data?: Location[]; locations?: Location[] }>({
    endpoint: '/locations',
    provider: 'hitpay',
  })
  if (Array.isArray(body)) return body
  return body.data ?? body.locations ?? []
})
