'use client'

import { HitPayNamedSelect } from '@/components/form/hitpay-named-select'
import { loadTaxesForSelect } from '#/lib/hitpay-commerce-selects'

type TaxRow = { id: string; name?: string | null }

type TaxSelectProps = {
  name: string
  label?: string | false
  description?: string
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  multiple?: boolean
  value?: string | string[] | null
  defaultValue?: string | string[] | null
  onValueChange?: (value: string | string[] | null, selected: TaxRow | TaxRow[] | null) => void
  load?: () => Promise<{ items: TaxRow[] }>
}

function taxLabel(row: TaxRow) {
  return row.name?.trim() || row.id
}

function defaultLoad() {
  return loadTaxesForSelect()
}

function TaxSelect({
  label = 'Tax',
  placeholder = 'Select tax',
  load = defaultLoad,
  ...props
}: TaxSelectProps) {
  return (
    <HitPayNamedSelect
      {...props}
      label={label}
      placeholder={placeholder}
      empty="No taxes."
      getLabel={taxLabel}
      load={load}
    />
  )
}

export { TaxSelect }
export type { TaxRow, TaxSelectProps }
