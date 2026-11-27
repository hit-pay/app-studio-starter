import { notFound } from './lib/app.ts'
import { checklist, checklists } from './routes/checklists.ts'
import { exportRuns } from './routes/export.ts'
import { file, files } from './routes/files.ts'
import { locations } from './routes/locations.ts'
import { me } from './routes/me.ts'
import { overview } from './routes/overview.ts'
import { run, runItem, runs, today } from './routes/runs.ts'
import { cashSalesRoute } from './routes/sales.ts'
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
  '/api/checklists': checklists,
  '/api/checklists/:id': checklist,
  '/api/today': today,
  '/api/runs': runs,
  '/api/runs/:id': run,
  '/api/runs/:id/items/:itemId': runItem,
  '/api/overview': overview,
  '/api/cash-sales': cashSalesRoute,
  '/api/export': exportRuns,
  '/api/*': notFound,
}

export type Api = typeof routes
export type { Json } from './lib/app.ts'
export type { Checklist, ChecklistItem, ChecklistKind, RunDetail, RunItem, RunSummary } from './lib/checklists.ts'
export type { OverviewLocation } from './routes/overview.ts'
