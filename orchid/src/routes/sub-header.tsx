import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Modal, ModalPopup, ModalTrigger } from '@/components/ui/modal'
import { SubHeader } from '@/components/ui/sub-header'
import { Textarea } from '@/components/ui/textarea'

export const Route = createFileRoute('/sub-header')({
  component: SubHeaderExamplesPage,
})

function CreateProductExample() {
  const [open, setOpen] = useState(false)

  function close() {
    setOpen(false)
  }

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger render={<Button type="Primary" />}>Create product</ModalTrigger>
      <ModalPopup size="Fullscreen" title="Create product">
        <SubHeader
          className="shrink-0"
          left="Close"
          onBack={close}
          actions={
            <>
              <Button type="Secondary" className="w-[100px]" onClick={close}>
                Cancel
              </Button>
              <Button type="Primary" className="w-[100px]" onClick={close}>
                Save
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
                <FieldLabel htmlFor="product-name">Name</FieldLabel>
                <Input id="product-name" name="name" placeholder="Studio Membership" />
              </Field>
              <Field>
                <FieldLabel htmlFor="product-sku">SKU</FieldLabel>
                <Input id="product-sku" name="sku" placeholder="SKU-MEM-001" />
              </Field>
              <Field>
                <FieldLabel htmlFor="product-price">Price</FieldLabel>
                <Input id="product-price" name="price" type="number" placeholder="29.00" />
              </Field>
              <Field>
                <FieldLabel htmlFor="product-description">Description</FieldLabel>
                <Textarea
                  id="product-description"
                  name="description"
                  placeholder="Shown in Online Store, POS, invoices, and payment links."
                />
              </Field>
            </FieldGroup>
          </form>
        </div>
      </ModalPopup>
    </Modal>
  )
}

function CreateInvoiceExample() {
  const [open, setOpen] = useState(false)

  function close() {
    setOpen(false)
  }

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger render={<Button type="Secondary" style="Border" />}>Create invoice</ModalTrigger>
      <ModalPopup size="Fullscreen" title="Create invoice">
        <SubHeader
          className="shrink-0"
          left="Close"
          onBack={close}
          actions={
            <>
              <Button type="Secondary" className="w-[100px]" onClick={close}>
                Cancel
              </Button>
              <Button type="Primary" className="w-[100px]" onClick={close}>
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
      </ModalPopup>
    </Modal>
  )
}

function SubHeaderExamplesPage() {
  return (
    <DocExamplePage to="/sub-header">
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
        <SubHeader
          left="Back"
          actions={
            <>
              <Button type="Secondary" style="Border" size="Default" className="w-[100px]">
                Cancel
              </Button>
              <Button type="Primary" size="Default" className="w-[100px]">
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
        <SubHeader
          left="Close"
          actions={
            <>
              <Button type="Secondary" size="Default" className="w-[100px]">
                Cancel
              </Button>
              <Button type="Primary" size="Default" className="w-[100px]">
                Save
              </Button>
            </>
          }
        />
      </div>
    </DocExamplePage>
  )
}
