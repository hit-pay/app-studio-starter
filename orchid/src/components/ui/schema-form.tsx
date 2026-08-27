import { type ReactNode } from 'react'
import { useForm, useStore } from '@tanstack/react-form'

import { cn } from '@/lib/utils'
import { Checkbox, CheckboxGroup } from './checkbox'
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from './combobox'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from './field'
import { Input } from './input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupSeparator,
  InputGroupText,
} from './input-group'
import { Radio, RadioGroup } from './radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select'
import { SectionItem } from './form-section'
import { Slider } from './slider'
import { Textarea } from './textarea'
import { Toggle } from './toggle'

type SchemaFormType =
  | 'input'
  | 'password'
  | 'textarea'
  | 'select'
  | 'combobox'
  | 'radio'
  | 'checkbox-group'
  | 'accepted'
  | 'toggle'
  | 'slider'
  | 'input-group'
  | 'object'
  | 'hidden'
  | 'phone'
  | 'section'
  | 'section-item'

type SchemaFormOption = {
  value: string
  label: string
}

type SchemaFormFieldProps = {
  multiple?: boolean
  [key: string]: unknown
}

type SchemaFormField = {
  key: string
  title: string
  type: SchemaFormType | (string & {})
  required?: boolean
  placeholder?: string | null
  description?: string | null
  options?: SchemaFormOption[]
  value?: unknown
  validation?: string | null
  force_display?: boolean
  max_length?: number
  min_length?: number
  max?: number
  props?: SchemaFormFieldProps
  show_if?: string | string[]
  show_if_value?: unknown
  format?: string
  parent?: string
  fields?: SchemaFormField[]
}

type SchemaFormValues = Record<string, unknown>

type FlatField = SchemaFormField & { path: string }

type SchemaFormRenderField = {
  field: FlatField
  value: unknown
  invalid: boolean
  message: string
  placeholder?: string
  onBlur: () => void
  onChange: (next: unknown) => void
}

function pairKeys(field: SchemaFormField) {
  const plus = field.key.indexOf('+')
  if (plus === -1) return null
  return {
    first: field.key.slice(0, plus),
    second: field.key.slice(plus + 1),
  }
}

function inputGroupKeys(field: SchemaFormField) {
  if (field.type !== 'input-group') return null
  const keys = pairKeys(field)
  return keys ? { input: keys.first, select: keys.second } : null
}

function siblingPath(path: string, key: string) {
  const parts = path.split('.')
  parts[parts.length - 1] = key
  return parts.join('.')
}

function inputGroupValue(field: SchemaFormField, value: unknown) {
  const keys = inputGroupKeys(field)
  const fallbackSelect = field.options?.[0]?.value ?? ''
  if (value != null && typeof value === 'object' && !Array.isArray(value)) {
    const record = value as SchemaFormValues
    return {
      input: String(record[keys?.input ?? 'input'] ?? record.input ?? ''),
      select: String(record[keys?.select ?? 'select'] ?? record.select ?? fallbackSelect),
    }
  }
  return {
    input: value == null ? '' : String(value),
    select: fallbackSelect,
  }
}

function pairDefaultParts(field: SchemaFormField): [unknown, unknown] | null {
  const keys = pairKeys(field)
  if (!keys) return null
  const value = field.value
  if (field.type === 'input-group') {
    const group = inputGroupValue(field, value)
    return [group.input, group.select]
  }
  if (field.type === 'slider') {
    if (Array.isArray(value)) return [Number(value[0]) || 0, Number(value[1]) || 0]
    if (isPlainObject(value)) {
      return [
        Number(value[keys.first] ?? value.min ?? 0) || 0,
        Number(value[keys.second] ?? value.max ?? field.max ?? 100) || 0,
      ]
    }
    return [0, field.max ?? 100]
  }
  if (isPlainObject(value)) {
    return [value[keys.first] ?? value.from ?? '', value[keys.second] ?? value.to ?? '']
  }
  return ['', '']
}

