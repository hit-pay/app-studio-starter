import { useRef, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import { DocCodePanel } from '@/components/doc/doc-code-panel'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Button } from '@/components/ui/button'
import {
  FormPage,
  FormPageContent,
  FormPageHeader,
} from '@/components/ui/form-page'
import {
  SchemaForm,
  useSchemaForm,
  type SchemaFormField,
} from '@/components/ui/schema-form'
import { toast } from '@/components/ui/toast'

export const Route = createFileRoute('/form-page')({
  component: FormPageExamplesPage,
})

const PRODUCT_FIELDS: SchemaFormField[] = [
  {
    key: 'name',
    title: 'Product name',
    type: 'input',
    placeholder: 'Studio Membership',
    required: true,
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
    key: 'price',
    title: 'Price (SGD)',
    type: 'input',
    placeholder: '29.00',
    required: true,
    value: '',
  },
  {
    key: 'description',
    title: 'Description',
    type: 'textarea',
    placeholder: 'Shown in Online Store, POS, invoices, and payment links.',
    value: '',
  },
]

const PRODUCT_DETAILS_FIELDS: SchemaFormField[] = [
  {
    key: 'name',
    title: 'Product name',
    type: 'input',
    placeholder: 'T-shirt',
    required: true,
    value: '',
  },
  {
    key: 'sku',
    title: 'SKU',
    type: 'input',
    placeholder: 'TS 123456',
    value: '',
  },
  {
    key: 'barcode',
    title: 'Barcode',
    type: 'input',
    placeholder: '123456',
    value: '',
  },
  {
    key: 'price',
    title: 'Selling price (SGD)',
    type: 'input',
    placeholder: '100.00',
    required: true,
    value: '',
  },
  {
    key: 'description',
    title: 'Description',
    type: 'textarea',
    value: '',
  },
]

const PUBLISH_SETTINGS_FIELDS: SchemaFormField[] = [
  {
    key: 'status',
    title: 'Status',
    type: 'select',
    options: [
      { value: 'draft', label: 'Draft' },
      { value: 'published', label: 'Published' },
    ],
    value: 'published',
  },
  {
    key: 'image',
    title: 'Product image',
    type: 'file',
    description: 'Upload the primary product image.',
    value: '',
  },
  {
    key: 'category',
    title: 'Category',
    type: 'combobox',
    placeholder: 'Select category',
    options: [
      { value: 'apparel', label: 'Apparel' },
      { value: 'accessories', label: 'Accessories' },
      { value: 'home', label: 'Home' },
    ],
    value: '',
  },
  {
    key: 'availability',
    title: 'Availability',
    type: 'checkbox-group',
    options: [
      { value: 'online-store', label: 'Online Store' },
      { value: 'point-of-sale', label: 'Point of Sale' },
    ],
    value: ['online-store', 'point-of-sale'],
  },
]

const FULL_PAGE_USAGE = `import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  FormPage,
  FormPageContent,
  FormPageHeader,
} from '@/components/ui/form-page'
import {
  SchemaForm,
  useSchemaForm,
  type SchemaFormField,
} from '@/components/ui/schema-form'
import { toast } from '@/components/ui/toast'

const PRODUCT_FIELDS: SchemaFormField[] = [
  {
    key: 'name',
    title: 'Product name',
    type: 'input',
    placeholder: 'Studio Membership',
    required: true,
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
    key: 'price',
    title: 'Price (SGD)',
    type: 'input',
    placeholder: '29.00',
    required: true,
    value: '',
  },
  {
    key: 'description',
    title: 'Description',
    type: 'textarea',
    placeholder: 'Shown in Online Store, POS, invoices, and payment links.',
    value: '',
  },
]

function CloseFormPageExample() {
  const [creating, setCreating] = useState(false)

  if (!creating) {
    return <Button onClick={() => setCreating(true)}>Create product</Button>
  }

  return (
    <div className="h-144 overflow-hidden rounded-xl border border-oc-border">
      <ProductFormPage
        id="close-product-form"
        onClose={() => setCreating(false)}
        onSaved={() => setCreating(false)}
      />
    </div>
  )
}

function ProductFormPage({
  id,
  onClose,
  onSaved,
}: {
  id: string
  onClose: () => void
  onSaved?: () => void
}) {
  const form = useSchemaForm({
    fields: PRODUCT_FIELDS,
    onSubmit: () => {
      toast.add({ title: 'Product saved', type: 'success' })
      onSaved?.()
    },
  })

  return (
    <FormPage>
      <FormPageHeader
        onClose={onClose}
        actions={{
          cancel: { label: 'Cancel', onClick: onClose },
          save: { label: 'Create', form: id },
        }}
      />
      <FormPageContent>
        <div className="mx-auto w-full max-w-xl px-6 py-8">
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-oc-foreground">
              Create product
            </h1>
            <p className="mt-1 text-sm text-oc-muted-foreground">
              Add a product to your catalog and sales channels.
            </p>
          </div>
          <SchemaForm id={id} form={form} className="max-w-none" />
        </div>
      </FormPageContent>
    </FormPage>
  )
}
`

