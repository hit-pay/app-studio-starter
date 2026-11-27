import { useMutation, useQuery } from '@tanstack/react-query'
import { Link, createFileRoute } from '@tanstack/react-router'

import { DataList } from '@/components/displaying-data/data-list'
import { EmptyState, ErrorState, LoadingRows } from '@/components/checklist/states'
import { LocationSelect } from '@/components/checklist/location-select'
import { RunBadge } from '@/components/checklist/run-badge'
import { PageLayout } from '@/components/layout/page-layout'
import { call } from '@/lib/api'
import { formatDate, KIND_LABEL, todayDate, useIsManager } from '@/lib/checklists'
import { useLocations } from '@/lib/locations'
import { Button, buttonVariants } from '@ui/button'
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
        <ErrorState error={locations.error} onRetry={() => locations.refetch()} />
      ) : locations.data.length === 0 ? (
        <EmptyState title="No locations yet">Add a location in HitPay to use checklists.</EmptyState>
      ) : today.isPending ? (
        <LoadingRows />
      ) : today.error ? (
        <ErrorState error={today.error} onRetry={() => today.refetch()} />
      ) : (
        <DataList
          items={today.data.map(({ checklist, run }) => ({
            key: checklist.id,
            title: checklist.title,
            description: `${KIND_LABEL[checklist.kind]} · ${checklist.itemCount} items`,
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
            <EmptyState title="No checklists for this location">
              {manager ? (
                <Link to="/checklists/$checklistId" params={{ checklistId: 'new' }} className={buttonVariants({ size: 'sm' })}>
                  Create a checklist
                </Link>
              ) : (
                'Ask a manager to set up the opening and closing checklists.'
              )}
            </EmptyState>
          }
        />
      )}
    </PageLayout>
  )
}
