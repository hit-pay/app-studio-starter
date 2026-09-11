'use client'

import { useEffect, useMemo, useState } from 'react'

import { Select } from '@/components/form/select'
import { fetchAppRoles, type HitPayRole } from '@/lib/hitpay'
import { Field, FieldDescription, FieldLabel } from '@ui/form/field'

type RoleSelectLoad = () => Promise<{ roles: HitPayRole[] }>

type RoleSelectProps = {
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
    selected: HitPayRole | HitPayRole[] | null,
  ) => void
  load?: RoleSelectLoad
}

function pickRoles(roles: HitPayRole[], value: string | string[] | null) {
  if (value == null) {
    return null
  }

  if (Array.isArray(value)) {
    return roles.filter((role) => value.includes(role.id))
  }

  return roles.find((role) => role.id === value) ?? null
}

function RoleSelect({
  name,
  label = 'Role',
  description,
  placeholder = 'Select role',
  disabled,
  invalid,
  multiple = false,
  value,
  defaultValue,
  onValueChange,
  load = fetchAppRoles,
}: RoleSelectProps) {
  const [roles, setRoles] = useState<HitPayRole[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    setLoading(true)
    load()
      .then((payload) => {
        if (!cancelled) {
          setRoles(payload.roles)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setRoles([])
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [load])

  const options = useMemo(
    () => roles.map((role) => ({ value: role.id, label: role.title })),
    [roles],
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
        empty="No roles."
        disabled={disabled || loading}
        invalid={invalid}
        onValueChange={(next) => onValueChange?.(next, pickRoles(roles, next))}
      />
    </>
  )

  if (label === false) {
    return select
  }

  return (
    <Field data-invalid={invalid || undefined}>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      {select}
      {description ? <FieldDescription>{description}</FieldDescription> : null}
    </Field>
  )
}

export { RoleSelect }
export type { RoleSelectLoad, RoleSelectProps }
