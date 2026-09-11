'use client'

import { HitPayNamedSelect } from '@/components/form/hitpay-named-select'
import { loadProductCategoriesForSelect } from '#/lib/hitpay-commerce-selects'

type ProductCategoryRow = { id: string; name?: string | null }

type ProductCategorySelectProps = {
  name: string
  label?: string | false
  description?: string
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  multiple?: boolean
  value?: string | string[] | null
  defaultValue?: string | string[] | null
  onValueChange?: (
    value: string | string[] | null,
    selected: ProductCategoryRow | ProductCategoryRow[] | null,
  ) => void
  load?: () => Promise<{ items: ProductCategoryRow[] }>
}

function categoryLabel(row: ProductCategoryRow) {
  return row.name?.trim() || row.id
}

function defaultLoad() {
  return loadProductCategoriesForSelect()
}

function ProductCategorySelect({
  label = 'Category',
  placeholder = 'Select category',
  load = defaultLoad,
  ...props
}: ProductCategorySelectProps) {
  return (
    <HitPayNamedSelect
      {...props}
      label={label}
      placeholder={placeholder}
      empty="No categories."
      getLabel={categoryLabel}
      load={load}
    />
  )
}

export { ProductCategorySelect }
export type { ProductCategoryRow, ProductCategorySelectProps }
