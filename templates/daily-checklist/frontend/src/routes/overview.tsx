import { useMutation, useQuery } from '@tanstack/react-query'
import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

import { RunBadge } from '@/components/checklist/run-badge'
import { EmptyState, ErrorState, LoadingRows, WaitingForAccess } from '@/components/checklist/states'
import { PageLayout } from '@/components/layout/page-layout'
import { call } from '@/lib/api'
import { addDays, formatDate, todayDate } from '@/lib/checklists'
import { Button } from '@ui/button'
import { Input } from '@ui/input'
import { toast } from '@ui/toast'

export const Route = createFileRoute('/overview')({ component: Overview })

function Overview() {
  const [date, setDate] = useState(todayDate)
  const overview = useQuery({ queryKey: ['overview', date], queryFn: () => call('GET', '/api/overview', { query: { date } }) })

  const finished = overview.data?.reduce(
    (sum, location) => sum + location.checklists.filter((checklist) => checklist.run?.status === 'completed').length,
    0,
  )
  const total = overview.data?.reduce((sum, location) => sum + location.checklists.length, 0)

  return (
    <PageLayout
      title="Overview"
      description={overview.data ? `${formatDate(date)} · ${finished} of ${total} checklists completed` : formatDate(date)}
      actions={<Input type="date" aria-label="Day" className="w-auto" value={date} max={todayDate()} onChange={(event) => event.target.value && setDate(event.target.value)} />}
    >
      <div className="flex flex-col gap-8">
        {overview.isPending ? (
          <LoadingRows />
        ) : overview.error ? (
          <ErrorState error={overview.error} onRetry={() => overview.refetch()} />
        ) : overview.data.length === 0 ? (
          <EmptyState title="No locations yet">Add a location in HitPay to use checklists.</EmptyState>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {overview.data.map((location) => (
              <section key={location.id} className="flex flex-col gap-3 rounded-xl border border-oc-border p-4">
                <h2 className="text-sm font-medium">{location.name}</h2>
                {location.checklists.length === 0 ? (
                  <p className="text-sm text-oc-muted-foreground">No checklists for this location.</p>
                ) : (
                  <ul className="flex flex-col gap-2">
                    {location.checklists.map((checklist) => (
                      <li key={checklist.checklistId} className="flex flex-wrap items-center justify-between gap-2 text-sm">
                        {checklist.run ? (
                          <Link to="/runs/$runId" params={{ runId: checklist.run.id }} className="hover:underline">
                            {checklist.title}
                          </Link>
                        ) : (
                          <span>{checklist.title}</span>
                        )}
                        <RunBadge run={checklist.run} itemCount={checklist.itemCount} />
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        )}
        <ExportToSheets />
      </div>
    </PageLayout>
  )
}

function ExportToSheets() {
  const [from, setFrom] = useState(() => addDays(todayDate(), -6))
  const [to, setTo] = useState(todayDate)
  const exported = useMutation({
    mutationFn: () => call('POST', '/api/export', { body: { from, to } }),
    onSuccess: (result) => {
      if (result.status === 'ready') toast.add({ title: `Exported ${result.rows} checklists`, type: 'success' })
    },
    onError: (error) => toast.add({ title: 'Could not export', description: error.message, type: 'error' }),
  })

  return (
    <section className="flex max-w-2xl flex-col gap-3 rounded-xl border border-oc-border p-4">
      <div>
        <h2 className="text-sm font-medium">Export to Google Sheets</h2>
        <p className="text-sm text-oc-muted-foreground">Creates a new spreadsheet with every checklist in the range.</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Input type="date" aria-label="From" className="w-auto" value={from} max={to} onChange={(event) => event.target.value && setFrom(event.target.value)} />
        <span className="text-sm text-oc-muted-foreground">to</span>
        <Input type="date" aria-label="To" className="w-auto" value={to} min={from} max={todayDate()} onChange={(event) => event.target.value && setTo(event.target.value)} />
        <Button size="sm" disabled={exported.isPending} onClick={() => exported.mutate()}>
          {exported.isPending ? 'Exporting…' : 'Export'}
        </Button>
      </div>
      {exported.data?.status === 'waiting' ? (
        <WaitingForAccess integration="Google Sheets" purpose="It saves the checklists to a new spreadsheet." />
      ) : exported.data?.status === 'ready' ? (
        <a href={exported.data.url} target="_blank" rel="noreferrer" className="text-sm text-oc-primary underline">
          Open the spreadsheet
        </a>
      ) : null}
    </section>
  )
}
