import { createServerFn } from '@tanstack/react-start'

import { request } from '#/lib/server/request'

type Staff = {
  id: string
  name: string | null
  role_id: string | null
  role: { id: string; title: string } | null
  locations: { id: string; name: string | null }[]
}

export const listStaffs = createServerFn({ method: 'GET' }).handler(async () => {
  const { members } = await request.get<{ members: Staff[] }>({
    endpoint: '/staff-app-members',
  })
  return members
})
