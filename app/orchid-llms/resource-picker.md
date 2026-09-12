<!-- Generated from content/docs/components/resource-picker.mdx. Do not edit. -->

# Resource Picker

Search and select HitPay products, customers, orders, charges, invoices, or add-ons.

## Example

```tsx
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
    { type: 'charge', label: 'Select charge' },
    { type: 'invoice', label: 'Select invoices', options: { multiple: true } },
    { type: 'add-on', label: 'Select add-on' },
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
```

Click a button, pick a row, confirm. The panel below the buttons shows selected ids and the HitPay-shaped `resource` JSON. Cancel shows “Cancelled”. Docs use a fake `/v1/…` list envelope, then the **same** `mapResourcePickerPayload` as App Studio’s `loadResourcePickerPage`. In the starter, do not remount `ResourcePickerProvider` — the real loader is already on the root.

## App Studio usage

```tsx
import { useState } from 'react'
import { Button } from '@ui/actions/button'
import { useResourcePicker, type ResourcePickerResult } from '@/components/form/resource-picker'

function AddProducts() {
  const pick = useResourcePicker()
  const [selected, setSelected] = useState<ResourcePickerResult[] | null>(null)

  return (
    <>
      <Button
        onClick={async () => {
          const next = await pick({ type: 'product', multiple: true })
          if (next) setSelected(next)
        }}
      >
        Add products
      </Button>
      {selected ? (
        <pre>{JSON.stringify(selected, null, 2)}</pre>
      ) : null}
    </>
  )
}
```

Do not rebuild a search `Dialog` or call `list-*` from the screen. After confirm, send `selected` into a `createServerFn` and upsert Turso from `id` + `resource`.

`type`: `product` | `customer` | `order` | `charge` | `invoice` | `add-on`. Category / location / coupon / discount / tax / shipping / pickup use their Select components, not this picker.

```tsx
await pick({ type: 'charge' })
await pick({ type: 'invoice', multiple: true })
await pick({ type: 'customer', action: 'select', multiple: true })
await pick({
  type: 'product',
  query: 'lamp',
  filter: { status: 'published', variants: false },
})
```

## Fake HitPay list (docs demo only)

```ts
function fakeHitPayList(type: ResourcePickerType) {
  return {
    data: [
      {
        id: '9c1e0001-0000-4000-8000-000000000002',
        name: 'Ceramic table lamp',
        status: 'published',
        currency: 'sgd',
        price: 89,
        price_display: 'S$89.00',
        images: [{ url: 'https://placehold.co/64x64/eee/333?text=L' }],
        variations: [
          {
            id: '9c1e0001-0000-4000-8000-000000000021',
            description: 'Warm white',
            quantity: 8,
            price: 89,
            price_display: 'S$89.00',
          },
        ],
      },
      {
        id: '9c1e0001-0000-4000-8000-000000000003',
        name: 'Cotton tote bag',
        status: 'published',
        currency: 'sgd',
        price: 18,
        price_display: 'S$18.00',
        quantity: 40,
        images: [{ url: 'https://placehold.co/64x64/eee/333?text=T' }],
        variations: [],
      },
    ],
  }
}
```

`shadcn add @orchid/resource-picker` only replaces the dialog UI. It does not ship the starter loader (`#/lib/resource-picker.ts`). Map `data[]` with `mapResourcePickerPayload`. Result after select: `{ id, resource, children? }` — `resource` is the original HitPay row.

- `action`: `add` (default) or `select`
- `multiple`: omit/`false` = one, `true` = unlimited, number = cap
- `query`: initial search
- `selectionIds`: preselected `{ id, children?: { id }[] }`
- `filter.status`: initial status (product, order, invoice, charge)
- `filter.variants`: `false` hides product variations
- `filter.locationId`: initial outlet for product (`location_ids`) and order (`location_id`) pickers
- `filter.categoryId`: initial category for product picker (`GET /v1/products` `categories`)
- `filter.channel`: initial channel for product (`pos` / `online_store` / `invoice`) or order (`point_of_sale` / `quick_sale` / `store_checkout`)
- Dialog also shows type-specific extras: product **Stock** + **Channel** + **Category** + **Location**, order **Channel** + **Location**, charge **Method**
- `load` receives `{ type, query, filter, extras, page, cursor }` and should return `{ items, hasMore, cursor? }`
- When `hasMore` is true, the dialog shows **Load more** plus the resource name and appends the next page
- Cancel returns `undefined`
