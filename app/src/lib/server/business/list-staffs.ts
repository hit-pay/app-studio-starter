import { createServerFn } from '@tanstack/react-start'

import { request } from '#/lib/server/request'
import type { Staff } from '#/lib/types'

export const listStaffs = createServerFn({ method: 'GET' }).handler(async () => {
  const { members } = await request.get<{ members: Staff[] }>({
    endpoint: '/staff-app-members',
  })
  return members
})
