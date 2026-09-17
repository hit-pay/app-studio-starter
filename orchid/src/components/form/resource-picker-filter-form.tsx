'use client'

import * as React from 'react'
import { startOfDay } from 'date-fns'

import { HitPayNamedSelect } from '@/components/form/hitpay-named-select'
import {
  SchemaForm,
  useSchemaForm,
  type SchemaFormField,
  type SchemaFormInstance,
  type SchemaFormRenderField,
  type SchemaFormValues,
} from '@/components/form/form-builder'
import { flattenFields, formValuesFromFields } from '@/components/form/form-builder-model'
import {
  loadLocationsForSelect,
  loadProductCategoriesForSelect,
} from '#/lib/hitpay-commerce-selects'
import { DatePickerRange } from '@/components/form/date-picker'
import { Button } from '@ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@ui/popover'
import { FilterRegular } from '@mingcute/react/core-regular'

export type ResourcePickerFilterType = 'product' | 'order' | 'charge' | 'invoice'

type FilterOption = { value: string; label: string }
type ExtraFilter = { key: string; label: string; options: FilterOption[] }

const DATE_FILTER_TYPES = new Set<ResourcePickerFilterType>(['order', 'charge'])

const RESOURCE_PICKER_LOAD_PROP = 'resourcePickerLoad' as const

function categoryIdsFromExtras(extras: Record<string, string>) {
  if (extras.category_ids) {
    return extras.category_ids
      .split(',')
      .map((id) => id.trim())
      .filter(Boolean)
  }
  if (extras.category_id && extras.category_id !== 'all') {
    return [extras.category_id]
  }
  return []
}

export function buildResourcePickerFilterFields(
  type: ResourcePickerFilterType,
  statusOptions: FilterOption[],
  extraFilters: ExtraFilter[],
): SchemaFormField[] {
  const fields: SchemaFormField[] = []

  if (type === 'product') {
    fields.push({
      key: 'category_ids',
      title: 'Category',
      type: 'input',
      placeholder: 'Category',
      props: { [RESOURCE_PICKER_LOAD_PROP]: 'product-categories' },
      value: [],
    })
  }

  for (const group of extraFilters) {
    fields.push({
      key: group.key,
      title: group.label,
      type: 'select',
      placeholder: group.label,
      options: group.options,
      value: 'all',
    })
  }

  if (type === 'product' || type === 'charge') {
    fields.push({
      key: 'location_id',
      title: type === 'product' ? 'Source' : 'Location',
      type: 'input',
      placeholder: type === 'product' ? 'Source' : 'Location',
      props: { [RESOURCE_PICKER_LOAD_PROP]: 'locations' },
      value: '',
    })
  }

  if (statusOptions.length > 1) {
    fields.push({
      key: 'status',
      title: 'Status',
      type: 'select',
      placeholder: 'Status',
      options: statusOptions,
      value: 'all',
    })
  }

  if (DATE_FILTER_TYPES.has(type)) {
    fields.push({
      key: 'date_range',
      title: 'Date range',
      type: 'input',
      placeholder: 'Date range',
      props: { [RESOURCE_PICKER_LOAD_PROP]: 'date-range' },
      value: { date_from: '', date_to: '' },
    })
  }

  return fields
}

export function resourcePickerFilterValuesFromState(
  status: string,
  extras: Record<string, string>,
  fields: SchemaFormField[],
): SchemaFormValues {
  const values = formValuesFromFields(fields)
  if (fields.some((field) => field.key === 'status')) {
    values.status = status
  }
  const categoryIds = categoryIdsFromExtras(extras)
  if (fields.some((field) => field.key === 'category_ids')) {
    values.category_ids = categoryIds
  }
  if (fields.some((field) => field.key === 'location_id')) {
    values.location_id = extras.location_id ?? ''
  }
  for (const field of fields) {
    if (field.type !== 'select' || field.key === 'status') continue
    values[field.key] = extras[field.key] ?? 'all'
  }
  if (fields.some((field) => field.key === 'date_range')) {
    values.date_range = {
      date_from: extras.date_from ?? '',
      date_to: extras.date_to ?? '',
    }
  }
  return values
}

export function resourcePickerFilterStateFromValues(
  values: SchemaFormValues,
  extraFilterKeys: string[],
): { status: string; extras: Record<string, string> } {
  const extras: Record<string, string> = {}
  const status =
    values.status == null || values.status === '' ? 'all' : String(values.status)

  const categoryIds = values.category_ids
  if (Array.isArray(categoryIds) && categoryIds.length) {
    extras.category_ids = categoryIds.map(String).join(',')
  }

  const locationId = values.location_id
  if (typeof locationId === 'string' && locationId) extras.location_id = locationId

  for (const key of extraFilterKeys) {
    const raw = values[key]
    const v = raw == null || raw === '' ? 'all' : String(raw)
    if (v !== 'all') extras[key] = v
  }

  const range = values.date_range
  if (range != null && typeof range === 'object' && !Array.isArray(range)) {
    const record = range as Record<string, string>
    if (record.date_from) extras.date_from = record.date_from
    if (record.date_to) extras.date_to = record.date_to
  }

  return { status, extras }
}

export function syncResourcePickerFilterForm(
  form: SchemaFormInstance,
  fields: SchemaFormField[],
  status: string,
  extras: Record<string, string>,
) {
  const values = resourcePickerFilterValuesFromState(status, extras, fields)
  for (const field of flattenFields(fields)) {
    form.setFieldValue(field.path, values[field.key])
  }
}

