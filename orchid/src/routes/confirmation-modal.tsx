import { createFileRoute } from '@tanstack/react-router'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Button } from '@/components/ui/button'
import {
  ConfirmationModal,
  ConfirmationModalContent,
  ConfirmationModalTrigger,
} from '@/components/ui/confirmation-modal'

export const Route = createFileRoute('/confirmation-modal')({
  component: ConfirmationModalExamplesPage,
})

function ConfirmationModalExamplesPage() {
  return (
    <DocExamplePage to="/confirmation-modal">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Delete invoice
          </p>
          <ConfirmationModal
            type="Delete"
            message="Do you want to delete invoice INV-2048?"
            description="This invoice has not been paid. The action cannot be undone."
          >
            <ConfirmationModalTrigger render={<Button type="Destructive" />}>
              Open Delete
            </ConfirmationModalTrigger>
          </ConfirmationModal>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Warning
          </p>
          <ConfirmationModal
            type="Warning"
            message="Deactivate this POS terminal?"
            description="Orchard 01 will stop accepting in-store payments until you reactivate it."
          >
            <ConfirmationModalTrigger render={<Button type="Secondary" style="Border" />}>
              Open Warning
            </ConfirmationModalTrigger>
          </ConfirmationModal>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Success
          </p>
          <ConfirmationModal
            type="Success"
            message="Payment link created successfully."
            description="Share this link with your customer."
          >
            <ConfirmationModalTrigger render={<Button type="Primary" />}>
              Open Success
            </ConfirmationModalTrigger>
          </ConfirmationModal>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Question
          </p>
          <ConfirmationModal
            type="Question"
            message="Cancel this Recurring plan?"
            description="The customer will not be charged on the next billing date."
          >
            <ConfirmationModalTrigger render={<Button type="Secondary" style="Border" />}>
              Open Question
            </ConfirmationModalTrigger>
          </ConfirmationModal>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Medium with confirm phrase
        </p>
        <ConfirmationModal
          type="Delete"
          size="Medium"
          confirmPhrase="weekend-workshop"
          message="Do you want to delete this payment link? The action can't be undone."
        >
          <ConfirmationModalTrigger render={<Button type="Destructive" />}>
            Open Medium
          </ConfirmationModalTrigger>
        </ConfirmationModal>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Delete product
        </p>
        <ConfirmationModal
          type="Delete"
          message="Delete Classic White Tee from Product Data?"
          description="It will be removed from Online Store, POS, invoices, and payment links."
        >
          <ConfirmationModalTrigger render={<Button type="Destructive" />}>
            Delete product
          </ConfirmationModalTrigger>
        </ConfirmationModal>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Content block
        </p>
        <div className="max-w-[320px] rounded-2xl border border-oc-border p-4">
          <ConfirmationModalContent type="Delete" />
        </div>
      </div>
    </DocExamplePage>
  )
}
