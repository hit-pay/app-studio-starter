import { useId, useRef, type ReactNode } from 'react'
import { useForm, useStore } from '@tanstack/react-form'
import {
  FileCodeRegular,
  FileRegular,
  TableRegular,
  PicRegular,
  UploadRegular,
  CloseRegular,
} from '@mingcute/react/core-regular'

import { cn } from '@/lib/utils'
import { Checkbox, CheckboxGroup } from '@ui/form/checkbox'
import { Select } from '@/components/form/select'
import { DatePicker, DatePickerRange, DateTimePicker } from '@/components/form/date-picker'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@ui/form/field'
import { Input } from '@ui/form/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupSeparator,
  InputGroupText,
} from '@ui/form/input-group'
import { RadioGroup, RadioGroupItem } from '@ui/form/radio-group'
import { FormSectionItem } from '@ui/form/form-section'
import { QuantityInput } from '@/components/form/quantity-input'
import { ChoiceCard, ChoiceCardGroup } from '@/components/form/choice-card'
import { Slider } from '@ui/form/slider'
import { Textarea } from '@ui/form/textarea'
import { Switch } from '@ui/form/switch'
import { Button } from '@ui/actions/button'
import {
  FileUpload,
  FileUploadAction,
  FileUploadActions,
  FileUploadContent,
  FileUploadDescription,
  FileUploadGroup,
  FileUploadMedia,
  FileUploadTitle,
} from '@ui/form/file-upload'
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
  isMultiFile,
  isPlainObject,
  nestValues,
  pairKeys,
  parseDateValue,
  siblingPath,
  toLocalYmd,
  validateField,
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
} from './form-builder-model'

function formatFileSize(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function FileGlyph({ file }: { file: File }) {
  if (file.type.startsWith('image/')) {
    return <PicRegular />
  }
  if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
    return <FileRegular />
  }
  if (file.type.includes('sheet') || /\.(csv|xlsx|xls)$/i.test(file.name)) {
    return <TableRegular />
  }
  if (/\.(tsx|ts|jsx|js|json)$/i.test(file.name)) {
    return <FileCodeRegular />
  }
  return <FileRegular />
}

function filesFromValue(value: unknown, multiple: boolean) {
  if (multiple) {
    return Array.isArray(value) ? value.filter((item): item is File => item instanceof File) : []
  }
  return value instanceof File ? [value] : []
}

function FormFileField({
  item,
  value,
  invalid,
  message,
  onBlur,
  onChange,
}: {
  item: FlatField
  value: unknown
  invalid: boolean
  message: string
  onBlur: () => void
  onChange: (next: unknown) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const inputId = useId()
  const multiple = isMultiFile(item)
  const files = filesFromValue(value, multiple)
  const accept = typeof item.props?.accept === 'string' ? item.props.accept : undefined

  const setFiles = (next: File[]) => {
    onChange(multiple ? next : (next[0] ?? ''))
  }

  return (
    <Field data-invalid={invalid || undefined}>
      <FieldLabel htmlFor={inputId}>{item.title}</FieldLabel>
      <input
        id={inputId}
        ref={inputRef}
        type="file"
        name={item.path}
        multiple={multiple}
        accept={accept}
        className="sr-only"
        onBlur={onBlur}
        onChange={(event) => {
          const picked = event.target.files ? Array.from(event.target.files) : []
          setFiles(multiple ? [...files, ...picked] : picked.slice(0, 1))
          event.target.value = ''
        }}
      />
      <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()}>
        <UploadRegular />
        {multiple ? 'Choose files' : 'Choose file'}
      </Button>
      {files.length ? (
        <FileUploadGroup>
          {files.map((file, index) => (
            <FileUpload key={`${file.name}-${file.size}-${file.lastModified}-${index}`} className="w-full">
              <FileUploadMedia>
                <FileGlyph file={file} />
              </FileUploadMedia>
              <FileUploadContent>
                <FileUploadTitle>{file.name}</FileUploadTitle>
                <FileUploadDescription>
                  {(file.type || 'File') + ' · ' + formatFileSize(file.size)}
                </FileUploadDescription>
              </FileUploadContent>
              <FileUploadActions>
                <FileUploadAction
                  aria-label={`Remove ${file.name}`}
                  onClick={() => setFiles(files.filter((_, itemIndex) => itemIndex !== index))}
                >
                  <CloseRegular />
                </FileUploadAction>
              </FileUploadActions>
            </FileUpload>
          ))}
        </FileUploadGroup>
      ) : null}
      <FieldHint invalid={invalid} message={message} description={item.description} />
    </Field>
  )
}

