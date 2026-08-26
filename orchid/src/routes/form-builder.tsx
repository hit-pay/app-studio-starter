import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { FormBuilder, type FormBuilderField } from '@/components/ui/form-builder'

export const Route = createFileRoute('/form-builder')({
  component: FormBuilderExamplesPage,
})

type InvoiceForm = {
  number: string
  email: string
  amount: string
  notes: string
}

type PaymentLinkForm = {
  title: string
  channel: string
  sendReceipt: boolean
}

type RecurringForm = {
  plan: string
  interval: string
  autoCharge: boolean
}

type ProductForm = {
  name: string
  sku: string
  description: string
  trackInventory: boolean
}

const INVOICE_FIELDS: FormBuilderField<InvoiceForm>[] = [
  {
    name: 'number',
    label: 'Invoice number',
    placeholder: 'INV-2048',
    required: true,
  },
  {
    name: 'email',
    label: 'Customer email',
    type: 'email',
    placeholder: 'alex@example.com',
    required: true,
    description: 'Where we send the invoice and receipt.',
  },
  {
    name: 'amount',
    label: 'Amount (SGD)',
    placeholder: '128.00',
    required: true,
  },
  {
    name: 'notes',
    label: 'Notes',
    control: 'textarea',
    placeholder: 'Payment due in 14 days.',
  },
]

const LINK_FIELDS: FormBuilderField<PaymentLinkForm>[] = [
  {
    name: 'title',
    label: 'Link title',
    placeholder: 'Weekend brunch',
    required: true,
  },
  {
    name: 'channel',
    label: 'Payment channel',
    control: 'select',
    placeholder: 'Select channel',
    required: true,
    options: [
      { value: 'paynow', label: 'PayNow' },
      { value: 'cards', label: 'Cards' },
      { value: 'grabpay', label: 'GrabPay' },
    ],
  },
  {
    name: 'sendReceipt',
    label: 'Email receipt',
    control: 'checkbox',
    checkboxLabel: 'Email a receipt after payment',
  },
]

const RECURRING_FIELDS: FormBuilderField<RecurringForm>[] = [
  {
    name: 'plan',
    label: 'Plan name',
    placeholder: 'Studio membership',
    required: true,
  },
  {
    name: 'interval',
    label: 'Billing interval',
    control: 'select',
    required: true,
    options: [
      { value: 'weekly', label: 'Weekly' },
      { value: 'monthly', label: 'Monthly' },
      { value: 'yearly', label: 'Yearly' },
    ],
  },
  {
    name: 'autoCharge',
    label: 'Charge the card on file each cycle',
    control: 'toggle',
  },
]

const PRODUCT_FIELDS: FormBuilderField<ProductForm>[] = [
  {
    name: 'name',
    label: 'Product name',
    placeholder: 'Classic White Tee',
    required: true,
  },
  {
    name: 'sku',
    label: 'SKU',
    placeholder: 'TEE-WHT-M',
    required: true,
    description: 'Shared by Online Store and Point of Sale.',
  },
  {
    name: 'description',
    label: 'Description',
    control: 'textarea',
    placeholder: 'Soft cotton tee. Ships from Singapore.',
  },
  {
    name: 'trackInventory',
    label: 'Track inventory',
    control: 'toggle',
  },
]

function FormBuilderExamplesPage() {
  const [lastSubmit, setLastSubmit] = useState('Not submitted yet')

  return (
    <DocExamplePage to="/form-builder">
      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Invoice
        </p>
        <p className="text-xs text-oc-muted-foreground">
          Schema-driven fields on TanStack Form, rendered with Orchid Field, Input, and Textarea.
        </p>
        <FormBuilder
          defaultValues={{ number: 'INV-2048', email: '', amount: '', notes: '' }}
          fields={INVOICE_FIELDS}
          submitLabel="Send invoice"
          onSubmit={async (value) => {
            setLastSubmit(`Invoice ${value.number} → ${value.email || '(no email)'}`)
          }}
        />
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Payment Link
        </p>
        <FormBuilder
          defaultValues={{ title: '', channel: 'paynow', sendReceipt: true }}
          fields={LINK_FIELDS}
          submitLabel="Create payment link"
          onSubmit={async (value) => {
            setLastSubmit(`Payment link “${value.title}” · ${value.channel}`)
          }}
        />
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Recurring
        </p>
        <FormBuilder
          defaultValues={{ plan: '', interval: 'monthly', autoCharge: true }}
          fields={RECURRING_FIELDS}
          submitLabel="Create plan"
          onSubmit={async (value) => {
            setLastSubmit(`Recurring “${value.plan}” · ${value.interval}`)
          }}
        />
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Product Data
        </p>
        <FormBuilder
          defaultValues={{
            name: 'Classic White Tee',
            sku: 'TEE-WHT-M',
            description: '',
            trackInventory: true,
          }}
          fields={PRODUCT_FIELDS}
          submitLabel="Save product"
          cancelLabel="Discard"
          onCancel={() => setLastSubmit('Product edit discarded')}
          onSubmit={async (value) => {
            setLastSubmit(`Product ${value.sku} saved`)
          }}
        />
      </div>

      <p className="text-sm text-oc-muted-foreground">{lastSubmit}</p>
    </DocExamplePage>
  )
}
