import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import type { Checklist, ChecklistKind } from 'backend'
import { useEffect, useState } from 'react'

import { LocationSelect } from '@/components/checklist/location-select'
import { ErrorState, LoadingRows } from '@/components/checklist/states'
import { PageLayout } from '@/components/layout/page-layout'
import { useConfirmationModal } from '@/components/overlays/confirmation-modal'
import { call } from '@/lib/api'
import { KIND_LABEL } from '@/lib/checklists'
import { useLocations } from '@/lib/locations'
import { Button } from '@ui/button'
import { Checkbox } from '@ui/checkbox'
import { Field, FieldDescription, FieldError, FieldLabel } from '@ui/field'
import { Input, inputSurface } from '@ui/input'
import { toast } from '@ui/toast'

export const Route = createFileRoute('/checklists/$checklistId')({ component: ChecklistEditor })

type DraftItem = { key: string; id: string | null; label: string; requiresPhoto: boolean }
type Draft = { title: string; kind: ChecklistKind; locationId: string | null; cashCount: boolean; items: DraftItem[] }

const BLANK: Draft = { title: '', kind: 'opening', locationId: null, cashCount: false, items: [newItem()] }

function newItem(label = ''): DraftItem {
  return { key: crypto.randomUUID(), id: null, label, requiresPhoto: false }
}

function toDraft(checklist: Checklist): Draft {
  return {
    title: checklist.title,
    kind: checklist.kind,
    locationId: checklist.locationId,
    cashCount: checklist.cashCount,
    items: checklist.items.map((item) => ({ key: item.id, id: item.id, label: item.label, requiresPhoto: item.requiresPhoto })),
  }
}

