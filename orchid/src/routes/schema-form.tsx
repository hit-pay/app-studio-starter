import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import { DocCodePanel } from '@/components/doc/doc-code-panel'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Button } from '@/components/ui/button'
import { DatePicker, DatePickerRange } from '@/components/ui/date-picker'
import {
  SchemaForm,
  useSchemaForm,
  type SchemaFormField,
  type SchemaFormRenderField,
} from '@/components/ui/schema-form'
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs'

export const Route = createFileRoute('/schema-form')({
  component: SchemaFormExamplesPage,
})

const OPTIONS = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
]

const ACCOUNT_FIELDS: SchemaFormField[] = [
  {
    key: 'section',
    title: 'Account',
    type: 'section',
    description: 'One SchemaForm instance.',
  },
  {
    key: 'input',
    title: 'Input',
    type: 'input',
    placeholder: 'Placeholder',
    required: true,
    maxLength: 32,
    value: '',
  },
  {
    key: 'email',
    title: 'Email',
    type: 'input',
    placeholder: 'name@example.com',
    validation: 'email',
    value: '',
  },
  {
    key: 'password',
    title: 'Password',
    type: 'password',
    required: true,
    placeholder: 'At least 8 characters',
    description: 'At least 8 characters, with a letter and a number.',
    validation: '/^(?=.*[A-Za-z])(?=.*\\d).{8,}$/',
    value: '',
  },
  {
    key: 'textarea',
    title: 'Textarea',
    type: 'textarea',
    placeholder: 'Placeholder',
    minLength: 12,
    description: 'At least 12 characters.',
    value: '',
  },
  {
    key: 'select',
    title: 'Select',
    type: 'select',
    placeholder: 'Select',
    required: true,
    options: OPTIONS,
    value: 'a',
  },
  {
    key: 'combobox',
    title: 'Combobox',
    type: 'combobox',
    placeholder: 'Search',
    options: OPTIONS,
    value: 'a',
  },
  {
    key: 'combobox_multiple',
    title: 'Combobox (multiple)',
    type: 'combobox',
    props: { multiple: true },
    placeholder: 'Search',
    options: OPTIONS,
    value: ['a'],
  },
  {
    key: 'qty',
    title: 'Quantity',
    type: 'quantity',
    value: 1,
    min: 1,
    max: 99,
  },
  {
    key: 'when',
    title: 'Date',
    type: 'date',
    value: '',
  },
]

const DETAILS_FIELDS: SchemaFormField[] = [
  {
    key: 'section',
    title: 'Details',
    type: 'section',
    description: 'Second SchemaForm on the same page.',
  },
  {
    key: 'radio',
    title: 'Radio',
    type: 'radio',
    options: OPTIONS,
    value: 'a',
  },
  {
    key: 'accepted',
    title: 'I accept the terms',
    type: 'accepted',
    required: true,
    validation: 'accepted',
    value: false,
  },
  {
    key: 'address',
    title: 'Address',
    type: 'object',
    fields: [
      {
        key: 'heading',
        title: 'Address',
        type: 'section',
        description: 'Nested object — values live under address.',
      },
      {
        key: 'line1',
        title: 'Line 1',
        type: 'input',
        placeholder: '1 Harbourfront Avenue',
        required: true,
        value: '',
      },
      {
        key: 'city',
        title: 'City',
        type: 'input',
        placeholder: 'Singapore',
        value: 'Singapore',
      },
      {
        key: 'postal',
        title: 'Postal code',
        type: 'input',
        placeholder: '098632',
        value: '',
      },
    ],
  },
  {
    key: 'checkbox_group',
    title: 'Checkbox group',
    type: 'checkbox-group',
    options: OPTIONS,
    value: ['a'],
  },
  {
    key: 'switch',
    title: 'Switch',
    type: 'switch',
    value: false,
  },
  {
    key: 'slider',
    title: 'Slider',
    type: 'slider',
    value: 40,
    max: 100,
  },
  {
    key: 'min+max',
    title: 'Slider range',
    type: 'slider',
    value: { min: 20, max: 80 },
    max: 100,
  },
  {
    key: 'slider_range',
    title: 'Slider range (object)',
    type: 'slider',
    value: { min: 10, max: 70 },
    max: 100,
  },
  {
    key: 'date',
    title: 'Date',
    type: 'date',
    value: '2026-08-15',
  },
  {
    key: 'from+to',
    title: 'Date range',
    type: 'date-range',
    value: { from: '2026-01-20', to: '2026-02-09' },
  },
  {
    key: 'date_range',
    title: 'Date range (object)',
    type: 'date-range',
    value: { from: '2026-03-01', to: '2026-03-15' },
  },
  {
    key: 'amount+currency',
    title: 'Input group',
    type: 'input-group',
    placeholder: '0.00',
    options: [
      { value: 'sgd', label: 'SGD' },
      { value: 'usd', label: 'USD' },
      { value: 'myr', label: 'MYR' },
    ],
    required: true,
    props: { align: 'end' },
    value: { amount: '', currency: 'sgd' },
  },
  {
    key: 'password_protection',
    title: 'Password protection',
    type: 'section-item',
    description: 'Visitors must enter a password before they can view the store.',
    value: false,
  },
  {
    key: 'store_password',
    title: 'Store password',
    type: 'password',
    placeholder: 'Enter password',
    required: true,
    showIf: 'password_protection',
    showIfValue: true,
  },
  {
    key: 'guest_checkout',
    title: 'Guest checkout',
    type: 'section-item',
    description: 'Let customers pay without creating an account.',
    props: { background: true },
    showIf: 'password_protection',
    showIfValue: true,
    value: false,
  },
]

