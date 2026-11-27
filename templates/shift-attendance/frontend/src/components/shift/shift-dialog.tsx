import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Shift } from 'backend'
import type { Location, Staff } from 'backend/types'
import { useEffect, useState } from 'react'

import { LocationSelect } from '@/components/shift/location-select'
import { DatePicker } from '@/components/form/date-picker'
import { Select } from '@/components/form/select'
import { FormLayout } from '@/components/layout/form-layout'
import { useConfirmationModal } from '@/components/overlays/confirmation-modal'
import { call } from '@/lib/api'
import { at, timeString } from '@/lib/shifts'
import { Banner, BannerDescription } from '@ui/banner'
import { Button } from '@ui/button'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@ui/field'
import { Input } from '@ui/input'
import { Textarea } from '@ui/textarea'
import { toast } from '@ui/toast'

export type ShiftDraft = { id: string | null; staffId: string | null; locationId: string | null; day: Date; start: string; end: string; breakMinutes: string; note: string }

export function draftFrom(shift: Shift): ShiftDraft {
  return {
    id: shift.id,
    staffId: shift.staffId,
    locationId: shift.locationId,
    day: new Date(shift.startsAt),
    start: timeString(shift.startsAt),
    end: timeString(shift.endsAt),
    breakMinutes: String(shift.breakMinutes),
    note: shift.note ?? '',
  }
}

/** Plans or changes one shift (managers). A shift that ends before it starts runs past midnight. */
export function ShiftDialog({
  draft,
  onClose,
  staff,
  locations,
}: {
  draft: ShiftDraft | null
  onClose: () => void
  staff: Staff[]
  locations: Location[]
}) {
  const queryClient = useQueryClient()
  const confirm = useConfirmationModal()
  const [form, setForm] = useState<ShiftDraft | null>(draft)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    setForm(draft)
    setError(null)
  }, [draft])

  const done = (message: string) => {
    void queryClient.invalidateQueries({ queryKey: ['shifts'] })
    toast.add({ title: message, type: 'success' })
    onClose()
  }

  const save = useMutation({
    mutationFn: () => {
      const value = form!
      const startsAt = at(value.day, value.start)
      let endsAt = at(value.day, value.end)
      if (endsAt <= startsAt) endsAt = new Date(endsAt.getTime() + 24 * 60 * 60 * 1000)
      const body = {
        staffId: value.staffId,
        locationId: value.locationId,
        startsAt: startsAt.toISOString(),
        endsAt: endsAt.toISOString(),
        breakMinutes: value.breakMinutes === '' ? 0 : value.breakMinutes,
        note: value.note,
      }
      return value.id ? call('PUT', '/api/shifts/:id', { params: { id: value.id }, body }) : call('POST', '/api/shifts', { body })
    },
    onMutate: () => setError(null),
    onSuccess: () => done(form?.id ? 'Shift saved' : 'Shift added'),
    onError: (failure) => setError(failure.message),
  })

  const remove = useMutation({
    mutationFn: () => call('DELETE', '/api/shifts/:id', { params: { id: form!.id! } }),
    onSuccess: () => done('Shift removed'),
    onError: (failure) => setError(failure.message),
  })

  const update = (patch: Partial<ShiftDraft>) => setForm((current) => (current ? { ...current, ...patch } : current))
  const staffOptions = staff.map((member) => ({ value: member.id, label: member.name ?? 'Unnamed' }))

  return (
    <FormLayout
      mode="modal"
      open={form !== null}
      onOpenChange={(open) => !open && onClose()}
      title={form?.id ? 'Edit shift' : 'Add shift'}
      size="lg"
      actions={{
        cancel: { label: 'Cancel', onClick: onClose },
        save: { label: form?.id ? 'Save' : 'Add shift', loading: save.isPending, onClick: () => save.mutate() },
      }}
    >
      {form ? (
        <FieldGroup>
          {error ? (
            <Banner variant="destructive">
              <BannerDescription>{error}</BannerDescription>
            </Banner>
          ) : null}
          <Field>
            <FieldLabel>Staff</FieldLabel>
            <Select searchable options={staffOptions} value={form.staffId} placeholder="Choose who works" onValueChange={(value) => update({ staffId: typeof value === 'string' ? value : null })} />
          </Field>
          <Field>
            <FieldLabel>Location</FieldLabel>
            <LocationSelect className="w-full" locations={locations} value={form.locationId} onChange={(locationId) => update({ locationId })} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field>
              <FieldLabel>Day</FieldLabel>
              <DatePicker selected={form.day} onSelect={(day) => day && update({ day })} />
            </Field>
            <Field>
              <FieldLabel htmlFor="shift-start">Starts</FieldLabel>
              <Input id="shift-start" type="time" value={form.start} onChange={(event) => update({ start: event.target.value })} />
            </Field>
            <Field>
              <FieldLabel htmlFor="shift-end">Ends</FieldLabel>
              <Input id="shift-end" type="time" value={form.end} onChange={(event) => update({ end: event.target.value })} />
            </Field>
          </div>
          <Field className="max-w-48">
            <FieldLabel htmlFor="shift-break">Break (minutes)</FieldLabel>
            <Input id="shift-break" inputMode="numeric" value={form.breakMinutes} onChange={(event) => update({ breakMinutes: event.target.value })} />
            <FieldDescription>Taken off worked time once someone has worked 4 hours.</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="shift-note">Note (optional)</FieldLabel>
            <Textarea id="shift-note" maxLength={300} value={form.note} onChange={(event) => update({ note: event.target.value })} />
          </Field>
          {form.id ? (
            <div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={remove.isPending}
                onClick={async () => {
                  const yes = await confirm({ type: 'delete', title: 'Remove this shift?', message: 'Any swap request for it is cancelled.', confirmLabel: 'Remove' })
                  if (yes) remove.mutate()
                }}
              >
                Remove shift
              </Button>
            </div>
          ) : null}
        </FieldGroup>
      ) : null}
    </FormLayout>
  )
}
