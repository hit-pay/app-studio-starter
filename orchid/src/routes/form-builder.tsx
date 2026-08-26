import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { CheckIcon, CopyIcon } from 'lucide-react'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Button } from '@/components/ui/button'
import { DatePicker, DatePickerRange } from '@/components/ui/date-picker'
import {
  FormBuilder,
  useFormBuilder,
  type FormBuilderField,
  type FormBuilderRenderField,
} from '@/components/ui/form-builder'
import { TabMenu, TabMenuList, TabMenuPanel, TabMenuTab } from '@/components/ui/tab-menu'

export const Route = createFileRoute('/form-builder')({
  component: FormBuilderExamplesPage,
})

const OPTIONS = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
]

const ACCOUNT_FIELDS: FormBuilderField[] = [
  {
    key: 'section',
    title: 'Account',
    type: 'section',
    description: 'One FormBuilder instance.',
  },
  {
    key: 'input',
    title: 'Input',
    type: 'input',
    placeholder: 'Placeholder',
    required: true,
    max_length: 32,
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
    min_length: 12,
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
]

const DETAILS_FIELDS: FormBuilderField[] = [
  {
    key: 'section',
    title: 'Details',
    type: 'section',
    description: 'Second FormBuilder on the same page.',
  },
  {
    key: 'radio',
    title: 'Radio',
    type: 'radio',
    options: OPTIONS,
    value: 'a',
  },
  {
    key: 'checkbox',
    title: 'Checkbox',
    type: 'checkbox-boolean',
    value: false,
  },
  {
    key: 'checkbox_group',
    title: 'Checkbox group',
    type: 'checkbox-group',
    options: OPTIONS,
    value: ['a'],
  },
  {
    key: 'toggle',
    title: 'Toggle',
    type: 'toggle',
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
    key: 'date',
    title: 'Date',
    type: 'date',
    value: '2026-08-15',
  },
  {
    key: 'date_range',
    title: 'Date range',
    type: 'date-range',
    value: { from: '2026-01-20', to: '2026-02-09' },
  },
  {
    key: 'amount',
    title: 'Input group',
    type: 'input-group',
    placeholder: '0.00',
    value: '',
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
    show_if: 'password_protection',
    show_if_value: true,
  },
  {
    key: 'guest_checkout',
    title: 'Guest checkout',
    type: 'section-item',
    description: 'Let customers pay without creating an account.',
    props: { background: true },
    show_if: 'password_protection',
    show_if_value: true,
    value: false,
  },
]

const TYPE_PROMPT = `Form Builder field prompt

Each item in fields is one control.

Required
- key, title, type

Optional
- required, placeholder, description, options, value
- validation, force_display, max_length, min_length, max
- props — control options (e.g. combobox multiple, section-item background)
- fields — nested object children
- show_if / show_if_value — show a field when another field matches

Types
- input | password | textarea | phone
- select
- combobox — searchable; add props.multiple for chips
- radio | checkbox | checkbox-boolean | checkbox-group | accepted | toggle
- slider | input-group
- object — nest with fields[]
- hidden | section | section-item — row with title + toggle (Figma Section Item)
- custom via renderField — date, date-range, file, input-stepper, slots

show_if
- show_if: "password_protection"
- show_if_value: true
- or arrays (AND): show_if: ["a", "b"], show_if_value: [true, "delivery"]

Validation
- pipes: email | max:255 | phone | valid_url | accepted
- or regex: /^[A-Z]{4}SG[A-Z0-9]{2}([A-Z0-9]{3})?$/

force_display: false hides the control; the value still submits.

State lives in useFormBuilder. Render with <FormBuilder form={account} />. Call account.submit() from the host.

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

function JsonPanel({ filename, data }: { filename: string; data: unknown }) {
  const code = typeof data === 'string' ? data : JSON.stringify(data, null, 2)
  const [copied, setCopied] = useState(false)

  return (
    <div className="flex max-h-[70vh] min-w-0 flex-col overflow-hidden rounded-xl border border-solid border-oc-border bg-oc-muted">
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-solid border-oc-border px-3 py-2">
        <span className="truncate font-mono text-xs text-oc-muted-foreground">{filename}</span>
        <Button
          type="Secondary"
          style="Border"
          size="Small"
          onClick={async () => {
            await navigator.clipboard.writeText(code)
            setCopied(true)
            window.setTimeout(() => setCopied(false), 1600)
          }}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>
      <pre className="min-h-0 flex-1 overflow-auto p-4 text-[13px] leading-5 break-all whitespace-pre-wrap text-oc-foreground">
        <code>{code}</code>
      </pre>
    </div>
  )
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

function renderDateField({ field, value, placeholder, onChange }: FormBuilderRenderField) {
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
    const range = (value ?? {}) as { from?: string | null; to?: string | null }
    return (
      <DatePickerRange
        selected={{
          from: range.from ? parseLocalYmd(range.from) : undefined,
          to: range.to ? parseLocalYmd(range.to) : undefined,
        }}
        placeholder={placeholder ?? 'Pick a date'}
        onSelect={(next) =>
          onChange({
            from: next?.from ? toLocalYmd(next.from) : null,
            to: next?.to ? toLocalYmd(next.to) : null,
          })
        }
      />
    )
  }

  return null
}

function FormBuilderExamplesPage() {
  const account = useFormBuilder({ fields: ACCOUNT_FIELDS })
  const details = useFormBuilder({ fields: DETAILS_FIELDS })
  const [tab, setTab] = useState('result')
  const validating = account.isSubmitting || details.isSubmitting

  return (
    <DocExamplePage to="/form-builder">
      <div className="grid min-w-0 gap-6 xl:grid-cols-3">
        <FormBuilder form={account} className="max-w-none" renderField={renderDateField} />
        <FormBuilder form={details} className="max-w-none" renderField={renderDateField} />
        <div className="flex min-w-0 flex-col gap-4">
          <Button
            htmlType="button"
            disabled={validating}
            aria-busy={validating}
            onClick={() => void Promise.all([account.submit(), details.submit()])}
          >
            {validating ? 'Validating…' : 'Validate'}
          </Button>
          <TabMenu
            value={tab}
            onValueChange={(value) => setTab(String(value))}
            className="min-w-0 gap-3"
          >
            <TabMenuList>
              <TabMenuTab value="result">Result</TabMenuTab>
              <TabMenuTab value="schema">Schema</TabMenuTab>
              <TabMenuTab value="prompt">Prompt</TabMenuTab>
            </TabMenuList>
            <TabMenuPanel value="result" className="min-w-0">
              <JsonPanel
                filename="result.json"
                data={{ account: account.values, details: details.values }}
              />
            </TabMenuPanel>
            <TabMenuPanel value="schema" className="min-w-0">
              <JsonPanel
                filename="fields.json"
                data={{ account: ACCOUNT_FIELDS, details: DETAILS_FIELDS }}
              />
            </TabMenuPanel>
            <TabMenuPanel value="prompt" className="min-w-0">
              <JsonPanel filename="prompt.txt" data={TYPE_PROMPT} />
            </TabMenuPanel>
          </TabMenu>
        </div>
      </div>
    </DocExamplePage>
  )
}
