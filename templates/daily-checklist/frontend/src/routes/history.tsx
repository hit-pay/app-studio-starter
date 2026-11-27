import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

import { LocationSelect } from '@/components/checklist/location-select'
import { RunBadge } from '@/components/checklist/run-badge'
import { EmptyState, ErrorState, LoadingRows } from '@/components/checklist/states'
import { DataList } from '@/components/displaying-data/data-list'
import { PageLayout } from '@/components/layout/page-layout'
import { call } from '@/lib/api'
import { addDays, formatDate, KIND_LABEL, todayDate } from '@/lib/checklists'
import { useLocations } from '@/lib/locations'
import { Button } from '@ui/button'
import { Input } from '@ui/input'

export const Route = createFileRoute('/history')({ component: History })

function History() {
  const navigate = useNavigate()
  const locations = useLocations()
  const [from, setFrom] = useState(() => addDays(todayDate(), -29))
  const [to, setTo] = useState(todayDate)
  const [locationId, setLocationId] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  const history = useQuery({
    queryKey: ['history', from, to, locationId, page],
    placeholderData: keepPreviousData,
    queryFn: () => call('GET', '/api/runs', { query: { from, to, locationId, page } }),
  })
  const locationName = (id: string) => locations.data?.find((location) => location.id === id)?.name ?? ''
  const filter = (apply: () => void) => {
    apply()
    setPage(1)
  }

  return (
    <PageLayout
      title="History"
      description="Checklists filled in, newest first."
      actions={
        <div className="flex flex-wrap items-center gap-2">
          <LocationSelect locations={locations.data ?? []} value={locationId} allLabel="All locations" onChange={(next) => filter(() => setLocationId(next))} />
          <Input type="date" aria-label="From" className="w-auto" value={from} max={to} onChange={(event) => event.target.value && filter(() => setFrom(event.target.value))} />
          <Input type="date" aria-label="To" className="w-auto" value={to} min={from} onChange={(event) => event.target.value && filter(() => setTo(event.target.value))} />
        </div>
      }
    >
      {history.isPending ? (
        <LoadingRows rows={5} />
      ) : history.error ? (
        <ErrorState error={history.error} onRetry={() => history.refetch()} />
      ) : (
        <div className="flex flex-col gap-4">
          <DataList
            items={history.data.runs.map((run) => ({
              key: run.id,
              title: run.title,
              description: [formatDate(run.date), locationName(run.locationId), KIND_LABEL[run.kind]].filter(Boolean).join(' · '),
              badges: <RunBadge run={run} itemCount={run.total} />,
              onClick: () => navigate({ to: '/runs/$runId', params: { runId: run.id } }),
            }))}
            empty={<EmptyState title="Nothing in this range">Checklists appear here once staff start them.</EmptyState>}
          />
          {history.data.lastPage > 1 ? (
            <div className="flex items-center gap-3 text-sm">
              <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>
                Previous
              </Button>
              <span className="text-oc-muted-foreground">
                Page {history.data.page} of {history.data.lastPage} · {history.data.total} checklists
              </span>
              <Button variant="outline" size="sm" disabled={page >= history.data.lastPage} onClick={() => setPage(page + 1)}>
                Next
              </Button>
            </div>
          ) : null}
        </div>
      )}
    </PageLayout>
  )
}
