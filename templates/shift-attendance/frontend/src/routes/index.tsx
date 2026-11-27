import { AddRegular, CalendarRegular, CopyRegular, LeftRegular, RightRegular } from '@mingcute/react/core-regular'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import type { Shift } from 'backend'
import { useState } from 'react'

import { LocationSelect } from '@/components/shift/location-select'
import { ShiftDialog, draftFrom, type ShiftDraft } from '@/components/shift/shift-dialog'
import { ErrorBanner, LoadingRows, WaitingForAccess } from '@/components/shift/states'
import { SwapDialog } from '@/components/shift/swap-dialog'
import { Empty } from '@/components/displaying-data/empty'
import { MetricCard } from '@/components/displaying-data/metric-card'
import { DatePicker } from '@/components/form/date-picker'
import { PageLayout } from '@/components/layout/page-layout'
import { useConfirmationModal } from '@/components/overlays/confirmation-modal'
import { call } from '@/lib/api'
import { useCurrentUser } from '@/lib/current-user'
import { useLocations } from '@/lib/locations'
import { addDays, formatDay, formatHours, formatRange, sameDay, useIsManager, weekStart } from '@/lib/shifts'
import { useStaff } from '@/lib/staff'
import { cn } from '@/lib/utils'
import { Badge } from '@ui/badge'
import { Button } from '@ui/button'
import { toast } from '@ui/toast'

export const Route = createFileRoute('/')({ component: Schedule })

