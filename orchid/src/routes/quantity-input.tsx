import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { QuantityInput } from '@/components/ui/quantity-input'

export const Route = createFileRoute('/quantity-input')({
  component: QuantityInputExamplesPage,
})

function QuantityInputExamplesPage() {
  const [qty, setQty] = useState(2)
  const [stock, setStock] = useState(24)

  return (
    <DocExamplePage
      to="/quantity-input"
      usage={`import { useState } from 'react'
import { QuantityInput } from '@/components/ui/quantity-input'

function QuantityExample() {
  const [quantity, setQuantity] = useState(2)

  return (
    <QuantityInput
      value={quantity}
      min={1}
      max={99}
      onValueChange={setQuantity}
    />
  )
}`}
    >
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Default
          </p>
          <p className="text-xs text-oc-muted-foreground">Invoice line qty · SKU-TEA-12</p>
          <QuantityInput
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
          <QuantityInput className="max-w-xs" defaultValue={3} min={1} max={10} />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Disabled
          </p>
          <p className="text-xs text-oc-muted-foreground">Locked recurring seats</p>
          <QuantityInput className="max-w-xs" defaultValue={5} disabled />
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Product stock
          </p>
          <p className="text-xs text-oc-muted-foreground">Online Store inventory for Matcha Latte</p>
          <QuantityInput
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
          <QuantityInput className="max-w-xs" defaultValue={1} min={1} max={20} />
        </div>
      </div>
    </DocExamplePage>
  )
}
