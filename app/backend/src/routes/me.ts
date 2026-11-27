import { json, route } from '../lib/app.ts'

/** The signed-in user, with their role. */
export const me = {
  GET: route((c) => json(c.user)),
}
