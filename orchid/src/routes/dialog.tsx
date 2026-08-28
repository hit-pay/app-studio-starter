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
