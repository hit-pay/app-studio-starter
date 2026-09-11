import { useState } from 'react'

import { fakeHitPayListPayload } from '#/lib/resource-picker-fake'
import { mapResourcePickerPayload } from '#/lib/resource-picker-map'
import { Button } from '@ui/actions/button'
import {
  ResourcePickerProvider,
  useResourcePicker,
  type ResourcePickerLoad,
  type ResourcePickerOptions,
  type ResourcePickerResult,
} from '@/components/form/resource-picker'

const PAGE_SIZE = 2

const demoLoad: ResourcePickerLoad = async (input) => {
  await new Promise((resolve) => setTimeout(resolve, 180))
  const mapped = mapResourcePickerPayload(input, fakeHitPayListPayload(input))
  const start = ((input.page || 1) - 1) * PAGE_SIZE
  const items = mapped.items.slice(start, start + PAGE_SIZE)
  return { items, hasMore: start + PAGE_SIZE < mapped.items.length }
}

const TYPE_BUTTONS: { type: ResourcePickerOptions['type']; label: string; options?: Partial<ResourcePickerOptions> }[] =
  [
    { type: 'product', label: 'Add product', options: { multiple: 1 } },
    { type: 'product', label: 'Add products', options: { multiple: true } },
    { type: 'customer', label: 'Select customers', options: { action: 'select', multiple: true } },
    { type: 'order', label: 'Add orders', options: { multiple: 5 } },
    { type: 'location', label: 'Select location', options: { action: 'select' } },
    { type: 'product-category', label: 'Add categories', options: { multiple: true } },
    { type: 'charge', label: 'Select charge' },
    { type: 'invoice', label: 'Select invoices', options: { multiple: true } },
    { type: 'payment-request', label: 'Select payment request' },
    { type: 'subscription-plan', label: 'Select plan' },
    { type: 'recurring-billing', label: 'Select recurring' },
    { type: 'coupon', label: 'Select coupon' },
    { type: 'discount', label: 'Select discount' },
    { type: 'tax', label: 'Select tax' },
    { type: 'shipping', label: 'Select shipping' },
    { type: 'pickup', label: 'Select pickup' },
    { type: 'add-on', label: 'Select add-on' },
    { type: 'store-page', label: 'Select store page' },
  ]

function ResourcePickerButtons() {
  const resourcePicker = useResourcePicker()
  const [selected, setSelected] = useState<ResourcePickerResult[] | null>(null)
  const [cancelled, setCancelled] = useState(false)

  async function open(options: ResourcePickerOptions) {
    const next = await resourcePicker(options)
    if (!next) {
      setCancelled(true)
      setSelected(null)
      return
    }
    setCancelled(false)
    setSelected(next)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {TYPE_BUTTONS.map((button) => (
          <Button
            key={`${button.type}-${button.label}`}
            variant="outline"
            size="sm"
            onClick={() => open({ type: button.type, ...button.options })}
          >
            {button.label}
          </Button>
        ))}
      </div>

      {cancelled ? <p className="text-sm text-oc-muted-foreground">Cancelled — nothing selected.</p> : null}

      {selected ? (
        <div className="space-y-2 rounded-lg border border-oc-border p-3">
          <p className="text-sm font-medium">Selected ({selected.length})</p>
          <ul className="space-y-1 text-sm">
            {selected.map((item) => (
              <li key={item.id}>
                <span className="font-mono text-xs">{item.id}</span>
                {item.children?.length ? (
                  <span className="text-oc-muted-foreground">
                    {' '}
                    → {item.children.map((child) => child.id).join(', ')}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
          <pre className="max-h-72 overflow-auto rounded-md bg-oc-muted p-3 text-xs leading-5">
            {JSON.stringify(selected, null, 2)}
          </pre>
        </div>
      ) : null}
    </div>
  )
}

function ResourcePickerDemo() {
  return (
    <ResourcePickerProvider load={demoLoad}>
      <ResourcePickerButtons />
    </ResourcePickerProvider>
  )
}

export { ResourcePickerDemo }
