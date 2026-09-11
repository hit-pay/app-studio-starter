<!-- Generated from content/docs/components/detail-card.mdx. Do not edit. -->

# Detail Card

Read-only key/value card for one record. Not a collection.

## Example

```tsx
import { Avatar, AvatarFallback, AvatarImage } from '@ui/displaying-data/avatar'
import { DetailCard } from '@/components/displaying-data/detail-card'
import { Badge } from '@ui/displaying-data/badge'

const PHOTO = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop'

function DetailCardDemo() {
  return (
    <>
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Default
        </p>
        <DetailCard
          columns={2}
          items={[
            {
              key: 'invoice',
              label: 'Invoice',
              value: 'INV-2026-0842',
              alignment: 'vertical',
            },
            {
              key: 'customer',
              label: 'Customer',
              value: 'alex@arcticmonkey.io',
              alignment: 'vertical',
            },
            {
              key: 'status',
              label: 'Status',
              value: <Badge tone="green">Paid</Badge>,
              alignment: 'vertical',
            },
            {
              key: 'channel',
              label: 'Channel',
              value: 'PayNow',
              alignment: 'vertical',
            },
          ]}
        />
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Border
        </p>
        <DetailCard
          title="Payment details"
          columns={2}
          style="border"
          items={[
            {
              key: 'email',
              label: 'Email',
              value: 'alex@arcticmonkey.io',
              copyValue: 'alex@arcticmonkey.io',
              alignment: 'vertical',
            },
            {
              key: 'phone',
              label: 'Phone',
              value: '+65 8123 4567',
              alignment: 'vertical',
            },
            {
              key: 'status',
              label: 'Status',
              value: <Badge tone="green">Paid</Badge>,
              alignment: 'vertical',
            },
            {
              key: 'method',
              label: 'Method',
              value: 'Cards',
              alignment: 'vertical',
            },
          ]}
        />
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          3 columns, 2 rows
        </p>
        <DetailCard
          columns={3}
          style="border"
          items={[
            {
              key: 'created',
              label: 'Created',
              value: '25 Aug 2026',
              alignment: 'vertical',
            },
            {
              key: 'channel',
              label: 'Channel',
              value: 'Online Store',
              alignment: 'vertical',
            },
            {
              key: 'currency',
              label: 'Currency',
              value: 'SGD',
              alignment: 'vertical',
            },
            {
              key: 'amount',
              label: 'Amount',
              value: '128.00',
              alignment: 'vertical',
              size: 'big',
            },
            { key: 'fee', label: 'Fee', value: '3.20', alignment: 'vertical' },
            {
              key: 'net',
              label: 'Net',
              value: '124.80',
              alignment: 'vertical',
            },
          ]}
        />
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Colspan
        </p>
        <DetailCard
          title="Customer data"
          columns={4}
          style="border"
          items={[
            {
              key: 'customer',
              label: 'Customer',
              value: (
                <span className="inline-flex items-center gap-2">
                  <Avatar size="sm">
                    <AvatarImage src={PHOTO} alt="" />
                    <AvatarFallback>AT</AvatarFallback>
                  </Avatar>
                  Alex Turner
                </span>
              ),
              alignment: 'vertical',
              colSpan: 2,
            },
            {
              key: 'email',
              label: 'Email',
              value: 'alex@arcticmonkey.io',
              alignment: 'vertical',
            },
            {
              key: 'phone',
              label: 'Phone',
              value: '+65 8123 4567',
              alignment: 'vertical',
            },
            {
              key: 'address',
              label: 'Billing address',
              value: '1 Raffles Place, Singapore 048616',
              alignment: 'vertical',
              colSpan: 3,
            },
            {
              key: 'country',
              label: 'Country',
              value: 'SG',
              alignment: 'vertical',
            },
            {
              key: 'payment-id',
              label: 'Payment ID',
              value: 'pay_8f2a91',
              copyValue: 'pay_8f2a91',
              alignment: 'vertical',
              colSpan: 4,
            },
          ]}
        />
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Stacked rows
        </p>
        <DetailCard
          items={[
            { key: 'email', label: 'Email', value: 'alex@arcticmonkey.io' },
            { key: 'phone', label: 'Phone', value: '+65 8123 4567' },
          ]}
        />
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Stacked rows, Border
        </p>
        <DetailCard
          style="border"
          items={[
            { key: 'email', label: 'Email', value: 'alex@arcticmonkey.io' },
            { key: 'phone', label: 'Phone', value: '+65 8123 4567' },
          ]}
        />
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Product Data
        </p>
        <DetailCard
          title="SKU"
          columns={2}
          style="border"
          items={[
            {
              key: 'sku',
              label: 'SKU',
              value: 'HP-MUG-001',
              alignment: 'vertical',
            },
            {
              key: 'price',
              label: 'Price',
              value: 'SGD 28.00',
              alignment: 'vertical',
            },
            {
              key: 'inventory',
              label: 'Inventory',
              value: '42 in stock',
              alignment: 'vertical',
            },
            {
              key: 'sold-via',
              label: 'Sold via',
              value: 'Online Store',
              alignment: 'vertical',
            },
          ]}
        />
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Recurring plan
        </p>
        <DetailCard
          columns={2}
          style="border"
          items={[
            {
              key: 'plan',
              label: 'Plan',
              value: 'Monthly membership',
              alignment: 'vertical',
            },
            {
              key: 'amount',
              label: 'Amount',
              value: 'SGD 49.00',
              alignment: 'vertical',
            },
            {
              key: 'next-charge',
              label: 'Next charge',
              value: '1 Sep 2026',
              alignment: 'vertical',
            },
            {
              key: 'method',
              label: 'Method',
              value: 'Cards',
              alignment: 'vertical',
            },
          ]}
        />
      </div>
    </>
  )
}

export { DetailCardDemo }
```

Use `DetailCard` for a read-only key/value view of **one** record (invoice, leave request,
customer). Use `DataList` or `DataTable` for collections. Do not assemble label/value stacks
from `Card`.

## API

`DetailCard` accepts `items`, plus optional `title`, `columns`, `style`, and `className`.
It also supports standard `div` attributes except the native `style`, `title`, and `children` props.

Each item requires a unique string `key` and a React `value`. Items can also set `label`,
`copyValue`, `alignment`, `size`, `colSpan`, and `className`. Because `value` is a React node,
it can render text, links, badges, or custom content.
