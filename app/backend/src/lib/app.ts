import { Hono } from 'hono'

import type { Host } from './host.ts'
import type { User } from './types.ts'

/** What every request carries, set by the `viewer` middleware: the signed-in user and the host client. */
export type AppEnv = { Variables: { user: User; host: Host } }

/** A router for one resource, mounted under /api in src/index.ts. */
export function router() {
  return new Hono<AppEnv>()
}
