'use client'

import type { ComponentProps, ReactNode } from 'react'

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
} from '@ui/combobox'

type SelectOption = {
  value: string
  label: string
  /** Secondary line in the dropdown (and search matching when searchable). */
  description?: string
  /** Optional image URL shown beside the label in the list. */
  image?: string | null
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
  contentClassName?: string
  clearable?: boolean
  onBlur?: () => void
  /** Override dropdown row content. `label` is still used for the trigger, chips, and search text. */
  renderOption?: (option: SelectOption) => ReactNode
}

function optionByValue(options: SelectOption[], value: string) {
  return options.find((option) => option.value === value)
}

function optionLabel(options: SelectOption[], value: string) {
  return optionByValue(options, value)?.label ?? value
}

function optionSearchText(option: SelectOption) {
  return [option.label, option.description].filter(Boolean).join(' ')
}

function SelectOptionContent({
  option,
  renderOption,
}: {
  option: SelectOption
  renderOption?: (option: SelectOption) => ReactNode
}) {
  if (renderOption) return <>{renderOption(option)}</>

  const rich = Boolean(option.description || option.image)
  if (!rich) return <>{option.label}</>

  return (
    <span className="flex min-w-0 flex-1 items-center gap-2 whitespace-normal">
      {option.image ? (
        <img
          src={option.image}
          alt=""
          className="size-8 shrink-0 rounded-md border border-oc-border object-cover"
        />
      ) : null}
      <span className="min-w-0 flex-1">
        <span className="block truncate font-medium leading-snug">{option.label}</span>
        {option.description ? (
          <span className="block truncate text-xs leading-snug text-oc-muted-foreground">
            {option.description}
          </span>
        ) : null}
      </span>
    </span>
  )
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
  contentClassName,
  clearable = false,
  onBlur,
  renderOption,
}: SelectProps) {
  const chips = useComboboxAnchor()
  const values = options.map((option) => option.value)
  const labelOf = (item: unknown) => optionLabel(options, String(item ?? ''))
  const searchLabelOf = (item: unknown) => {
    const option = optionByValue(options, String(item ?? ''))
    return option ? optionSearchText(option) : String(item ?? '')
  }

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
        itemToStringLabel={searchLabelOf}
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
        <ComboboxContent anchor={chips} className={contentClassName}>
          <ComboboxSelectAll />
          <ComboboxSeparator />
          <ComboboxEmpty>{empty}</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => {
              const option = optionByValue(options, item)
              if (!option) {
                return (
                  <ComboboxItem key={item} value={item} variant="checkbox">
                    {item}
                  </ComboboxItem>
                )
              }
              return (
                <ComboboxItem
                  key={item}
                  value={item}
                  variant="checkbox"
                  disabled={option.disabled}
                  className={
                    option.description || option.image || renderOption
                      ? 'items-start py-2.5 whitespace-normal'
                      : undefined
                  }
                >
                  <SelectOptionContent option={option} renderOption={renderOption} />
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
      itemToStringLabel={searchable ? searchLabelOf : labelOf}
      onValueChange={(next) => onValueChange?.(next == null ? null : String(next))}
    >
      {searchable ? (
        <ComboboxInput
          id={id}
          className={className}
          disabled={disabled}
          showClear={clearable}
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
      <ComboboxContent className={contentClassName}>
        <ComboboxEmpty>{empty}</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => {
            const option = optionByValue(options, item)
            if (!option) {
              return (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )
            }
            return (
              <ComboboxItem
                key={item}
                value={item}
                disabled={option.disabled}
                className={
                  option.description || option.image || renderOption
                    ? 'items-start py-2.5 whitespace-normal'
                    : undefined
                }
              >
                <SelectOptionContent option={option} renderOption={renderOption} />
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
