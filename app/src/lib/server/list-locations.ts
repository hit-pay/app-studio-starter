import { createServerFn } from '@tanstack/react-start'

import { request } from '#/lib/server/request'
import type { Location } from '#/types'

export const listLocations = createServerFn({ method: 'GET' }).handler(async () => {
  const { locations } = await request.get<{ locations: Location[] }>({
    endpoint: '/locations',
  })
  return locations
})
