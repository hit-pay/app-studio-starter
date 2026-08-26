import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { InputStepper } from '@/components/ui/input-stepper'

export const Route = createFileRoute('/input-stepper')({
  component: InputStepperExamplesPage,
})

function InputStepperExamplesPage() {
  const [qty, setQty] = useState(2)
  const [stock, setStock] = useState(24)

  return (
    <DocExamplePage to="/input-stepper">
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Default
          </p>
          <p className="text-xs text-oc-muted-foreground">Invoice line qty · SKU-TEA-12</p>
          <InputStepper
            className="max-w-xs"
            value={qty}
            min={0}
            max={99}
            onValueChange={setQty}
          />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Uncontrolled
          </p>
          <p className="text-xs text-oc-muted-foreground">POS cart items</p>
          <InputStepper className="max-w-xs" defaultValue={3} min={1} max={10} />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Disabled
          </p>
          <p className="text-xs text-oc-muted-foreground">Locked recurring seats</p>
          <InputStepper className="max-w-xs" defaultValue={5} disabled />
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Product stock
          </p>
          <p className="text-xs text-oc-muted-foreground">Online Store inventory for Matcha Latte</p>
          <InputStepper
            className="max-w-xs"
            value={stock}
            min={0}
            max={999}
            onValueChange={setStock}
          />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Recurring seats
          </p>
          <p className="text-xs text-oc-muted-foreground">Alex Turner · monthly plan quantity</p>
          <InputStepper className="max-w-xs" defaultValue={1} min={1} max={20} />
        </div>
      </div>
    </DocExamplePage>
  )
}
