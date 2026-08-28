import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Button } from '@/components/ui/button'
import {
  createToastManager,
  toast,
  Toaster,
  type ToastPlacement,
} from '@/components/ui/toast'

export const Route = createFileRoute('/toast')({
  component: ToastExamplesPage,
})

const placementToast = createToastManager()
const PLACEMENTS: ToastPlacement[] = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
]

function ToastExamplesPage() {
  const [placement, setPlacement] = useState<ToastPlacement>('bottom-right')

  return (
    <>
      <Toaster toastManager={placementToast} placement={placement} />
      <DocExamplePage
        to="/toast"
        usage={`import { Toaster, toast } from '@/components/ui/toast'

// Mount once in the application root.
<Toaster placement="bottom-right" />

toast.add({
  title: 'Payment received',
  description: 'PayNow · INV-2048 · SGD 128.00',
  type: 'success',
})`}
      >
        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Placement
          </p>
          <div className="flex flex-wrap gap-2">
            {PLACEMENTS.map((item) => (
              <Button
                key={item}
                variant={placement === item ? 'secondary' : 'outline'}
                size="sm"
                onClick={() => {
                  setPlacement(item)
                  placementToast.add({
                    title: item,
                    description: `Toast positioned at ${item}.`,
                    type: 'info',
                  })
                }}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Default
        </p>
        <p className="text-xs text-oc-muted-foreground">
          Programmatic floating toast. Mount <code className="font-mono">Toaster</code> in
          the root layout. Placement supports top-left, top-center, top-right, bottom-left,
          bottom-center, and bottom-right.
        </p>
        <Button
          variant="outline"
          size="sm"
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
            variant="outline"
            size="sm"
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
            variant="outline"
            size="sm"
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
            variant="outline"
            size="sm"
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
            variant="outline"
            size="sm"
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
          variant="outline"
          size="sm"
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
            variant="outline"
            size="sm"
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
            variant="outline"
            size="sm"
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
    </>
  )
}
