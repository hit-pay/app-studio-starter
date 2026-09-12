import { customerMatches } from '#/lib/resource-picker-map'
import type { ResourcePickerLoadInput, ResourcePickerType } from '@/components/form/resource-picker'

type FakeRecord = Record<string, unknown>

const FAKE_MAIN_STORE = { id: '9c1e0005-0000-4000-8000-000000000001', name: 'Main Store' }
const FAKE_WAREHOUSE = { id: '9c1e0005-0000-4000-8000-000000000002', name: 'Warehouse' }
const FAKE_FURNITURE = { id: '9c1e0002-0000-4000-8000-000000000001', name: 'Furniture' }
const FAKE_LIGHTING = { id: '9c1e0002-0000-4000-8000-000000000002', name: 'Lighting' }

const FAKE_HITPAY: Record<ResourcePickerType, FakeRecord[]> = {
  product: [
    {
      id: '9c1e0001-0000-4000-8000-000000000001',
      name: 'Mid-century modern shelf',
      status: 'draft',
      currency: 'sgd',
      price: 5800,
      price_display: 'S$5,800.00',
      locations: [FAKE_MAIN_STORE, FAKE_WAREHOUSE],
      category_id: [FAKE_FURNITURE],
      images: [{ url: 'https://placehold.co/64x64/eee/333?text=S' }],
      variations: [
        {
          id: '9c1e0001-0000-4000-8000-000000000011',
          values: [{ key: 'Finish', value: 'Oak' }],
          quantity: 3,
          price: 5800,
          price_display: 'S$5,800.00',
        },
        {
          id: '9c1e0001-0000-4000-8000-000000000012',
          values: [{ key: 'Finish', value: 'Pine' }],
          quantity: 12,
          price: 5100,
          price_display: 'S$5,100.00',
        },
      ],
    },
    {
      id: '9c1e0001-0000-4000-8000-000000000002',
      name: 'Ceramic table lamp',
      status: 'published',
      currency: 'sgd',
      price: 89,
      price_display: 'S$89.00',
      locations: [FAKE_MAIN_STORE],
      category_id: [FAKE_LIGHTING],
      images: [{ url: 'https://placehold.co/64x64/eee/333?text=L' }],
      variations: [
        {
          id: '9c1e0001-0000-4000-8000-000000000021',
          values: [{ key: 'Light', value: 'Warm white' }],
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
      channels: ['pos', 'online_store'],
      locations: [FAKE_WAREHOUSE],
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
  customer: [
    { id: '9c1e0003-0000-4000-8000-000000000001', name: 'Priya Nair', email: 'priya@example.com', phone_number: '91234567' },
    { id: '9c1e0003-0000-4000-8000-000000000002', name: 'Wei Chen', email: 'wei@example.com', phone_number: '98887766' },
  ],
  order: [
    {
      id: '9c1e0004-0000-4000-8000-000000000001',
      order_display_number: 2048,
      status: 'draft',
      amount: 120,
      currency: 'sgd',
      channel: 'quick_sale',
      location_id: FAKE_WAREHOUSE.id,
      created_at: '2026-08-01T10:00:00+00:00',
    },
    {
      id: '9c1e0004-0000-4000-8000-000000000002',
      order_display_number: 2049,
      status: 'completed',
      amount: 89,
      currency: 'sgd',
      channel: 'point_of_sale',
      location_id: FAKE_MAIN_STORE.id,
      created_at: '2026-09-02T10:00:00+00:00',
    },
    {
      id: '9c1e0004-0000-4000-8000-000000000003',
      order_display_number: 2050,
      status: 'requires_business_action',
      amount: 46,
      currency: 'sgd',
      channel: 'store_checkout',
      location_id: FAKE_MAIN_STORE.id,
      created_at: '2026-09-10T10:00:00+00:00',
    },
  ],
  charge: [
    {
      id: '9c1e0006-0000-4000-8000-000000000001',
      amount: 70.56,
      currency: 'sgd',
      status: 'succeeded',
      remark: 'Order #1007',
      payment_method: { name: 'card' },
      created_at: '2026-09-02T10:00:00+00:00',
    },
    {
      id: '9c1e0006-0000-4000-8000-000000000002',
      amount: 12,
      currency: 'sgd',
      status: 'refunded',
      remark: 'Till cash',
      payment_method: { name: 'cash' },
      created_at: '2026-08-15T10:00:00+00:00',
    },
    {
      id: '9c1e0006-0000-4000-8000-000000000003',
      amount: 18,
      currency: 'sgd',
      status: 'failed',
      remark: 'Card decline',
      payment_method: { name: 'card' },
      created_at: '2026-09-10T10:00:00+00:00',
    },
  ],
  invoice: [
    {
      id: '9c1e0007-0000-4000-8000-000000000001',
      invoice_number: 'INV-1001',
      status: 'overdue',
      amount: 240,
      currency: 'sgd',
      email: 'priya@example.com',
    },
    {
      id: '9c1e0007-0000-4000-8000-000000000002',
      invoice_number: 'INV-1002',
      status: 'paid',
      amount: 88,
      currency: 'sgd',
      email: 'wei@example.com',
    },
  ],
  'add-on': [{ id: '9c1e0010-0000-4000-8000-000000000001', name: 'Gift wrap' }],
}

function includesNeedle(row: FakeRecord, keys: string[], needle: string) {
  if (!needle) return true
  return keys.some((key) => String(row[key] ?? '').toLowerCase().includes(needle))
}

function inDateRange(row: FakeRecord, extras?: Record<string, string>) {
  const from = extras?.date_from
  const to = extras?.date_to
  if (!from && !to) return true
  const raw = typeof row.created_at === 'string' ? row.created_at.slice(0, 10) : ''
  if (!raw) return true
  if (from && raw < from) return false
  if (to && raw > to) return false
  return true
}

function productQuantity(product: FakeRecord) {
  const variations = Array.isArray(product.variations) ? product.variations : []
  const childQty = variations.reduce((sum, variation) => {
    const quantity = (variation as FakeRecord).quantity
    return sum + (typeof quantity === 'number' ? quantity : 0)
  }, 0)
  return typeof product.quantity === 'number' ? product.quantity : childQty
}

/** Fake HitPay list envelope after the same query/filter/extras the starter sends to `/v1/…`. */
function fakeHitPayListPayload(data: ResourcePickerLoadInput): unknown {
  const needle = data.query.trim().toLowerCase()
  let rows = FAKE_HITPAY[data.type] ?? []

  if (data.type === 'product') {
    rows = rows.filter((row) => {
      if (needle && !includesNeedle(row, ['name'], needle)) return false
      if ((data.filter === 'published' || data.filter === 'draft') && row.status !== data.filter) return false
      if (data.extras?.inventory === 'in_stock' && productQuantity(row) <= 0) return false
      if (data.extras?.inventory === 'out_of_stock' && productQuantity(row) > 0) return false
      if (data.extras?.channel && data.extras.channel !== 'all') {
        const channels = row.channels
        if (!Array.isArray(channels) || !channels.map(String).includes(data.extras.channel)) {
          return false
        }
      }
      if (data.extras?.location_id && data.extras.location_id !== 'all') {
        const locations = row.locations
        if (
          !Array.isArray(locations) ||
          !locations.some((location) => {
            return (
              location &&
              typeof location === 'object' &&
              'id' in location &&
              String((location as { id?: unknown }).id) === data.extras?.location_id
            )
          })
        ) {
          return false
        }
      }
      if (data.extras?.category_id && data.extras.category_id !== 'all') {
        const categories = row.category_id
        if (
          !Array.isArray(categories) ||
          !categories.some((category) => {
            return (
              category &&
              typeof category === 'object' &&
              'id' in category &&
              String((category as { id?: unknown }).id) === data.extras?.category_id
            )
          })
        ) {
          return false
        }
      }
      return true
    })
  }

  if (data.type === 'customer' && needle) {
    rows = rows.filter((row) => customerMatches(row, needle))
  }

  if (data.type === 'order') {
    rows = rows.filter((row) => {
      if (!inDateRange(row, data.extras)) return false
      if (needle && !includesNeedle(row, ['order_display_number', 'id'], needle)) return false
      if (data.extras?.channel && data.extras.channel !== 'all' && row.channel !== data.extras.channel) {
        return false
      }
      if (
        data.extras?.location_id &&
        data.extras.location_id !== 'all' &&
        row.location_id !== data.extras.location_id
      ) {
        return false
      }
      if (data.filter === 'all') return true
      if (data.filter === 'pending') {
        return row.status === 'pending' || row.status === 'requires_business_action'
      }
      if (data.filter === 'sent') {
        return row.status === 'sent' || row.status === 'requires_customer_action'
      }
      return row.status === data.filter
    })
  }

  if (data.type === 'charge') {
    rows = rows.filter((row) => {
      if (!inDateRange(row, data.extras)) return false
      if (needle && !includesNeedle(row, ['remark', 'id'], needle)) return false
      if (data.filter !== 'all' && row.status !== data.filter) return false
      if (data.extras?.payment_method && data.extras.payment_method !== 'all') {
        const method = row.payment_method
        const name =
          method && typeof method === 'object' && !Array.isArray(method) && 'name' in method
            ? String((method as { name?: unknown }).name ?? '')
            : String(method ?? '')
        if (name !== data.extras.payment_method) return false
      }
      return true
    })
  }

  if (data.type === 'invoice') {
    rows = rows.filter((row) => {
      if (data.filter !== 'all' && row.status !== data.filter) return false
      return includesNeedle(row, ['invoice_number', 'reference', 'email', 'id'], needle)
    })
  }

  if (data.type === 'add-on' && needle) {
    rows = rows.filter((row) => includesNeedle(row, ['name', 'id'], needle))
  }

  return { data: rows }
}

export { fakeHitPayListPayload }
