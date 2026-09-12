<!-- Generated from content/docs/components/resource-picker.mdx. Do not edit. -->

# Resource Picker

Search and select HitPay products, customers, orders, charges, invoices, or add-ons.

## Interactive example

The interactive example is rendered on the Orchid documentation page. Use the usage guidance below and verify the installed component source for the exact API.

# Quick decision

Use `ResourcePicker` only when the user adds or selects HitPay catalog records:
`product`, `customer`, `order`, `charge`, `invoice`, or `add-on`. Use the
dedicated `*Select` components for categories, locations, coupons, discounts,
taxes, shipping, and pickups.

The picker is not a page table. Do not call `list-*` from a screen to render
rows. Confirmed results must be sent to a server function and persisted to
Turso; cancelled results are `undefined`.

`ResourcePicker` is a promise-based picker for HitPay catalog records. It is not a
general-purpose table and it is not a data source for rendering a page list.
Use it when a user must add or select products, customers, orders, charges,
invoices, or add-ons.

The docs demo is self-contained: it mounts `ResourcePickerProvider` with a fake
loader. In an application, mount the provider **once** at the app root and pass
an authorized server-backed `load` function. Do not mount another provider in a
route.

The promise resolves to selected records, or `undefined` when the user cancels.
Each result keeps the HitPay row in `resource`; persist that payload instead of
re-fetching the selected id.

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

Do not rebuild a search `Dialog` or call `list-*` from the screen. After confirm,
send `selected` into a `createServerFn` and upsert Turso from `id` plus the
needed fields in `resource`. The picker is the only UI allowed to browse these
HitPay list APIs.

`type` is one of `product`, `customer`, `order`, `charge`, `invoice`, or
`add-on`. Category, location, coupon, discount, tax, shipping, and pickup use
their dedicated Select components, not this picker.

## Provider and loader

`ResourcePickerProvider` requires a `load` callback. The callback receives the
current search state and must return normalized picker rows:

```tsx
import {
  ResourcePickerProvider,
  type ResourcePickerLoad,
} from '@/components/form/resource-picker'

const load: ResourcePickerLoad = async (input) => {
  // Call the authorized server function here. Never expose access tokens.
  const response = await loadResourcePickerPage(input)
  return response // { items, hasMore?, cursor? }
}

<ResourcePickerProvider load={load}>
  <App />
</ResourcePickerProvider>
```

The loader owns the mapping from the HitPay API envelope to
`{ items, hasMore, cursor? }`. Each item needs an `id` and `title`; it may also
include `image`, `badge`, `resource`, and selectable `children`.

In App Studio, use the existing root provider and loader from
`#/lib/resource-picker`. Do not remount `ResourcePickerProvider` and do not copy
the docs-only `resource-picker-fake` module into the app.

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

The docs demo calls `fakeHitPayListPayload(input)` in `orchid/src/lib/resource-picker-fake.ts`. It applies the same `query` / `filter` / `extras` the starter sends to `/v1/…` (status, stock, channel, category, location, dates), then `mapResourcePickerPayload`. Do not paste that module into App Studio.

`shadcn add @orchid/resource-picker` installs the picker UI only. It does not
ship a HitPay API loader or `mapResourcePickerPayload`. In App Studio, the real
loader is `#/lib/resource-picker.ts`; map the API `data[]` with the existing
mapper before returning the normalized page.

Result after confirm: `{ id, resource?, children? }[]`. `resource` is the
original HitPay row. `children` is used for product variations or other nested
choices.

- `action`: `add` (default) or `select`
- `multiple`: omit/`false` = one, `true` = unlimited, number = cap
- `query`: initial search
- `selectionIds`: preselected `{ id, children?: { id }[] }`
- `filter.status`: initial status (product, order, invoice, charge)
- `filter.variants`: `false` hides product variations
- `filter.locationId`: initial outlet for product (`location_ids`) and order (`location_ids[]`) pickers
- `filter.categoryId`: initial category for product picker (`GET /v1/products` `categories`)
- `filter.channel`: initial channel for product (`pos` / `online_store` / `invoice` / `self_serve`) or order (`point_of_sale` / `quick_sale` / `store_checkout`)
- Dialog also shows type-specific extras: product **Stock** + **Channel** + **Category** + **Location**, order **Channel** + **Location**, charge **Method**
- `load` receives `{ type, query, filter, extras, page, cursor }`. `filter` is the selected status string; `extras` contains type-specific filters such as `inventory`, `channel`, `location_id`, `category_id`, `payment_method`, `date_from`, and `date_to`.
- `load` must return `{ items, hasMore?, cursor? }`; set `hasMore` when another page can be loaded
- When `hasMore` is true, the dialog shows **Load more** plus the resource name and appends the next page
- Cancel returns `undefined`
