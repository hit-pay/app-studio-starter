import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Shift } from 'backend'
import type { Staff } from 'backend/types'
import { useEffect, useState } from 'react'

import { Select } from '@/components/form/select'
import { FormLayout } from '@/components/layout/form-layout'
import { call } from '@/lib/api'
import { formatDay, formatRange } from '@/lib/shifts'
import { Banner, BannerDescription } from '@ui/banner'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@ui/field'
import { Textarea } from '@ui/textarea'
import { toast } from '@ui/toast'

/** Asks a manager to hand one of the viewer's shifts to a colleague. */
export function SwapDialog({ shift, colleagues, onClose }: { shift: Shift | null; colleagues: Staff[]; onClose: () => void }) {
  const queryClient = useQueryClient()
  const [toStaffId, setToStaffId] = useState<string | null>(null)
  const [reason, setReason] = useState('')
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    setToStaffId(null)
    setReason('')
    setError(null)
  }, [shift])

  const ask = useMutation({
    mutationFn: () => call('POST', '/api/swaps', { body: { shiftId: shift!.id, toStaffId, reason } }),
    onMutate: () => setError(null),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['swaps'] })
      toast.add({ title: 'Swap requested', description: 'A manager will approve or reject it.', type: 'success' })
      onClose()
    },
    onError: (failure) => setError(failure.message),
  })

  return (
    <FormLayout
      mode="modal"
      open={shift !== null}
      onOpenChange={(open) => !open && onClose()}
      title="Ask to swap this shift"
      description={shift ? `${formatDay(new Date(shift.startsAt))}, ${formatRange(shift.startsAt, shift.endsAt)}` : undefined}
      actions={{
        cancel: { label: 'Cancel', onClick: onClose },
        save: { label: 'Send request', loading: ask.isPending, onClick: () => ask.mutate() },
      }}
    >
      <FieldGroup>
        {error ? (
          <Banner variant="destructive">
            <BannerDescription>{error}</BannerDescription>
          </Banner>
        ) : null}
        <Field>
          <FieldLabel>Colleague</FieldLabel>
          <Select
            searchable
            options={colleagues.map((member) => ({ value: member.id, label: member.name ?? 'Unnamed' }))}
            value={toStaffId}
            placeholder="Who takes the shift"
            onValueChange={(value) => setToStaffId(typeof value === 'string' ? value : null)}
          />
          <FieldDescription>Ask them first: the shift moves to them once a manager approves.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="swap-reason">Reason (optional)</FieldLabel>
          <Textarea id="swap-reason" maxLength={300} value={reason} onChange={(event) => setReason(event.target.value)} />
        </Field>
      </FieldGroup>
    </FormLayout>
  )
}
