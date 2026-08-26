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
            Delete
          </p>
          <ConfirmationModal type="Delete">
            <ConfirmationModalTrigger render={<Button type="Destructive" />}>
              Open Delete
            </ConfirmationModalTrigger>
          </ConfirmationModal>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Warning
          </p>
          <ConfirmationModal type="Warning">
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
            description="You can share this link with your customer."
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
            message="Do you want to continue with this payment link?"
            description="You can change this later."
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
          confirmPhrase="the name of QR code"
          message="Do you want to delete this payment link? The action can't be undone."
        >
          <ConfirmationModalTrigger render={<Button type="Destructive" />}>
            Open Medium
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
