'use client'

import type { ComponentProps } from 'react'

import {
  Combobox as ComboboxPrimitive,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxSelectAll,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
} from '@ui/form/combobox'

type SelectOption = {
  value: string
  label: string
  disabled?: boolean
}

type SelectProps = Omit<ComponentProps<'div'>, 'onChange'> & {
  options: SelectOption[]
  value?: string | string[] | null
  defaultValue?: string | string[] | null
  onValueChange?: (value: string | string[] | null) => void
  multiple?: boolean
  searchable?: boolean
  placeholder?: string
  searchPlaceholder?: string
  empty?: string
  disabled?: boolean
  invalid?: boolean
  id?: string
  size?: 'sm' | 'default' | 'inline'
  onBlur?: () => void
}

function labelsFromValues(options: SelectOption[], value: unknown) {
  const values = Array.isArray(value) ? value.map(String) : []
  return options.filter((option) => values.includes(option.value)).map((option) => option.label)
}

function valuesFromLabels(options: SelectOption[], labels: unknown) {
  const selected = Array.isArray(labels) ? labels.map(String) : []
  return options.filter((option) => selected.includes(option.label)).map((option) => option.value)
}

function Select({
  options,
  value,
  defaultValue,
  onValueChange,
  multiple = false,
  searchable = false,
  placeholder,
  searchPlaceholder,
  empty = 'No results found.',
  disabled,
  invalid,
  id,
  size = 'default',
  className,
  onBlur,
}: SelectProps) {
  const chips = useComboboxAnchor()
  const labels = options.map((option) => option.label)

  if (multiple) {
    const selected = value !== undefined ? labelsFromValues(options, value) : undefined
    const defaultSelected =
      defaultValue !== undefined ? labelsFromValues(options, defaultValue) : undefined

    return (
      <ComboboxPrimitive
        items={labels}
        multiple
        value={selected}
        defaultValue={defaultSelected}
        disabled={disabled}
        onValueChange={(next) => onValueChange?.(valuesFromLabels(options, next))}
      >
        <ComboboxChips ref={chips} className={className} aria-invalid={invalid || undefined}>
          <ComboboxValue>
            {(picked: string[]) =>
              picked.map((label) => (
                <ComboboxChip key={label} aria-label={label}>
                  {label}
                </ComboboxChip>
              ))
            }
          </ComboboxValue>
          <ComboboxChipsInput
            id={id}
            disabled={disabled}
            placeholder={searchPlaceholder ?? placeholder ?? 'Search'}
            aria-invalid={invalid || undefined}
            onBlur={onBlur}
          />
        </ComboboxChips>
        <ComboboxContent anchor={chips}>
          <ComboboxSelectAll />
          <ComboboxSeparator />
          <ComboboxEmpty>{empty}</ComboboxEmpty>
          <ComboboxList>
            {(label: string) => {
              const option = options.find((item) => item.label === label)
              return (
                <ComboboxItem key={label} value={label} variant="checkbox" disabled={option?.disabled}>
                  {label}
                </ComboboxItem>
              )
            }}
          </ComboboxList>
        </ComboboxContent>
      </ComboboxPrimitive>
    )
  }

  const selectedLabel =
    options.find((option) => option.value === value)?.label ??
    (value == null || value === '' ? null : String(value))
  const defaultLabel =
    options.find((option) => option.value === defaultValue)?.label ??
    (defaultValue == null || defaultValue === '' ? undefined : String(defaultValue))

  return (
    <ComboboxPrimitive
      items={labels}
      value={value !== undefined ? selectedLabel : undefined}
      defaultValue={defaultLabel}
      disabled={disabled}
      onValueChange={(next) => {
        const match = options.find((option) => option.label === next)
        onValueChange?.(match?.value ?? (next == null ? null : String(next)))
      }}
    >
      {searchable ? (
        <ComboboxInput
          id={id}
          className={className}
          disabled={disabled}
          placeholder={searchPlaceholder ?? placeholder ?? 'Search'}
          aria-invalid={invalid || undefined}
          onBlur={onBlur}
        />
      ) : (
        <ComboboxTrigger
          id={id}
          variant="field"
          size={size}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          className={className}
          onBlur={onBlur}
        >
          <ComboboxValue>
            {(picked: string | null) =>
              picked ? (
                <span className="min-w-0 flex-1 truncate text-left">{picked}</span>
              ) : (
                <span className="min-w-0 flex-1 truncate text-left text-oc-muted-foreground">
                  {placeholder ?? 'Select'}
                </span>
              )
            }
          </ComboboxValue>
        </ComboboxTrigger>
      )}
      <ComboboxContent>
        <ComboboxEmpty>{empty}</ComboboxEmpty>
        <ComboboxList>
          {(label: string) => {
            const option = options.find((item) => item.label === label)
            return (
              <ComboboxItem key={label} value={label} disabled={option?.disabled}>
                {label}
              </ComboboxItem>
            )
          }}
        </ComboboxList>
      </ComboboxContent>
    </ComboboxPrimitive>
  )
}

export { Select }
export type { SelectOption, SelectProps }
