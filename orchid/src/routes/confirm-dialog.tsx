import { createFileRoute } from '@tanstack/react-router'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Button } from '@/components/ui/button'
import {
  ConfirmDialog,
  ConfirmDialogContent,
  ConfirmDialogTrigger,
} from '@/components/ui/confirm-dialog'

export const Route = createFileRoute('/confirm-dialog')({
  component: ConfirmDialogExamplesPage,
})

function ConfirmDialogExamplesPage() {
  return (
    <DocExamplePage
      to="/confirm-dialog"
      usage={`import { ConfirmDialog, ConfirmDialogTrigger } from '@/components/ui/confirm-dialog'
import { Button } from '@/components/ui/button'

<ConfirmDialog
  type="Delete"
  message="Do you want to delete invoice INV-2048?"
  description="This invoice has not been paid. The action cannot be undone."
  onConfirm={() => {}}
>
  <ConfirmDialogTrigger render={<Button variant="Destructive" />}>
    Delete invoice
  </ConfirmDialogTrigger>
</ConfirmDialog>

<ConfirmDialog
  type="Warning"
  message="Deactivate this POS terminal?"
  onConfirm={() => {}}
>
  <ConfirmDialogTrigger render={<Button variant="Secondary" style="Border" />}>
    Deactivate
  </ConfirmDialogTrigger>
</ConfirmDialog>

<ConfirmDialog type="Delete" size="Medium" confirmPhrase="weekend-workshop">
  <ConfirmDialogTrigger render={<Button variant="Destructive" />}>
    Delete with phrase
  </ConfirmDialogTrigger>
</ConfirmDialog>`}
    >
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Delete invoice
          </p>
          <ConfirmDialog
            type="Delete"
            message="Do you want to delete invoice INV-2048?"
            description="This invoice has not been paid. The action cannot be undone."
          >
            <ConfirmDialogTrigger render={<Button variant="Destructive" />}>
              Open Delete
            </ConfirmDialogTrigger>
          </ConfirmDialog>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Warning
          </p>
          <ConfirmDialog
            type="Warning"
            message="Deactivate this POS terminal?"
            description="Orchard 01 will stop accepting in-store payments until you reactivate it."
          >
            <ConfirmDialogTrigger render={<Button variant="Secondary" style="Border" />}>
              Open Warning
            </ConfirmDialogTrigger>
          </ConfirmDialog>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Success
          </p>
          <ConfirmDialog
            type="Success"
            message="Payment link created successfully."
            description="Share this link with your customer."
          >
            <ConfirmDialogTrigger render={<Button variant="Primary" />}>
              Open Success
            </ConfirmDialogTrigger>
          </ConfirmDialog>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Question
          </p>
          <ConfirmDialog
            type="Question"
            message="Cancel this Recurring plan?"
            description="The customer will not be charged on the next billing date."
          >
            <ConfirmDialogTrigger render={<Button variant="Secondary" style="Border" />}>
              Open Question
            </ConfirmDialogTrigger>
          </ConfirmDialog>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Medium with confirm phrase
        </p>
        <ConfirmDialog
          type="Delete"
          size="Medium"
          confirmPhrase="weekend-workshop"
          message="Do you want to delete this payment link? The action can't be undone."
        >
          <ConfirmDialogTrigger render={<Button variant="Destructive" />}>
            Open Medium
          </ConfirmDialogTrigger>
        </ConfirmDialog>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Delete product
        </p>
        <ConfirmDialog
          type="Delete"
          message="Delete Classic White Tee from Product Data?"
          description="It will be removed from Online Store, POS, invoices, and payment links."
        >
          <ConfirmDialogTrigger render={<Button variant="Destructive" />}>
            Delete product
          </ConfirmDialogTrigger>
        </ConfirmDialog>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Content block
        </p>
        <div className="max-w-[320px] rounded-2xl border border-oc-border p-4">
          <ConfirmDialogContent type="Delete" />
        </div>
      </div>
    </DocExamplePage>
  )
}
