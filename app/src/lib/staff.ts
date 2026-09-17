/** Staff on this app. */
import { createServerFn } from '@tanstack/react-start'

import { appJson, getAppToken } from '#/server/lib/app-token'

export type Staff = {
  id: string
  name: string | null
  role_id: string | null
  role: { id: string; title: string } | null
  locations: { id: string; name: string | null }[]
}

export const listStaffs = createServerFn({ method: 'GET' }).handler(async () => {
  const { members } = await appJson<{ members: Staff[] }>(
    '/staff-app-members',
    await getAppToken(),
  )
  return members
})
