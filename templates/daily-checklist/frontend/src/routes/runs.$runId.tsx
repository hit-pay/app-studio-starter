import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import type { RunDetail } from 'backend'
import { useState } from 'react'

import { CashCount } from '@/components/checklist/cash-count'
import { ItemPhotos } from '@/components/checklist/item-photos'
import { RunBadge } from '@/components/checklist/run-badge'
import { ErrorBanner, LoadingRows } from '@/components/checklist/states'
import { DetailCard } from '@/components/displaying-data/detail-card'
import { PageLayout } from '@/components/layout/page-layout'
import { useConfirmationModal } from '@/components/overlays/confirmation-modal'
import { call } from '@/lib/api'
import { formatDate, formatMoney, formatTime, KIND_LABEL, useIsManager } from '@/lib/checklists'
import { useLocations } from '@/lib/locations'
import { Button } from '@ui/button'
import { Checkbox } from '@ui/checkbox'
import { Banner, BannerDescription } from '@ui/banner'
import { Field, FieldLabel } from '@ui/field'
import { FormSection } from '@ui/form-section'
import { Textarea } from '@ui/textarea'
import { toast } from '@ui/toast'

export const Route = createFileRoute('/runs/$runId')({ component: RunPage })

function RunPage() {
  const { runId } = Route.useParams()
  const router = useRouter()
  const queryClient = useQueryClient()
  const manager = useIsManager()
  const confirm = useConfirmationModal()
  const locations = useLocations()
  const [counted, setCounted] = useState('')
  const [note, setNote] = useState('')
  const [completeError, setCompleteError] = useState<string | null>(null)

  const run = useQuery({ queryKey: ['run', runId], queryFn: () => call('GET', '/api/runs/:id', { params: { id: runId } }) })
  const saved = (next: RunDetail) => {
    queryClient.setQueryData(['run', runId], next)
    void queryClient.invalidateQueries({ queryKey: ['today'] })
  }

  const toggle = useMutation({
    mutationFn: ({ itemId, done }: { itemId: string; done: boolean }) =>
      call(done ? 'PUT' : 'DELETE', '/api/runs/:id/items/:itemId', { params: { id: runId, itemId } }),
    onSuccess: saved,
    onError: (error) => toast.add({ title: 'Could not save', description: error.message, type: 'error' }),
  })

  const complete = useMutation({
    mutationFn: () =>
      call('PATCH', '/api/runs/:id', {
        params: { id: runId },
        body: { action: 'complete', cashCounted: counted.trim() === '' ? undefined : counted, note },
      }),
    onMutate: () => setCompleteError(null),
    onSuccess: (next) => {
      saved(next)
      toast.add({ title: 'Checklist completed', type: 'success' })
    },
    onError: (error) => setCompleteError(error.message),
  })

  const reopen = useMutation({
    mutationFn: () => call('PATCH', '/api/runs/:id', { params: { id: runId }, body: { action: 'reopen' } }),
    onSuccess: saved,
    onError: (error) => toast.add({ title: 'Could not reopen', description: error.message, type: 'error' }),
  })

  if (run.isPending) {
    return (
      <PageLayout title="Checklist" loading>
        <LoadingRows rows={5} />
      </PageLayout>
    )
  }
  if (run.error) {
    return (
      <PageLayout title="Checklist" onBack={() => router.history.back()}>
        <ErrorBanner error={run.error} onRetry={() => run.refetch()} />
      </PageLayout>
    )
  }

  const data = run.data
  const open = data.status === 'open'
  const locationName = locations.data?.find((location) => location.id === data.locationId)?.name ?? ''

  return (
    <PageLayout
      title={data.title}
      description={[KIND_LABEL[data.kind], locationName, formatDate(data.date)].filter(Boolean).join(' · ')}
      badge={<RunBadge run={data} itemCount={data.total} />}
      onBack={() => router.history.back()}
      actions={
        !open && manager ? (
          <Button
            variant="outline"
            size="sm"
            disabled={reopen.isPending}
            onClick={async () => {
              const yes = await confirm({ type: 'question', title: 'Reopen this checklist?', message: 'Staff can then change it and complete it again.' })
              if (yes) reopen.mutate()
            }}
          >
            Reopen
          </Button>
        ) : null
      }
    >
      <div className="flex max-w-2xl flex-col gap-8">
        <section className="flex flex-col gap-4">
          <FormSection title="Items" description={open ? 'Tick each item as it is done.' : undefined} />
          <ul className="flex flex-col divide-y divide-oc-border rounded-xl border border-oc-border">
            {data.items.map((item) => (
              <li key={item.id} className="flex flex-col gap-2 p-4">
                <label className="flex items-start gap-3">
                  <Checkbox
                    className="mt-0.5"
                    checked={item.done}
                    disabled={!open || toggle.isPending}
                    onCheckedChange={(checked) => toggle.mutate({ itemId: item.id, done: checked === true })}
                  />
                  <span className="flex flex-col gap-0.5">
                    <span className={item.done ? 'text-sm text-oc-muted-foreground line-through' : 'text-sm text-oc-foreground'}>
                      {item.label}
                      {item.requiresPhoto ? <span className="ml-1 text-xs text-oc-muted-foreground">(photo required)</span> : null}
                    </span>
                    {item.done && item.doneByName ? (
                      <span className="text-xs text-oc-muted-foreground">
                        {item.doneByName}
                        {item.doneAt ? ` · ${formatTime(item.doneAt)}` : ''}
                      </span>
                    ) : null}
                  </span>
                </label>
                {item.requiresPhoto ? (
                  <div className="pl-7">
                    <ItemPhotos runId={data.id} itemId={item.id} editable={open} />
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </section>

        {open ? (
          <div className="flex flex-col gap-8">
            {data.cashCount ? (
              <section className="flex flex-col gap-4">
                <FormSection title="Cash count" description="Compared with the day's cash sales in HitPay." />
                <CashCount locationId={data.locationId} date={data.date} counted={counted} onCountedChange={setCounted} />
              </section>
            ) : null}
            <Field>
              <FieldLabel htmlFor="note">Note (optional)</FieldLabel>
              <Textarea id="note" maxLength={500} value={note} onChange={(event) => setNote(event.target.value)} />
            </Field>
            {completeError ? (
              <Banner variant="destructive">
                <BannerDescription>{completeError}</BannerDescription>
              </Banner>
            ) : null}
            <div>
              <Button disabled={complete.isPending} onClick={() => complete.mutate()}>
                {complete.isPending ? 'Completing…' : `Complete (${data.done}/${data.total})`}
              </Button>
            </div>
          </div>
        ) : (
          <DetailCard
            title="Completed"
            columns={2}
            items={[
              { key: 'by', label: 'By', value: data.completedByName ?? '—' },
              { key: 'at', label: 'At', value: data.completedAt ? formatTime(data.completedAt) : '—' },
              ...(data.cashCount
                ? [
                    { key: 'counted', label: 'Cash counted', value: data.cashCounted === null ? '—' : formatMoney(data.cashCounted, data.currency) },
                    {
                      key: 'expected',
                      label: 'Cash sales in HitPay',
                      value: data.cashExpected === null ? 'Not available' : formatMoney(data.cashExpected, data.currency),
                    },
                    ...(data.cashCounted !== null && data.cashExpected !== null
                      ? [{ key: 'diff', label: 'Difference', value: formatMoney(data.cashCounted - data.cashExpected, data.currency) }]
                      : []),
                  ]
                : []),
              ...(data.note ? [{ key: 'note', label: 'Note', value: data.note, colSpan: 2 }] : []),
            ]}
          />
        )}
      </div>
    </PageLayout>
  )
}
