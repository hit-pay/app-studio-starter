import { json, route } from '../lib/app.ts'
import { day, MANAGERS, type RunSummary } from '../lib/checklists.ts'
import type { Location } from '../lib/types.ts'
import { loadChecklists } from './checklists.ts'
import { runSummaries } from './runs.ts'

export type OverviewLocation = {
  id: string
  name: string
  checklists: { checklistId: string; title: string; kind: RunSummary['kind']; itemCount: number; run: RunSummary | null }[]
}

/** /api/overview?date=: every location's checklists for the day, for managers. */
export const overview = {
  GET: route(
    async (c) => {
      const date = day(c.query.get('date'))
      const [{ locations }, checklists, runs] = await Promise.all([
        c.host.get<{ locations: Location[] }>('/locations'),
        loadChecklists(),
        runSummaries('r.run_date = ?', [date]),
      ])
      const runFor = new Map(runs.map((run) => [`${run.checklistId}:${run.locationId}`, run]))

      return json(
        locations.map(
          (location): OverviewLocation => ({
            id: location.id,
            name: location.name ?? 'Unnamed location',
            checklists: checklists
              .filter((checklist) => checklist.locationId === null || checklist.locationId === location.id)
              .map((checklist) => ({
                checklistId: checklist.id,
                title: checklist.title,
                kind: checklist.kind,
                itemCount: checklist.items.length,
                run: runFor.get(`${checklist.id}:${location.id}`) ?? null,
              })),
          }),
        ),
      )
    },
    { roles: MANAGERS },
  ),
}
