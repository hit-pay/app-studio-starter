import { json, route } from '../lib/app.ts'
import type { Location } from '../lib/types.ts'

/** The business's locations (outlets). */
export const locations = {
  GET: route(async (c) => {
    const { locations } = await c.host.get<{ locations: Location[] }>('/locations')
    return json(locations)
  }),
}