const TWO_COLUMN_USAGE = `import { useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  FormPage,
  FormPageContent,
  FormPageHeader,
} from '@/components/ui/form-page'
import {
  SchemaForm,
  useSchemaForm,
  type SchemaFormField,
} from '@/components/ui/schema-form'
import { toast } from '@/components/ui/toast'

const PRODUCT_DETAILS_FIELDS: SchemaFormField[] = [
  {
    key: 'name',
    title: 'Product name',
    type: 'input',
    placeholder: 'T-shirt',
    required: true,
    value: '',
  },
  {
    key: 'sku',
    title: 'SKU',
    type: 'input',
    placeholder: 'TS 123456',
    value: '',
  },
  {
    key: 'barcode',
    title: 'Barcode',
    type: 'input',
    placeholder: '123456',
    value: '',
  },
  {
    key: 'price',
    title: 'Selling price (SGD)',
    type: 'input',
    placeholder: '100.00',
    required: true,
    value: '',
  },
  {
    key: 'description',
    title: 'Description',
    type: 'textarea',
    value: '',
  },
]

const PUBLISH_SETTINGS_FIELDS: SchemaFormField[] = [
  {
    key: 'status',
    title: 'Status',
    type: 'select',
    options: [
      { value: 'draft', label: 'Draft' },
      { value: 'published', label: 'Published' },
    ],
    value: 'published',
  },
  {
    key: 'image',
    title: 'Product image',
    type: 'file',
    description: 'Upload the primary product image.',
    value: '',
  },
  {
    key: 'category',
    title: 'Category',
    type: 'combobox',
    placeholder: 'Select category',
    options: [
      { value: 'apparel', label: 'Apparel' },
      { value: 'accessories', label: 'Accessories' },
      { value: 'home', label: 'Home' },
    ],
    value: '',
  },
  {
    key: 'availability',
    title: 'Availability',
    type: 'checkbox-group',
    options: [
      { value: 'online-store', label: 'Online Store' },
      { value: 'point-of-sale', label: 'Point of Sale' },
    ],
    value: ['online-store', 'point-of-sale'],
  },
]

function TwoColumnFormPageExample() {
  const [creating, setCreating] = useState(false)

  if (!creating) {
    return (
      <Button onClick={() => setCreating(true)}>
        Create advanced product
      </Button>
    )
  }

  return (
    <div className="h-160 overflow-hidden rounded-xl border border-oc-border">
      <TwoColumnProductFormPage
        onClose={() => setCreating(false)}
        onSaved={() => setCreating(false)}
      />
    </div>
  )
}

function TwoColumnProductFormPage({
  onClose,
  onSaved,
}: {
  onClose: () => void
  onSaved: () => void
}) {
  const submittedForms = useRef(new Set<'details' | 'settings'>())

  const completeSave = (section: 'details' | 'settings') => {
    submittedForms.current.add(section)
    if (submittedForms.current.size !== 2) return

    toast.add({ title: 'Product saved', type: 'success' })
    onSaved()
  }

  const productDetails = useSchemaForm({
    fields: PRODUCT_DETAILS_FIELDS,
    onSubmit: () => completeSave('details'),
  })
  const publishSettings = useSchemaForm({
    fields: PUBLISH_SETTINGS_FIELDS,
    onSubmit: () => completeSave('settings'),
  })
  const saving = productDetails.isSubmitting || publishSettings.isSubmitting

  const save = () => {
    submittedForms.current.clear()
    void Promise.all([productDetails.submit(), publishSettings.submit()])
  }

  return (
    <FormPage>
      <FormPageHeader
        onClose={onClose}
        actions={{
          cancel: {
            label: 'Cancel',
            onClick: onClose,
          },
          save: {
            label: 'Create',
            disabled: saving,
            onClick: save,
          },
        }}
      />
      <FormPageContent>
        <div className="grid min-h-full lg:grid-cols-[minmax(0,3fr)_minmax(18rem,2fr)]">
          <div className="px-6 py-8 lg:px-10">
            <div className="mb-6">
              <h1 className="text-xl font-semibold text-oc-foreground">
                Add product
              </h1>
              <p className="mt-1 text-sm text-oc-muted-foreground">
                Configure the product details and pricing.
              </p>
            </div>
            <SchemaForm form={productDetails} className="max-w-none" />
          </div>

          <div className="border-t border-oc-border px-6 py-8 lg:border-t-0 lg:border-l lg:px-8">
            <div className="mb-6">
              <h2 className="text-base font-semibold text-oc-foreground">
                Publish
              </h2>
              <p className="mt-1 text-sm text-oc-muted-foreground">
                Set visibility and product organization.
              </p>
            </div>
            <SchemaForm form={publishSettings} className="max-w-none" />
          </div>
        </div>
      </FormPageContent>
    </FormPage>
  )
}
`

