import { CheckCircleRegular, TimeRegular, WarningRegular } from '@mingcute/react/core-regular'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import type { RunSummary } from 'backend'
import { useState } from 'react'

import { RunBadge } from '@/components/checklist/run-badge'
import { ErrorBanner, LoadingRows, WaitingForAccess } from '@/components/checklist/states'
import { DataTable, useDataTable } from '@/components/displaying-data/data-table'
import { Empty } from '@/components/displaying-data/empty'
import { MetricCard } from '@/components/displaying-data/metric-card'
import { DatePicker, DatePickerRange } from '@/components/form/date-picker'
import { PageLayout } from '@/components/layout/page-layout'
import { call } from '@/lib/api'
import { addDays, formatDate, fromDate, KIND_LABEL, toDate, todayDate } from '@/lib/checklists'
import { Banner, BannerDescription, BannerTitle } from '@ui/banner'
import { Button } from '@ui/button'
import { FormSection } from '@ui/form-section'
import { toast } from '@ui/toast'

export const Route = createFileRoute('/overview')({ component: Overview })

function Overview() {
  const navigate = useNavigate()
  const [date, setDate] = useState(todayDate)
  const overview = useQuery({ queryKey: ['overview', date], queryFn: () => call('GET', '/api/overview', { query: { date } }) })

  const rows = (overview.data ?? []).flatMap((location) =>
    location.checklists.map((checklist) => ({
      id: `${location.id}:${checklist.checklistId}`,
      location: location.name,
      checklist: checklist.title,
      kind: KIND_LABEL[checklist.kind],
      itemCount: checklist.itemCount,
      run: checklist.run,
    })),
  )
  const completed = rows.filter((row) => row.run?.status === 'completed').length
  const inProgress = rows.filter((row) => row.run?.status === 'open').length

  const table = useDataTable({
    schema: {
      key: 'overview',
      mode: 'client',
      search: { placeholder: 'Search locations or checklists' },
      pagination: { pageSize: 25 },
      emptyState: { title: 'No checklists for this day', description: 'Create checklists to see each location here.', media: 'icon' },
      columns: [
        { key: 'location', title: 'Location', locked: true },
        { key: 'checklist', title: 'Checklist' },
        { key: 'kind', title: 'Type', search: false },
        { key: 'run', title: 'Status', search: false },
      ],
    },
    data: rows,
  })

  return (
    <PageLayout
      title="Overview"
      description={formatDate(date)}
      actions={
        <DatePicker
          selected={fromDate(date)}
          disabled={{ after: new Date() }}
          onSelect={(picked) => picked && setDate(toDate(picked))}
        />
      }
    >
      <div className="flex flex-col gap-8">
        {overview.isPending ? (
          <LoadingRows />
        ) : overview.error ? (
          <ErrorBanner error={overview.error} onRetry={() => overview.refetch()} />
        ) : overview.data.length === 0 ? (
          <Empty media="icon" title="No locations yet" description="Add a location in HitPay to use checklists." />
        ) : (
          <>
            <div className="grid gap-3 sm:grid-cols-3">
              <MetricCard icon={<CheckCircleRegular />} iconColor="green" title="Completed" content={`${completed} of ${rows.length}`} />
              <MetricCard icon={<TimeRegular />} iconColor="blue" title="In progress" content={String(inProgress)} />
              <MetricCard
                icon={<WarningRegular />}
                iconColor={rows.length - completed - inProgress > 0 ? 'red' : 'grey'}
                title="Not started"
                content={String(rows.length - completed - inProgress)}
              />
            </div>
            <DataTable
              table={table}
              cells={{
                run: (value, row) => <RunBadge run={value as RunSummary | null} itemCount={Number(row.itemCount)} />,
              }}
              onRowClick={(row) => {
                const run = row.run as RunSummary | null
                if (run) void navigate({ to: '/runs/$runId', params: { runId: run.id } })
              }}
            />
          </>
        )}
        <ExportToSheets />
      </div>
    </PageLayout>
  )
}

function ExportToSheets() {
  const [range, setRange] = useState(() => ({ from: addDays(todayDate(), -6), to: todayDate() }))
  const exported = useMutation({
    mutationFn: () => call('POST', '/api/export', { body: range }),
    onSuccess: (result) => {
      if (result.status === 'ready') toast.add({ title: `Exported ${result.rows} checklists`, type: 'success' })
    },
    onError: (error) => toast.add({ title: 'Could not export', description: error.message, type: 'error' }),
  })

  return (
    <section className="flex max-w-2xl flex-col gap-4">
      <FormSection title="Export to Google Sheets" description="Creates a new spreadsheet with every checklist in the range." />
      <div className="flex flex-wrap items-center gap-2">
        <DatePickerRange
          selected={{ from: fromDate(range.from), to: fromDate(range.to) }}
          disabled={{ after: new Date() }}
          onSelect={(picked) => picked?.from && setRange({ from: toDate(picked.from), to: toDate(picked.to ?? picked.from) })}
        />
        <Button disabled={exported.isPending} onClick={() => exported.mutate()}>
          {exported.isPending ? 'Exporting…' : 'Export'}
        </Button>
      </div>
      {exported.data?.status === 'waiting' ? (
        <WaitingForAccess integration="Google Sheets" purpose="It saves the checklists to a new spreadsheet." />
      ) : exported.data?.status === 'ready' ? (
        <Banner variant="success">
          <CheckCircleRegular />
          <BannerTitle>Spreadsheet created</BannerTitle>
          <BannerDescription>
            <a href={exported.data.url} target="_blank" rel="noreferrer" className="underline">
              Open the spreadsheet
            </a>
          </BannerDescription>
        </Banner>
      ) : null}
    </section>
  )
}
