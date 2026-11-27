import { useQuery } from '@tanstack/react-query'
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'

import { EmptyState, ErrorState, LoadingRows } from '@/components/checklist/states'
import { DataList } from '@/components/displaying-data/data-list'
import { PageLayout } from '@/components/layout/page-layout'
import { call } from '@/lib/api'
import { KIND_LABEL } from '@/lib/checklists'
import { useLocations } from '@/lib/locations'
import { Badge } from '@ui/badge'
import { buttonVariants } from '@ui/button'

export const Route = createFileRoute('/checklists/')({ component: Checklists })

function Checklists() {
  const navigate = useNavigate()
  const checklists = useQuery({ queryKey: ['checklists'], queryFn: () => call('GET', '/api/checklists') })
  const locations = useLocations()
  const locationName = (id: string | null) =>
    id === null ? 'Every location' : (locations.data?.find((location) => location.id === id)?.name ?? 'A removed location')

  return (
    <PageLayout
      title="Checklists"
      description="What staff tick off at each location, every day."
      actions={
        <Link to="/checklists/$checklistId" params={{ checklistId: 'new' }} className={buttonVariants({ size: 'sm' })}>
          New checklist
        </Link>
      }
    >
      {checklists.isPending ? (
        <LoadingRows />
      ) : checklists.error ? (
        <ErrorState error={checklists.error} onRetry={() => checklists.refetch()} />
      ) : (
        <DataList
          items={checklists.data.map((checklist) => ({
            key: checklist.id,
            title: checklist.title,
            description: `${checklist.items.length} items · ${locationName(checklist.locationId)}`,
            badges: (
              <>
                <Badge variant="secondary">{KIND_LABEL[checklist.kind]}</Badge>
                {checklist.cashCount ? <Badge tone="purple">Cash count</Badge> : null}
              </>
            ),
            onClick: () => navigate({ to: '/checklists/$checklistId', params: { checklistId: checklist.id } }),
          }))}
          empty={<EmptyState title="No checklists yet">Create the opening and closing checklists your staff follow.</EmptyState>}
        />
      )}
    </PageLayout>
  )
}
