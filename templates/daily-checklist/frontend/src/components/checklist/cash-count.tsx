import { useQuery } from '@tanstack/react-query'

import { MetricCard } from '@/components/displaying-data/metric-card'
import { WaitingForAccess } from '@/components/checklist/states'
import { call } from '@/lib/api'
import { formatMoney } from '@/lib/checklists'
import { Field, FieldDescription, FieldLabel } from '@ui/field'
import { Input } from '@ui/input'

/** The day's cash sales from HitPay next to the cash counted in the drawer, and the difference. */
export function CashCount({
  locationId,
  date,
  counted,
  onCountedChange,
}: {
  locationId: string
  date: string
  counted: string
  onCountedChange: (value: string) => void
}) {
  const sales = useQuery({
    queryKey: ['cash-sales', locationId, date],
    queryFn: () => call('GET', '/api/cash-sales', { query: { locationId, date } }),
  })
  const countedAmount = counted.trim() === '' ? null : Number(counted)
  const ready = sales.data?.status === 'ready' ? sales.data : null

  return (
    <div className="flex flex-col gap-4">
      <Field className="max-w-xs">
        <FieldLabel htmlFor="cash-counted">Cash counted</FieldLabel>
        <Input
          id="cash-counted"
          inputMode="decimal"
          placeholder="0.00"
          value={counted}
          aria-invalid={countedAmount !== null && (!Number.isFinite(countedAmount) || countedAmount < 0)}
          onChange={(event) => onCountedChange(event.target.value)}
        />
        <FieldDescription>Count the cash in the drawer before completing.</FieldDescription>
      </Field>

      {sales.error ? (
        <p className="text-sm text-oc-destructive">{sales.error.message}</p>
      ) : sales.data?.status === 'waiting' ? (
        <WaitingForAccess integration="HitPay" purpose="It shows today's cash sales here, to compare with the counted cash." />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          <MetricCard
            loading={sales.isPending}
            title="Cash sales in HitPay"
            tooltip={ready?.partial ? 'More than 99 cash payments today: this total covers the first 99.' : 'Successful cash payments at this location today.'}
            info
            content={ready ? formatMoney(ready.total, ready.currency) : '—'}
            footer={ready ? `${ready.count} payments` : undefined}
          />
          <MetricCard
            loading={sales.isPending}
            title="Difference"
            iconColor={ready && countedAmount !== null && countedAmount - ready.total !== 0 ? 'red' : 'grey'}
            content={ready && countedAmount !== null && Number.isFinite(countedAmount) ? formatMoney(countedAmount - ready.total, ready.currency) : '—'}
            footer="Counted minus HitPay"
          />
        </div>
      )}
    </div>
  )
}
