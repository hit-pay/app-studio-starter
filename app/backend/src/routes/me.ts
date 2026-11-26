import { router } from '../lib/app.ts'

/** The signed-in user, with their role. */
export const me = router().get('/', (c) => c.json(c.var.user))
