<!-- Generated from content/docs/components/resource-picker.mdx. Do not edit. -->

# Resource Picker

Search and select HitPay products, categories, customers, orders, or locations.

## Example

```tsx
import { Button } from '@ui/actions/button'
import {
  ResourcePickerProvider,
  useResourcePicker,
  type ResourcePickerLoad,
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
            trailing: '$5800',
            resource: { id: 'v1', description: 'Oak', quantity: 3, price: 5800 },
          },
          {
            id: 'v2',
            title: 'Pine',
            meta: '12 available',
            trailing: '$5100',
            resource: { id: 'v2', description: 'Pine', quantity: 12, price: 5100 },
          },
        ],
      },
    ],
    'product-category': [
      { id: 'c1', title: 'Furniture', resource: { id: 'c1', name: 'Furniture' } },
      { id: 'c2', title: 'Lighting', resource: { id: 'c2', name: 'Lighting' } },
    ],
    customer: [
      { id: 'u1', title: 'Priya Nair', resource: { id: 'u1', name: 'Priya Nair' } },
    ],
    order: [
      { id: 'o1', title: 'Order #2048', badge: 'Draft', resource: { id: 'o1' } },
    ],
    location: [
      { id: 'l1', title: 'Main Store', resource: { id: 'l1', name: 'Main Store' } },
    ],
  }[type]

  return {
    items: items.filter((item) => {
      if (needle && !item.title.toLowerCase().includes(needle)) return false
      if (type === 'product' && filter === 'draft') return 'badge' in item && item.badge === 'Draft'
      if (type === 'product' && filter === 'published') return !('badge' in item && item.badge === 'Draft')
      return true
    }),
  }
}

function ResourcePickerButtons() {
  const resourcePicker = useResourcePicker()

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        onClick={async () => {
          await resourcePicker({ type: 'product', multiple: 1 })
        }}
      >
        Add product
      </Button>
      <Button
        variant="outline"
        onClick={async () => {
          await resourcePicker({ type: 'customer', action: 'select', multiple: true })
        }}
      >
        Select customers
      </Button>
      <Button
        variant="outline"
        onClick={async () => {
          await resourcePicker({ type: 'order', multiple: 5 })
        }}
      >
        Add orders
      </Button>
      <Button
        variant="outline"
        onClick={async () => {
          await resourcePicker({ type: 'product-category', multiple: true })
        }}
      >
        Add categories
      </Button>
      <Button
        variant="outline"
        onClick={async () => {
          await resourcePicker({ type: 'location', action: 'select' })
        }}
      >
        Select location
      </Button>
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

Promise picker for HitPay list records. Mount `ResourcePickerProvider` once (app root already does this). Call `useResourcePicker()` — do not rebuild a search dialog.

```tsx
const resourcePicker = useResourcePicker()
const selected = await resourcePicker({ type: 'product', multiple: 1 })
if (!selected) return
```

`type`: `product` | `product-category` | `customer` | `order` | `location`.

- `action`: `add` (default) or `select` — title and confirm label
- `multiple`: `false` (one), `true` (unlimited), or a number
- `query`: initial search
- `selectionIds`: preselected `{ id, children?: { id }[] }`
- `filter.variants`: `false` hides product variations
- `filter.status`: initial filter (`published`, `draft`, order status, …)
- Cancel returns `undefined`

Products return selected variations in `children`. Other types return `{ id, resource }`.
