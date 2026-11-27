import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import type { SwapRequest, SwapStatus } from 'backend'

import { ErrorBanner, LoadingRows } from '@/components/shift/states'
import { DataTable, useDataTable } from '@/components/displaying-data/data-table'
import { PageLayout } from '@/components/layout/page-layout'
import { call } from '@/lib/api'
import { useCurrentUser } from '@/lib/current-user'
import { useLocations } from '@/lib/locations'
import { formatDay, formatRange, useIsManager } from '@/lib/shifts'
import { Badge, type BadgeTone } from '@ui/badge'
import { Button } from '@ui/button'
import { toast } from '@ui/toast'

export const Route = createFileRoute('/swaps')({ component: Swaps })

const STATUS: Record<SwapStatus, { label: string; tone: BadgeTone }> = {
  pending: { label: 'Waiting', tone: 'orange' },
  approved: { label: 'Approved', tone: 'green' },
  rejected: { label: 'Rejected', tone: 'red' },
  cancelled: { label: 'Cancelled', tone: 'grey' },
}

function Swaps() {
  const manager = useIsManager()
  const me = useCurrentUser()
  const queryClient = useQueryClient()
  const locations = useLocations()
  const swaps = useQuery({ queryKey: ['swaps'], queryFn: () => call('GET', '/api/swaps') })

  const decide = useMutation({
    mutationFn: ({ id, action }: { id: string; action: 'approve' | 'reject' | 'cancel' }) => call('PATCH', '/api/swaps/:id', { params: { id }, body: { action } }),
    onSuccess: (swap) => {
      void queryClient.invalidateQueries({ queryKey: ['swaps'] })
      void queryClient.invalidateQueries({ queryKey: ['shifts'] })
      toast.add({ title: `Swap ${STATUS[swap.status].label.toLowerCase()}`, type: 'success' })
    },
    onError: (error) => toast.add({ title: 'Could not update the swap', description: error.message, type: 'error' }),
  })

  const locationName = (id: string) => locations.data?.find((location) => location.id === id)?.name ?? ''
  const table = useDataTable({
    schema: {
      key: 'swaps',
      mode: 'client',
      search: { placeholder: 'Search by name' },
      tabs: [
        { key: 'pending', title: 'Waiting', value: 'pending' },
        { key: 'approved', title: 'Approved', value: 'approved' },
        { key: 'rejected', title: 'Rejected', value: 'rejected' },
        { key: 'all', title: 'All', value: null },
      ],
      tabKey: 'status',
      pagination: { pageSize: 20 },
      emptyState: {
        title: 'No swap requests',
        description: manager ? 'Requests staff make from the schedule show here.' : 'Click one of your upcoming shifts on the schedule to ask a colleague to take it.',
        media: 'icon',
      },
      columns: [
        { key: 'shift', title: 'Shift', locked: true, search: false },
        { key: 'location', title: 'Location', search: false },
        { key: 'from', title: 'From' },
        { key: 'to', title: 'To' },
        { key: 'reason', title: 'Reason', search: false },
        { key: 'status', title: 'Status', search: false },
        { key: 'actions', title: '', type: 'empty', search: false },
      ],
    },
    data: (swaps.data ?? []).map((swap) => ({
      id: swap.id,
      shift: swap.shift ? `${formatDay(new Date(swap.shift.startsAt))}, ${formatRange(swap.shift.startsAt, swap.shift.endsAt)}` : 'Removed shift',
      location: swap.shift ? locationName(swap.shift.locationId) : '',
      from: swap.fromStaffName,
      to: swap.toStaffName,
      reason: swap.reason ?? '',
      status: swap.status,
      actions: swap,
    })),
  })

  return (
    <PageLayout title="Swaps" description={manager ? 'Approve or reject shift swaps between staff.' : 'Your shift swap requests.'}>
      {swaps.isPending ? (
        <LoadingRows />
      ) : swaps.error ? (
        <ErrorBanner error={swaps.error} onRetry={() => swaps.refetch()} />
      ) : (
        <DataTable
          table={table}
          cells={{
            status: (value) => <Badge tone={STATUS[value as SwapStatus].tone}>{STATUS[value as SwapStatus].label}</Badge>,
            actions: (value) => {
              const swap = value as SwapRequest
              if (swap.status !== 'pending') return null
              const busy = decide.isPending
              if (manager) {
                return (
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="outline" disabled={busy} onClick={() => decide.mutate({ id: swap.id, action: 'reject' })}>
                      Reject
                    </Button>
                    <Button size="sm" disabled={busy} onClick={() => decide.mutate({ id: swap.id, action: 'approve' })}>
                      Approve
                    </Button>
                  </div>
                )
              }
              return swap.fromStaffId === me.data?.id ? (
                <div className="flex justify-end">
                  <Button size="sm" variant="outline" disabled={busy} onClick={() => decide.mutate({ id: swap.id, action: 'cancel' })}>
                    Cancel
                  </Button>
                </div>
              ) : null
            },
          }}
        />
      )}
    </PageLayout>
  )
}
