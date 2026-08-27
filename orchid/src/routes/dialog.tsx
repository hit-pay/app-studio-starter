import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { DocExamplePage } from '@/components/doc/doc-example-page'

export const Route = createFileRoute('/dialog')({
  component: DialogExamplesPage,
})

function DialogExamplesPage() {
  return (
    <DocExamplePage to="/dialog">
        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Default
          </p>
          <Dialog>
            <DialogTrigger render={<Button variant="Primary" />}>Review invoice</DialogTrigger>
            <DialogContent title="Review invoice INV-2048" description="Confirm details before sending to the customer.">
              <p className="text-sm leading-[1.5] text-oc-foreground">
                Alex Turner · SGD 128.00 · PayNow or card. You can still cancel or go back.
              </p>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Size
          </p>
          <div className="flex flex-wrap gap-3">
            <Dialog>
              <DialogTrigger render={<Button variant="Secondary" style="Border" />}>Small</DialogTrigger>
              <DialogContent
                size="Small"
                title="Remove payment channel"
                description="This cannot be undone."
                confirmType="Destructive"
                confirmLabel="Remove"
              >
                <p className="text-sm leading-[1.5] text-oc-foreground">
                  Remove GrabPay from this merchant account?
                </p>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger render={<Button variant="Secondary" style="Border" />}>Medium</DialogTrigger>
              <DialogContent
                size="Medium"
                title="Create payment link"
                description="Share a link for a one-off payment."
              >
                <p className="text-sm leading-[1.5] text-oc-foreground">
                  Medium width, used for most create and edit dialogs in the dashboard.
                </p>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger render={<Button variant="Secondary" style="Border" />}>Default</DialogTrigger>
              <DialogContent
                size="Default"
                title="New Recurring plan"
                description="Set interval, amount, and product."
              >
                <p className="text-sm leading-[1.5] text-oc-foreground">
                  Default width for longer forms such as Recurring and Online Store settings.
                </p>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger render={<Button variant="Secondary" style="Border" />}>
                Confirmation
              </DialogTrigger>
              <DialogContent
                size="Confirmation"
                title="Send this invoice?"
                confirmLabel="Send"
                cancelLabel="Cancel"
              >
                <p className="text-center text-sm leading-[1.5] text-oc-muted-foreground">
                  The customer will get an email with a PayNow and card checkout.
                </p>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Borderless
          </p>
          <Dialog>
            <DialogTrigger render={<Button variant="Secondary" style="Border" />}>
              Open Borderless
            </DialogTrigger>
            <DialogContent borderless title="Cancel Recurring plan?" confirmLabel="Yes" cancelLabel="No">
              <p className="py-5 text-sm leading-[1.5] text-oc-foreground">
                The customer will not be charged on the next billing date. Header and footer have no dividers.
              </p>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Persistent
          </p>
          <Dialog persistent>
            <DialogTrigger render={<Button variant="Secondary" style="Border" />}>
              Open Persistent
            </DialogTrigger>
            <DialogContent title="Connect POS terminal" description="Clicking outside will not close.">
              <p className="text-sm leading-[1.5] text-oc-foreground">
                Pair Orchard 01 before you leave this step. Use Cancel or the close icon to dismiss.
              </p>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            No footer
          </p>
          <Dialog>
            <DialogTrigger render={<Button variant="Secondary" style="Border" />}>
              Open Without Footer
            </DialogTrigger>
            <DialogContent footer={false} title="Customer details" description="Read-only overlay">
              <p className="text-sm leading-[1.5] text-oc-foreground">
                Alex Turner · alex@studio.co · last paid via Payment Link. Close with the icon in the header.
              </p>
            </DialogContent>
          </Dialog>
        </div>
      </DocExamplePage>
  )
}
