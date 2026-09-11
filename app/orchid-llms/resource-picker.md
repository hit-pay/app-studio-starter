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
  type ResourcePickerItem,
  type ResourcePickerLoad,
  type ResourcePickerOptions,
  type ResourcePickerResult,
  type ResourcePickerType,
} from '@/components/overlays/resource-picker'

type FakeRecord = Record<string, string | number | boolean | null | string[] | FakeRecord | FakeRecord[]>

const FAKE_HITPAY: Record<ResourcePickerType, FakeRecord[]> = {
  product: [
    {
      id: '9c1e0001-0000-4000-8000-000000000001',
      name: 'Mid-century modern shelf',
      status: 'draft',
      currency: 'sgd',
      price: 5800,
      price_display: 'S$5,800.00',
      images: [{ url: 'https://placehold.co/64x64/eee/333?text=S' }],
      variations: [
        { id: '9c1e0001-0000-4000-8000-000000000011', description: 'Oak', variation_value_1: 'Oak', quantity: 3, price: 5800, price_display: 'S$5,800.00' },
        { id: '9c1e0001-0000-4000-8000-000000000012', description: 'Pine', variation_value_1: 'Pine', quantity: 12, price: 5100, price_display: 'S$5,100.00' },
      ],
    },
    {
      id: '9c1e0001-0000-4000-8000-000000000002',
      name: 'Ceramic table lamp',
      status: 'published',
      currency: 'sgd',
      price: 89,
      price_display: 'S$89.00',
      images: [{ url: 'https://placehold.co/64x64/eee/333?text=L' }],
      variations: [
        { id: '9c1e0001-0000-4000-8000-000000000021', description: 'Warm white', variation_value_1: 'Warm white', quantity: 8, price: 89, price_display: 'S$89.00' },
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
      channels: ['pos', 'online_store'],
      images: [{ url: 'https://placehold.co/64x64/eee/333?text=T' }],
      variations: [],
    },
    {
      id: '9c1e0001-0000-4000-8000-000000000004',
      name: 'Espresso beans 250g',
      status: 'published',
      currency: 'sgd',
      price: 16,
      price_display: 'S$16.00',
      quantity: 0,
      channels: ['online_store'],
      images: [{ url: 'https://placehold.co/64x64/eee/333?text=E' }],
      variations: [],
    },
    {
      id: '9c1e0001-0000-4000-8000-000000000005',
      name: 'Ceramic pour-over',
      status: 'published',
      currency: 'sgd',
      price: 42,
      price_display: 'S$42.00',
      quantity: 7,
      images: [{ url: 'https://placehold.co/64x64/eee/333?text=P' }],
      variations: [],
    },
    {
      id: '9c1e0001-0000-4000-8000-000000000006',
      name: 'Linen napkin set',
      status: 'draft',
      currency: 'sgd',
      price: 24,
      price_display: 'S$24.00',
      quantity: 15,
      images: [{ url: 'https://placehold.co/64x64/eee/333?text=N' }],
      variations: [],
    },
  ],
  'product-category': [
    { id: '9c1e0002-0000-4000-8000-000000000001', name: 'Furniture', is_active: true, handle: 'furniture' },
    { id: '9c1e0002-0000-4000-8000-000000000002', name: 'Lighting', is_active: false, handle: 'lighting' },
  ],
  customer: [
    { id: '9c1e0003-0000-4000-8000-000000000001', name: 'Priya Nair', email: 'priya@example.com', phone_number: '91234567' },
    { id: '9c1e0003-0000-4000-8000-000000000002', name: 'Wei Chen', email: 'wei@example.com', phone_number: '98887766' },
  ],
  order: [
    { id: '9c1e0004-0000-4000-8000-000000000001', order_display_number: 2048, status: 'draft', amount: 120, currency: 'sgd' },
    { id: '9c1e0004-0000-4000-8000-000000000002', order_display_number: 2049, status: 'completed', amount: 89, currency: 'sgd' },
  ],
  location: [
    { id: '9c1e0005-0000-4000-8000-000000000001', name: 'Main Store', street: '1 Harbourfront', city: 'Singapore', country: 'SG', active: true },
    { id: '9c1e0005-0000-4000-8000-000000000002', name: 'Warehouse', street: '8 Tuas', city: 'Singapore', country: 'SG', active: false },
  ],
  charge: [
    { id: '9c1e0006-0000-4000-8000-000000000001', amount: 70.56, currency: 'sgd', status: 'succeeded', remark: 'Order #1007', payment_method: { name: 'card' } },
    { id: '9c1e0006-0000-4000-8000-000000000002', amount: 12, currency: 'sgd', status: 'refunded', remark: 'Till cash', payment_method: { name: 'cash' } },
    { id: '9c1e0006-0000-4000-8000-000000000003', amount: 18, currency: 'sgd', status: 'failed', remark: 'Card decline', payment_method: { name: 'card' } },
  ],
  invoice: [
    { id: '9c1e0007-0000-4000-8000-000000000001', invoice_number: 'INV-1001', status: 'overdue', amount: 240, currency: 'sgd', email: 'priya@example.com' },
    { id: '9c1e0007-0000-4000-8000-000000000002', invoice_number: 'INV-1002', status: 'paid', amount: 88, currency: 'sgd', email: 'wei@example.com' },
  ],
  'payment-request': [
    { id: '9c1e0008-0000-4000-8000-000000000001', purpose: 'Deposit', reference_number: 'DEP-1', status: 'pending', amount: '200.00', currency: 'sgd' },
    { id: '9c1e0008-0000-4000-8000-000000000002', purpose: 'Balance', name: 'Priya Nair', status: 'completed', amount: '50.00', currency: 'sgd' },
  ],
  'subscription-plan': [
    { id: '9c1e0009-0000-4000-8000-000000000001', name: 'Monthly retainer', cycle: 'monthly', amount: 99, currency: 'sgd', status: 'published' },
  ],
  'recurring-billing': [
    { id: '9c1e000a-0000-4000-8000-000000000001', name: 'Monthly retainer', customer_email: 'priya@example.com', status: 'active', amount: 99, currency: 'sgd' },
  ],
  coupon: [
    { id: '9c1e000b-0000-4000-8000-000000000001', name: 'Welcome', code: 'WELCOME10', percentage: 10 },
  ],
  discount: [
    { id: '9c1e000c-0000-4000-8000-000000000001', name: 'Staff 10%', discount_type: 'percentage', percentage: 10, pos_discount: true },
  ],
  tax: [
    { id: '9c1e000d-0000-4000-8000-000000000001', name: 'GST 9%', rate: 0.09, tax_inclusive: false },
  ],
  shipping: [
    { id: '9c1e000e-0000-4000-8000-000000000001', name: 'Standard', is_active: true, calculation: 'flat' },
  ],
  pickup: [
    { id: '9c1e000f-0000-4000-8000-000000000001', name: 'Main Store pickup', address: '1 Harbourfront', status: 'active' },
  ],
  'add-on': [
    { id: '9c1e0010-0000-4000-8000-000000000001', name: 'Gift wrap' },
  ],
  'store-page': [
    { id: '9c1e0011-0000-4000-8000-000000000001', title: 'About', page_path: '/about', enabled: true },
  ],
}

function fakeHitPayList(type: ResourcePickerType) {
  return { data: FAKE_HITPAY[type] ?? [] }
}

function toItem(type: ResourcePickerType, row: FakeRecord): ResourcePickerItem {
  const id = String(row.id)
  if (type === 'product') {
    const variations = Array.isArray(row.variations) ? row.variations : []
    const images = Array.isArray(row.images) ? row.images : []
    const firstImage = images[0] as FakeRecord | undefined
    return {
      id,
      title: String(row.name ?? id),
      image: typeof firstImage?.url === 'string' ? firstImage.url : null,
      badge: row.status === 'draft' ? 'Draft' : undefined,
      resource: row as ResourcePickerItem['resource'],
      children: variations.length
        ? variations.map((variation) => {
        const v = variation as FakeRecord
        return {
          id: String(v.id),
          title: String(v.variation_value_1 || v.description || 'Variant'),
          meta: typeof v.quantity === 'number' ? `${v.quantity} available` : undefined,
          trailing: typeof v.price_display === 'string' ? v.price_display : undefined,
          resource: v as ResourcePickerItem['resource'],
        }
      })
        : undefined,
    }
  }

  const title = String(
    row.name ||
      row.title ||
      row.invoice_number ||
      row.purpose ||
      row.code ||
      row.customer_email ||
      (row.order_display_number != null ? `Order #${row.order_display_number}` : '') ||
      [row.remark, row.amount, row.currency].filter(Boolean).join(' · ') ||
      id,
  )

  return {
    id,
    title,
    badge:
      typeof row.status === 'string'
        ? row.status
        : row.is_active === false || row.active === false
          ? 'Inactive'
          : typeof row.code === 'string'
            ? row.code
            : undefined,
    resource: row as ResourcePickerItem['resource'],
  }
}

const PAGE_SIZE = 2

const demoLoad: ResourcePickerLoad = async ({ type, query, filter, extras, page }) => {
  await new Promise((resolve) => setTimeout(resolve, 180))
  const payload = fakeHitPayList(type)
  const needle = query.trim().toLowerCase()
  const currentPage = page || 1

  const items = payload.data
    .map((row) => toItem(type, row))
    .filter((item) => {
      if (needle && !item.title.toLowerCase().includes(needle)) return false
      if (type === 'product') {
        const childQty = (item.children ?? []).reduce(
          (sum, child) => sum + Number(child.resource?.quantity ?? 0),
          0,
        )
        const quantity = item.resource?.quantity != null ? Number(item.resource.quantity) : childQty
        if (extras?.inventory === 'in_stock' && quantity <= 0) return false
        if (extras?.inventory === 'out_of_stock' && quantity > 0) return false
        const channels = item.resource?.channels
        if (extras?.channel && extras.channel !== 'all') {
          if (Array.isArray(channels) && !channels.includes(extras.channel)) return false
        }
      }
      if (type === 'charge' && extras?.payment_method && extras.payment_method !== 'all') {
        const method = item.resource?.payment_method
        const name = typeof method === 'object' && method ? String(method.name ?? '') : String(method ?? '')
        if (name !== extras.payment_method) return false
      }
      if (type === 'location' && filter === 'active') return item.resource?.active !== false
      if (type === 'location' && filter === 'inactive') return item.resource?.active === false
      if (type === 'shipping' && filter === 'active') return item.resource?.is_active !== false
      if (type === 'shipping' && filter === 'inactive') return item.resource?.is_active === false
      if (type === 'discount' && filter === 'pos') return item.resource?.pos_discount === true
      if (type === 'discount' && filter === 'online') return item.resource?.pos_discount !== true
      if (filter === 'all') return true
      if (type === 'product' && filter === 'draft') return item.badge === 'Draft'
      if (type === 'product' && filter === 'published') return item.badge !== 'Draft'
      if (type === 'product-category' && filter === 'active') return item.resource?.is_active !== false
      if (type === 'product-category' && filter === 'inactive') return item.resource?.is_active === false
      if (type === 'store-page' && (filter === 'published' || filter === 'draft')) {
        return filter === 'published' ? item.resource?.enabled !== false : item.resource?.enabled === false
      }
      if (item.badge) return String(item.badge).toLowerCase() === filter
      return true
    })

  const start = (currentPage - 1) * PAGE_SIZE
  const pageItems = items.slice(start, start + PAGE_SIZE)
  return { items: pageItems, hasMore: start + PAGE_SIZE < items.length }
}

const TYPE_BUTTONS: { type: ResourcePickerType; label: string; options?: Partial<ResourcePickerOptions> }[] = [
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
```

Click a button, pick a row, confirm. The panel below the buttons shows selected ids and the HitPay-shaped `resource` JSON. Cancel shows “Cancelled”. The demo `load` talks to a **fake** `{ data: [...] }` list (same envelope as HitPay `/v1/…` lists), then maps rows to picker items. In App Studio the real loader is already on the root — do not remount `ResourcePickerProvider`.

## App Studio usage

```tsx
import { useState } from 'react'
import { Button } from '@ui/actions/button'
import { useResourcePicker, type ResourcePickerResult } from '@/components/overlays/resource-picker'

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

`type`: `product` | `product-category` | `customer` | `order` | `location` | `charge` | `invoice` | `payment-request` | `subscription-plan` | `recurring-billing` | `coupon` | `discount` | `tax` | `shipping` | `pickup` | `add-on` | `store-page`.

```tsx
await pick({ type: 'charge' })
await pick({ type: 'invoice', multiple: true })
await pick({ type: 'customer', action: 'select', multiple: true })
await pick({ type: 'location', action: 'select' })
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

Map `data[]` to `{ id, title, badge, image, resource, children }` the same way App Studio’s `loadResourcePickerPage` does. Result after select: `{ id, resource, children? }` — `resource` is the original HitPay row.

- `action`: `add` (default) or `select`
- `multiple`: omit/`false` = one, `true` = unlimited, number = cap
- `query`: initial search
- `selectionIds`: preselected `{ id, children?: { id }[] }`
- `filter.status`: initial status (product, order, invoice, charge, location, shipping, discount POS/online, …)
- `filter.variants`: `false` hides product variations
- Dialog also shows type-specific extras: product **Stock** + **Channel**, charge **Method**
- `load` receives `{ type, query, filter, extras, page, cursor }` and should return `{ items, hasMore, cursor? }`
- When `hasMore` is true, the dialog shows **Load more** plus the resource name and appends the next page
- Cancel returns `undefined`
