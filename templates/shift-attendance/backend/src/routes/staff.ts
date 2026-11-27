import { json, route } from '../lib/app.ts'
import type { Staff } from '../lib/types.ts'

/** The business's staff who can use this app, with their role and locations (at most 500). */
export const staff = {
  GET: route(async (c) => {
    const { members } = await c.host.get<{ members: Staff[] }>('/staff-app-members')
    return json(members)
  }),
}
