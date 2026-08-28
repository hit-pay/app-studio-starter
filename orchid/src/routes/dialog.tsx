import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export const Route = createFileRoute('/dialog')({
  component: DialogExamplesPage,
})

function DialogExamplesPage() {
  return (
    <DocExamplePage
      to="/dialog"
      usage={`import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

<Dialog>
  <DialogTrigger render={<Button variant="outline" />}>
    Review invoice
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Review invoice INV-2048</DialogTitle>
      <DialogDescription>
        Confirm details before sending to the customer.
      </DialogDescription>
    </DialogHeader>
    <p>Alex Turner · SGD 128.00 · PayNow or card.</p>
    <DialogFooter>
      <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
      <Button>Send invoice</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

const [open, setOpen] = useState(false)

<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger render={<Button />}>Add customer</DialogTrigger>
  <DialogContent>
    <form
      onSubmit={(event) => {
        event.preventDefault()
        setOpen(false)
      }}
    >
      <DialogHeader className="-mx-4 -mt-4 border-b border-oc-border px-5 py-4 pr-12">
        <DialogTitle>Add customer</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-5">
        <DialogDescription>Enter the customer details below.</DialogDescription>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="customer-name">Name</FieldLabel>
            <Input id="customer-name" name="name" required />
          </Field>
          <Field>
            <FieldLabel htmlFor="customer-email">Email</FieldLabel>
            <Input id="customer-email" name="email" type="email" required />
          </Field>
        </FieldGroup>
      </div>
      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" />}>
          Cancel
        </DialogClose>
        <Button type="submit">Save customer</Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>

<Dialog>
  <DialogTrigger render={<Button variant="outline" />}>
    Bordered dialog
  </DialogTrigger>
  <DialogContent className="border border-oc-border">
    <DialogHeader>
      <DialogTitle>Bordered dialog</DialogTitle>
      <DialogDescription>
        Add a border with className when stronger separation is needed.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>`}
    >
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Default
          </p>
          <Dialog>
            <DialogTrigger render={<Button variant="outline" />}>
              Review invoice
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Review invoice INV-2048</DialogTitle>
                <DialogDescription>
                  Confirm details before sending to the customer.
                </DialogDescription>
              </DialogHeader>
              <p className="text-sm text-oc-foreground">
                Alex Turner · SGD 128.00 · PayNow or card.
              </p>
              <DialogFooter>
                <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
                <Button>Send invoice</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Form
          </p>
          <CustomerFormDialog />
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Custom border
          </p>
          <Dialog>
            <DialogTrigger render={<Button variant="outline" />}>
              Bordered dialog
            </DialogTrigger>
            <DialogContent className="border border-oc-border">
              <DialogHeader>
                <DialogTitle>Bordered dialog</DialogTitle>
                <DialogDescription>
                  Dialog does not have a border variant. Use the Orchid border token through
                  className when stronger separation is needed.
                </DialogDescription>
              </DialogHeader>
              <p className="text-sm text-oc-foreground">
                The border uses <code>border-oc-border</code> and follows the active theme.
              </p>
              <DialogFooter showCloseButton />
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Without close icon
          </p>
          <Dialog>
            <DialogTrigger render={<Button variant="outline" />}>
              Customer details
            </DialogTrigger>
            <DialogContent showCloseButton={false}>
              <DialogHeader>
                <DialogTitle>Customer details</DialogTitle>
                <DialogDescription>Read-only customer information.</DialogDescription>
              </DialogHeader>
              <p className="text-sm text-oc-foreground">
                Alex Turner · alex@studio.co · last paid via Payment Link.
              </p>
              <DialogFooter showCloseButton />
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Orchid sizes
          </p>
          <div className="flex flex-wrap gap-3">
            <Dialog>
              <DialogTrigger render={<Button variant="outline" />}>Small</DialogTrigger>
              <DialogContent size="sm">
                <DialogHeader>
                  <DialogTitle>Small dialog</DialogTitle>
                  <DialogDescription>Compact confirmation or short content.</DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger render={<Button variant="outline" />}>Default</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Default dialog</DialogTitle>
                  <DialogDescription>Suitable for most short workflows.</DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger render={<Button variant="outline" />}>Large</DialogTrigger>
              <DialogContent size="lg">
                <DialogHeader>
                  <DialogTitle>Large dialog</DialogTitle>
                  <DialogDescription>More room for forms and detailed content.</DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Persistent
          </p>
          <Dialog persistent>
            <DialogTrigger render={<Button variant="outline" />}>
              Connect POS terminal
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Connect POS terminal</DialogTitle>
                <DialogDescription>
                  Clicking outside will not close this Orchid dialog.
                </DialogDescription>
              </DialogHeader>
              <p className="text-sm text-oc-foreground">
                Pair Orchard 01 before leaving this step.
              </p>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </DocExamplePage>
  )
}

function CustomerFormDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>Add customer</DialogTrigger>
      <DialogContent>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            setOpen(false)
          }}
        >
          <DialogHeader className="-mx-4 -mt-4 border-b border-oc-border px-5 py-4 pr-12">
            <DialogTitle>Add customer</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-5">
            <DialogDescription>Enter the customer details below.</DialogDescription>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="dialog-customer-name">Name</FieldLabel>
                <Input
                  id="dialog-customer-name"
                  name="name"
                  placeholder="Alex Turner"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="dialog-customer-email">Email</FieldLabel>
                <Input
                  id="dialog-customer-email"
                  name="email"
                  type="email"
                  placeholder="alex@example.com"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="dialog-customer-note">Note</FieldLabel>
                <Textarea
                  id="dialog-customer-note"
                  name="note"
                  placeholder="Optional customer note"
                />
              </Field>
            </FieldGroup>
          </div>
          <DialogFooter>
            <DialogClose render={<Button type="button" variant="outline" />}>
              Cancel
            </DialogClose>
            <Button type="submit">Save customer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
