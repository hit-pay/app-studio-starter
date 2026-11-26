import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'

import type { AppEnv } from './lib/app.ts'
import { viewer } from './lib/auth.ts'
import { files } from './routes/files.ts'
import { locations } from './routes/locations.ts'
import { me } from './routes/me.ts'
import { staff } from './routes/staff.ts'

// The app's API. Every route is under /api and needs a signed-in user (the `viewer` middleware). Add a resource
// as one file in src/routes and mount it here; the frontend calls it through the typed client in
// frontend/src/lib/api.ts.
const app = new Hono<AppEnv>()
  .basePath('/api')
  .use(viewer)
  .route('/me', me)
  .route('/staff', staff)
  .route('/locations', locations)
  .route('/files', files)

app.onError((error, c) => {
  if (error instanceof HTTPException) return c.json({ error: error.message }, error.status)
  console.error(error)
  return c.json({ error: 'Something went wrong. Please try again.' }, 500)
})
app.notFound((c) => c.json({ error: 'Not found.' }, 404))

export type AppType = typeof app
export default app
