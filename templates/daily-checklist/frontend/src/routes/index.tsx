import { useMutation, useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import { LocationSelect } from '@/components/checklist/location-select'
import { RunBadge } from '@/components/checklist/run-badge'
import { ErrorBanner, LoadingRows } from '@/components/checklist/states'
import { DataList } from '@/components/displaying-data/data-list'
import { Empty } from '@/components/displaying-data/empty'
import { PageLayout } from '@/components/layout/page-layout'
import { call } from '@/lib/api'
import { formatDate, itemCount, KIND_LABEL, todayDate, useIsManager } from '@/lib/checklists'
import { useLocations } from '@/lib/locations'
import { Button } from '@ui/button'
import { toast } from '@ui/toast'

export const Route = createFileRoute('/')({
  component: Today,
  validateSearch: (search: Record<string, unknown>): { location?: string } =>
    typeof search.location === 'string' ? { location: search.location } : {},
})

function Today() {
  const { location } = Route.useSearch()
  const navigate = Route.useNavigate()
  const manager = useIsManager()
  const locations = useLocations()
  const locationId = location ?? locations.data?.[0]?.id ?? null
  const date = todayDate()

  const today = useQuery({
    queryKey: ['today', locationId, date],
    enabled: locationId !== null,
    queryFn: () => call('GET', '/api/today', { query: { locationId, date } }),
  })

  const start = useMutation({
    mutationFn: (checklistId: string) => call('POST', '/api/runs', { body: { checklistId, locationId, date } }),
    onSuccess: (run) => navigate({ to: '/runs/$runId', params: { runId: run.id } }),
    onError: (error) => toast.add({ title: 'Could not open the checklist', description: error.message, type: 'error' }),
  })

  return (
    <PageLayout
      title="Today"
      description={formatDate(date)}
      actions={
        locations.data && locations.data.length > 0 ? (
          <LocationSelect
            locations={locations.data}
            value={locationId}
            onChange={(next) => navigate({ search: next ? { location: next } : {} })}
          />
        ) : null
      }
    >
      {locations.isPending ? (
        <LoadingRows />
      ) : locations.error ? (
        <ErrorBanner error={locations.error} onRetry={() => locations.refetch()} />
      ) : locations.data.length === 0 ? (
        <Empty media="icon" title="No locations yet" description="Add a location in HitPay to use checklists." />
      ) : today.isPending ? (
        <LoadingRows />
      ) : today.error ? (
        <ErrorBanner error={today.error} onRetry={() => today.refetch()} />
      ) : (
        <DataList
          items={today.data.map(({ checklist, run }) => ({
            key: checklist.id,
            title: checklist.title,
            description: `${KIND_LABEL[checklist.kind]} · ${itemCount(checklist.itemCount)}`,
            badges: <RunBadge run={run} itemCount={checklist.itemCount} />,
            trailing: (
              <Button
                size="sm"
                variant={run?.status === 'completed' ? 'outline' : 'default'}
                disabled={start.isPending}
                onClick={() => start.mutate(checklist.id)}
              >
                {run?.status === 'completed' ? 'View' : run ? 'Continue' : 'Start'}
              </Button>
            ),
          }))}
          empty={
            <Empty
              media="icon"
              title="No checklists for this location"
              description={manager ? 'Create the opening and closing checklists your staff follow.' : 'Ask a manager to set up the opening and closing checklists.'}
              actions={manager ? [{ key: 'create', label: 'Create a checklist' }] : undefined}
              onAction={() => navigate({ to: '/checklists/$checklistId', params: { checklistId: 'new' } })}
            />
          }
        />
      )}
    </PageLayout>
  )
}
