import { CoinRegular, TimeRegular, WarningRegular } from '@mingcute/react/core-regular'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

import { LocationSelect } from '@/components/shift/location-select'
import { ErrorBanner, LoadingRows, WaitingForAccess } from '@/components/shift/states'
import { DataTable, useDataTable } from '@/components/displaying-data/data-table'
import { MetricCard } from '@/components/displaying-data/metric-card'
import { DatePickerRange } from '@/components/form/date-picker'
import { PageLayout } from '@/components/layout/page-layout'
import { call } from '@/lib/api'
import { useLocations } from '@/lib/locations'
import { addDays, dayString, formatHours, formatMoney, weekStart } from '@/lib/shifts'
import { Banner, BannerDescription, BannerTitle } from '@ui/banner'
import { Button } from '@ui/button'
import { toast } from '@ui/toast'

export const Route = createFileRoute('/timesheet')({ component: Timesheet })

function Timesheet() {
  const locations = useLocations()
  const [range, setRange] = useState(() => {
    const from = weekStart(new Date())
    return { from, to: addDays(from, 6) }
  })
  const [locationId, setLocationId] = useState<string | null>(null)
  // The range is whole local days: to is exclusive, the day after the last one picked.
  const query = { from: range.from.toISOString(), to: addDays(range.to, 1).toISOString(), locationId }

  const sheet = useQuery({ queryKey: ['timesheet', query], queryFn: () => call('GET', '/api/timesheet', { query }) })
  const sales = useQuery({
    queryKey: ['timesheet-sales', dayString(range.from), dayString(range.to)],
    queryFn: () => call('GET', '/api/timesheet/sales', { query: { fromDay: dayString(range.from), toDay: dayString(range.to) } }),
  })
  const exported = useMutation({
    mutationFn: () => call('POST', '/api/timesheet/export', { body: { ...query, label: `${dayString(range.from)} to ${dayString(range.to)}` } }),
    onSuccess: (result) => {
      if (result.status === 'ready') toast.add({ title: `Exported ${result.rows} staff`, type: 'success' })
    },
    onError: (error) => toast.add({ title: 'Could not export', description: error.message, type: 'error' }),
  })

  const salesReady = sales.data?.status === 'ready' ? sales.data : null
  const currency = salesReady?.currency ?? null
  const salesBy = new Map((salesReady?.sales ?? []).map((item) => [item.staffId, item]))
  const rows = sheet.data ?? []
  const totals = rows.reduce(
    (sum, row) => ({ worked: sum.worked + row.workedMinutes, overtime: sum.overtime + row.overtimeMinutes, pay: sum.pay + row.pay, late: sum.late + row.lateCount + row.missedShifts }),
    { worked: 0, overtime: 0, pay: 0, late: 0 },
  )
  const commission = [...salesBy.values()].reduce((sum, item) => sum + item.commission, 0)

  const table = useDataTable({
    schema: {
      key: 'timesheet',
      mode: 'client',
      search: { placeholder: 'Search staff' },
      sort: { fields: [{ key: 'staff', title: 'Staff' }, { key: 'workedMinutes', title: 'Worked' }], defaultKey: 'staff', defaultDir: 'asc' },
      pagination: { pageSize: 50 },
      editColumns: true,
      emptyState: { title: 'Nothing in this period', description: 'Shifts and clock-ins in the period show here.', media: 'search' },
      columns: [
        { key: 'staff', title: 'Staff', locked: true },
        { key: 'scheduled', title: 'Scheduled', search: false },
        { key: 'worked', title: 'Worked', search: false },
        { key: 'overtime', title: 'Overtime', search: false },
        { key: 'attendance', title: 'Late / missed', search: false },
        { key: 'pay', title: 'Pay', search: false },
        { key: 'sales', title: 'HitPay sales', search: false },
        { key: 'commission', title: 'Commission', search: false },
      ],
    },
    data: rows.map((row) => {
      const staffSales = salesBy.get(row.staffId)
      return {
        id: row.staffId,
        staff: row.staffName,
        workedMinutes: row.workedMinutes,
        scheduled: formatHours(row.scheduledMinutes),
        worked: formatHours(row.workedMinutes),
        overtime: row.overtimeMinutes ? formatHours(row.overtimeMinutes) : '—',
        attendance: `${row.lateCount} / ${row.missedShifts}`,
        pay: row.hourlyRate ? formatMoney(row.pay, currency) : 'No rate set',
        sales: salesReady ? formatMoney(staffSales?.total ?? 0, currency) : '—',
        commission: salesReady && row.commissionPercent ? formatMoney(staffSales?.commission ?? 0, currency) : '—',
      }
    }),
  })

  return (
    <PageLayout
      title="Timesheet"
      description="Planned and worked hours, pay and commission for a period."
      actions={
        <div className="flex flex-wrap items-center gap-2">
          <LocationSelect locations={locations.data ?? []} value={locationId} allLabel="All locations" onChange={setLocationId} />
          <DatePickerRange
            selected={{ from: range.from, to: range.to }}
            disabled={{ after: addDays(new Date(), 30) }}
            onSelect={(picked) => picked?.from && setRange({ from: picked.from, to: picked.to ?? picked.from })}
          />
          <Button variant="outline" disabled={exported.isPending || rows.length === 0} onClick={() => exported.mutate()}>
            {exported.isPending ? 'Exporting…' : 'Export to Google Sheets'}
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        {exported.data?.status === 'waiting' ? <WaitingForAccess integration="Google Sheets" purpose="It saves the timesheet to a new spreadsheet." /> : null}
        {exported.data?.status === 'ready' ? (
          <Banner variant="success">
            <BannerTitle>Spreadsheet created</BannerTitle>
            <BannerDescription>
              <a href={exported.data.url} target="_blank" rel="noreferrer" className="underline">
                Open the spreadsheet
              </a>
            </BannerDescription>
          </Banner>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard loading={sheet.isPending} icon={<TimeRegular />} iconColor="blue" title="Hours worked" content={formatHours(totals.worked)} />
          <MetricCard loading={sheet.isPending} icon={<TimeRegular />} iconColor={totals.overtime ? 'red' : 'grey'} title="Overtime" content={formatHours(totals.overtime)} />
          <MetricCard loading={sheet.isPending} icon={<WarningRegular />} iconColor={totals.late ? 'red' : 'grey'} title="Late or missed" content={String(totals.late)} />
          <MetricCard
            loading={sheet.isPending || sales.isPending}
            icon={<CoinRegular />}
            iconColor="green"
            title="Pay and commission"
            info
            tooltip="Worked hours times each hourly rate, plus commission on HitPay sales."
            content={formatMoney(totals.pay + commission, currency)}
          />
        </div>

        {sales.data?.status === 'waiting' ? (
          <WaitingForAccess integration="HitPay" purpose="It adds each staff member's sales and commission to the timesheet." />
        ) : sales.error ? (
          <ErrorBanner error={sales.error} onRetry={() => sales.refetch()} />
        ) : salesReady?.partial ? (
          <Banner variant="warning">
            <BannerDescription>This period has more sales than one request can read: sales and commission cover the latest 495 payments. Pick a shorter period.</BannerDescription>
          </Banner>
        ) : null}

        {sheet.isPending ? <LoadingRows rows={5} /> : sheet.error ? <ErrorBanner error={sheet.error} onRetry={() => sheet.refetch()} /> : <DataTable table={table} />}
      </div>
    </PageLayout>
  )
}
