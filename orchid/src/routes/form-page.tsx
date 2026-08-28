import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import {
  FormPage,
  FormPageContent,
  FormPageHeader,
} from '@/components/ui/form-page'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/toast'

export const Route = createFileRoute('/form-page')({
  component: FormPageExamplesPage,
})

function FormPageExamplesPage() {
  return (
    <DocExamplePage
      to="/form-page"
      usage={`import {
  FormPage,
  FormPageContent,
  FormPageHeader,
} from '@/components/ui/form-page'

const [creating, setCreating] = useState(false)

<Button onClick={() => setCreating(true)}>Create product</Button>

{creating ? (
<FormPage>
  <FormPageHeader
    onClose={() => setCreating(false)}
    actions={
      <>
        <Button variant="outline" onClick={() => setCreating(false)}>Cancel</Button>
        <Button type="submit" form="product-form">Create</Button>
      </>
    }
  />
  <FormPageContent>
    <form id="product-form" className="mx-auto max-w-xl p-6">
      <h1 className="text-xl font-semibold">Create product</h1>
      <p className="mt-1 text-sm text-oc-muted-foreground">
        Add a product to your catalog.
      </p>
      {/* Form fields */}
    </form>
  </FormPageContent>
</FormPage>
) : null}`}
    >
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Full page with top actions
        </p>
        <CloseFormPageExample />
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Two-column product form
        </p>
        <TwoColumnFormPageExample />
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
  return (
    <FormPage>
      <FormPageHeader
        onClose={onClose}
        actions={
          <>
            <Button variant="outline" className="min-w-24" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" form={id} className="min-w-24">
              Create
            </Button>
          </>
        }
      />
      <FormPageContent>
        <form
          id={id}
          className="mx-auto w-full max-w-xl px-6 py-8"
          onSubmit={(event) => {
            event.preventDefault()
            toast.add({ title: 'Product saved', type: 'success' })
            onSaved?.()
          }}
        >
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-oc-foreground">Create product</h1>
            <p className="mt-1 text-sm text-oc-muted-foreground">
              Add a product to your catalog and sales channels.
            </p>
          </div>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor={`${id}-name`}>Product name</FieldLabel>
              <Input
                id={`${id}-name`}
                name="name"
                placeholder="Studio Membership"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`${id}-sku`}>SKU</FieldLabel>
              <Input id={`${id}-sku`} name="sku" placeholder="SKU-MEM-001" />
            </Field>
            <Field>
              <FieldLabel htmlFor={`${id}-price`}>Price (SGD)</FieldLabel>
              <Input
                id={`${id}-price`}
                name="price"
                type="number"
                placeholder="29.00"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`${id}-description`}>Description</FieldLabel>
              <Textarea
                id={`${id}-description`}
                name="description"
                placeholder="Shown in Online Store, POS, invoices, and payment links."
              />
            </Field>
          </FieldGroup>
        </form>
      </FormPageContent>
    </FormPage>
  )
}

function TwoColumnFormPageExample() {
  const [creating, setCreating] = useState(false)
  const formId = 'two-column-product-form'

  if (!creating) {
    return <Button onClick={() => setCreating(true)}>Create advanced product</Button>
  }

  return (
    <div className="h-160 overflow-hidden rounded-xl border border-oc-border">
      <FormPage>
        <FormPageHeader
          onClose={() => setCreating(false)}
          actions={
            <>
              <Button
                variant="outline"
                className="min-w-24"
                onClick={() => setCreating(false)}
              >
                Cancel
              </Button>
              <Button type="submit" form={formId} className="min-w-24">
                Create
              </Button>
            </>
          }
        />
        <FormPageContent>
          <form
            id={formId}
            className="grid min-h-full lg:grid-cols-[minmax(0,3fr)_minmax(18rem,2fr)]"
            onSubmit={(event) => {
              event.preventDefault()
              toast.add({ title: 'Product saved', type: 'success' })
              setCreating(false)
            }}
          >
            <div className="px-6 py-8 lg:px-10">
              <div className="mb-6">
                <h1 className="text-xl font-semibold text-oc-foreground">Add product</h1>
                <p className="mt-1 text-sm text-oc-muted-foreground">
                  Configure the product details and pricing.
                </p>
              </div>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor={`${formId}-name`}>Product name</FieldLabel>
                  <Input id={`${formId}-name`} name="name" placeholder="T-shirt" required />
                </Field>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor={`${formId}-sku`}>SKU</FieldLabel>
                    <Input id={`${formId}-sku`} name="sku" placeholder="TS 123456" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor={`${formId}-barcode`}>Barcode</FieldLabel>
                    <Input id={`${formId}-barcode`} name="barcode" placeholder="123456" />
                  </Field>
                </div>
                <Field>
                  <FieldLabel htmlFor={`${formId}-price`}>Selling price (SGD)</FieldLabel>
                  <Input
                    id={`${formId}-price`}
                    name="price"
                    type="number"
                    placeholder="100.00"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor={`${formId}-description`}>Description</FieldLabel>
                  <Textarea
                    id={`${formId}-description`}
                    name="description"
                    className="min-h-36"
                  />
                </Field>
              </FieldGroup>
            </div>

            <div className="border-t border-oc-border px-6 py-8 lg:border-t-0 lg:border-l lg:px-8">
              <div className="mb-6">
                <h2 className="text-base font-semibold text-oc-foreground">Publish</h2>
                <p className="mt-1 text-sm text-oc-muted-foreground">
                  Set visibility and product organization.
                </p>
              </div>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor={`${formId}-status`}>Status</FieldLabel>
                  <Input id={`${formId}-status`} name="status" defaultValue="Published" />
                </Field>
                <Field>
                  <FieldLabel>Product image</FieldLabel>
                  <button
                    type="button"
                    className="flex h-32 w-full items-center justify-center rounded-lg border border-dashed border-oc-border text-sm text-oc-muted-foreground hover:bg-oc-muted"
                  >
                    Upload image
                  </button>
                </Field>
                <Field>
                  <FieldLabel htmlFor={`${formId}-category`}>Category</FieldLabel>
                  <Input id={`${formId}-category`} name="category" placeholder="Apparel" />
                </Field>
                <Field>
                  <FieldLabel htmlFor={`${formId}-availability`}>Availability</FieldLabel>
                  <Input
                    id={`${formId}-availability`}
                    name="availability"
                    placeholder="All locations"
                  />
                </Field>
              </FieldGroup>
            </div>
          </form>
        </FormPageContent>
      </FormPage>
    </div>
  )
}