function FieldHint({
  invalid,
  message,
  description,
}: {
  invalid: boolean
  message: string
  description?: string | null
}) {
  if (invalid) return <FieldError>{message}</FieldError>
  if (description) return <FieldDescription>{description}</FieldDescription>
  return null
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
  const options = item.options ?? []
  const multiple = isMultiCombobox(item)

  return (
    <Select
      id={item.path}
      options={options}
      multiple={multiple}
      searchable={item.type === 'combobox' || multiple}
      value={
        multiple
          ? Array.isArray(value)
            ? value.map(String)
            : []
          : value == null || value === ''
            ? null
            : String(value)
      }
      invalid={invalid}
      placeholder={placeholder}
      onBlur={onBlur}
      onValueChange={(next) => onChange(next ?? (multiple ? [] : ''))}
    />
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

/** Render a `useSchemaForm` instance. Put it in FormLayout. Do not wrap it. Unknown field types throw. */
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
      className={cn('flex w-full min-w-0 max-w-xl flex-col gap-4 overflow-visible', className)}
      onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()
        void form.handleSubmit()
      }}
    >
      <FieldGroup className={cn('grid gap-4', gridColumns)}>
        {flat.map((item) => (
          <div key={item.path} className={cn('min-w-0 overflow-visible', columnSpanClass(columnSpan(item)))}>
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
                    variant={item.props?.background === true ? 'background' : 'default'}
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
                    <p className="text-base font-medium leading-6 text-oc-foreground">{item.title}</p>
                    {item.description ? (
                      <p className="text-xs leading-5 text-oc-muted-foreground">{item.description}</p>
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
                    <FieldHint invalid={invalid} message={message} description={item.description} />
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
                    <FieldHint invalid={invalid} message={message} description={item.description} />
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
                    <FieldHint invalid={invalid} message={message} description={item.description} />
                  </Field>
                )
              }

              if (type === 'file') {
                return (
                  <FormFileField
                    item={item}
                    value={value}
                    invalid={invalid}
                    message={message}
                    onBlur={field.handleBlur}
                    onChange={(next) =>
                      changeField(item, [{ path: item.path, value: next }], field.handleChange)
                    }
                  />
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
                    <FieldHint invalid={invalid} message={message} description={item.description} />
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
                    <FieldHint invalid={invalid} message={message} description={item.description} />
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
                    <FieldHint invalid={invalid} message={message} description={item.description} />
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
                    <FieldHint invalid={invalid} message={message} description={item.description} />
                  </Field>
                )
              }

              if (type === 'combobox' || type === 'select') {
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
                    <FieldHint invalid={invalid} message={message} description={item.description} />
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
                const addonEnd = /^end$/i.test(String(item.props?.align ?? ''))
                const selectAddon = (item.options ?? []).length ? (
                  <InputGroupAddon align={addonEnd ? 'inline-end' : 'inline-start'}>
                    <Select
                      id={`${item.path}-select`}
                      size="inline"
                      className="uppercase"
                      options={item.options ?? []}
                      value={selectValue || null}
                      onValueChange={(next) => setSelect(String(next ?? ''))}
                    />
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
                    <FieldHint invalid={invalid} message={message} description={item.description} />
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
                      <FieldHint invalid={invalid} message={message} description={item.description} />
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
                    <FieldHint invalid={invalid} message={message} description={item.description} />
                  </Field>
                )
              }

              if (type === 'choice-card') {
                const groupAlignment =
                  item.props?.alignment === 'Horizontal' || item.props?.alignment === 'horizontal'
                    ? 'horizontal'
                    : 'vertical'
                const cardAlignment =
                  item.props?.cardAlignment === 'Center' || item.props?.cardAlignment === 'center'
                    ? 'center'
                    : 'left'

                return (
                  <Field data-invalid={invalid || undefined}>
                    <FieldLabel>{item.title}</FieldLabel>
                    <ChoiceCardGroup
                      value={value == null || value === '' ? null : String(value)}
                      alignment={groupAlignment}
                      onValueChange={(next) =>
                        changeField(
                          item,
                          [{ path: item.path, value: String(next) }],
                          field.handleChange,
                        )
                      }
                    >
                      {(item.options ?? []).map((option) => (
                        <ChoiceCard
                          key={option.value}
                          value={option.value}
                          title={option.label}
                          description={option.description}
                          alignment={cardAlignment}
                        />
                      ))}
                    </ChoiceCardGroup>
                    <FieldHint invalid={invalid} message={message} description={item.description} />
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
                    <FieldHint invalid={invalid} message={message} description={item.description} />
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
                  <FieldHint invalid={invalid} message={message} description={item.description} />
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
  SchemaForm as FormBuilder,
  SCHEMA_FORM_EXAMPLE_FIELDS,
  SCHEMA_FORM_TYPES,
  useSchemaForm,
  useSchemaForm as useFormBuilder,
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