function FormPageExamplesPage() {
  return (
    <DocExamplePage to="/form-page">
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Full page with top actions
        </p>
        <CloseFormPageExample />
        <div className="flex min-w-0 flex-col gap-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Usage
          </p>
          <DocCodePanel filename="full-page-form.tsx" code={FULL_PAGE_USAGE} />
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Two-column product form
        </p>
        <TwoColumnFormPageExample />
        <div className="flex min-w-0 flex-col gap-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Usage
          </p>
          <DocCodePanel
            filename="two-column-form.tsx"
            code={TWO_COLUMN_USAGE}
          />
        </div>
      </div>
    </DocExamplePage>
  )
}

function CloseFormPageExample() {
  const [creating, setCreating] = useState(false)

  if (!creating) {
    return <Button onClick={() => setCreating(true)}>Create product</Button>
  }

  return (
    <div className="h-144 overflow-hidden rounded-xl border border-oc-border">
      <ProductFormPage
        id="close-product-form"
        onClose={() => setCreating(false)}
        onSaved={() => setCreating(false)}
      />
    </div>
  )
}

function ProductFormPage({
  id,
  onClose,
  onSaved,
}: {
  id: string
  onClose: () => void
  onSaved?: () => void
}) {
  const form = useSchemaForm({
    fields: PRODUCT_FIELDS,
    onSubmit: () => {
      toast.add({ title: 'Product saved', type: 'success' })
      onSaved?.()
    },
  })

  return (
    <FormPage>
      <FormPageHeader
        onClose={onClose}
        actions={{
          cancel: { label: 'Cancel', onClick: onClose },
          save: { label: 'Create', form: id },
        }}
      />
      <FormPageContent>
        <div className="mx-auto w-full max-w-xl px-6 py-8">
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-oc-foreground">
              Create product
            </h1>
            <p className="mt-1 text-sm text-oc-muted-foreground">
              Add a product to your catalog and sales channels.
            </p>
          </div>
          <SchemaForm id={id} form={form} className="max-w-none" />
        </div>
      </FormPageContent>
    </FormPage>
  )
}

function TwoColumnFormPageExample() {
  const [creating, setCreating] = useState(false)

  if (!creating) {
    return (
      <Button onClick={() => setCreating(true)}>
        Create advanced product
      </Button>
    )
  }

  return (
    <div className="h-160 overflow-hidden rounded-xl border border-oc-border">
      <TwoColumnProductFormPage
        onClose={() => setCreating(false)}
        onSaved={() => setCreating(false)}
      />
    </div>
  )
}

function TwoColumnProductFormPage({
  onClose,
  onSaved,
}: {
  onClose: () => void
  onSaved: () => void
}) {
  const submittedForms = useRef(new Set<'details' | 'settings'>())

  const completeSave = (section: 'details' | 'settings') => {
    submittedForms.current.add(section)
    if (submittedForms.current.size !== 2) return

    toast.add({ title: 'Product saved', type: 'success' })
    onSaved()
  }

  const productDetails = useSchemaForm({
    fields: PRODUCT_DETAILS_FIELDS,
    onSubmit: () => completeSave('details'),
  })
  const publishSettings = useSchemaForm({
    fields: PUBLISH_SETTINGS_FIELDS,
    onSubmit: () => completeSave('settings'),
  })
  const saving = productDetails.isSubmitting || publishSettings.isSubmitting

  const save = () => {
    submittedForms.current.clear()
    void Promise.all([productDetails.submit(), publishSettings.submit()])
  }

  return (
    <FormPage>
      <FormPageHeader
        onClose={onClose}
        actions={{
          cancel: {
            label: 'Cancel',
            onClick: onClose,
          },
          save: {
            label: 'Create',
            disabled: saving,
            onClick: save,
          },
        }}
      />
      <FormPageContent>
        <div className="grid min-h-full lg:grid-cols-[minmax(0,3fr)_minmax(18rem,2fr)]">
          <div className="px-6 py-8 lg:px-10">
            <div className="mb-6">
              <h1 className="text-xl font-semibold text-oc-foreground">
                Add product
              </h1>
              <p className="mt-1 text-sm text-oc-muted-foreground">
                Configure the product details and pricing.
              </p>
            </div>
            <SchemaForm form={productDetails} className="max-w-none" />
          </div>

          <div className="border-t border-oc-border px-6 py-8 lg:border-t-0 lg:border-l lg:px-8">
            <div className="mb-6">
              <h2 className="text-base font-semibold text-oc-foreground">
                Publish
              </h2>
              <p className="mt-1 text-sm text-oc-muted-foreground">
                Set visibility and product organization.
              </p>
            </div>
            <SchemaForm form={publishSettings} className="max-w-none" />
          </div>
        </div>
      </FormPageContent>
    </FormPage>
  )
}
