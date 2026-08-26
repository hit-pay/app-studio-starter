import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Modal, ModalPopup, ModalTrigger } from '@/components/ui/modal'
import { DocExamplePage } from '@/components/doc/doc-example-page'

export const Route = createFileRoute('/modal')({
  component: ModalExamplesPage,
})

function ModalExamplesPage() {
  return (
    <DocExamplePage to="/modal">
        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Default
          </p>
          <Modal>
            <ModalTrigger render={<Button type="Primary" />}>Review invoice</ModalTrigger>
            <ModalPopup title="Review invoice INV-2048" description="Confirm details before sending to the customer.">
              <p className="text-sm leading-[1.5] text-oc-foreground">
                Alex Turner · SGD 128.00 · PayNow or card. You can still cancel or go back.
              </p>
            </ModalPopup>
          </Modal>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Size
          </p>
          <div className="flex flex-wrap gap-3">
            <Modal>
              <ModalTrigger render={<Button type="Secondary" style="Border" />}>Small</ModalTrigger>
              <ModalPopup
                size="Small"
                title="Remove payment channel"
                description="This cannot be undone."
                confirmType="Destructive"
                confirmLabel="Remove"
              >
                <p className="text-sm leading-[1.5] text-oc-foreground">
                  Remove GrabPay from this merchant account?
                </p>
              </ModalPopup>
            </Modal>
            <Modal>
              <ModalTrigger render={<Button type="Secondary" style="Border" />}>Medium</ModalTrigger>
              <ModalPopup
                size="Medium"
                title="Create payment link"
                description="Share a link for a one-off payment."
              >
                <p className="text-sm leading-[1.5] text-oc-foreground">
                  Medium width, used for most create and edit dialogs in the dashboard.
                </p>
              </ModalPopup>
            </Modal>
            <Modal>
              <ModalTrigger render={<Button type="Secondary" style="Border" />}>Default</ModalTrigger>
              <ModalPopup
                size="Default"
                title="New Recurring plan"
                description="Set interval, amount, and product."
              >
                <p className="text-sm leading-[1.5] text-oc-foreground">
                  Default width for longer forms such as Recurring and Online Store settings.
                </p>
              </ModalPopup>
            </Modal>
            <Modal>
              <ModalTrigger render={<Button type="Secondary" style="Border" />}>
                Confirmation
              </ModalTrigger>
              <ModalPopup
                size="Confirmation"
                title="Send this invoice?"
                confirmLabel="Send"
                cancelLabel="Cancel"
              >
                <p className="text-center text-sm leading-[1.5] text-oc-muted-foreground">
                  The customer will get an email with a PayNow and card checkout.
                </p>
              </ModalPopup>
            </Modal>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Borderless
          </p>
          <Modal>
            <ModalTrigger render={<Button type="Secondary" style="Border" />}>
              Open Borderless
            </ModalTrigger>
            <ModalPopup borderless title="Cancel Recurring plan?" confirmLabel="Yes" cancelLabel="No">
              <p className="py-5 text-sm leading-[1.5] text-oc-foreground">
                The customer will not be charged on the next billing date. Header and footer have no dividers.
              </p>
            </ModalPopup>
          </Modal>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Persistent
          </p>
          <Modal persistent>
            <ModalTrigger render={<Button type="Secondary" style="Border" />}>
              Open Persistent
            </ModalTrigger>
            <ModalPopup title="Connect POS terminal" description="Clicking outside will not close.">
              <p className="text-sm leading-[1.5] text-oc-foreground">
                Pair Orchard 01 before you leave this step. Use Cancel or the close icon to dismiss.
              </p>
            </ModalPopup>
          </Modal>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            No footer
          </p>
          <Modal>
            <ModalTrigger render={<Button type="Secondary" style="Border" />}>
              Open Without Footer
            </ModalTrigger>
            <ModalPopup footer={false} title="Customer details" description="Read-only overlay">
              <p className="text-sm leading-[1.5] text-oc-foreground">
                Alex Turner · alex@studio.co · last paid via Payment Link. Close with the icon in the header.
              </p>
            </ModalPopup>
          </Modal>
        </div>
      </DocExamplePage>
  )
}
