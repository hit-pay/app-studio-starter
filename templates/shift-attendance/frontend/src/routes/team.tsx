import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import type { TeamMember } from 'backend'
import { useEffect, useState } from 'react'

import { ErrorBanner, LoadingRows } from '@/components/shift/states'
import { DataTable, useDataTable } from '@/components/displaying-data/data-table'
import { FormLayout } from '@/components/layout/form-layout'
import { PageLayout } from '@/components/layout/page-layout'
import { call } from '@/lib/api'
import { useLocations } from '@/lib/locations'
import { Banner, BannerDescription } from '@ui/banner'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@ui/field'
import { Input } from '@ui/input'
import { toast } from '@ui/toast'

export const Route = createFileRoute('/team')({ component: Team })

function Team() {
  const queryClient = useQueryClient()
  const locations = useLocations()
  const team = useQuery({ queryKey: ['team'], queryFn: () => call('GET', '/api/team') })
  const [editing, setEditing] = useState<TeamMember | null>(null)
  const [rate, setRate] = useState('')
  const [commission, setCommission] = useState('')
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    setRate(editing ? String(editing.hourlyRate) : '')
    setCommission(editing ? String(editing.commissionPercent) : '')
    setError(null)
  }, [editing])

  const save = useMutation({
    mutationFn: () => call('PUT', '/api/team/:staffId', { params: { staffId: editing!.staffId }, body: { hourlyRate: rate, commissionPercent: commission } }),
    onMutate: () => setError(null),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['team'] })
      void queryClient.invalidateQueries({ queryKey: ['timesheet'] })
      toast.add({ title: 'Pay saved', type: 'success' })
      setEditing(null)
    },
    onError: (failure) => setError(failure.message),
  })

  const locationNames = (ids: string[]) =>
    ids.map((id) => locations.data?.find((location) => location.id === id)?.name).filter(Boolean).join(', ') || 'Every location'
  const table = useDataTable({
    schema: {
      key: 'team',
      mode: 'client',
      search: { placeholder: 'Search staff' },
      rowActions: ['edit'],
      pagination: { pageSize: 50 },
      emptyState: { title: 'No staff yet', description: 'Give staff access to this app in App Studio.', media: 'icon' },
      columns: [
        { key: 'name', title: 'Staff', locked: true },
        { key: 'role', title: 'Role' },
        { key: 'locations', title: 'Locations' },
        { key: 'rate', title: 'Hourly rate', search: false },
        { key: 'commission', title: 'Commission', search: false },
      ],
    },
    data: (team.data ?? []).map((member) => ({
      id: member.staffId,
      name: member.name,
      role: member.role ?? '',
      locations: locationNames(member.locationIds),
      rate: member.hourlyRate ? member.hourlyRate.toFixed(2) : 'Not set',
      commission: member.commissionPercent ? `${member.commissionPercent}%` : '—',
    })),
  })
  const open = (id: string) => setEditing(team.data?.find((member) => member.staffId === id) ?? null)

  return (
    <PageLayout title="Team" description="Each staff member's pay, for the timesheet.">
      {team.isPending ? (
        <LoadingRows />
      ) : team.error ? (
        <ErrorBanner error={team.error} onRetry={() => team.refetch()} />
      ) : (
        <DataTable table={table} onRowClick={(row) => open(row.id)} onRowAction={(_, row) => open(row.id)} />
      )}

      <FormLayout
        mode="modal"
        open={editing !== null}
        onOpenChange={(value) => !value && setEditing(null)}
        title={editing ? `Pay for ${editing.name}` : 'Pay'}
        actions={{ cancel: { label: 'Cancel', onClick: () => setEditing(null) }, save: { label: 'Save', loading: save.isPending, onClick: () => save.mutate() } }}
      >
        <FieldGroup>
          {error ? (
            <Banner variant="destructive">
              <BannerDescription>{error}</BannerDescription>
            </Banner>
          ) : null}
          <Field>
            <FieldLabel htmlFor="hourly-rate">Hourly rate</FieldLabel>
            <Input id="hourly-rate" inputMode="decimal" value={rate} onChange={(event) => setRate(event.target.value)} />
            <FieldDescription>Worked hours times this rate is their pay on the timesheet.</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="commission">Commission (%)</FieldLabel>
            <Input id="commission" inputMode="decimal" value={commission} onChange={(event) => setCommission(event.target.value)} />
            <FieldDescription>Of the HitPay sales they take.</FieldDescription>
          </Field>
        </FieldGroup>
      </FormLayout>
    </PageLayout>
  )
}