function defaultValueFor(field: SchemaFormField): unknown {
  if (field.type === 'input-group' && !inputGroupKeys(field)) {
    return inputGroupValue(field, field.value)
  }
  if (field.value !== undefined) return field.value
  if (
    field.type === 'accepted' ||
    field.type === 'checkbox' ||
    field.type === 'checkbox-boolean' ||
    field.type === 'toggle' ||
    field.type === 'section-item'
  ) {
    return false
  }
  if (field.type === 'checkbox-group' || isMultiCombobox(field)) {
    return []
  }
  if (field.type === 'slider') return 0
  if (field.type === 'object') return formValuesFromFields(field.fields ?? [])
  if (field.type === 'section') return ''
  return ''
}

function formValuesFromFields(fields: SchemaFormField[]): SchemaFormValues {
  return Object.fromEntries(
    fields.flatMap((field) => {
      if (field.type === 'section') return []
      if (field.type === 'hidden') {
        return field.value === undefined ? [] : [[field.key, field.value]]
      }
      const parts = pairDefaultParts(field)
      const keys = pairKeys(field)
      if (keys && parts) {
        return [
          [keys.first, parts[0]],
          [keys.second, parts[1]],
        ]
      }
      return [[field.key, defaultValueFor(field)]]
    }),
  )
}

function isMultiCombobox(field: SchemaFormField) {
  return field.type === 'combobox' && field.props?.multiple === true
}

function flattenFields(fields: SchemaFormField[], prefix = ''): FlatField[] {
  return fields.flatMap((field) => {
    if (field.type === 'hidden') return []
    const keys = pairKeys(field)
    const path = prefix
      ? `${prefix}.${keys?.first ?? field.key}`
      : (keys?.first ?? field.key)
    if (field.type === 'object' && field.fields?.length) {
      return flattenFields(field.fields, path)
    }
    return [{ ...field, path }]
  })
}

function getValueByPath(values: SchemaFormValues, path: string) {
  return path.split('.').reduce<unknown>((cursor, key) => {
    if (!isPlainObject(cursor)) return undefined
    return cursor[key]
  }, values)
}

function matchesShowIf(actual: unknown, expected: unknown) {
  if (expected === undefined) return Boolean(actual)
  return Object.is(actual, expected)
}

function isDisplayed(field: SchemaFormField, values: SchemaFormValues) {
  if (field.force_display === false) return false
  if (!field.show_if) return true
  const keys = Array.isArray(field.show_if) ? field.show_if : [field.show_if]
  const expected = field.show_if_value
  const expectedList = Array.isArray(expected) ? expected : keys.map((_, index) => (index === 0 ? expected : undefined))
  return keys.every((key, index) => matchesShowIf(getValueByPath(values, key), expectedList[index]))
}

function setPath(target: SchemaFormValues, path: string, value: unknown) {
  const parts = path.split('.')
  let cursor = target
  for (let index = 0; index < parts.length - 1; index++) {
    const key = parts[index]!
    const next = cursor[key]
    if (next == null || typeof next !== 'object' || Array.isArray(next)) {
      cursor[key] = {}
    }
    cursor = cursor[key] as SchemaFormValues
  }
  cursor[parts[parts.length - 1]!] = value
}

function isPlainObject(value: unknown): value is SchemaFormValues {
  return value != null && typeof value === 'object' && !Array.isArray(value)
}

function nestValues(value: SchemaFormValues, fallback: SchemaFormValues): SchemaFormValues {
  const result: SchemaFormValues = structuredClone(fallback)
  for (const [key, next] of Object.entries(value)) {
    if (key.includes('.')) {
      setPath(result, key, next)
      continue
    }
    if (isPlainObject(next) && isPlainObject(fallback[key])) {
      result[key] = nestValues(next, fallback[key])
      continue
    }
    result[key] = next
  }
  for (const key of Object.keys(result)) {
    if (key.includes('.')) delete result[key]
  }
  return result
}

