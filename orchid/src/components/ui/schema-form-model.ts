export const SCHEMA_FORM_TYPES = [
  'input',
  'password',
  'textarea',
  'select',
  'combobox',
  'radio',
  'checkbox',
  'checkbox-group',
  'accepted',
  'switch',
  'slider',
  'input-group',
  'object',
  'hidden',
  'phone',
  'date',
  'quantity',
  'section',
  'section-item',
] as const

export type SchemaFormType = (typeof SCHEMA_FORM_TYPES)[number]

export type SchemaFormOption = {
  value: string
  label: string
}

export type SchemaFormFieldProps = {
  multiple?: boolean
  background?: boolean
  align?: 'start' | 'end'
  min?: number
  [key: string]: unknown
}

/**
 * One field in a SchemaForm.
 *
 * Keys: showIf, maxLength, minLength, hidden (camelCase).
 * Pair keys: `amount+currency` writes two values. `key+` is only for input-group / range slider.
 */
export type SchemaFormField = {
  key: string
  title: string
  type: SchemaFormType | (string & {})
  required?: boolean
  placeholder?: string | null
  description?: string | null
  options?: SchemaFormOption[]
  value?: unknown
  validation?: string | null
  hidden?: boolean
  maxLength?: number
  minLength?: number
  min?: number
  max?: number
  props?: SchemaFormFieldProps
  showIf?: string | string[]
  showIfValue?: unknown
  format?: string
  parent?: string
  fields?: SchemaFormField[]
}

export type SchemaFormValues = Record<string, unknown>

export type FlatField = SchemaFormField & { path: string }

export type SchemaFormRenderField = {
  field: FlatField
  value: unknown
  invalid: boolean
  message: string
  placeholder?: string
  onBlur: () => void
  onChange: (next: unknown) => void
}

export const SCHEMA_FORM_EXAMPLE_FIELDS: SchemaFormField[] = [
  { key: 'name', title: 'Name', type: 'input', required: true, maxLength: 32 },
  { key: 'qty', title: 'Quantity', type: 'quantity', value: 1, min: 1, max: 99 },
  { key: 'when', title: 'Date', type: 'date' },
]

export function fieldShowIf(field: SchemaFormField) {
  return field.showIf
}

export function fieldShowIfValue(field: SchemaFormField) {
  return field.showIfValue
}

export function fieldMaxLength(field: SchemaFormField) {
  return field.maxLength
}

export function fieldMinLength(field: SchemaFormField) {
  return field.minLength
}

export function fieldHidden(field: SchemaFormField) {
  return field.hidden === true || field.type === 'hidden'
}

export function pairKeys(field: SchemaFormField) {
  const plus = field.key.indexOf('+')
  if (plus === -1) return null
  return {
    first: field.key.slice(0, plus),
    second: field.key.slice(plus + 1),
  }
}

export function inputGroupKeys(field: SchemaFormField) {
  if (field.type !== 'input-group') return null
  const keys = pairKeys(field)
  return keys ? { input: keys.first, select: keys.second } : null
}

export function siblingPath(path: string, key: string) {
  const parts = path.split('.')
  parts[parts.length - 1] = key
  return parts.join('.')
}

export function isPlainObject(value: unknown): value is SchemaFormValues {
  return value != null && typeof value === 'object' && !Array.isArray(value)
}

export function inputGroupValue(field: SchemaFormField, value: unknown) {
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

export function isMultiCombobox(field: SchemaFormField) {
  return field.type === 'combobox' && field.props?.multiple === true
}

function defaultValueFor(field: SchemaFormField): unknown {
  if (field.type === 'input-group' && !inputGroupKeys(field)) {
    return inputGroupValue(field, field.value)
  }
  if (field.value !== undefined) return field.value
  if (
    field.type === 'accepted' ||
    field.type === 'checkbox' ||
    field.type === 'switch' ||
    field.type === 'section-item'
  ) {
    return false
  }
  if (field.type === 'checkbox-group' || isMultiCombobox(field)) {
    return []
  }
  if (field.type === 'slider') return 0
  if (field.type === 'quantity') return 1
  if (field.type === 'date') return ''
  if (field.type === 'object') return formValuesFromFields(field.fields ?? [])
  if (field.type === 'section') return ''
  return ''
}

export function formValuesFromFields(fields: SchemaFormField[]): SchemaFormValues {
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

export function flattenFields(fields: SchemaFormField[], prefix = ''): FlatField[] {
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

export function getValueByPath(values: SchemaFormValues, path: string) {
  return path.split('.').reduce<unknown>((cursor, key) => {
    if (!isPlainObject(cursor)) return undefined
    return cursor[key]
  }, values)
}

function matchesShowIf(actual: unknown, expected: unknown) {
  if (expected === undefined) return Boolean(actual)
  return Object.is(actual, expected)
}

export function isDisplayed(field: SchemaFormField, values: SchemaFormValues) {
  if (fieldHidden(field)) return false
  const showIf = fieldShowIf(field)
  if (!showIf) return true
  const keys = Array.isArray(showIf) ? showIf : [showIf]
  const expected = fieldShowIfValue(field)
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

export function nestValues(value: SchemaFormValues, fallback: SchemaFormValues): SchemaFormValues {
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

export function fieldsWithValues(fields: SchemaFormField[], values: SchemaFormValues): SchemaFormField[] {
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
    type === 'switch' ||
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
  if (type === 'quantity') {
    return value == null || value === ''
  }
  if (type === 'date') {
    if (value instanceof Date) return Number.isNaN(value.getTime())
    return value == null || value === ''
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

export function validateField(field: SchemaFormField, value: unknown) {
  if (isEmpty(value, field)) {
    return field.required ? `${field.title} is required` : undefined
  }

  const minLength = fieldMinLength(field)
  if (minLength != null && String(value).length < minLength) {
    return `Must be at least ${minLength} characters`
  }

  const maxLength = fieldMaxLength(field)
  if (maxLength != null && String(value).length > maxLength) {
    return `Must be at most ${maxLength} characters`
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

export function controlType(type: SchemaFormType | (string & {})) {
  if (type === 'phone') return 'input'
  if (type === 'password') return 'password'
  if (type === 'accepted' || type === 'checkbox') return 'accepted'
  return type
}

export function labelsFromValues(options: SchemaFormOption[], value: unknown) {
  const selected = Array.isArray(value) ? value.map(String) : []
  return selected.map((entry) => options.find((option) => option.value === entry)?.label ?? entry)
}

export function valuesFromLabels(options: SchemaFormOption[], labels: unknown) {
  const next = Array.isArray(labels) ? labels.map(String) : []
  return next.map((label) => options.find((option) => option.label === label)?.value ?? label)
}

export function parseDateValue(value: unknown): Date | undefined {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value
  if (typeof value === 'string' && value) {
    const next = new Date(value)
    if (!Number.isNaN(next.getTime())) return next
  }
  return undefined
}
