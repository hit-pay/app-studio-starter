import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import type { RunSummary } from 'backend'
import { useState } from 'react'

import { RunBadge } from '@/components/checklist/run-badge'
import { ErrorBanner, LoadingRows } from '@/components/checklist/states'
import { DataTable, useDataTable } from '@/components/displaying-data/data-table'
import { DatePickerRange } from '@/components/form/date-picker'
import { PageLayout } from '@/components/layout/page-layout'
import { call } from '@/lib/api'
import { addDays, formatDate, fromDate, KIND_LABEL, toDate, todayDate } from '@/lib/checklists'
import { useLocations } from '@/lib/locations'

export const Route = createFileRoute('/history')({ component: History })

const PAGE_SIZE = 20

function History() {
  const navigate = useNavigate()
  const locations = useLocations()
  const [range, setRange] = useState(() => ({ from: addDays(todayDate(), -29), to: todayDate() }))
  const [locationId, setLocationId] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  const history = useQuery({
    queryKey: ['history', range, locationId, page],
    placeholderData: keepPreviousData,
    queryFn: () => call('GET', '/api/runs', { query: { ...range, locationId, page } }),
  })
  const locationName = (id: string) => locations.data?.find((location) => location.id === id)?.name ?? ''

  const table = useDataTable({
    schema: {
      key: 'history',
      mode: 'server',
      search: false,
      filters: [
        {
          key: 'location',
          title: 'Location',
          options: (locations.data ?? []).map((location) => ({ value: location.id, label: location.name ?? 'Unnamed location' })),
        },
      ],
      pagination: { pageSize: PAGE_SIZE, pageSizes: [PAGE_SIZE] },
      emptyState: { title: 'Nothing in this range', description: 'Checklists appear here once staff start them.', media: 'search' },
      columns: [
        { key: 'date', title: 'Day', locked: true },
        { key: 'checklist', title: 'Checklist' },
        { key: 'location', title: 'Location' },
        { key: 'kind', title: 'Type' },
        { key: 'run', title: 'Status' },
      ],
    },
    data: (history.data?.runs ?? []).map((run) => ({
      id: run.id,
      date: formatDate(run.date),
      checklist: run.title,
      location: locationName(run.locationId),
      kind: KIND_LABEL[run.kind],
      run,
    })),
    total: history.data?.total ?? 0,
    onQueryChange: (query) => {
      setPage(query.page)
      setLocationId(query.filters.location || null)
    },
  })

  return (
    <PageLayout title="History" description="Checklists filled in, newest first.">
      {history.isPending ? (
        <LoadingRows rows={5} />
      ) : history.error ? (
        <ErrorBanner error={history.error} onRetry={() => history.refetch()} />
      ) : (
        <DataTable
          table={table}
          toolbarExtra={
            <DatePickerRange
              selected={{ from: fromDate(range.from), to: fromDate(range.to) }}
              disabled={{ after: new Date() }}
              onSelect={(picked) => {
                if (!picked?.from) return
                setRange({ from: toDate(picked.from), to: toDate(picked.to ?? picked.from) })
                table.setPage(1)
              }}
            />
          }
          cells={{ run: (value) => <RunBadge run={value as RunSummary} itemCount={(value as RunSummary).total} /> }}
          onRowClick={(row) => navigate({ to: '/runs/$runId', params: { runId: row.id } })}
        />
      )}
    </PageLayout>
  )
}
