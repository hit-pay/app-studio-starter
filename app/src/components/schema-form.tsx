import { type ReactNode } from 'react'
import { useForm, useStore } from '@tanstack/react-form'

import { cn } from '@/lib/utils'
import { Checkbox, CheckboxGroup } from '@/components/ui/checkbox'
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
} from '@/components/ui/combobox'
import { DatePicker, DatePickerRange, DateTimePicker } from '@/components/date-picker'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupSeparator,
  InputGroupText,
} from '@/components/ui/input-group'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FormSectionItem } from '@/components/ui/form-section'
import { QuantityInput } from '@/components/quantity-input'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
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
  type SchemaFormColumnSpan,
  type SchemaFormField,
  type SchemaFormFieldProps,
  type SchemaFormLayout,
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

type SchemaFormChange = {
  path: string
  paths: string[]
  value: unknown
  previousValue: unknown
  changedValues: Record<string, unknown>
  previousValues: Record<string, unknown>
  field: FlatField
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
  layout,
  onChange,
}: {
  form: SchemaFormApi
  id?: string
  className?: string
  renderField?: (ctx: SchemaFormRenderField) => ReactNode
  layout?: SchemaFormLayout
  onChange?: (values: SchemaFormValues, change: SchemaFormChange) => void
}) {
  const { form, fields, values } = builder
  const defaultValues = formValuesFromFields(fields)
  const flat = flattenFields(fields).filter((item) => isDisplayed(item, values))
  const columns = layout?.columns ?? 1
  const gridColumns = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4',
  }[columns]

  function columnSpan(item: FlatField): SchemaFormColumnSpan {
    if (item.type === 'section' || item.type === 'section-item') return 'full'
    return (
      item.props?.colSpan ??
      layout?.fields?.[item.path] ??
      layout?.fields?.[item.key] ??
      layout?.types?.[item.type as SchemaFormType] ??
      1
    )
  }

  function columnSpanClass(span: SchemaFormColumnSpan) {
    if (span === 'full') return 'col-span-full'
    if (span === 2) return 'md:col-span-2'
    if (span === 3) return 'md:col-span-2 xl:col-span-3'
    if (span === 4) return 'md:col-span-2 xl:col-span-4'
    return undefined
  }

  function changeField(
    item: FlatField,
    updates: Array<{ path: string; value: unknown }>,
    handlePrimaryChange: (next: unknown) => void,
  ) {
    const previousFlat = formValuesFromFields(fields)
    for (const flatField of flattenFields(fields)) {
      previousFlat[flatField.path] = getValueByPath(values, flatField.path)
    }
    const changed = updates.filter(
      (update) => !Object.is(previousFlat[update.path], update.value),
    )

    if (updates[0]) handlePrimaryChange(updates[0].value)
    for (const update of updates.slice(1)) form.setFieldValue(update.path, update.value)
    if (!changed.length || !onChange) return

    const nextFlat = { ...previousFlat }
    for (const update of updates) nextFlat[update.path] = update.value
    const paths = changed.map((update) => update.path)
    const changedValues = Object.fromEntries(changed.map((update) => [update.path, update.value]))
    const previousValues = Object.fromEntries(
      changed.map((update) => [update.path, previousFlat[update.path]]),
    )
    const primary = changed[0]!
    onChange(nestValues(nextFlat, defaultValues), {
      path: primary.path,
      paths,
      value: primary.value,
      previousValue: previousFlat[primary.path],
      changedValues,
      previousValues,
      field: item,
    })
  }

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
      <FieldGroup className={cn('grid gap-6', gridColumns)}>
        {flat.map((item) => (
          <div key={item.path} className={cn('min-w-0', columnSpanClass(columnSpan(item)))}>
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
                        onCheckedChange={(checked) =>
                          changeField(item, [{ path: item.path, value: checked }], field.handleChange)
                        }
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
                      onSelect={(next) =>
                        changeField(
                          item,
                          [{ path: item.path, value: next ? toLocalYmd(next) : '' }],
                          field.handleChange,
                        )
                      }
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
                      onSelect={(next) =>
                        changeField(
                          item,
                          [{ path: item.path, value: next ? next.toISOString() : '' }],
                          field.handleChange,
                        )
                      }
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
                          changeField(
                            item,
                            [
                              { path: item.path, value: from },
                              { path: secondPath, value: to },
                            ],
                            field.handleChange,
                          )
                          return
                        }
                        changeField(
                          item,
                          [{ path: item.path, value: { from, to } }],
                          field.handleChange,
                        )
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
                      onChange={(event) =>
                        changeField(
                          item,
                          [{ path: item.path, value: event.target.files?.[0] ?? '' }],
                          field.handleChange,
                        )
                      }
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
                      onValueChange={(next) =>
                        changeField(item, [{ path: item.path, value: next }], field.handleChange)
                      }
                    />
                    {item.description ? <FieldDescription>{item.description}</FieldDescription> : null}
                    {invalid ? <FieldError>{message}</FieldError> : null}
                  </Field>
                )
              }

              if (type === 'switch') {
                return (
                  <Field orientation="horizontal" data-invalid={invalid || undefined}>
                    <Switch
                      id={item.path}
                      checked={Boolean(value)}
                      onCheckedChange={(checked) =>
                        changeField(item, [{ path: item.path, value: checked }], field.handleChange)
                      }
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
                      onValueChange={(next) =>
                        changeField(item, [{ path: item.path, value: next }], field.handleChange)
                      }
                    >
                      {(item.options ?? []).map((option) => {
                        const checkboxId = `${item.path}-${option.value}`

                        return (
                          <Field key={option.value} orientation="horizontal">
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
                          changeField(
                            item,
                            [
                              { path: item.path, value: thumbs[0] || 0 },
                              { path: secondPath, value: thumbs[1] || 0 },
                            ],
                            field.handleChange,
                          )
                          return
                        }
                        if (objectRange || thumbs.length >= 2) {
                          changeField(
                            item,
                            [{
                              path: item.path,
                              value: {
                                min: thumbs[0] || 0,
                                max: thumbs[1] ?? thumbs[0] ?? 0,
                              },
                            }],
                            field.handleChange,
                          )
                          return
                        }
                        changeField(
                          item,
                          [{ path: item.path, value: thumbs[0] || 0 }],
                          field.handleChange,
                        )
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
                      onChange={(next) =>
                        changeField(item, [{ path: item.path, value: next }], field.handleChange)
                      }
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
                  changeField(
                    item,
                    [{
                      path: item.path,
                      value: keys ? next : { ...group, input: next },
                    }],
                    field.handleChange,
                  )
                }
                const setSelect = (next: string) => {
                  changeField(
                    item,
                    [{
                      path: selectPath ?? item.path,
                      value: selectPath ? next : { ...group, select: next },
                    }],
                    selectPath
                      ? (value) => form.setFieldValue(selectPath, value)
                      : field.handleChange,
                  )
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
                  <Field orientation="horizontal" data-invalid={invalid || undefined}>
                    <Checkbox
                      id={item.path}
                      checked={Boolean(value)}
                      aria-invalid={invalid || undefined}
                      onCheckedChange={(checked) =>
                        changeField(
                          item,
                          [{ path: item.path, value: checked === true }],
                          field.handleChange,
                        )
                      }
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
                    <FieldLabel>{item.title}</FieldLabel>
                    <RadioGroup
                      value={value == null ? null : String(value)}
                      onValueChange={(next) =>
                        changeField(
                          item,
                          [{ path: item.path, value: String(next) }],
                          field.handleChange,
                        )
                      }
                    >
                      {(item.options ?? []).map((option) => {
                        const optionId = `${item.path}-${option.value}`

                        return (
                          <div key={option.value} className="flex items-center gap-2">
                            <RadioGroupItem
                              id={optionId}
                              value={option.value}
                              aria-invalid={invalid || undefined}
                            />
                            <FieldLabel htmlFor={optionId}>{option.label}</FieldLabel>
                          </div>
                        )
                      })}
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
                    changeField(
                      item,
                      [
                        {
                          path: item.path,
                          value: next[pair.first] ?? next.from ?? null,
                        },
                        {
                          path: pairSecondPath,
                          value: next[pair.second] ?? next.to ?? null,
                        },
                      ],
                      field.handleChange,
                    )
                    return
                  }
                  changeField(item, [{ path: item.path, value: next }], field.handleChange)
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
                      onChange={(event) =>
                        changeField(
                          item,
                          [{ path: item.path, value: event.target.value }],
                          field.handleChange,
                        )
                      }
                    />
                  ) : type === 'select' ? (
                    <Select
                      value={value == null || value === '' ? null : String(value)}
                      onValueChange={(next) =>
                        changeField(item, [{ path: item.path, value: next }], field.handleChange)
                      }
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
                      onChange={(event) =>
                        changeField(
                          item,
                          [{ path: item.path, value: event.target.value }],
                          field.handleChange,
                        )
                      }
                    />
                  )}
                  {item.description ? <FieldDescription>{item.description}</FieldDescription> : null}
                  {invalid ? <FieldError>{message}</FieldError> : null}
                </Field>
              )
            }}
            </form.Field>
          </div>
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
  SchemaFormChange,
  SchemaFormColumnSpan,
  SchemaFormField,
  SchemaFormFieldProps,
  SchemaFormInstance,
  SchemaFormLayout,
  SchemaFormOption,
  SchemaFormRenderField,
  SchemaFormType,
  SchemaFormValues,
}
