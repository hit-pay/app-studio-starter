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
import { DatePicker, DatePickerRange, DateTimePicker } from './date-picker'
import {
  Field,
  FieldContent,
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
import { FormSectionItem } from './form-section'
import { QuantityInput } from './quantity-input'
import { Slider } from './slider'
import { Textarea } from './textarea'
import { Switch } from './switch'
import {
  controlType,
  dateRangeValue,
  fieldMaxLength,
  fieldMinLength,
  fieldsWithValues,
  flattenFields,
  formValuesFromFields,
  getValueByPath,
  inputGroupKeys,
  inputGroupValue,
  isDisplayed,
  isMultiCombobox,
  isPlainObject,
  labelsFromValues,
  nestValues,
  pairKeys,
  parseDateValue,
  siblingPath,
  toLocalYmd,
  validateField,
  valuesFromLabels,
  SCHEMA_FORM_EXAMPLE_FIELDS,
  SCHEMA_FORM_TYPES,
  type FlatField,
  type SchemaFormField,
  type SchemaFormFieldProps,
  type SchemaFormOption,
  type SchemaFormRenderField,
  type SchemaFormType,
  type SchemaFormValues,
} from './schema-form-model'

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
                  <FormSectionItem
                    title={item.title}
                    description={item.description ?? undefined}
                    variant={item.props?.background === true ? 'Background' : 'Default'}
                    actions={
                      <Switch
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

              if (type === 'date') {
                const selected = parseDateValue(value)
                return (
                  <Field data-invalid={invalid || undefined}>
                    <FieldLabel>{item.title}</FieldLabel>
                    <DatePicker
                      selected={selected}
                      placeholder={placeholder ?? 'Pick a date'}
                      onSelect={(next) => field.handleChange(next ? toLocalYmd(next) : '')}
                    />
                    {item.description ? <FieldDescription>{item.description}</FieldDescription> : null}
                    {invalid ? <FieldError>{message}</FieldError> : null}
                  </Field>
                )
              }

              if (type === 'datetime') {
                const selected = parseDateValue(value)
                return (
                  <Field data-invalid={invalid || undefined}>
                    <FieldLabel>{item.title}</FieldLabel>
                    <DateTimePicker
                      selected={selected}
                      placeholder={placeholder ?? 'Pick a date'}
                      onSelect={(next) => field.handleChange(next ? next.toISOString() : '')}
                    />
                    {item.description ? <FieldDescription>{item.description}</FieldDescription> : null}
                    {invalid ? <FieldError>{message}</FieldError> : null}
                  </Field>
                )
              }

              if (type === 'date-range') {
                const keys = pairKeys(item)
                const secondPath = keys ? siblingPath(item.path, keys.second) : null
                const range = keys
                  ? {
                      from: String(value ?? ''),
                      to: String(secondPath ? (getValueByPath(values, secondPath) ?? '') : ''),
                    }
                  : dateRangeValue(item, value)
                return (
                  <Field data-invalid={invalid || undefined}>
                    <FieldLabel>{item.title}</FieldLabel>
                    <DatePickerRange
                      selected={{
                        from: parseDateValue(range.from),
                        to: parseDateValue(range.to),
                      }}
                      placeholder={placeholder ?? 'Pick a date'}
                      onSelect={(next) => {
                        const from = next?.from ? toLocalYmd(next.from) : ''
                        const to = next?.to ? toLocalYmd(next.to) : ''
                        if (keys && secondPath) {
                          field.handleChange(from)
                          form.setFieldValue(secondPath, to)
                          return
                        }
                        field.handleChange({ from, to })
                      }}
                    />
                    {item.description ? <FieldDescription>{item.description}</FieldDescription> : null}
                    {invalid ? <FieldError>{message}</FieldError> : null}
                  </Field>
                )
              }

              if (type === 'file') {
                const file = value instanceof File ? value : null
                return (
                  <Field data-invalid={invalid || undefined}>
                    <FieldLabel>{item.title}</FieldLabel>
                    <Input
                      type="file"
                      name={item.path}
                      onBlur={field.handleBlur}
                      onChange={(event) => field.handleChange(event.target.files?.[0] ?? '')}
                    />
                    {file ? (
                      <FieldDescription>{file.name}</FieldDescription>
                    ) : item.description ? (
                      <FieldDescription>{item.description}</FieldDescription>
                    ) : null}
                    {invalid ? <FieldError>{message}</FieldError> : null}
                  </Field>
                )
              }

              if (type === 'quantity') {
                const qtyMin = item.min ?? (typeof item.props?.min === 'number' ? item.props.min : 0)
                return (
                  <Field data-invalid={invalid || undefined}>
                    <FieldLabel>{item.title}</FieldLabel>
                    <QuantityInput
                      value={Number(value) || 0}
                      min={qtyMin}
                      max={item.max}
                      onValueChange={(next) => field.handleChange(next)}
                    />
                    {item.description ? <FieldDescription>{item.description}</FieldDescription> : null}
                    {invalid ? <FieldError>{message}</FieldError> : null}
                  </Field>
                )
              }

              if (type === 'switch') {
                return (
                  <Field orientation="Horizontal" data-invalid={invalid || undefined}>
                    <Switch
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
                      {(item.options ?? []).map((option) => {
                        const checkboxId = `${item.path}-${option.value}`

                        return (
                          <Field key={option.value} orientation="Horizontal">
                            <Checkbox
                              id={checkboxId}
                              value={option.value}
                              aria-invalid={invalid || undefined}
                            />
                            <FieldLabel htmlFor={checkboxId}>{option.label}</FieldLabel>
                          </Field>
                        )
                      })}
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
                  <Field orientation="Horizontal" data-invalid={invalid || undefined}>
                    <Checkbox
                      id={item.path}
                      checked={Boolean(value)}
                      aria-invalid={invalid || undefined}
                      onCheckedChange={(checked) => field.handleChange(checked === true)}
                      onBlur={field.handleBlur}
                    />
                    <FieldContent>
                      <FieldLabel htmlFor={item.path}>{item.title}</FieldLabel>
                      {item.description ? (
                        <FieldDescription>{item.description}</FieldDescription>
                      ) : null}
                      {invalid ? <FieldError>{message}</FieldError> : null}
                    </FieldContent>
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
                      minLength={fieldMinLength(item)}
                      maxLength={fieldMaxLength(item)}
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
                      maxLength={fieldMaxLength(item) ?? (item.type === 'input' ? 255 : undefined)}
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

export {
  fieldsWithValues,
  formValuesFromFields,
  SchemaForm,
  SCHEMA_FORM_EXAMPLE_FIELDS,
  SCHEMA_FORM_TYPES,
  useSchemaForm,
}
export type {
  SchemaFormApi,
  SchemaFormField,
  SchemaFormFieldProps,
  SchemaFormInstance,
  SchemaFormOption,
  SchemaFormRenderField,
  SchemaFormType,
  SchemaFormValues,
}
