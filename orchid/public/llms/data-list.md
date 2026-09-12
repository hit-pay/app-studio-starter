<!-- Generated from content/docs/components/data-list.mdx. Do not edit. -->

# Data List

Card/row collection when search, filters, sort, or pagination are not needed.

## Interactive example

The interactive example is rendered on the Orchid documentation page. Use the usage guidance below and verify the installed component source for the exact API.

Pass **`items` only**. Do not import row primitives. Do not
use `DataTable` unless the list needs search, filters, sort, or pagination.
Do not wrap `DataList`.

```tsx
import { DataList } from '@/components/displaying-data/data-list'

<DataList
  items={[
    {
      key: '1',
      title: 'Priya Nair',
      description: 'INV-2048 · Cards · SGD 128.00',
      details: [{ key: 'city', text: 'Singapore' }],
      actions: {
        onClick: () => {},
        menu: [
          { key: 'edit', label: 'Edit', onClick: () => {} },
          { key: 'delete', label: 'Delete', destructive: true, onClick: () => {} },
        ],
      },
    },
  ]}
/>
```

## Item shape

Each item is one object. Required: `key`, `title`.

Content

- `description` — second line
- `badges` — nodes beside the title (`Badge`)
- `details` — `{ key, text, icon? }[]`
- `tokens` / `tokensLabel` — chips
- `copyRows` — `{ label, value }[]` with `layout="stack"`
- `media` — `{ src, alt? }` or a React node
- `logo` — mark beside the title
- `meta` — muted supporting text
- `layout` — `default` | `stack` | `media` (media is automatic when `media` is set)
- `selected`
- `trailing` — a right-side React node, including interactive controls such as
  `QuantityInput`; it is rendered in every layout, including `stack`

Actions — prefer `actions` (do not import `DropdownMenu` for the ⋮ menu)

```ts
actions: {
  onClick?: () => void
  trailing?: ReactNode
  menu?: { key?: string; label: string; destructive?: boolean; onClick?: () => void }[]
  hover?: { key: string; label: string; icon?: ReactNode; destructive?: boolean; onClick?: () => void }[]
}
```

Top-level `onClick`, `trailing`, `menu`, and `hoverActions` are aliases of
`actions`. Trailing controls stop propagation so clicking a control does not
open the list row. Use `trailing` for per-row controls; do not put a
`QuantityInput` in `description`, `details`, or `copyRows`.

## Inventory quantity example

Use `trailing` for a quantity control that must stay on the right side of each
product row. Keep the quantity in the row state and persist it when the user
saves the count:

```tsx
import { QuantityInput } from '@/components/form/quantity-input'

<DataList
  items={[
    {
      key: product.id,
      title: product.name,
      description: product.sku ?? 'No SKU',
      meta: `Last counted ${lastCountedAt}`,
      trailing: (
        <QuantityInput
          value={quantity}
          min={0}
          onValueChange={setQuantity}
          aria-label={`${product.name} quantity`}
        />
      ),
    },
  ]}
/>
```

The quantity control is visible in `default`, `media`, and `stack` layouts.
Choose `DataTable` instead when the inventory list needs search, filters,
sorting, or pagination.

## List props

`items`, optional `layout`, `empty`, `className`. No `children`.
