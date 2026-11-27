import { notFound } from './lib/app.ts'
import { file, files } from './routes/files.ts'
import { locations } from './routes/locations.ts'
import { me } from './routes/me.ts'
import { staff } from './routes/staff.ts'

// The app's API: Bun.serve routes, every path under /api. Add a resource as one file in src/routes that exports
// its handlers by method ({ GET, POST, … }, each made with route()), and map its path here. The frontend calls it
// through call() in frontend/src/lib/api.ts, typed from this map.
export const routes = {
  '/api/me': me,
  '/api/staff': staff,
  '/api/locations': locations,
  '/api/files': files,
  '/api/files/:id': file,
  '/api/*': notFound,
}

export type Api = typeof routes
export type { Json } from './lib/app.ts'
