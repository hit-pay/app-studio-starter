import { type FormEvent, type ReactNode } from 'react'
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
import { SectionItem } from './section-title'
import { Slider } from './slider'
import { Textarea } from './textarea'
import { Toggle } from './toggle'

type FormBuilderType =
  | 'input'
  | 'password'
  | 'textarea'
  | 'select'
  | 'combobox'
  | 'radio'
  | 'checkbox'
  | 'checkbox-boolean'
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

type FormBuilderOption = {
  value: string
  label: string
}

type FormBuilderFieldProps = {
  multiple?: boolean
  [key: string]: unknown
}

type FormBuilderField = {
  key: string
  title: string
  type: FormBuilderType | (string & {})
  required?: boolean
  placeholder?: string | null
  description?: string | null
  options?: FormBuilderOption[]
  value?: unknown
  validation?: string | null
  force_display?: boolean
  max_length?: number
  min_length?: number
  max?: number
  props?: FormBuilderFieldProps
  show_if?: string | string[]
  show_if_value?: unknown
  format?: string
  parent?: string
  fields?: FormBuilderField[]
}

type FormBuilderValues = Record<string, unknown>

type FlatField = FormBuilderField & { path: string }

type FormBuilderRenderField = {
  field: FlatField
  value: unknown
  invalid: boolean
  message: string
  placeholder?: string
  onBlur: () => void
  onChange: (next: unknown) => void
}

