import { useState } from 'react'

import { Select } from '@/components/form/select'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@ui/field'

const currencies = [
  { value: 'SGD', label: 'SGD — Singapore Dollar' },
  { value: 'USD', label: 'USD — US Dollar' },
  { value: 'MYR', label: 'MYR — Malaysian Ringgit' },
  { value: 'IDR', label: 'IDR — Indonesian Rupiah' },
]

const channels = [
  { value: 'pos', label: 'POS' },
  { value: 'invoice', label: 'Invoice' },
  { value: 'online_store', label: 'Online Store' },
]

const locations = [
  {
    value: 'loc-main',
    label: 'Main Store',
    description: '1 Harbourfront Walk, Singapore 098632',
  },
  {
    value: 'loc-wh',
    label: 'Warehouse',
    description: '10 Tuas Avenue, Singapore 639135',
  },
]

function SelectDemo() {
  const [currency, setCurrency] = useState<string | null>('SGD')
  const [channel, setChannel] = useState<string | null>(null)
  const [methods, setMethods] = useState<string[]>(['pos'])
  const [location, setLocation] = useState<string | null>(null)

  return (
    <FieldGroup className="max-w-sm">
      <Field>
        <FieldLabel>Currency</FieldLabel>
        <Select
          options={currencies}
          value={currency}
          onValueChange={(value) => setCurrency(typeof value === 'string' ? value : null)}
        />
        <FieldDescription>Closed list — no search box.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel>Sales channel</FieldLabel>
        <Select
          searchable
          options={channels}
          value={channel}
          placeholder="Search channels"
          onValueChange={(value) => setChannel(typeof value === 'string' ? value : null)}
        />
        <FieldDescription>Set searchable when the list is long.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel>Location</FieldLabel>
        <Select
          searchable
          clearable
          options={locations}
          value={location}
          placeholder="Choose location"
          onValueChange={(value) => setLocation(typeof value === 'string' ? value : null)}
        />
        <FieldDescription>Options support description (and optional image) in the menu.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel>Methods</FieldLabel>
        <Select
          multiple
          options={channels}
          value={methods}
          onValueChange={(value) => setMethods(Array.isArray(value) ? value : [])}
        />
        <FieldDescription>multiple adds chips.</FieldDescription>
      </Field>
    </FieldGroup>
  )
}

export { SelectDemo }