const TYPE_PROMPT = `Schema Form field prompt

Each item in fields is one control.

Required
- key, title, type

Optional
- required, placeholder, description, options, value
- validation, hidden, maxLength, minLength, min, max
- props — control options (e.g. combobox multiple, section-item background)
- fields — nested object children
- showIf / showIfValue — show a field when another field matches

Types
- input | password | textarea | phone
- select
- combobox — searchable; add props.multiple for chips
- radio | checkbox | checkbox-group | accepted | switch
- slider — single value; range via key "min+max" or one key with value { min, max }
- input-group — key "amount+currency" writes amount + currency
- date | quantity
- object — nest with fields[]
- hidden | section | section-item — row with title + switch
- custom via renderField — date-range uses "from+to" or one key with { from, to }

showIf
- showIf: "password_protection"
- showIfValue: true
- or arrays (AND): showIf: ["a", "b"], showIfValue: [true, "delivery"]

Validation
- pipes: email | max:255 | phone | valid_url | accepted
- or regex: /^[A-Z]{4}SG[A-Z0-9]{2}([A-Z0-9]{3})?$/

hidden: true hides the control (or type: "hidden"); the value still submits.

State lives in useSchemaForm. Render with <SchemaForm form={account} />. Call account.submit() from the host.

Example — combobox multiple
{
  "key": "channels",
  "title": "Payment channels",
  "type": "combobox",
  "props": { "multiple": true },
  "options": [
    { "value": "paynow", "label": "PayNow" },
    { "value": "card", "label": "Card" }
  ],
  "value": ["paynow"]
}`

const USAGE_EXAMPLE = `import { SchemaForm, useSchemaForm, type SchemaFormField } from '@/orchid-ui/schema-form'
import { Button } from '@/orchid-ui/button'
import { toast } from '@/orchid-ui/toast'

const FIELDS: SchemaFormField[] = [
  {
    key: 'name',
    title: 'Name',
    type: 'input',
    placeholder: 'Studio Membership',
    required: true,
    maxLength: 32,
  },
  {
    key: 'sku',
    title: 'SKU',
    type: 'input',
    placeholder: 'SKU-MEM-001',
  },
  {
    key: 'amount+currency',
    title: 'Price',
    type: 'input-group',
    placeholder: '29.00',
    required: true,
    options: [
      { value: 'sgd', label: 'SGD' },
      { value: 'usd', label: 'USD' },
    ],
    props: { align: 'end' },
    value: { amount: '', currency: 'sgd' },
  },
  {
    key: 'description',
    title: 'Description',
    type: 'textarea',
    placeholder: 'Shown on the store and invoices.',
  },
]

function CreateProduct() {
  const form = useSchemaForm({
    fields: FIELDS,
    onSubmit: (values) => {
      toast.add({
        title: 'Product saved',
        description: \`\${values.name} · \${String(values.currency).toUpperCase()} \${values.amount}\`,
        type: 'success',
      })
    },
  })

  return (
    <>
      <Button
        variant="Primary"
        disabled={form.isSubmitting}
        onClick={() => void form.submit()}
      >
        Save
      </Button>
      <SchemaForm form={form} />
    </>
  )
}

// form.values  — live values (amount + currency are sibling keys)
// form.errors  — visible field errors after touch or submit
// onSubmit     — runs only when validation passes`

