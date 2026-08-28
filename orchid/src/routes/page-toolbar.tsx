import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import {
  SchemaForm,
  useSchemaForm,
  type SchemaFormField,
} from '@/components/ui/schema-form'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { PageToolbar } from '@/components/ui/page-toolbar'
import { toast } from '@/components/ui/toast'

export const Route = createFileRoute('/page-toolbar')({
  component: PageToolbarExamplesPage,
})

const PRODUCT_FIELDS: SchemaFormField[] = [
  {
    key: 'name',
    title: 'Name',
    type: 'input',
    placeholder: 'Studio Membership',
    required: true,
    maxLength: 32,
    value: '',
  },
  {
    key: 'sku',
    title: 'SKU',
    type: 'input',
    placeholder: 'SKU-MEM-001',
    value: '',
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
      { value: 'myr', label: 'MYR' },
    ],
    props: { align: 'end' },
    value: { amount: '', currency: 'sgd' },
  },
  {
    key: 'description',
    title: 'Description',
    type: 'textarea',
    placeholder: 'Shown in Online Store, POS, invoices, and payment links.',
    value: '',
  },
]

function CreateProductExample() {
  const [open, setOpen] = useState(false)
  const product = useSchemaForm({
    fields: PRODUCT_FIELDS,
    onSubmit: (values) => {
      const name = String(values.name ?? 'Product')
      const amount = String(values.amount ?? '')
      const currency = String(values.currency ?? 'sgd').toUpperCase()
      toast.add({
        title: 'Product saved',
        description: `${name} · ${currency} ${amount}`,
        type: 'success',
      })
      setOpen(false)
    },
  })

  function close() {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="Primary" />}>Create product</DialogTrigger>
      <DialogContent size="Fullscreen" title="Create product">
        <PageToolbar
          className="shrink-0"
          left="Close"
          onBack={close}
          actions={
            <>
              <Button variant="Secondary" className="w-[100px]" onClick={close}>
                Cancel
              </Button>
              <Button
                variant="Primary"
                className="w-[100px]"
                disabled={product.isSubmitting}
                aria-busy={product.isSubmitting}
                onClick={() => void product.submit()}
              >
                Save
              </Button>
            </>
          }
        />
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-xl px-6 py-8">
            <SchemaForm form={product} className="max-w-none" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function CreateInvoiceExample() {
  const [open, setOpen] = useState(false)

  function close() {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="Secondary" style="Border" />}>Create invoice</DialogTrigger>
      <DialogContent size="Fullscreen" title="Create invoice">
        <PageToolbar
          className="shrink-0"
          left="Close"
          onBack={close}
          actions={
            <>
              <Button variant="Secondary" className="w-[100px]" onClick={close}>
                Cancel
              </Button>
              <Button variant="Primary" className="w-[100px]" onClick={close}>
                Send
              </Button>
            </>
          }
        />
        <div className="min-h-0 flex-1 overflow-y-auto">
          <form
            className="mx-auto flex w-full max-w-xl flex-col gap-6 px-6 py-8"
            onSubmit={(event) => {
              event.preventDefault()
              close()
            }}
          >
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="invoice-customer">Customer email</FieldLabel>
                <Input id="invoice-customer" name="email" placeholder="alex@studio.co" />
              </Field>
              <Field>
                <FieldLabel htmlFor="invoice-amount">Amount (SGD)</FieldLabel>
                <Input id="invoice-amount" name="amount" type="number" placeholder="128.00" />
              </Field>
            </FieldGroup>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function PageToolbarExamplesPage() {
  return (
    <DocExamplePage
      to="/page-toolbar"
      usage={`import { PageToolbar } from '@/components/ui/page-toolbar'
import { Button } from '@/components/ui/button'

<PageToolbar
  left="Back"
  onBack={() => history.back()}
  actions={
    <>
      <Button variant="Secondary" style="Border">Cancel</Button>
      <Button variant="Primary">Save</Button>
    </>
  }
/>

<PageToolbar
  left="Close"
  onBack={close}
  actions={<Button variant="Primary">Save</Button>}
/>`}
    >
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Fullscreen — Product Data
        </p>
        <CreateProductExample />
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Fullscreen — Invoice
        </p>
        <CreateInvoiceExample />
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Back
        </p>
        <PageToolbar
          left="Back"
          actions={
            <>
              <Button variant="Secondary" style="Border" size="Default" className="w-[100px]">
                Cancel
              </Button>
              <Button variant="Primary" size="Default" className="w-[100px]">
                Save
              </Button>
            </>
          }
        />
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Close
        </p>
        <PageToolbar
          left="Close"
          actions={
            <>
              <Button variant="Secondary" size="Default" className="w-[100px]">
                Cancel
              </Button>
              <Button variant="Primary" size="Default" className="w-[100px]">
                Save
              </Button>
            </>
          }
        />
      </div>
    </DocExamplePage>
  )
}