function ChecklistEditor() {
  const { checklistId } = Route.useParams()
  const creating = checklistId === 'new'
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const confirm = useConfirmationModal()
  const locations = useLocations()
  const [draft, setDraft] = useState<Draft>(BLANK)
  const [error, setError] = useState<string | null>(null)

  const existing = useQuery({
    queryKey: ['checklist', checklistId],
    enabled: !creating,
    queryFn: () => call('GET', '/api/checklists/:id', { params: { id: checklistId } }),
  })
  useEffect(() => {
    if (existing.data) setDraft(toDraft(existing.data))
  }, [existing.data])

  const done = () => {
    void queryClient.invalidateQueries({ queryKey: ['checklists'] })
    void queryClient.invalidateQueries({ queryKey: ['today'] })
    void navigate({ to: '/checklists' })
  }

  const save = useMutation({
    mutationFn: () => {
      const body = {
        ...draft,
        items: draft.items.filter((item) => item.label.trim() !== '').map(({ id, label, requiresPhoto }) => ({ id, label, requiresPhoto })),
      }
      return creating
        ? call('POST', '/api/checklists', { body })
        : call('PUT', '/api/checklists/:id', { params: { id: checklistId }, body })
    },
    onMutate: () => setError(null),
    onSuccess: (saved) => {
      queryClient.setQueryData(['checklist', saved.id], saved)
      toast.add({ title: creating ? 'Checklist created' : 'Checklist saved', type: 'success' })
      done()
    },
    onError: (failure) => setError(failure.message),
  })

  const archive = useMutation({
    mutationFn: () => call('DELETE', '/api/checklists/:id', { params: { id: checklistId } }),
    onSuccess: () => {
      toast.add({ title: 'Checklist archived', type: 'success' })
      done()
    },
    onError: (failure) => toast.add({ title: 'Could not archive', description: failure.message, type: 'error' }),
  })

  const update = (patch: Partial<Draft>) => setDraft((current) => ({ ...current, ...patch }))
  const updateItem = (key: string, patch: Partial<DraftItem>) =>
    setDraft((current) => ({ ...current, items: current.items.map((item) => (item.key === key ? { ...item, ...patch } : item)) }))
  const moveItem = (index: number, by: number) =>
    setDraft((current) => {
      const items = [...current.items]
      const [item] = items.splice(index, 1)
      items.splice(index + by, 0, item!)
      return { ...current, items }
    })

  if (!creating && existing.isPending) {
    return (
      <PageLayout title="Checklist" loading>
        <LoadingRows rows={4} />
      </PageLayout>
    )
  }
  if (!creating && existing.error) {
    return (
      <PageLayout title="Checklist" onBack={() => navigate({ to: '/checklists' })}>
        <ErrorState error={existing.error} onRetry={() => existing.refetch()} />
      </PageLayout>
    )
  }

  return (
    <PageLayout
      title={creating ? 'New checklist' : draft.title || 'Checklist'}
      onBack={() => navigate({ to: '/checklists' })}
      actions={
        creating ? null : (
          <Button
            variant="outline"
            size="sm"
            disabled={archive.isPending}
            onClick={async () => {
              const yes = await confirm({
                type: 'delete',
                title: 'Archive this checklist?',
                message: 'It stops appearing for new days. Past checklists keep their history.',
                confirmLabel: 'Archive',
              })
              if (yes) archive.mutate()
            }}
          >
            Archive
          </Button>
        )
      }
    >
      <form
        className="flex max-w-2xl flex-col gap-5"
        onSubmit={(event) => {
          event.preventDefault()
          save.mutate()
        }}
      >
        <Field>
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <Input id="title" maxLength={80} value={draft.title} placeholder="Opening" onChange={(event) => update({ title: event.target.value })} />
        </Field>

        <div className="flex flex-wrap gap-4">
          <Field className="w-auto">
            <FieldLabel htmlFor="kind">Type</FieldLabel>
            <select
              id="kind"
              className={`${inputSurface} w-auto min-w-40`}
              value={draft.kind}
              onChange={(event) => update({ kind: event.target.value as ChecklistKind })}
            >
              {(Object.keys(KIND_LABEL) as ChecklistKind[]).map((kind) => (
                <option key={kind} value={kind}>
                  {KIND_LABEL[kind]}
                </option>
              ))}
            </select>
          </Field>
          <Field className="w-auto">
            <FieldLabel>Location</FieldLabel>
            <LocationSelect
              locations={locations.data ?? []}
              value={draft.locationId}
              allLabel="Every location"
              onChange={(locationId) => update({ locationId })}
            />
          </Field>
        </div>

        {draft.kind === 'closing' ? (
          <Field orientation="horizontal">
            <Checkbox id="cash-count" checked={draft.cashCount} onCheckedChange={(checked) => update({ cashCount: checked === true })} />
            <FieldLabel htmlFor="cash-count">Count the cash and compare it with HitPay cash sales</FieldLabel>
          </Field>
        ) : null}

        <fieldset className="flex flex-col gap-3">
          <legend className="mb-2 text-sm font-medium">Items</legend>
          {draft.items.map((item, index) => (
            <div key={item.key} className="flex flex-wrap items-center gap-2">
              <Input
                aria-label={`Item ${index + 1}`}
                className="min-w-56 flex-1"
                maxLength={200}
                value={item.label}
                placeholder="Turn on the coffee machine"
                onChange={(event) => updateItem(item.key, { label: event.target.value })}
              />
              <label className="flex items-center gap-1.5 text-sm">
                <Checkbox checked={item.requiresPhoto} onCheckedChange={(checked) => updateItem(item.key, { requiresPhoto: checked === true })} />
                Photo
              </label>
              <Button type="button" variant="ghost" size="sm" aria-label="Move up" disabled={index === 0} onClick={() => moveItem(index, -1)}>
                ↑
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                aria-label="Move down"
                disabled={index === draft.items.length - 1}
                onClick={() => moveItem(index, 1)}
              >
                ↓
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                aria-label="Remove item"
                disabled={draft.items.length === 1}
                onClick={() => update({ items: draft.items.filter((other) => other.key !== item.key) })}
              >
                ×
              </Button>
            </div>
          ))}
          <div>
            <Button type="button" variant="outline" size="sm" onClick={() => update({ items: [...draft.items, newItem()] })}>
              Add item
            </Button>
          </div>
          <FieldDescription>Items marked Photo need a photo before the checklist can be completed.</FieldDescription>
        </fieldset>

        {error ? <FieldError>{error}</FieldError> : null}
        <div>
          <Button type="submit" disabled={save.isPending}>
            {save.isPending ? 'Saving…' : creating ? 'Create checklist' : 'Save'}
          </Button>
        </div>
      </form>
    </PageLayout>
  )
}
