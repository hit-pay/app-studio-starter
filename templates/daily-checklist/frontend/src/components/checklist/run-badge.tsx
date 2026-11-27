import type { RunSummary } from 'backend'

import { formatTime } from '@/lib/checklists'
import { Badge } from '@ui/badge'

/** Where a checklist stands for the day: not started, how far along, or who completed it. */
export function RunBadge({ run, itemCount }: { run: RunSummary | null; itemCount: number }) {
  if (!run) return <Badge variant="secondary">Not started · 0/{itemCount}</Badge>
  if (run.status === 'completed') {
    return (
      <Badge tone="green">
        Completed{run.completedByName ? ` by ${run.completedByName}` : ''}
        {run.completedAt ? ` at ${formatTime(run.completedAt)}` : ''}
      </Badge>
    )
  }
  return (
    <Badge tone="orange">
      In progress · {run.done}/{run.total}
    </Badge>
  )
}
