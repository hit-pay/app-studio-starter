<!-- Generated from content/docs/components/resource-picker.mdx. Do not edit. -->

# Resource Picker

Search and select HitPay products, categories, customers, orders, or locations.

## Example

```tsx
import { useState } from 'react'

import { Button } from '@ui/actions/button'
import {
  ResourcePickerProvider,
  useResourcePicker,
  type ResourcePickerLoad,
  type ResourcePickerResult,
} from '@/components/overlays/resource-picker'

const demoLoad: ResourcePickerLoad = async ({ type, query, filter }) => {
  const needle = query.trim().toLowerCase()
  const items = {
    product: [
      {
        id: 'p1',
        title: 'Mid-century modern shelf',
        badge: 'Draft',
        image: 'https://placehold.co/64x64/eee/333?text=S',
        resource: { id: 'p1', name: 'Mid-century modern shelf', status: 'draft' },
        children: [
          {
            id: 'v1',
            title: 'Oak',
            meta: '3 available',
            trailing: '$5,800',
            resource: { id: 'v1', description: 'Oak', quantity: 3, price: 5800 },
          },
          {
            id: 'v2',
            title: 'Pine',
            meta: '12 available',
            trailing: '$5,100',
            resource: { id: 'v2', description: 'Pine', quantity: 12, price: 5100 },
          },
        ],
      },
      {
        id: 'p2',
        title: 'Ceramic table lamp',
        image: 'https://placehold.co/64x64/eee/333?text=L',
        resource: { id: 'p2', name: 'Ceramic table lamp', status: 'published' },
        children: [
          {
            id: 'v3',
            title: 'Warm white',
            meta: '8 available',
            trailing: '$89',
            resource: { id: 'v3', description: 'Warm white', quantity: 8, price: 89 },
          },
        ],
      },
    ],
    'product-category': [
      { id: 'c1', title: 'Furniture', resource: { id: 'c1', name: 'Furniture' } },
      { id: 'c2', title: 'Lighting', resource: { id: 'c2', name: 'Lighting' } },
    ],
    customer: [
      { id: 'u1', title: 'Priya Nair', resource: { id: 'u1', name: 'Priya Nair', email: 'priya@example.com' } },
      { id: 'u2', title: 'Wei Chen', resource: { id: 'u2', name: 'Wei Chen', email: 'wei@example.com' } },
    ],
    order: [
      { id: 'o1', title: 'Order #2048', badge: 'Draft', resource: { id: 'o1', status: 'draft' } },
      { id: 'o2', title: 'Order #2049', badge: 'Completed', resource: { id: 'o2', status: 'completed' } },
    ],
    location: [
      { id: 'l1', title: 'Main Store', resource: { id: 'l1', name: 'Main Store' } },
      { id: 'l2', title: 'Warehouse', resource: { id: 'l2', name: 'Warehouse' } },
    ],
  }[type]

  return {
    items: items.filter((item) => {
      if (needle && !item.title.toLowerCase().includes(needle)) return false
      if (type === 'product' && filter === 'draft') return 'badge' in item && item.badge === 'Draft'
      if (type === 'product' && filter === 'published') return !('badge' in item && item.badge === 'Draft')
      if (type === 'order' && filter !== 'all' && 'badge' in item) {
        return String(item.badge).toLowerCase() === filter
      }
      return true
    }),
  }
}

function summarize(selected: ResourcePickerResult[]) {
  return selected
    .map((item) => {
      const kids = item.children?.map((child) => child.id).join(', ')
      return kids ? `${item.id} → ${kids}` : item.id
    })
    .join('; ')
}

function ResourcePickerButtons() {
  const resourcePicker = useResourcePicker()
  const [last, setLast] = useState<string | null>(null)

  async function open(options: Parameters<typeof resourcePicker>[0]) {
    const selected = await resourcePicker(options)
    setLast(selected ? summarize(selected) : 'Cancelled')
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => open({ type: 'product', multiple: 1 })}>Add product</Button>
        <Button variant="outline" onClick={() => open({ type: 'product', multiple: true })}>
          Add products
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            open({
              type: 'product',
              query: 'lamp',
              filter: { status: 'published', variants: false },
            })
          }
        >
          Published products
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            open({
              type: 'product',
              selectionIds: [{ id: 'p1', children: [{ id: 'v1' }] }],
            })
          }
        >
          Preselected variant
        </Button>
        <Button
          variant="outline"
          onClick={() => open({ type: 'customer', action: 'select', multiple: true })}
        >
          Select customers
        </Button>
        <Button variant="outline" onClick={() => open({ type: 'order', multiple: 5 })}>
          Add orders
        </Button>
        <Button variant="outline" onClick={() => open({ type: 'product-category', multiple: true })}>
          Add categories
        </Button>
        <Button variant="outline" onClick={() => open({ type: 'location', action: 'select' })}>
          Select location
        </Button>
      </div>
      {last ? (
        <p className="text-sm text-oc-muted-foreground">
          Last result: <span className="text-oc-foreground">{last}</span>
        </p>
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

Promise picker for HitPay products, categories, customers, orders, and locations. Do not rebuild a search `Dialog`.

In App Studio the provider is already on the app root. Call `useResourcePicker()` only. Do not mount another `ResourcePickerProvider` and do not write a `load` function.

```tsx
import { useResourcePicker } from '@/components/overlays/resource-picker'

const resourcePicker = useResourcePicker()

const selected = await resourcePicker({ type: 'product', multiple: 1 })
if (!selected) return // cancelled

const [product] = selected
const variationIds = product.children?.map((child) => child.id) ?? []
```

`type`: `product` | `product-category` | `customer` | `order` | `location`.

```tsx
await resourcePicker({ type: 'customer', action: 'select', multiple: true })
await resourcePicker({ type: 'order', multiple: 5 })
await resourcePicker({ type: 'location', action: 'select' })
await resourcePicker({
  type: 'product',
  query: 'lamp',
  filter: { status: 'published', variants: false },
})
await resourcePicker({
  type: 'product',
  selectionIds: [{ id: 'prod_1', children: [{ id: 'var_1' }] }],
})
```

- `action`: `add` (default) or `select` — dialog title and confirm label
- `multiple`: omit/`false` = one, `true` = unlimited, number = cap
- `query`: initial search box
- `selectionIds`: preselected `{ id, children?: { id }[] }`
- `filter.status`: initial status (`published`, `draft`, order status, …)
- `filter.variants`: `false` hides product variations
- `filter.query`: extra hidden search terms sent to the loader
- Cancel returns `undefined`

Each result is `{ id, resource?, children? }`. For products, selected variations are in `children`. Other types omit `children`.
