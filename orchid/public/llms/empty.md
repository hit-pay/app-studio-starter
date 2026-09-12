<!-- Generated from content/docs/components/empty.mdx. Do not edit. -->

# Empty

Props empty state with optional media and actions.

## Interactive example

The interactive example is rendered on the Orchid documentation page. Use the usage guidance below and verify the installed component source for the exact API.

One props-driven empty state. Do not import `@ui/displaying-data/empty` children.

```tsx
import { Empty } from '@/components/displaying-data/empty'

<Empty
  media="icon"
  title="No invoices yet"
  description="Create an invoice to bill a customer."
  actions={[{ key: 'create', label: 'Create invoice' }]}
  onAction={(action) => {
    if (action.key === 'create') createInvoice()
  }}
/>
```

- `title` is required.
- `media`: `icon` | `search` | `upgrade`. Omit for text only.
- `icon` overrides the default media glyph.
- `actions` is `{ key, label, variant?, disabled?, icon? }[]`.
