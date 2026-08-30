import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DetailList } from '@/components/detail-list'
import { Badge } from '@/components/ui/badge'

const PHOTO = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop'

function DetailListDemo() {
  return (
    <>
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Default
        </p>
        <DetailList
          columns={2}
          items={[
            {
              key: 'invoice',
              label: 'Invoice',
              value: 'INV-2026-0842',
              alignment: 'Vertical',
            },
            {
              key: 'customer',
              label: 'Customer',
              value: 'alex@arcticmonkey.io',
              alignment: 'Vertical',
            },
            {
              key: 'status',
              label: 'Status',
              value: <Badge tone="green">Paid</Badge>,
              alignment: 'Vertical',
            },
            {
              key: 'channel',
              label: 'Channel',
              value: 'PayNow',
              alignment: 'Vertical',
            },
          ]}
        />
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Border
        </p>
        <DetailList
          title="Payment details"
          columns={2}
          style="Border"
          items={[
            {
              key: 'email',
              label: 'Email',
              value: 'alex@arcticmonkey.io',
              copyValue: 'alex@arcticmonkey.io',
              alignment: 'Vertical',
            },
            {
              key: 'phone',
              label: 'Phone',
              value: '+65 8123 4567',
              alignment: 'Vertical',
            },
            {
              key: 'status',
              label: 'Status',
              value: <Badge tone="green">Paid</Badge>,
              alignment: 'Vertical',
            },
            {
              key: 'method',
              label: 'Method',
              value: 'Cards',
              alignment: 'Vertical',
            },
          ]}
        />
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          3 columns, 2 rows
        </p>
        <DetailList
          columns={3}
          style="Border"
          items={[
            {
              key: 'created',
              label: 'Created',
              value: '25 Aug 2026',
              alignment: 'Vertical',
            },
            {
              key: 'channel',
              label: 'Channel',
              value: 'Online Store',
              alignment: 'Vertical',
            },
            {
              key: 'currency',
              label: 'Currency',
              value: 'SGD',
              alignment: 'Vertical',
            },
            {
              key: 'amount',
              label: 'Amount',
              value: '128.00',
              alignment: 'Vertical',
              size: 'Big',
            },
            { key: 'fee', label: 'Fee', value: '3.20', alignment: 'Vertical' },
            {
              key: 'net',
              label: 'Net',
              value: '124.80',
              alignment: 'Vertical',
            },
          ]}
        />
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Colspan
        </p>
        <DetailList
          title="Customer data"
          columns={4}
          style="Border"
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
              alignment: 'Vertical',
              colSpan: 2,
            },
            {
              key: 'email',
              label: 'Email',
              value: 'alex@arcticmonkey.io',
              alignment: 'Vertical',
            },
            {
              key: 'phone',
              label: 'Phone',
              value: '+65 8123 4567',
              alignment: 'Vertical',
            },
            {
              key: 'address',
              label: 'Billing address',
              value: '1 Raffles Place, Singapore 048616',
              alignment: 'Vertical',
              colSpan: 3,
            },
            {
              key: 'country',
              label: 'Country',
              value: 'SG',
              alignment: 'Vertical',
            },
            {
              key: 'payment-id',
              label: 'Payment ID',
              value: 'pay_8f2a91',
              copyValue: 'pay_8f2a91',
              alignment: 'Vertical',
              colSpan: 4,
            },
          ]}
        />
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Stacked rows
        </p>
        <DetailList
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
        <DetailList
          style="Border"
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
        <DetailList
          title="SKU"
          columns={2}
          style="Border"
          items={[
            {
              key: 'sku',
              label: 'SKU',
              value: 'HP-MUG-001',
              alignment: 'Vertical',
            },
            {
              key: 'price',
              label: 'Price',
              value: 'SGD 28.00',
              alignment: 'Vertical',
            },
            {
              key: 'inventory',
              label: 'Inventory',
              value: '42 in stock',
              alignment: 'Vertical',
            },
            {
              key: 'sold-via',
              label: 'Sold via',
              value: 'Online Store',
              alignment: 'Vertical',
            },
          ]}
        />
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Recurring plan
        </p>
        <DetailList
          columns={2}
          style="Border"
          items={[
            {
              key: 'plan',
              label: 'Plan',
              value: 'Monthly membership',
              alignment: 'Vertical',
            },
            {
              key: 'amount',
              label: 'Amount',
              value: 'SGD 49.00',
              alignment: 'Vertical',
            },
            {
              key: 'next-charge',
              label: 'Next charge',
              value: '1 Sep 2026',
              alignment: 'Vertical',
            },
            {
              key: 'method',
              label: 'Method',
              value: 'Cards',
              alignment: 'Vertical',
            },
          ]}
        />
      </div>
    </>
  )
}

export { DetailListDemo }