function fieldsWithValues(fields: SchemaFormField[], values: SchemaFormValues): SchemaFormField[] {
  return fields.map((field) => {
    if (field.type === 'object' && field.fields) {
      const raw = values[field.key]
      const nested: SchemaFormValues = isPlainObject(raw) ? raw : {}
      return { ...field, fields: fieldsWithValues(field.fields, nested), value: nested }
    }
    const keys = pairKeys(field)
    if (keys) {
      return {
        ...field,
        value: {
          [keys.first]: values[keys.first] ?? '',
          [keys.second]: values[keys.second] ?? '',
        },
      }
    }
    return { ...field, value: values[field.key] ?? field.value ?? null }
  })
}

function isEmpty(value: unknown, field: SchemaFormField) {
  const type = field.type
  if (isMultiCombobox(field)) return !Array.isArray(value) || value.length === 0
  if (
    type === 'accepted' ||
    type === 'checkbox' ||
    type === 'checkbox-boolean' ||
    type === 'toggle' ||
    type === 'section-item'
  ) {
    return value == null
  }
  if (type === 'checkbox-group') {
    return !Array.isArray(value) || value.length === 0
  }
  if (type === 'input-group') {
    return inputGroupValue(field, value).input.trim() === ''
  }
  if (value == null) return true
  if (typeof value === 'string') return value.trim() === ''
  return false
}

function testRegex(pattern: string, source: string) {
  const wrapped = pattern.match(/^\/([\s\S]*)\/([gimsuy]*)$/)
  const regex = wrapped ? new RegExp(wrapped[1]!, wrapped[2]) : new RegExp(pattern)
  return regex.test(source)
}

function laravelRule(rule: string, value: unknown, field: SchemaFormField) {
  const source = String(value)
  if (rule === 'email') {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(source) ? undefined : 'Enter a valid email'
  }
  if (rule === 'string') return undefined
  if (rule.startsWith('max:')) {
    const max = Number(rule.slice(4))
    return source.length > max ? `Must be at most ${max} characters` : undefined
  }
  if (rule === 'valid_url') {
    try {
      new URL(source)
      return undefined
    } catch {
      return 'Enter a valid URL'
    }
  }
  if (rule === 'phone' || rule.startsWith('phone')) {
    return /^\+?[\d\s-]{8,}$/.test(source) ? undefined : 'Enter a valid phone number'
  }
  if (rule === 'accepted') {
    return value === true || value === 'true' || value === '1' || value === 1
      ? undefined
      : `${field.title} must be accepted`
  }
  return undefined
}

function validateField(field: SchemaFormField, value: unknown) {
  if (isEmpty(value, field)) {
    return field.required ? `${field.title} is required` : undefined
  }

  if (field.min_length != null && String(value).length < field.min_length) {
    return `Must be at least ${field.min_length} characters`
  }

  if (field.max_length != null && String(value).length > field.max_length) {
    return `Must be at most ${field.max_length} characters`
  }

  if (field.type === 'input' && !field.validation && String(value).length > 255) {
    return 'Must be at most 255 characters'
  }

  const rules = field.validation
  if (!rules) return undefined
  if (rules.startsWith('/')) {
    return testRegex(rules, String(value)) ? undefined : 'Enter a valid value'
  }

  for (const rule of rules.split('|')) {
    const message = laravelRule(rule.trim(), value, field)
    if (message) return message
  }
  return undefined
}

function controlType(type: SchemaFormType | (string & {})) {
  if (type === 'phone') return 'input'
  if (type === 'password') return 'password'
  if (type === 'accepted' || type === 'checkbox' || type === 'checkbox-boolean') return 'accepted'
  return type
}

function labelsFromValues(options: SchemaFormOption[], value: unknown) {
  const selected = Array.isArray(value) ? value.map(String) : []
  return selected.map((entry) => options.find((option) => option.value === entry)?.label ?? entry)
}

function valuesFromLabels(options: SchemaFormOption[], labels: unknown) {
  const next = Array.isArray(labels) ? labels.map(String) : []
  return next.map((label) => options.find((option) => option.label === label)?.value ?? label)
}

