<!-- Generated from content/docs/components/empty.mdx. Do not edit. -->

# Empty

Props empty state with optional media and actions.

## Example

```tsx
import { AddRegular } from '@mingcute/react/core-regular'
import { Empty } from '@/components/displaying-data/empty'

function EmptyDemo() {
  return (
    <div className="grid gap-12 md:grid-cols-2">
      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          No invoices
        </p>
        <Empty
          media="icon"
          title="No invoices yet"
          description="Create an invoice to bill a customer by email or payment link."
          actions={[
            { key: 'learn', label: 'Learn more', variant: 'outline' },
            {
              key: 'create',
              label: 'Create invoice',
              icon: <AddRegular data-icon="inline-start" />,
            },
          ]}
        />
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Search not found
        </p>
        <Empty
          media="search"
          title="No matching invoices"
          description="Try another invoice number, customer, or payment channel."
        />
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Upgrade
        </p>
        <Empty
          media="upgrade"
          title="Upgrade to Point of Sale"
          description="Accept in-store payments on a HitPay terminal."
          actions={[{ key: 'upgrade', label: 'Upgrade now' }]}
        />
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Text only
        </p>
        <Empty
          title="No customers yet"
          description="Customer Data appears here after a payment, invoice, or POS sale."
        />
      </div>
    </div>
  )
}

export { EmptyDemo }
```

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
