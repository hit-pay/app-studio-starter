import { createFileRoute } from '@tanstack/react-router'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/toast'

export const Route = createFileRoute('/toast')({
  component: ToastExamplesPage,
})

function ToastExamplesPage() {
  return (
    <DocExamplePage to="/toast">
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Default
        </p>
        <p className="text-xs text-oc-muted-foreground">
          Programmatic floating toast. Mount <code className="font-mono">Toaster</code> in
          the root layout.
        </p>
        <Button
          variant="Secondary"
          style="Border"
          size="Small"
          onClick={() =>
            toast.add({
              title: 'Invoice created',
              description: 'INV-2048 · SGD 128.00 · Priya Nair',
            })
          }
        >
          Create invoice
        </Button>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Types
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="Secondary"
            style="Border"
            size="Small"
            onClick={() =>
              toast.add({
                title: 'Payment received',
                description: 'PayNow · INV-2048 · SGD 128.00',
                type: 'success',
              })
            }
          >
            Payment received
          </Button>
          <Button
            variant="Secondary"
            style="Border"
            size="Small"
            onClick={() =>
              toast.add({
                title: 'Recurring charge scheduled',
                description: 'Alex Turner · next run 1 Sep',
                type: 'info',
              })
            }
          >
            Recurring scheduled
          </Button>
          <Button
            variant="Secondary"
            style="Border"
            size="Small"
            onClick={() =>
              toast.add({
                title: 'PayNow is slower than usual',
                description: 'Consider Cards or GrabPay for new links',
                type: 'warning',
              })
            }
          >
            Channel warning
          </Button>
          <Button
            variant="Secondary"
            style="Border"
            size="Small"
            onClick={() =>
              toast.add({
                title: 'Refund failed',
                description: 'Could not refund SGD 48.00 on INV-2048',
                type: 'error',
              })
            }
          >
            Refund failed
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Action
        </p>
        <Button
          variant="Secondary"
          style="Border"
          size="Small"
          onClick={() => {
            const id = toast.add({
              title: 'Payment link sent',
              description: 'Sent to Priya Nair for INV-2048',
              actionProps: {
                children: 'Undo',
                onClick() {
                  toast.close(id)
                },
              },
            })
          }}
        >
          Undo send link
        </Button>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Commerce
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="Secondary"
            style="Border"
            size="Small"
            onClick={() =>
              toast.add({
                title: 'Online Store published',
                description: 'Home page is live with weekend offers',
                type: 'success',
              })
            }
          >
            Publish store
          </Button>
          <Button
            variant="Secondary"
            style="Border"
            size="Small"
            onClick={() =>
              toast.add({
                title: 'POS sale charged',
                description: 'HP-POS-04 · GrabPay · SGD 24.50',
                type: 'success',
              })
            }
          >
            Charge POS
          </Button>
        </div>
      </div>
    </DocExamplePage>
  )
}
