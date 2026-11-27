import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { ErrorBanner, LoadingRows } from '@/components/checklist/states'
import { DataTable, useDataTable } from '@/components/displaying-data/data-table'
import { PageLayout } from '@/components/layout/page-layout'
import { useConfirmationModal } from '@/components/overlays/confirmation-modal'
import { call } from '@/lib/api'
import { itemCount, KIND_LABEL } from '@/lib/checklists'
import { useLocations } from '@/lib/locations'
import { Badge } from '@ui/badge'
import { Button } from '@ui/button'
import { toast } from '@ui/toast'

export const Route = createFileRoute('/checklists/')({ component: Checklists })

function Checklists() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const confirm = useConfirmationModal()
  const checklists = useQuery({ queryKey: ['checklists'], queryFn: () => call('GET', '/api/checklists') })
  const locations = useLocations()
  const locationName = (id: string | null) =>
    id === null ? 'Every location' : (locations.data?.find((location) => location.id === id)?.name ?? 'A removed location')

  const archive = useMutation({
    mutationFn: (id: string) => call('DELETE', '/api/checklists/:id', { params: { id } }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['checklists'] })
      void queryClient.invalidateQueries({ queryKey: ['today'] })
      toast.add({ title: 'Checklist archived', type: 'success' })
    },
    onError: (error) => toast.add({ title: 'Could not archive', description: error.message, type: 'error' }),
  })

  const table = useDataTable({
    schema: {
      key: 'checklists',
      mode: 'client',
      search: { placeholder: 'Search checklists' },
      filters: [{ key: 'kind', title: 'Type', options: Object.entries(KIND_LABEL).map(([value, label]) => ({ value, label })) }],
      rowActions: ['edit', 'delete'],
      pagination: { pageSize: 20 },
      emptyState: {
        title: 'No checklists yet',
        description: 'Create the opening and closing checklists your staff follow.',
        media: 'icon',
        actions: [{ key: 'create', label: 'New checklist' }],
      },
      columns: [
        { key: 'title', title: 'Checklist', locked: true },
        { key: 'kind', title: 'Type', search: false },
        { key: 'location', title: 'Location' },
        { key: 'items', title: 'Items', search: false },
        { key: 'cashCount', title: 'Cash count', search: false },
      ],
    },
    data: (checklists.data ?? []).map((checklist) => ({
      id: checklist.id,
      title: checklist.title,
      kind: checklist.kind,
      location: locationName(checklist.locationId),
      items: itemCount(checklist.items.length),
      cashCount: checklist.cashCount,
    })),
  })

  const edit = (id: string) => navigate({ to: '/checklists/$checklistId', params: { checklistId: id } })

  return (
    <PageLayout
      title="Checklists"
      description="What staff tick off at each location, every day."
      actions={
        <Button size="sm" onClick={() => edit('new')}>
          New checklist
        </Button>
      }
    >
      {checklists.isPending ? (
        <LoadingRows />
      ) : checklists.error ? (
        <ErrorBanner error={checklists.error} onRetry={() => checklists.refetch()} />
      ) : (
        <DataTable
          table={table}
          cells={{
            kind: (value) => <Badge tone="grey">{KIND_LABEL[value as keyof typeof KIND_LABEL]}</Badge>,
            cashCount: (value) => (value ? <Badge tone="purple">Compared with HitPay</Badge> : <span className="text-oc-muted-foreground">—</span>),
          }}
          onRowClick={(row) => edit(row.id)}
          onEmptyAction={() => edit('new')}
          onRowAction={async (action, row) => {
            if (action === 'edit') return edit(row.id)
            const yes = await confirm({
              type: 'delete',
              title: 'Archive this checklist?',
              message: 'It stops appearing for new days. Past checklists keep their history.',
              confirmLabel: 'Archive',
            })
            if (yes) archive.mutate(row.id)
          }}
        />
      )}
    </PageLayout>
  )
}
