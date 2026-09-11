'use client'

import { useEffect, useMemo, useState } from 'react'

import { Select } from '@/components/form/select'
import {
  fetchStaffAppMembers,
  type HitPayStaffAppMember,
} from '#/lib/hitpay'
import { Field, FieldDescription, FieldLabel } from '@ui/form/field'

type StaffSelectLoad = () => Promise<{ members: HitPayStaffAppMember[] }>

type StaffSelectProps = {
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
    selected: HitPayStaffAppMember | HitPayStaffAppMember[] | null,
  ) => void
  roleTitles?: string[]
  locationId?: string
  load?: StaffSelectLoad
}

function staffLabel(member: HitPayStaffAppMember) {
  return member.name?.trim() || member.email?.trim() || member.id
}

function filterMembers(
  members: HitPayStaffAppMember[],
  roleTitles?: string[],
  locationId?: string,
) {
  return members.filter((member) => {
    if (roleTitles && roleTitles.length > 0 && !roleTitles.includes(member.role?.title ?? '')) {
      return false
    }

    if (locationId && !member.locations.some((location) => location.id === locationId)) {
      return false
    }

    return true
  })
}

function pickMembers(members: HitPayStaffAppMember[], value: string | string[] | null) {
  if (value == null) {
    return null
  }

  if (Array.isArray(value)) {
    return members.filter((member) => value.includes(member.id))
  }

  return members.find((member) => member.id === value) ?? null
}

function StaffSelect({
  name,
  label = 'Staff',
  description,
  placeholder = 'Select staff',
  disabled,
  invalid,
  multiple = false,
  value,
  defaultValue,
  onValueChange,
  roleTitles,
  locationId,
  load = fetchStaffAppMembers,
}: StaffSelectProps) {
  const [members, setMembers] = useState<HitPayStaffAppMember[]>([])
  const [loading, setLoading] = useState(true)
  const roleKey = roleTitles?.join('\0') ?? ''

  useEffect(() => {
    let cancelled = false

    setLoading(true)
    load()
      .then((payload) => {
        if (!cancelled) {
          setMembers(filterMembers(payload.members, roleTitles, locationId))
        }
      })
      .catch(() => {
        if (!cancelled) {
          setMembers([])
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
  }, [load, locationId, roleKey])

  const options = useMemo(
    () => members.map((member) => ({ value: member.id, label: staffLabel(member) })),
    [members],
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
        empty="No staff in this app."
        disabled={disabled || loading}
        invalid={invalid}
        onValueChange={(next) => onValueChange?.(next, pickMembers(members, next))}
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

export { StaffSelect }
export type { StaffSelectLoad, StaffSelectProps }