function JsonPanel({ filename, data }: { filename: string; data: unknown }) {
  const code = typeof data === 'string' ? data : JSON.stringify(data, null, 2)
  return <DocCodePanel filename={filename} code={code} />
}

function toLocalYmd(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function parseLocalYmd(value: string) {
  const [year, month, day] = value.split('-').map(Number)
  if (!year || !month || !day) return undefined
  const date = new Date(year, month - 1, day)
  return Number.isNaN(date.getTime()) ? undefined : date
}

function renderDateField({ field, value, placeholder, onChange }: SchemaFormRenderField) {
  if (field.type === 'date') {
    const selected = typeof value === 'string' && value ? parseLocalYmd(value) : undefined
    return (
      <DatePicker
        selected={selected}
        placeholder={placeholder ?? 'Pick a date'}
        onSelect={(next) => onChange(next ? toLocalYmd(next) : null)}
      />
    )
  }

  if (field.type === 'date-range') {
    const plus = field.key.indexOf('+')
    const fromKey = plus === -1 ? 'from' : field.key.slice(0, plus)
    const toKey = plus === -1 ? 'to' : field.key.slice(plus + 1)
    const range = (value ?? {}) as Record<string, string | null | undefined>
    const from = range[fromKey] ?? range.from
    const to = range[toKey] ?? range.to
    return (
      <DatePickerRange
        selected={{
          from: from ? parseLocalYmd(from) : undefined,
          to: to ? parseLocalYmd(to) : undefined,
        }}
        placeholder={placeholder ?? 'Pick a date'}
        onSelect={(next) =>
          onChange({
            [fromKey]: next?.from ? toLocalYmd(next.from) : null,
            [toKey]: next?.to ? toLocalYmd(next.to) : null,
          })
        }
      />
    )
  }

  return null
}

function SchemaFormExamplesPage() {
  const account = useSchemaForm({ fields: ACCOUNT_FIELDS })
  const details = useSchemaForm({ fields: DETAILS_FIELDS })
  const [tab, setTab] = useState('result')
  const validating = account.isSubmitting || details.isSubmitting

  return (
    <DocExamplePage to="/schema-form" usage={USAGE_EXAMPLE}>
      <div className="grid min-w-0 gap-6 xl:grid-cols-3">
        <SchemaForm form={account} className="max-w-none" renderField={renderDateField} />
        <SchemaForm form={details} className="max-w-none" renderField={renderDateField} />
        <div className="flex min-w-0 flex-col gap-4">
          <Button
            variant="Primary"
            disabled={validating}
            aria-busy={validating}
            onClick={() => void Promise.all([account.submit(), details.submit()])}
          >
            {validating ? 'Validating…' : 'Validate'}
          </Button>
          <Tabs
            value={tab}
            onValueChange={(value) => setTab(String(value))}
            className="min-w-0 gap-3"
          >
            <TabsList>
              <TabsTrigger value="result">Result</TabsTrigger>
              <TabsTrigger value="errors">Errors</TabsTrigger>
              <TabsTrigger value="schema">Schema</TabsTrigger>
              <TabsTrigger value="prompt">Prompt</TabsTrigger>
            </TabsList>
            <TabsContent value="result" className="min-w-0">
              <JsonPanel
                filename="result.json"
                data={{ account: account.values, details: details.values }}
              />
            </TabsContent>
            <TabsContent value="errors" className="min-w-0">
              <JsonPanel
                filename="errors.json"
                data={{ account: account.errors, details: details.errors }}
              />
            </TabsContent>
            <TabsContent value="schema" className="min-w-0">
              <JsonPanel
                filename="fields.json"
                data={{ account: ACCOUNT_FIELDS, details: DETAILS_FIELDS }}
              />
            </TabsContent>
            <TabsContent value="prompt" className="min-w-0">
              <JsonPanel filename="prompt.txt" data={TYPE_PROMPT} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DocExamplePage>
  )
}