function FormComboboxField({
  item,
  value,
  invalid,
  placeholder,
  onBlur,
  onChange,
}: {
  item: FlatField
  value: unknown
  invalid: boolean
  placeholder?: string
  onBlur: () => void
  onChange: (next: unknown) => void
}) {
  const chips = useComboboxAnchor()
  const options = item.options ?? []
  const labels = options.map((option) => option.label)
  const multiple = isMultiCombobox(item)

  if (multiple) {
    return (
      <Combobox
        items={labels}
        multiple
        value={labelsFromValues(options, value)}
        onValueChange={(next) => onChange(valuesFromLabels(options, next))}
      >
        <ComboboxChips ref={chips}>
          <ComboboxValue>
            {(selected: string[]) =>
              selected.map((label) => (
                <ComboboxChip key={label} aria-label={label}>
                  {label}
                </ComboboxChip>
              ))
            }
          </ComboboxValue>
          <ComboboxChipsInput
            id={item.path}
            placeholder={placeholder ?? 'Search'}
            aria-invalid={invalid || undefined}
            onBlur={onBlur}
          />
        </ComboboxChips>
        <ComboboxContent anchor={chips}>
          <ComboboxEmpty>No results found.</ComboboxEmpty>
          <ComboboxList>
            {(label: string) => (
              <ComboboxItem key={label} value={label} variant="Checkbox">
                {label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    )
  }

  const selected =
    options.find((option) => option.value === value)?.label ??
    (value == null || value === '' ? null : String(value))

  return (
    <Combobox
      items={labels}
      value={selected}
      onValueChange={(next) => {
        const match = options.find((option) => option.label === next)
        onChange(match?.value ?? next ?? '')
      }}
    >
      <ComboboxInput
        id={item.path}
        placeholder={placeholder ?? 'Search'}
        aria-invalid={invalid || undefined}
        onBlur={onBlur}
      />
      <ComboboxContent>
        <ComboboxEmpty>No results found.</ComboboxEmpty>
        <ComboboxList>
          {(label: string) => (
            <ComboboxItem key={label} value={label}>
              {label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

type SchemaFormInstance = {
  handleSubmit: () => Promise<void>
  setFieldValue: (name: string, value: unknown) => void
  Field: (props: {
    name: string
    validators?: {
      onChange?: (ctx: { value: unknown }) => string | undefined
      onBlur?: (ctx: { value: unknown }) => string | undefined
      onSubmit?: (ctx: { value: unknown }) => string | undefined
    }
    children: (field: {
      state: { value: unknown; meta: { isTouched?: boolean } }
      handleBlur: () => void
      handleChange: (next: unknown) => void
    }) => ReactNode
  }) => ReactNode
  state: { submissionAttempts: number }
}

type SchemaFormApi = {
  fields: SchemaFormField[]
  values: SchemaFormValues
  errors: SchemaFormValues
  isSubmitting: boolean
  submit: () => Promise<void>
  form: SchemaFormInstance
}

function useSchemaForm({
  fields,
  onSubmit,
}: {
  fields: SchemaFormField[]
  onSubmit?: (values: SchemaFormValues, nextFields: SchemaFormField[]) => void | Promise<void>
}): SchemaFormApi {
  const defaultValues = formValuesFromFields(fields)
  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      const values = nestValues(value as SchemaFormValues, defaultValues)
      await onSubmit?.(values, fieldsWithValues(fields, values))
    },
  })
  const rawValues = useStore(form.store, (state) => state.values)
  const fieldMeta = useStore(form.store, (state) => state.fieldMeta)
  const submissionAttempts = useStore(form.store, (state) => state.submissionAttempts)
  const isSubmitting = useStore(form.store, (state) => state.isSubmitting)
  const values = nestValues(rawValues as SchemaFormValues, defaultValues)
  const submitted = submissionAttempts > 0
  const errors = Object.fromEntries(
    flattenFields(fields)
      .filter((item) => isDisplayed(item, values))
      .flatMap((item) => {
        const message = validateField(item, getValueByPath(values, item.path))
        const touched = Boolean((fieldMeta as Record<string, { isTouched?: boolean }>)[item.path]?.isTouched)
        if (!message || !(touched || submitted)) return []
        return [[item.path, message]]
      }),
  )

  return {
    fields,
    form: form as SchemaFormInstance,
    values,
    errors,
    isSubmitting,
    submit: () => form.handleSubmit(),
  }
}

function SchemaForm({
  form: builder,
  id,
  className,
  renderField,
}: {
  form: SchemaFormApi
  id?: string
  className?: string
  renderField?: (ctx: SchemaFormRenderField) => ReactNode
}) {
  const { form, fields, values } = builder
  const flat = flattenFields(fields).filter((item) => isDisplayed(item, values))

  return (
    <form
      id={id}
      className={cn('flex w-full min-w-0 max-w-xl flex-col gap-6 overflow-visible', className)}
      onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()
        void form.handleSubmit()
      }}
    >
      <FieldGroup>
        {flat.map((item) => (
          <form.Field
            key={item.path}
            name={item.path}
            validators={{
              onChange: ({ value }) => validateField(item, value),
              onBlur: ({ value }) => validateField(item, value),
              onSubmit: ({ value }) => validateField(item, value),
            }}
          >
            {(field) => {
              const live = validateField(item, field.state.value)
              const message = live ?? ''
              const submitted = form.state.submissionAttempts > 0
              const invalid = Boolean(live) && (field.state.meta.isTouched || submitted)
              const value = field.state.value
              const placeholder = item.placeholder ?? undefined
              const type = controlType(item.type)
              const inputType =
                item.type === 'password'
                  ? 'password'
                  : item.type === 'phone'
                    ? 'tel'
                    : 'text'

              if (type === 'section-item') {
                return (
                  <SectionItem
                    title={item.title}
                    description={item.description ?? undefined}
                    type={item.props?.background === true ? 'Background' : 'Default'}
                    actions={
                      <Toggle
                        id={item.path}
                        checked={Boolean(value)}
                        onCheckedChange={(checked) => field.handleChange(checked)}
                        onBlur={field.handleBlur}
                      />
                    }
                  />
                )
              }

              if (type === 'section') {
                return (
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium text-oc-foreground">{item.title}</p>
                    {item.description ? (
                      <p className="text-xs text-oc-muted-foreground">{item.description}</p>
                    ) : null}
                  </div>
                )
              }

              if (type === 'toggle') {
                return (
                  <Field orientation="horizontal" data-invalid={invalid || undefined}>
                    <Toggle
                      id={item.path}
                      checked={Boolean(value)}
                      onCheckedChange={(checked) => field.handleChange(checked)}
                      onBlur={field.handleBlur}
                    />
                    <FieldLabel htmlFor={item.path}>{item.title}</FieldLabel>
                    {invalid ? <FieldError>{message}</FieldError> : null}
                  </Field>
                )
              }

              if (type === 'checkbox-group') {
                return (
                  <Field data-invalid={invalid || undefined}>
                    <CheckboxGroup
                      label={item.title}
                      value={Array.isArray(value) ? value.map(String) : []}
                      onValueChange={(next) => field.handleChange(next)}
                    >
                      {(item.options ?? []).map((option) => (
                        <Checkbox key={option.value} value={option.value}>
                          {option.label}
                        </Checkbox>
                      ))}
                    </CheckboxGroup>
                    {invalid ? <FieldError>{message}</FieldError> : null}
                  </Field>
                )
              }

              if (type === 'slider') {
                const keys = pairKeys(item)
                const secondPath = keys ? siblingPath(item.path, keys.second) : null
                const objectRange = isPlainObject(value) && !Array.isArray(value)
                const first = Number(value) || 0
                const second = secondPath
                  ? Number(getValueByPath(values, secondPath)) || 0
                  : objectRange
                    ? Number(value.min ?? value.max ?? 0) || 0
                    : 0
                const sliderValue = keys
                  ? [first, second]
                  : objectRange
                    ? [Number(value.min) || 0, Number(value.max) || 0]
                    : Array.isArray(value)
                      ? value.map(Number)
                      : Number(value) || 0
                return (
                  <Field data-invalid={invalid || undefined}>
                    <FieldLabel>{item.title}</FieldLabel>
                    <Slider
                      min={0}
                      max={item.max ?? 100}
                      value={sliderValue}
                      onValueChange={(next) => {
                        const thumbs = Array.isArray(next) ? next.map(Number) : [Number(next) || 0]
                        if (keys && secondPath) {
                          field.handleChange(thumbs[0] || 0)
                          form.setFieldValue(secondPath, thumbs[1] || 0)
                          return
                        }
                        if (objectRange || thumbs.length >= 2) {
                          field.handleChange({
                            min: thumbs[0] || 0,
                            max: thumbs[1] ?? thumbs[0] ?? 0,
                          })
                          return
                        }
                        field.handleChange(thumbs[0] || 0)
                      }}
                    />
                    {invalid ? <FieldError>{message}</FieldError> : null}
                  </Field>
                )
              }

              if (type === 'combobox') {
                return (
                  <Field data-invalid={invalid || undefined}>
                    <FieldLabel htmlFor={item.path}>{item.title}</FieldLabel>
                    <FormComboboxField
                      item={item}
                      value={value}
                      invalid={invalid}
                      placeholder={placeholder}
                      onBlur={field.handleBlur}
                      onChange={field.handleChange}
                    />
                    {invalid ? <FieldError>{message}</FieldError> : null}
                  </Field>
                )
              }

              if (type === 'input-group') {
                const keys = inputGroupKeys(item)
                const group = inputGroupValue(item, value)
                const selectPath = keys ? siblingPath(item.path, keys.select) : null
                const selectValue = selectPath
                  ? String(getValueByPath(values, selectPath) ?? group.select)
                  : group.select
                const setInput = (next: string) => {
                  if (keys) field.handleChange(next)
                  else field.handleChange({ ...group, input: next })
                }
                const setSelect = (next: string) => {
                  if (selectPath) form.setFieldValue(selectPath, next)
                  else field.handleChange({ ...group, select: next })
                }
                const addonEnd = item.props?.align === 'end'
                const selectAddon = (item.options ?? []).length ? (
                  <InputGroupAddon align={addonEnd ? 'inline-end' : 'inline-start'}>
                    <Select
                      value={selectValue || null}
                      onValueChange={(next) => setSelect(String(next))}
                    >
                      <SelectTrigger size="Inline" id={`${item.path}-select`}>
                        <SelectValue className="uppercase" />
                      </SelectTrigger>
                      <SelectContent>
                        {(item.options ?? []).map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </InputGroupAddon>
                ) : (
                  <InputGroupAddon align={addonEnd ? 'inline-end' : 'inline-start'}>
                    <InputGroupText>{selectValue || 'SGD'}</InputGroupText>
                  </InputGroupAddon>
                )
                return (
                  <Field data-invalid={invalid || undefined}>
                    <FieldLabel htmlFor={item.path}>{item.title}</FieldLabel>
                    <InputGroup>
                      {addonEnd ? null : selectAddon}
                      {addonEnd ? null : <InputGroupSeparator />}
                      <InputGroupInput
                        id={item.path}
                        placeholder={placeholder}
                        value={keys ? String(value ?? '') : group.input}
                        aria-invalid={invalid || undefined}
                        onBlur={field.handleBlur}
                        onChange={(event) => setInput(event.target.value)}
                      />
                      {addonEnd ? <InputGroupSeparator /> : null}
                      {addonEnd ? selectAddon : null}
                    </InputGroup>
                    {item.description ? <FieldDescription>{item.description}</FieldDescription> : null}
                    {invalid ? <FieldError>{message}</FieldError> : null}
                  </Field>
                )
              }

              if (type === 'accepted') {
                return (
                  <Field data-invalid={invalid || undefined}>
                    <Checkbox
                      checked={Boolean(value)}
                      error={invalid}
                      onCheckedChange={(checked) => field.handleChange(checked === true)}
                      onBlur={field.handleBlur}
                    >
                      {item.title}
                    </Checkbox>
                    {item.description ? <FieldDescription>{item.description}</FieldDescription> : null}
                    {invalid ? <FieldError>{message}</FieldError> : null}
                  </Field>
                )
              }

              if (type === 'radio') {
                return (
                  <Field data-invalid={invalid || undefined}>
                    <RadioGroup
                      label={item.title}
                      value={value == null ? null : String(value)}
                      onValueChange={(next) => field.handleChange(String(next))}
                    >
                      {(item.options ?? []).map((option) => (
                        <Radio key={option.value} value={option.value} error={invalid}>
                          {option.label}
                        </Radio>
                      ))}
                    </RadioGroup>
                    {invalid ? <FieldError>{message}</FieldError> : null}
                  </Field>
                )
              }

              const pair = pairKeys(item)
              const pairSecondPath = pair ? siblingPath(item.path, pair.second) : null
              const customValue =
                pair && pairSecondPath
                  ? {
                      [pair.first]: value,
                      [pair.second]: getValueByPath(values, pairSecondPath),
                    }
                  : value
              const custom = renderField?.({
                field: item,
                value: customValue,
                invalid,
                message,
                placeholder,
                onBlur: field.handleBlur,
                onChange: (next) => {
                  if (pair && pairSecondPath && isPlainObject(next)) {
                    field.handleChange(next[pair.first] ?? next.from ?? null)
                    form.setFieldValue(pairSecondPath, next[pair.second] ?? next.to ?? null)
                    return
                  }
                  field.handleChange(next)
                },
              })
              if (custom) {
                return (
                  <Field data-invalid={invalid || undefined}>
                    <FieldLabel htmlFor={item.path}>{item.title}</FieldLabel>
                    {custom}
                    {item.description ? <FieldDescription>{item.description}</FieldDescription> : null}
                    {invalid ? <FieldError>{message}</FieldError> : null}
                  </Field>
                )
              }

              return (
                <Field data-invalid={invalid || undefined}>
                  <FieldLabel htmlFor={item.path}>{item.title}</FieldLabel>
                  {type === 'textarea' ? (
                    <Textarea
                      id={item.path}
                      name={item.path}
                      placeholder={placeholder}
                      minLength={item.min_length}
                      maxLength={item.max_length}
                      value={String(value ?? '')}
                      aria-invalid={invalid || undefined}
                      onBlur={field.handleBlur}
                      onChange={(event) => field.handleChange(event.target.value)}
                    />
                  ) : type === 'select' ? (
                    <Select
                      value={value == null || value === '' ? null : String(value)}
                      onValueChange={(next) => field.handleChange(next)}
                    >
                      <SelectTrigger
                        id={item.path}
                        aria-invalid={invalid || undefined}
                        onBlur={field.handleBlur}
                      >
                        <SelectValue placeholder={placeholder ?? 'Select'} />
                      </SelectTrigger>
                      <SelectContent>
                        {(item.options ?? []).map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id={item.path}
                      name={item.path}
                      type={inputType}
                      placeholder={placeholder}
                      maxLength={item.max_length ?? (item.type === 'input' ? 255 : undefined)}
                      value={value == null ? '' : String(value)}
                      aria-invalid={invalid || undefined}
                      onBlur={field.handleBlur}
                      onChange={(event) => field.handleChange(event.target.value)}
                    />
                  )}
                  {item.description ? <FieldDescription>{item.description}</FieldDescription> : null}
                  {invalid ? <FieldError>{message}</FieldError> : null}
                </Field>
              )
            }}
          </form.Field>
        ))}
      </FieldGroup>

    </form>
  )
}

export { fieldsWithValues, SchemaForm, formValuesFromFields, useSchemaForm }
export type {
  SchemaFormApi,
  SchemaFormField,
  SchemaFormFieldProps,
  SchemaFormOption,
  SchemaFormRenderField,
  SchemaFormType,
  SchemaFormValues,
}