function Schedule() {
  const manager = useIsManager()
  const me = useCurrentUser()
  const queryClient = useQueryClient()
  const confirm = useConfirmationModal()
  const locations = useLocations()
  const staff = useStaff()
  const [start, setStart] = useState(() => weekStart(new Date()))
  const [locationId, setLocationId] = useState<string | null>(null)
  const [editing, setEditing] = useState<ShiftDraft | null>(null)
  const [swapping, setSwapping] = useState<Shift | null>(null)
  const [calendarWaiting, setCalendarWaiting] = useState(false)

  const end = addDays(start, 7)
  const days = Array.from({ length: 7 }, (_, index) => addDays(start, index))
  const shifts = useQuery({
    queryKey: ['shifts', start.toISOString(), locationId],
    queryFn: () => call('GET', '/api/shifts', { query: { from: start.toISOString(), to: end.toISOString(), locationId } }),
  })

  const copy = useMutation({
    mutationFn: () => call('POST', '/api/shifts/copy-week', { body: { from: start.toISOString() } }),
    onSuccess: (result) => {
      void queryClient.invalidateQueries({ queryKey: ['shifts'] })
      toast.add({
        title: `Copied ${result.copied} shifts to next week`,
        description: result.skipped ? `${result.skipped} skipped: the staff member already had a shift then.` : undefined,
        type: 'success',
      })
      setStart(addDays(start, 7))
    },
    onError: (error) => toast.add({ title: 'Could not copy the week', description: error.message, type: 'error' }),
  })

  const sendToCalendar = useMutation({
    mutationFn: () => call('POST', '/api/shifts/send-to-calendar', { body: { from: start.toISOString(), to: end.toISOString() } }),
    onSuccess: (result) => {
      setCalendarWaiting(result.status === 'waiting')
      if (result.status !== 'ready') return
      void queryClient.invalidateQueries({ queryKey: ['shifts'] })
      toast.add({
        title: result.sent ? `Sent ${result.sent} shifts to Google Calendar` : 'Every shift is already in Google Calendar',
        description: result.remaining ? `${result.remaining} left: send again to add them.` : undefined,
        type: 'success',
      })
    },
    onError: (error) => toast.add({ title: 'Could not send to Google Calendar', description: error.message, type: 'error' }),
  })

  const shown = (shifts.data ?? []).filter((shift) => !locationId || shift.locationId === locationId)
  const people = (staff.data ?? []).filter(
    (member) => !locationId || member.locations.some((location) => location.id === locationId) || shown.some((shift) => shift.staffId === member.id),
  )
  const locationName = (id: string) => locations.data?.find((location) => location.id === id)?.name ?? ''
  const plannedMinutes = shown.reduce((sum, shift) => sum + Math.max(0, (Date.parse(shift.endsAt) - Date.parse(shift.startsAt)) / 60_000 - shift.breakMinutes), 0)

  return (
    <PageLayout
      title="Schedule"
      description={`${formatDay(start, { day: 'numeric', month: 'short' })} – ${formatDay(addDays(end, -1), { day: 'numeric', month: 'short', year: 'numeric' })}`}
      actions={
        <div className="flex flex-wrap items-center gap-2">
          <LocationSelect locations={locations.data ?? []} value={locationId} allLabel="All locations" onChange={setLocationId} />
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon-sm" aria-label="Previous week" onClick={() => setStart(addDays(start, -7))}>
              <LeftRegular />
            </Button>
            <DatePicker className="w-44" selected={start} onSelect={(day) => day && setStart(weekStart(day))} />
            <Button variant="outline" size="icon-sm" aria-label="Next week" onClick={() => setStart(addDays(start, 7))}>
              <RightRegular />
            </Button>
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        <div className="grid gap-3 sm:grid-cols-3">
          <MetricCard loading={shifts.isPending} title="Shifts" content={String(shown.length)} />
          <MetricCard loading={shifts.isPending} title="Planned hours" content={formatHours(Math.round(plannedMinutes))} />
          <MetricCard loading={shifts.isPending} title="Staff on the roster" content={String(new Set(shown.map((shift) => shift.staffId)).size)} />
        </div>

        {manager ? (
          <div className="flex flex-wrap gap-2">
            <Button size="sm" onClick={() => setEditing({ id: null, staffId: null, locationId, day: start, start: '09:00', end: '17:00', breakMinutes: '60', note: '' })}>
              <AddRegular data-icon="inline-start" />
              Add shift
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={copy.isPending || shown.length === 0}
              onClick={async () => {
                const yes = await confirm({ type: 'question', title: 'Copy this week to next week?', message: 'Shifts that clash with one already planned are skipped.' })
                if (yes) copy.mutate()
              }}
            >
              <CopyRegular data-icon="inline-start" />
              Copy to next week
            </Button>
            <Button size="sm" variant="outline" disabled={sendToCalendar.isPending || shown.length === 0} onClick={() => sendToCalendar.mutate()}>
              <CalendarRegular data-icon="inline-start" />
              {sendToCalendar.isPending ? 'Sending…' : 'Send to Google Calendar'}
            </Button>
          </div>
        ) : null}
        {calendarWaiting ? <WaitingForAccess integration="Google Calendar" purpose="It adds each shift to the connected calendar." /> : null}

        {shifts.isPending || staff.isPending ? (
          <LoadingRows rows={5} />
        ) : shifts.error ? (
          <ErrorBanner error={shifts.error} onRetry={() => shifts.refetch()} />
        ) : staff.error ? (
          <ErrorBanner error={staff.error} onRetry={() => staff.refetch()} />
        ) : people.length === 0 ? (
          <Empty media="icon" title="No staff here yet" description="Give staff access to this app in App Studio to plan their shifts." />
        ) : (
          <div className="overflow-x-auto rounded-xl border border-oc-border">
            <table className="w-full min-w-[56rem] border-collapse text-sm">
              <thead>
                <tr className="bg-oc-muted text-left text-xs text-oc-muted-foreground uppercase">
                  <th className="w-44 px-3 py-2 font-medium">Staff</th>
                  {days.map((day) => (
                    <th key={day.toISOString()} className={cn('px-2 py-2 font-medium', sameDay(day, new Date()) && 'text-oc-primary')}>
                      {formatDay(day)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {people.map((member) => (
                  <tr key={member.id} className="border-t border-oc-border align-top">
                    <td className="px-3 py-2">
                      <div className="font-medium">{member.name ?? 'Unnamed'}</div>
                      <div className="text-xs text-oc-muted-foreground">{member.role?.title ?? ''}</div>
                    </td>
                    {days.map((day) => {
                      const cell = shown.filter((shift) => shift.staffId === member.id && sameDay(new Date(shift.startsAt), day))
                      return (
                        <td key={day.toISOString()} className="group px-1.5 py-1.5">
                          <div className="flex min-h-10 flex-col gap-1">
                            {cell.map((shift) => {
                              const mine = shift.staffId === me.data?.id
                              const clickable = manager || (mine && Date.parse(shift.startsAt) > Date.now())
                              return (
                                <button
                                  key={shift.id}
                                  type="button"
                                  disabled={!clickable}
                                  title={shift.note ?? undefined}
                                  className="text-left disabled:cursor-default"
                                  onClick={() => (manager ? setEditing(draftFrom(shift)) : setSwapping(shift))}
                                >
                                  <Badge tone={mine ? 'blue' : 'grey'} className="w-full justify-start">
                                    {formatRange(shift.startsAt, shift.endsAt)}
                                  </Badge>
                                  {!locationId ? <div className="truncate px-1 text-[11px] text-oc-muted-foreground">{locationName(shift.locationId)}</div> : null}
                                </button>
                              )
                            })}
                            {manager ? (
                              <button
                                type="button"
                                aria-label={`Add a shift for ${member.name ?? 'staff'} on ${formatDay(day)}`}
                                className="hidden h-6 items-center justify-center rounded-md border border-dashed border-oc-border text-oc-muted-foreground group-hover:flex"
                                onClick={() =>
                                  setEditing({ id: null, staffId: member.id, locationId: locationId ?? member.locations[0]?.id ?? null, day, start: '09:00', end: '17:00', breakMinutes: '60', note: '' })
                                }
                              >
                                <AddRegular className="size-3.5" />
                              </button>
                            ) : null}
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {!manager ? <p className="text-xs text-oc-muted-foreground">Your shifts are in blue. Click an upcoming one to ask a colleague to take it.</p> : null}
      </div>

      <ShiftDialog draft={editing} onClose={() => setEditing(null)} staff={staff.data ?? []} locations={locations.data ?? []} />
      <SwapDialog shift={swapping} colleagues={(staff.data ?? []).filter((member) => member.id !== me.data?.id)} onClose={() => setSwapping(null)} />
    </PageLayout>
  )
}
