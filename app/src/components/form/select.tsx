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

function optionLabel(options: SelectOption[], value: string) {
  return options.find((option) => option.value === value)?.label ?? value
}

function knownValues(options: SelectOption[], value: unknown) {
  const values = Array.isArray(value) ? value.map(String) : []
  const allowed = new Set(options.map((option) => option.value))
  return values.filter((item) => allowed.has(item))
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
  const values = options.map((option) => option.value)
  const labelOf = (item: unknown) => optionLabel(options, String(item ?? ''))

  if (multiple) {
    const selected = value !== undefined ? knownValues(options, value) : undefined
    const defaultSelected =
      defaultValue !== undefined ? knownValues(options, defaultValue) : undefined

    return (
      <ComboboxPrimitive
        items={values}
        multiple
        value={selected}
        defaultValue={defaultSelected}
        disabled={disabled}
        itemToStringLabel={labelOf}
        onValueChange={(next) =>
          onValueChange?.(Array.isArray(next) ? next.map(String) : [])
        }
      >
        <ComboboxChips ref={chips} className={className} aria-invalid={invalid || undefined}>
          <ComboboxValue>
            {(picked: string[]) =>
              picked.map((item) => (
                <ComboboxChip key={item} aria-label={labelOf(item)}>
                  {labelOf(item)}
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
            {(item: string) => {
              const option = options.find((entry) => entry.value === item)
              return (
                <ComboboxItem key={item} value={item} variant="checkbox" disabled={option?.disabled}>
                  {option?.label ?? item}
                </ComboboxItem>
              )
            }}
          </ComboboxList>
        </ComboboxContent>
      </ComboboxPrimitive>
    )
  }

  const selectedValue =
    value === undefined
      ? undefined
      : typeof value !== 'string' || !options.some((option) => option.value === value)
        ? null
        : value
  const defaultSelected =
    typeof defaultValue !== 'string' ||
    !options.some((option) => option.value === defaultValue)
      ? undefined
      : defaultValue

  return (
    <ComboboxPrimitive
      items={values}
      value={selectedValue}
      defaultValue={defaultSelected}
      disabled={disabled}
      filter={searchable ? undefined : null}
      itemToStringLabel={labelOf}
      onValueChange={(next) => onValueChange?.(next == null ? null : String(next))}
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
                <span className="min-w-0 flex-1 truncate text-left">{labelOf(picked)}</span>
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
          {(item: string) => {
            const option = options.find((entry) => entry.value === item)
            return (
              <ComboboxItem key={item} value={item} disabled={option?.disabled}>
                {option?.label ?? item}
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
