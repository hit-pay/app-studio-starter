'use client'

import { useEffect, useMemo, useState } from 'react'

import { Select } from '@/components/form/select'
import { Field, FieldDescription, FieldLabel } from '@ui/field'

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
  const [rows, setRows] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(false)
  const [page, setPage] = useState(1)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    load(page)
      .then((payload) => {
        if (!cancelled) {
          setRows((current) => (page === 1 ? payload.items : [...current, ...payload.items]))
          setHasMore(Boolean(payload.hasMore))
        }
      })
      .catch(() => {
        if (!cancelled) setRows([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [load, page])

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
        <button type="button" className="mt-2 text-sm text-oc-primary" disabled={loading} onClick={() => setPage((current) => current + 1)}>
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
