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
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Default
          </p>
          <Modal>
            <ModalTrigger render={<Button type="Primary" />}>Open Default</ModalTrigger>
            <ModalPopup title="Modal Title" description="Modal Description">
              <p className="text-sm leading-[1.5] text-foreground">
                Review this payment before you confirm. You can still cancel or go back.
              </p>
            </ModalPopup>
          </Modal>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Size
          </p>
          <div className="flex flex-wrap gap-3">
            <Modal>
              <ModalTrigger render={<Button type="Secondary" style="Border" />}>Small</ModalTrigger>
              <ModalPopup
                size="Small"
                title="Confirm"
                description="This cannot be undone."
                confirmType="Destructive"
                confirmLabel="Delete"
              >
                <p className="text-sm leading-[1.5] text-foreground">
                  Delete this payment method from the account?
                </p>
              </ModalPopup>
            </Modal>
            <Modal>
              <ModalTrigger render={<Button type="Secondary" style="Border" />}>Medium</ModalTrigger>
              <ModalPopup size="Medium" title="Modal Title" description="Modal Description">
                <p className="text-sm leading-[1.5] text-foreground">
                  Medium width, used for most create and edit dialogs.
                </p>
              </ModalPopup>
            </Modal>
            <Modal>
              <ModalTrigger render={<Button type="Secondary" style="Border" />}>Default</ModalTrigger>
              <ModalPopup size="Default" title="Modal Title" description="Modal Description">
                <p className="text-sm leading-[1.5] text-foreground">
                  Default width for longer forms and detail content.
                </p>
              </ModalPopup>
            </Modal>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Borderless
          </p>
          <Modal>
            <ModalTrigger render={<Button type="Secondary" style="Border" />}>
              Open Borderless
            </ModalTrigger>
            <ModalPopup borderless title="Are you sure?" confirmLabel="Yes" cancelLabel="No">
              <p className="py-5 text-sm leading-[1.5] text-foreground">
                Header and footer have no dividers.
              </p>
            </ModalPopup>
          </Modal>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Persistent
          </p>
          <Modal persistent>
            <ModalTrigger render={<Button type="Secondary" style="Border" />}>
              Open Persistent
            </ModalTrigger>
            <ModalPopup title="Complete this step" description="Clicking outside will not close.">
              <p className="text-sm leading-[1.5] text-foreground">
                Use Cancel or the close icon to dismiss.
              </p>
            </ModalPopup>
          </Modal>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            No footer
          </p>
          <Modal>
            <ModalTrigger render={<Button type="Secondary" style="Border" />}>
              Open Without Footer
            </ModalTrigger>
            <ModalPopup footer={false} title="Details" description="Read-only overlay">
              <p className="text-sm leading-[1.5] text-foreground">
                Close with the icon in the header.
              </p>
            </ModalPopup>
          </Modal>
        </div>
      </DocExamplePage>
  )
}