function parseDateValue(value: string) {
  if (!value) return undefined
  const [year, month, day] = value.split('-').map(Number)
  if (!year || !month || !day) return undefined
  return new Date(year, month - 1, day)
}

function toLocalYmd(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function resourcePickerFilterRenderField(ctx: SchemaFormRenderField) {
  const loadKind = ctx.field.props?.[RESOURCE_PICKER_LOAD_PROP]
  if (loadKind === 'product-categories') {
    const ids = Array.isArray(ctx.value)
      ? ctx.value.map(String)
      : typeof ctx.value === 'string' && ctx.value
        ? [ctx.value]
        : []
    return (
      <HitPayNamedSelect
        name={`rp_filter_${ctx.field.path}`}
        label={false}
        multiple
        clearable
        placeholder={ctx.placeholder ?? ctx.field.title}
        empty="No categories."
        getLabel={(row) => row.name?.trim() || row.id}
        load={() =>
          loadProductCategoriesForSelect().then((result) => ({ items: result.items }))
        }
        value={ids.length ? ids : null}
        onValueChange={(value) => {
          ctx.onChange(Array.isArray(value) ? value : [])
        }}
      />
    )
  }
  if (loadKind === 'locations') {
    const id = typeof ctx.value === 'string' && ctx.value ? ctx.value : null
    return (
      <HitPayNamedSelect
        name={`rp_filter_${ctx.field.path}`}
        label={false}
        clearable
        placeholder={ctx.placeholder ?? ctx.field.title}
        empty="No locations."
        getLabel={(row) => row.name?.trim() || row.id}
        load={() => loadLocationsForSelect().then((result) => ({ items: result.items }))}
        value={id}
        onValueChange={(value) => {
          ctx.onChange(typeof value === 'string' && value ? value : '')
        }}
      />
    )
  }
  if (loadKind === 'date-range') {
    const record =
      ctx.value != null && typeof ctx.value === 'object' && !Array.isArray(ctx.value)
        ? (ctx.value as { date_from?: string; date_to?: string })
        : { date_from: '', date_to: '' }
    const from = record.date_from ?? ''
    const to = record.date_to ?? ''
    return (
      <DatePickerRange
        className="w-full min-w-0"
        placeholder={ctx.placeholder ?? 'Date range'}
        selected={{
          from: parseDateValue(from),
          to: parseDateValue(to),
        }}
        disabled={{ after: startOfDay(new Date()) }}
        endMonth={new Date()}
        onSelect={(next) => {
          if (!next?.from) {
            ctx.onChange({ date_from: '', date_to: '' })
            return
          }
          ctx.onChange({
            date_from: toLocalYmd(next.from),
            date_to: toLocalYmd(next.to ?? next.from),
          })
        }}
      />
    )
  }
  return undefined
}

type ResourcePickerFilterMenuProps = {
  type: ResourcePickerFilterType
  statusOptions: FilterOption[]
  extraFilters: ExtraFilter[]
  open: boolean
  onOpenChange: (open: boolean) => void
  appliedStatus: string
  appliedExtras: Record<string, string>
  filtersActive: boolean
  applyLabel: string
  loading: boolean
  onApply: (status: string, extras: Record<string, string>) => void
}

export function ResourcePickerFilterMenu({
  type,
  statusOptions,
  extraFilters,
  open,
  onOpenChange,
  appliedStatus,
  appliedExtras,
  filtersActive,
  applyLabel,
  loading,
  onApply,
}: ResourcePickerFilterMenuProps) {
  const fields = React.useMemo(
    () => buildResourcePickerFilterFields(type, statusOptions, extraFilters),
    [type, statusOptions, extraFilters],
  )
  const extraKeys = React.useMemo(() => extraFilters.map((group) => group.key), [extraFilters])
  const builder = useSchemaForm({ fields })

  React.useEffect(() => {
    if (!open) return
    syncResourcePickerFilterForm(builder.form, fields, appliedStatus, appliedExtras)
  }, [open, appliedStatus, appliedExtras, fields, builder.form])

  const draft = resourcePickerFilterStateFromValues(builder.values, extraKeys)
  const filtersDirty =
    draft.status !== appliedStatus || !extrasMatch(draft.extras, appliedExtras)

  if (fields.length === 0) return null

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next)
      }}
    >
      <PopoverTrigger
        nativeButton
        render={
          <Button
            variant="outline"
            size="sm"
            iconOnly
            aria-label="Filter"
            aria-pressed={filtersActive || open}
            className={
              filtersActive || open ? 'border-oc-primary text-oc-primary' : undefined
            }
          >
            <FilterRegular />
          </Button>
        }
      />
      <PopoverContent align="end" className="w-72 gap-3 p-4">
        <SchemaForm
          form={builder}
          className="max-w-none gap-3"
          renderField={(ctx) => resourcePickerFilterRenderField(ctx) ?? undefined}
        />
        <div className="flex gap-2 pt-1">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="flex-1"
            onClick={() => {
              const next = resourcePickerFilterStateFromValues(builder.values, extraKeys)
              onApply(next.status, next.extras)
            }}
          >
            {loading ? 'Loading…' : filtersDirty ? 'Show results' : applyLabel}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function extrasMatch(a: Record<string, string>, b: Record<string, string>) {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)])
  for (const key of keys) {
    if ((a[key] ?? '') !== (b[key] ?? '')) return false
  }
  return true
}
