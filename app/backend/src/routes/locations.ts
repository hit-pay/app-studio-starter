import { router } from '../lib/app.ts'
import type { Location } from '../lib/types.ts'

/** The business's locations (outlets). */
export const locations = router().get('/', async (c) => {
  const { locations } = await c.var.host.get<{ locations: Location[] }>('/locations')
  return c.json(locations)
})
