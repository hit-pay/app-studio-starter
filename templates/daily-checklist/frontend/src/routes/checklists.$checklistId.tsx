import { AddRegular, ArrowDownRegular, ArrowUpRegular, DeleteRegular } from '@mingcute/react/core-regular'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import type { Checklist, ChecklistKind } from 'backend'
import { useEffect, useState } from 'react'

import { LocationSelect } from '@/components/checklist/location-select'
import { ErrorBanner, LoadingRows } from '@/components/checklist/states'
import { Select } from '@/components/form/select'
import { FormLayout } from '@/components/layout/form-layout'
import { PageLayout } from '@/components/layout/page-layout'
import { useConfirmationModal } from '@/components/overlays/confirmation-modal'
import { call } from '@/lib/api'
import { KIND_LABEL } from '@/lib/checklists'
import { useLocations } from '@/lib/locations'
import { Banner, BannerDescription } from '@ui/banner'
import { Button } from '@ui/button'
import { Checkbox } from '@ui/checkbox'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@ui/field'
import { FormSection } from '@ui/form-section'
import { Input } from '@ui/input'
import { toast } from '@ui/toast'

export const Route = createFileRoute('/checklists/$checklistId')({ component: ChecklistEditor })

type DraftItem = { key: string; id: string | null; label: string; requiresPhoto: boolean }
type Draft = { title: string; kind: ChecklistKind; locationId: string | null; cashCount: boolean; items: DraftItem[] }

const KIND_OPTIONS = (Object.keys(KIND_LABEL) as ChecklistKind[]).map((kind) => ({ value: kind, label: KIND_LABEL[kind] }))
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

  const close = () => navigate({ to: '/checklists' })
  const changed = () => {
    void queryClient.invalidateQueries({ queryKey: ['checklists'] })
    void queryClient.invalidateQueries({ queryKey: ['today'] })
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
      changed()
      toast.add({ title: creating ? 'Checklist created' : 'Checklist saved', type: 'success' })
      void close()
    },
    onError: (failure) => setError(failure.message),
  })

  const archive = useMutation({
    mutationFn: () => call('DELETE', '/api/checklists/:id', { params: { id: checklistId } }),
    onSuccess: () => {
      changed()
      toast.add({ title: 'Checklist archived', type: 'success' })
      void close()
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

  if (!creating && (existing.isPending || existing.error)) {
    return (
      <PageLayout title="Checklist" loading={existing.isPending} onBack={close}>
        {existing.error ? <ErrorBanner error={existing.error} onRetry={() => existing.refetch()} /> : <LoadingRows rows={4} />}
      </PageLayout>
    )
  }

  return (
    <FormLayout
      title={creating ? 'New checklist' : draft.title || 'Checklist'}
      description="Staff tick these items off at each location, every day."
      onClose={close}
      actions={{
        cancel: { label: 'Cancel', onClick: close },
        save: { label: creating ? 'Create checklist' : 'Save', loading: save.isPending, onClick: () => save.mutate() },
      }}
    >
      <div className="flex flex-col gap-8">
        {error ? (
          <Banner variant="destructive">
            <BannerDescription>{error}</BannerDescription>
          </Banner>
        ) : null}

        <section className="flex flex-col gap-4">
          <FormSection title="Details" description="What the checklist is called, when it is done and where." />
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input id="title" maxLength={80} value={draft.title} placeholder="Opening" onChange={(event) => update({ title: event.target.value })} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel>Type</FieldLabel>
                <Select
                  options={KIND_OPTIONS}
                  value={draft.kind}
                  onValueChange={(kind) => typeof kind === 'string' && update({ kind: kind as ChecklistKind })}
                />
              </Field>
              <Field>
                <FieldLabel>Location</FieldLabel>
                <LocationSelect
                  className="w-full"
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
                <div className="flex flex-col gap-0.5">
                  <FieldLabel htmlFor="cash-count">Count the cash</FieldLabel>
                  <FieldDescription>Staff enter the cash in the drawer, compared with the day's HitPay cash sales.</FieldDescription>
                </div>
              </Field>
            ) : null}
          </FieldGroup>
        </section>

        <section className="flex flex-col gap-4">
          <FormSection title="Items" description="In the order staff do them. Items marked Photo need a photo before the checklist can be completed." />
          <div className="flex flex-col gap-2">
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
                <Button type="button" variant="ghost" size="icon-sm" aria-label="Move up" disabled={index === 0} onClick={() => moveItem(index, -1)}>
                  <ArrowUpRegular />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Move down"
                  disabled={index === draft.items.length - 1}
                  onClick={() => moveItem(index, 1)}
                >
                  <ArrowDownRegular />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Remove item"
                  disabled={draft.items.length === 1}
                  onClick={() => update({ items: draft.items.filter((other) => other.key !== item.key) })}
                >
                  <DeleteRegular />
                </Button>
              </div>
            ))}
            <div>
              <Button type="button" variant="outline" size="sm" onClick={() => update({ items: [...draft.items, newItem()] })}>
                <AddRegular data-icon="inline-start" />
                Add item
              </Button>
            </div>
          </div>
        </section>

        {creating ? null : (
          <section className="flex flex-col gap-4">
            <FormSection title="Archive" description="Stops it appearing for new days. Past checklists keep their history." />
            <div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={archive.isPending}
                onClick={async () => {
                  const yes = await confirm({ type: 'delete', title: 'Archive this checklist?', message: 'It stops appearing for new days.', confirmLabel: 'Archive' })
                  if (yes) archive.mutate()
                }}
              >
                Archive checklist
              </Button>
            </div>
          </section>
        )}
      </div>
    </FormLayout>
  )
}
