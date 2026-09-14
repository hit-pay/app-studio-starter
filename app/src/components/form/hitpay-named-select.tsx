'use client'

import { useMemo } from 'react'
import { Select } from '@/components/form/select'
import { Field, FieldDescription, FieldLabel } from '@ui/field'
import { selectEntry, selectStore, useSelectOptions } from '@/lib/select-store'

type HitPayNamedRow = { id: string }

type HitPayNamedSelectLoad<T extends HitPayNamedRow> = (page: number) => Promise<{ items: T[]; hasMore?: boolean }>

type HitPayNamedSelectProps<T extends HitPayNamedRow> = {
  name: string
  label?: string | false
  description?: string
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  multiple?: boolean
  value?: string | string[] | null
  defaultValue?: string | string[] | null
  onValueChange?: (value: string | string[] | null, selected: T | T[] | null) => void
  empty: string
  getLabel: (row: T) => string
  load: HitPayNamedSelectLoad<T>
  clearable?: boolean
}

function pickRows<T extends HitPayNamedRow>(rows: T[], value: string | string[] | null) {
  if (value == null) return null
  if (Array.isArray(value)) return rows.filter((row) => value.includes(row.id))
  return rows.find((row) => row.id === value) ?? null
}

function HitPayNamedSelect<T extends HitPayNamedRow>({
  name,
  label,
  description,
  placeholder,
  disabled,
  invalid,
  multiple = false,
  value,
  defaultValue,
  onValueChange,
  empty,
  getLabel,
  load,
  clearable = false,
}: HitPayNamedSelectProps<T>) {
  const entry = useSelectOptions<T>(name, load)
  const rows = entry.items as T[]
  const loading = entry.loading
  const hasMore = entry.hasMore

  const options = useMemo(
    () => rows.map((row) => ({ value: row.id, label: getLabel(row) })),
    [getLabel, rows],
  )

  const hidden = value == null ? '' : Array.isArray(value) ? value.join(',') : value
  const select = (
    <>
      <input type="hidden" name={name} value={hidden} />
      <Select
        id={name}
        searchable
        multiple={multiple}
        options={options}
        value={value === undefined ? undefined : (value as string | string[])}
        defaultValue={defaultValue === undefined ? undefined : (defaultValue as string | string[])}
        placeholder={loading ? 'Loading…' : placeholder}
        empty={empty}
        disabled={disabled || loading}
        invalid={invalid}
        clearable={clearable}
        onValueChange={(next) => onValueChange?.(next, pickRows(rows, next))}
      />
      {hasMore ? (
        <button type="button" className="mt-2 text-sm text-oc-primary" disabled={loading} onClick={() => {
          const nextPage = entry.page + 1
          selectStore.setState((state) => ({ ...state, [name]: { ...selectEntry(name), ...entry, loading: true, page: nextPage } }))
          load(nextPage).then((result) => {
            selectStore.setState((state) => ({
              ...state,
              [name]: { ...selectEntry(name), ...entry, items: [...rows, ...result.items], hasMore: Boolean(result.hasMore), loading: false, page: nextPage },
            }))
          })
        }}>
          {loading ? 'Loading…' : 'Load more'}
        </button>
      ) : null}
    </>
  )

  if (label === false) return select

  return (
    <Field data-invalid={invalid || undefined}>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      {select}
      {description ? <FieldDescription>{description}</FieldDescription> : null}
    </Field>
  )
}

export { HitPayNamedSelect }
export type { HitPayNamedRow, HitPayNamedSelectLoad, HitPayNamedSelectProps }
