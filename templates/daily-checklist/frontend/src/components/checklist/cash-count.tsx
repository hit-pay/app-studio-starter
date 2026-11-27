import { useQuery } from '@tanstack/react-query'

import { WaitingForAccess } from '@/components/checklist/states'
import { call } from '@/lib/api'
import { formatMoney } from '@/lib/checklists'
import { Field, FieldDescription, FieldLabel } from '@ui/field'
import { Input } from '@ui/input'
import { Skeleton } from '@ui/skeleton'

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

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-oc-border p-4">
      <Field>
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

      {sales.isPending ? (
        <Skeleton className="h-10 w-full" />
      ) : sales.error ? (
        <p className="text-sm text-oc-destructive">{sales.error.message}</p>
      ) : sales.data.status === 'waiting' ? (
        <WaitingForAccess integration="HitPay" purpose="It shows today's cash sales here, to compare with the counted cash." />
      ) : (
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-oc-muted-foreground">Cash sales in HitPay</p>
            <p className="text-base font-medium">
              {formatMoney(sales.data.total, sales.data.currency)}
              {sales.data.partial ? ' +' : ''}
            </p>
            <p className="text-xs text-oc-muted-foreground">
              {sales.data.count} payments{sales.data.partial ? ' (first 99 only)' : ''}
            </p>
          </div>
          {countedAmount !== null && Number.isFinite(countedAmount) ? (
            <div>
              <p className="text-oc-muted-foreground">Difference</p>
              <p className={countedAmount - sales.data.total === 0 ? 'text-base font-medium' : 'text-base font-medium text-oc-destructive'}>
                {formatMoney(countedAmount - sales.data.total, sales.data.currency)}
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