function defaultValueFor(field: FormBuilderField): unknown {
  if (field.value !== undefined) return field.value
  if (
    field.type === 'checkbox' ||
    field.type === 'checkbox-boolean' ||
    field.type === 'accepted' ||
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

function formValuesFromFields(fields: FormBuilderField[]): FormBuilderValues {
  return Object.fromEntries(
    fields
      .filter(
        (field) =>
          field.type !== 'section' && (field.type !== 'hidden' || field.value !== undefined),
      )
      .map((field) => [
        field.key,
        field.type === 'hidden' ? field.value : defaultValueFor(field),
      ]),
  )
}

function isMultiCombobox(field: FormBuilderField) {
  return field.type === 'combobox' && field.props?.multiple === true
}

function flattenFields(fields: FormBuilderField[], prefix = ''): FlatField[] {
  return fields.flatMap((field) => {
    if (field.type === 'hidden') return []
    const path = prefix ? `${prefix}.${field.key}` : field.key
    if (field.type === 'object' && field.fields?.length) {
      return flattenFields(field.fields, path)
    }
    return [{ ...field, path }]
  })
}

function getValueByPath(values: FormBuilderValues, path: string) {
  return path.split('.').reduce<unknown>((cursor, key) => {
    if (!isPlainObject(cursor)) return undefined
    return cursor[key]
  }, values)
}

function matchesShowIf(actual: unknown, expected: unknown) {
  if (expected === undefined) return Boolean(actual)
  return Object.is(actual, expected)
}

function isDisplayed(field: FormBuilderField, values: FormBuilderValues) {
  if (field.force_display === false) return false
  if (!field.show_if) return true
  const keys = Array.isArray(field.show_if) ? field.show_if : [field.show_if]
  const expected = field.show_if_value
  const expectedList = Array.isArray(expected) ? expected : keys.map((_, index) => (index === 0 ? expected : undefined))
  return keys.every((key, index) => matchesShowIf(getValueByPath(values, key), expectedList[index]))
}

function setPath(target: FormBuilderValues, path: string, value: unknown) {
  const parts = path.split('.')
  let cursor = target
  for (let index = 0; index < parts.length - 1; index++) {
    const key = parts[index]!
    const next = cursor[key]
    if (next == null || typeof next !== 'object' || Array.isArray(next)) {
      cursor[key] = {}
    }
    cursor = cursor[key] as FormBuilderValues
  }
  cursor[parts[parts.length - 1]!] = value
}

function isPlainObject(value: unknown): value is FormBuilderValues {
  return value != null && typeof value === 'object' && !Array.isArray(value)
}

function nestValues(value: FormBuilderValues, fallback: FormBuilderValues): FormBuilderValues {
  const result: FormBuilderValues = structuredClone(fallback)
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

function fieldsWithValues(fields: FormBuilderField[], values: FormBuilderValues): FormBuilderField[] {
  return fields.map((field) => {
    if (field.type === 'object' && field.fields) {
      const nested = isPlainObject(values[field.key]) ? values[field.key] : {}
      return { ...field, fields: fieldsWithValues(field.fields, nested), value: nested }
    }
    return { ...field, value: values[field.key] ?? field.value ?? null }
  })
}

function isEmpty(value: unknown, field: FormBuilderField) {
  const type = field.type
  if (isMultiCombobox(field)) return !Array.isArray(value) || value.length === 0
  if (
    type === 'checkbox' ||
    type === 'checkbox-boolean' ||
    type === 'accepted' ||
    type === 'toggle' ||
    type === 'section-item'
  ) {
    return value == null
  }
  if (type === 'checkbox-group') {
    return !Array.isArray(value) || value.length === 0
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

function laravelRule(rule: string, value: unknown, field: FormBuilderField) {
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

function validateField(field: FormBuilderField, value: unknown) {
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

function controlType(type: FormBuilderType) {
  if (type === 'phone') return 'input'
  if (type === 'password') return 'password'
  if (type === 'accepted' || type === 'checkbox') return 'checkbox-boolean'
  return type
}

function labelsFromValues(options: FormBuilderOption[], value: unknown) {
  const selected = Array.isArray(value) ? value.map(String) : []
  return selected.map((entry) => options.find((option) => option.value === entry)?.label ?? entry)
}

function valuesFromLabels(options: FormBuilderOption[], labels: unknown) {
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

type FormBuilderApi = {
  fields: FormBuilderField[]
  values: FormBuilderValues
  errors: FormBuilderValues
  isSubmitting: boolean
  submit: () => Promise<void>
  form: ReturnType<typeof useForm>
}

function useFormBuilder({
  fields,
  onSubmit,
}: {
  fields: FormBuilderField[]
  onSubmit?: (values: FormBuilderValues, nextFields: FormBuilderField[]) => void | Promise<void>
}): FormBuilderApi {
  const defaultValues = formValuesFromFields(fields)
  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      const values = nestValues(value as FormBuilderValues, defaultValues)
      await onSubmit?.(values, fieldsWithValues(fields, values))
    },
  })
  const rawValues = useStore(form.store, (state) => state.values)
  const fieldMeta = useStore(form.store, (state) => state.fieldMeta)
  const submissionAttempts = useStore(form.store, (state) => state.submissionAttempts)
  const isSubmitting = useStore(form.store, (state) => state.isSubmitting)
  const values = nestValues(rawValues as FormBuilderValues, defaultValues)
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
    form,
    values,
    errors,
    isSubmitting,
    submit: () => form.handleSubmit(),
  }
}

function FormBuilder({
  form: builder,
  id,
  className,
  renderField,
}: {
  form: FormBuilderApi
  id?: string
  className?: string
  renderField?: (ctx: FormBuilderRenderField) => ReactNode
}) {
  const { form, fields, values } = builder
  const flat = flattenFields(fields).filter((item) => isDisplayed(item, values))

  return (
    <form
      id={id}
      className={cn('flex w-full min-w-0 max-w-xl flex-col gap-6 overflow-visible', className)}
      onSubmit={(event: FormEvent) => {
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
                return (
                  <Field data-invalid={invalid || undefined}>
                    <FieldLabel>{item.title}</FieldLabel>
                    <Slider
                      min={0}
                      max={item.max ?? 100}
                      value={Array.isArray(value) ? value.map(Number) : Number(value) || 0}
                      onValueChange={(next) => field.handleChange(next)}
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
                return (
                  <Field data-invalid={invalid || undefined}>
                    <FieldLabel htmlFor={item.path}>{item.title}</FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>
                        <InputGroupText>SGD</InputGroupText>
                      </InputGroupAddon>
                      <InputGroupSeparator />
                      <InputGroupInput
                        id={item.path}
                        placeholder={placeholder}
                        value={String(value ?? '')}
                        aria-invalid={invalid || undefined}
                        onBlur={field.handleBlur}
                        onChange={(event) => field.handleChange(event.target.value)}
                      />
                    </InputGroup>
                    {item.description ? <FieldDescription>{item.description}</FieldDescription> : null}
                    {invalid ? <FieldError>{message}</FieldError> : null}
                  </Field>
                )
              }

              if (type === 'checkbox-boolean') {
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

              const custom = renderField?.({
                field: item,
                value,
                invalid,
                message,
                placeholder,
                onBlur: field.handleBlur,
                onChange: field.handleChange,
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

export { fieldsWithValues, FormBuilder, formValuesFromFields, useFormBuilder }
export type {
  FormBuilderApi,
  FormBuilderField,
  FormBuilderFieldProps,
  FormBuilderOption,
  FormBuilderRenderField,
  FormBuilderType,
  FormBuilderValues,
}
