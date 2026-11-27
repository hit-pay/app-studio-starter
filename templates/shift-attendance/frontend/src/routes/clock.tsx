import { TimeRegular } from '@mingcute/react/core-regular'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { AttendancePhoto } from '@/components/shift/attendance-photo'
import { LocationSelect } from '@/components/shift/location-select'
import { ErrorBanner, LoadingRows } from '@/components/shift/states'
import { DataTable, useDataTable } from '@/components/displaying-data/data-table'
import { MetricCard } from '@/components/displaying-data/metric-card'
import { PageLayout } from '@/components/layout/page-layout'
import { call } from '@/lib/api'
import { useLocations } from '@/lib/locations'
import { formatDay, formatHours, formatRange, formatTime } from '@/lib/shifts'
import { Banner, BannerDescription } from '@ui/banner'
import { Button } from '@ui/button'
import { Field, FieldLabel } from '@ui/field'
import { FormSection } from '@ui/form-section'
import { Textarea } from '@ui/textarea'
import { toast } from '@ui/toast'

export const Route = createFileRoute('/clock')({ component: Clock })

/** Re-renders every minute, for the running time. */
function useNow(): number {
  const [now, setNow] = useState(Date.now)
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 60_000)
    return () => clearInterval(timer)
  }, [])
  return now
}

function Clock() {
  const queryClient = useQueryClient()
  const now = useNow()
  const locations = useLocations()
  const [locationId, setLocationId] = useState<string | null>(null)
  const [note, setNote] = useState('')
  const [error, setError] = useState<string | null>(null)
  const status = useQuery({ queryKey: ['attendance', 'me'], queryFn: () => call('GET', '/api/attendance/me') })

  const changed = (title: string) => {
    setError(null)
    setNote('')
    void queryClient.invalidateQueries({ queryKey: ['attendance', 'me'] })
    toast.add({ title, type: 'success' })
  }
  const clockIn = useMutation({
    mutationFn: () => call('POST', '/api/attendance/clock-in', { body: { locationId } }),
    onSuccess: () => changed('Clocked in'),
    onError: (failure) => setError(failure.message),
  })
  const clockOut = useMutation({
    mutationFn: () => call('POST', '/api/attendance/clock-out', { body: { note } }),
    onSuccess: () => changed('Clocked out'),
    onError: (failure) => setError(failure.message),
  })

  const locationName = (id: string) => locations.data?.find((location) => location.id === id)?.name ?? ''
  const table = useDataTable({
    schema: {
      key: 'my-attendance',
      mode: 'client',
      search: false,
      pagination: false,
      emptyState: { title: 'No clock-ins yet', media: 'icon' },
      columns: [
        { key: 'day', title: 'Day', locked: true },
        { key: 'location', title: 'Location' },
        { key: 'time', title: 'Time' },
        { key: 'hours', title: 'Hours' },
      ],
    },
    data: (status.data?.recent ?? []).map((item) => ({
      id: item.id,
      day: formatDay(new Date(item.clockInAt)),
      location: locationName(item.locationId),
      time: item.clockOutAt ? formatRange(item.clockInAt, item.clockOutAt) : `${formatTime(item.clockInAt)}–now`,
      hours: formatHours(Math.round(((item.clockOutAt ? Date.parse(item.clockOutAt) : now) - Date.parse(item.clockInAt)) / 60_000)),
    })),
  })

  if (status.isPending) {
    return (
      <PageLayout title="Clock in" loading>
        <LoadingRows />
      </PageLayout>
    )
  }
  if (status.error) {
    return (
      <PageLayout title="Clock in">
        <ErrorBanner error={status.error} onRetry={() => status.refetch()} />
      </PageLayout>
    )
  }

  const { open, shift } = status.data
  const shiftStartsSoon = shift && Date.parse(shift.startsAt) - now <= 60 * 60_000

  return (
    <PageLayout title={open ? 'You are clocked in' : 'Clock in'} description={formatDay(new Date(now), { weekday: 'long', day: 'numeric', month: 'long' })}>
      <div className="flex max-w-3xl flex-col gap-8">
        <div className="grid gap-3 sm:grid-cols-2">
          <MetricCard
            icon={<TimeRegular />}
            iconColor={open ? 'green' : 'grey'}
            title={open ? 'Working for' : 'Not clocked in'}
            content={open ? formatHours(Math.round((now - Date.parse(open.clockInAt)) / 60_000)) : '—'}
            footer={open ? `Since ${formatTime(open.clockInAt)} at ${locationName(open.locationId)}` : undefined}
          />
          <MetricCard
            title={shift ? 'Your shift' : 'No shift today'}
            content={shift ? formatRange(shift.startsAt, shift.endsAt) : '—'}
            footer={shift ? `${formatDay(new Date(shift.startsAt))} at ${locationName(shift.locationId)}` : 'You can still clock in at a location.'}
          />
        </div>

        {error ? (
          <Banner variant="destructive">
            <BannerDescription>{error}</BannerDescription>
          </Banner>
        ) : null}

        {open ? (
          <section className="flex flex-col gap-4">
            <FormSection title="Clock out" description="Add a note for your manager if anything happened." />
            <AttendancePhoto attendanceId={open.id} editable />
            <Field>
              <FieldLabel htmlFor="clock-note">Note (optional)</FieldLabel>
              <Textarea id="clock-note" maxLength={300} value={note} onChange={(event) => setNote(event.target.value)} />
            </Field>
            <div>
              <Button variant="destructive" disabled={clockOut.isPending} onClick={() => clockOut.mutate()}>
                {clockOut.isPending ? 'Clocking out…' : 'Clock out'}
              </Button>
            </div>
          </section>
        ) : (
          <section className="flex flex-col gap-4">
            <FormSection
              title="Clock in"
              description={shiftStartsSoon ? `For your shift at ${locationName(shift.locationId)}.` : 'You have no shift now: choose where you are working.'}
            />
            {shiftStartsSoon ? null : <LocationSelect locations={locations.data ?? []} value={locationId} onChange={setLocationId} />}
            <div>
              <Button disabled={clockIn.isPending || (!shiftStartsSoon && !locationId)} onClick={() => clockIn.mutate()}>
                {clockIn.isPending ? 'Clocking in…' : 'Clock in'}
              </Button>
            </div>
          </section>
        )}

        <section className="flex flex-col gap-4">
          <FormSection title="Your recent clock-ins" />
          <DataTable table={table} />
        </section>
      </div>
    </PageLayout>
  )
}
