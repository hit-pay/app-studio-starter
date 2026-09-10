<!-- Generated from content/docs/components/data-list.mdx. Do not edit. -->

# Data List

Card/row collection when search, filters, sort, or pagination are not needed.

## Example

```tsx
import {
  BankRegular,
  CurrencyDollarRegular,
  Delete2Regular,
  MapPinRegular,
  PencilRegular,
} from '@mingcute/react/core-regular'

import { Button } from '@/base-ui/actions/button'
import { Badge } from '@/base-ui/displaying-data/badge'
import { DropdownMenuItem } from '@/base-ui/overlays/dropdown-menu'
import { DataList } from '@/components/displaying-data/data-list'

const moreMenu = (
  <>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
  </>
)

function DataListDemo() {
  return (
    <>
      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Default
        </p>
        <DataList
          items={[
            {
              key: 'dbs',
              title: 'DBS Multiplier',
              description: 'Alex Turner',
              badges: (
                <>
                  <Badge tone="dark-blue">Default</Badge>
                  <Badge tone="blue">HitPay</Badge>
                  <Badge tone="purple">Stripe</Badge>
                </>
              ),
              details: [
                { key: 'city', icon: <MapPinRegular />, text: 'Singapore' },
                { key: 'currency', icon: <CurrencyDollarRegular />, text: 'SGD' },
                { key: 'account', icon: <BankRegular />, text: '***3123' },
              ],
            },
            {
              key: 'priya',
              title: 'Priya Nair',
              description: 'INV-2048 · Cards · SGD 128.00',
              badges: <Badge tone="green">Paid</Badge>,
              details: [
                { key: 'city', icon: <MapPinRegular />, text: 'Singapore' },
                { key: 'currency', icon: <CurrencyDollarRegular />, text: 'SGD' },
              ],
            },
            {
              key: 'matcha',
              title: 'Matcha Latte',
              description: 'SKU-TEA-12 · Online Store and POS',
              layout: 'media',
              meta: '24 in stock',
              badges: <Badge tone="green">Active</Badge>,
            },
          ]}
        />
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Hover actions
        </p>
        <DataList
          items={[
            {
              key: 'edit',
              title: 'DBS Multiplier',
              description: 'Alex Turner',
              badges: (
                <>
                  <Badge tone="dark-blue">Default</Badge>
                  <Badge tone="blue">HitPay</Badge>
                </>
              ),
              details: [
                { key: 'city', icon: <MapPinRegular />, text: 'Singapore' },
                { key: 'currency', icon: <CurrencyDollarRegular />, text: 'SGD' },
              ],
              hoverActions: [
                { key: 'edit', label: 'Edit', icon: <PencilRegular className="size-4" /> },
                {
                  key: 'delete',
                  label: 'Delete',
                  destructive: true,
                  icon: <Delete2Regular className="size-4" />,
                },
              ],
            },
            {
              key: 'selected',
              title: 'DBS Multiplier',
              description: 'Alex Turner',
              selected: true,
              badges: <Badge tone="dark-blue">Default</Badge>,
              details: [{ key: 'city', icon: <MapPinRegular />, text: 'Singapore' }],
            },
          ]}
        />
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Stack · copy fields
        </p>
        <DataList
          layout="stack"
          items={[
            {
              key: 'invoice',
              title: 'Invoice paid',
              meta: (
                <>
                  <span className="text-xs text-oc-muted-foreground">-</span>
                  <span className="text-xs text-oc-muted-foreground">20 Aug 2026</span>
                </>
              ),
              copyRows: [
                {
                  label: 'URL:',
                  value: 'https://hooks.hitpayapp.com/invoice/a9ad4444-e1da-46d9-9d83-4da6cb602ab9',
                },
                {
                  label: 'Salt:',
                  value: 'JDJ5JDEwJHUvekxEVWpoUjV5Ty9qdFg1bENrVC40eDZJVnNNSFFKdmozTkpqWHVqZ3cybHFTOXZINjNx',
                },
              ],
            },
            {
              key: 'link',
              title: 'Payment link paid',
              moreMenu,
              meta: (
                <>
                  <span className="text-xs text-oc-muted-foreground">-</span>
                  <span className="text-xs text-oc-muted-foreground">20 Aug 2026</span>
                </>
              ),
              copyRows: [
                {
                  label: 'URL:',
                  value: 'https://hooks.hitpayapp.com/payment-link/a9ad4444-e1da-46d9-9d83-4da6cb602ab9',
                },
              ],
            },
          ]}
        />
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Media
        </p>
        <DataList
          items={[
            {
              key: 'home',
              title: 'Home',
              description: 'Welcome to our store. Discover new arrivals and seasonal offers.',
              mediaSrc: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=128&h=128&fit=crop',
              meta: 'Last updated : 20 Aug 2026',
              badges: <Badge tone="green">Published</Badge>,
            },
            {
              key: 'brunch',
              title: 'Weekend brunch',
              description: 'Payment Link landing page for SGD 48.00 brunch sets.',
              mediaSrc: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=128&h=128&fit=crop',
              meta: 'Last updated : 18 Aug 2026',
              badges: <Badge tone="grey">Draft</Badge>,
              moreMenu,
            },
          ]}
        />
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Logo · tokens · trailing
        </p>
        <DataList
          items={[
            {
              key: 'store',
              title: 'HitPay Store',
              logo: (
                <span className="flex size-8 items-center justify-center rounded-full bg-oc-primary text-xs font-semibold text-oc-primary-foreground">
                  H
                </span>
              ),
              tokensLabel: 'Payment methods',
              tokens: ['Visa', 'WC', 'MC', 'AP', 'PN'],
              trailing: <Button size="default">Connect</Button>,
            },
          ]}
        />
      </div>
    </>
  )
}

export { DataListDemo }
```

Use `DataList` for card or row collections (people, products, checklists, activity).
Use `DataTable` only when the list needs search, column filters, sorting, or pagination.
Do not assemble these rows from base `List` parts.

```tsx
import { DataList } from '@/components/displaying-data/data-list'

<DataList
  items={[
    {
      key: '1',
      title: 'Priya Nair',
      description: 'INV-2048 · Cards · SGD 128.00',
      details: [{ key: 'city', text: 'Singapore' }],
    },
  ]}
/>
```

## API

`DataList` accepts `items`, plus optional `layout` (`default` | `stack` | `media`),
`empty`, and `className`.

Each item needs a unique string `key` and a `title`. Optional fields:

- `description` — secondary line
- `badges` — React nodes next to the title (`Badge`, etc.)
- `details` — `{ key, text, icon? }[]`
- `tokens` / `tokensLabel` — compact chips
- `copyRows` — `{ label, value }[]` (best with `layout="stack"`)
- `media` or `mediaSrc` / `mediaAlt` — thumbnail (`layout` becomes `media`)
- `logo` — mark beside the title
- `trailing` — right-side actions
- `moreMenu` — dropdown content for the ⋮ control
- `hoverActions` — `{ key, label, icon?, destructive?, onClick? }[]`
- `meta` — muted supporting text
- `layout` — override the list default
- `selected` — selected border
- `onClick` — row click
