import { customerMatches } from '#/lib/resource-picker-map'
import type { ResourcePickerLoadInput, ResourcePickerType } from '@/components/form/resource-picker'

type FakeRecord = Record<string, unknown>

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
        {
          id: '9c1e0001-0000-4000-8000-000000000011',
          description: 'Oak',
          variation_value_1: 'Oak',
          quantity: 3,
          price: 5800,
          price_display: 'S$5,800.00',
        },
        {
          id: '9c1e0001-0000-4000-8000-000000000012',
          description: 'Pine',
          variation_value_1: 'Pine',
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
      images: [{ url: 'https://placehold.co/64x64/eee/333?text=L' }],
      variations: [
        {
          id: '9c1e0001-0000-4000-8000-000000000021',
          description: 'Warm white',
          variation_value_1: 'Warm white',
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
    {
      id: '9c1e0005-0000-4000-8000-000000000001',
      name: 'Main Store',
      street: '1 Harbourfront',
      city: 'Singapore',
      country: 'SG',
      active: true,
    },
    {
      id: '9c1e0005-0000-4000-8000-000000000002',
      name: 'Warehouse',
      street: '8 Tuas',
      city: 'Singapore',
      country: 'SG',
      active: false,
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
    },
    {
      id: '9c1e0006-0000-4000-8000-000000000002',
      amount: 12,
      currency: 'sgd',
      status: 'refunded',
      remark: 'Till cash',
      payment_method: { name: 'cash' },
    },
    {
      id: '9c1e0006-0000-4000-8000-000000000003',
      amount: 18,
      currency: 'sgd',
      status: 'failed',
      remark: 'Card decline',
      payment_method: { name: 'card' },
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
  'payment-request': [
    {
      id: '9c1e0008-0000-4000-8000-000000000001',
      purpose: 'Deposit',
      reference_number: 'DEP-1',
      status: 'pending',
      amount: '200.00',
      currency: 'sgd',
    },
    {
      id: '9c1e0008-0000-4000-8000-000000000002',
      purpose: 'Balance',
      name: 'Priya Nair',
      status: 'completed',
      amount: '50.00',
      currency: 'sgd',
    },
  ],
  'subscription-plan': [
    {
      id: '9c1e0009-0000-4000-8000-000000000001',
      name: 'Monthly retainer',
      reference: 'retainer',
      cycle: 'monthly',
      amount: 99,
      currency: 'sgd',
      status: 'published',
    },
  ],
  'recurring-billing': [
    {
      id: '9c1e000a-0000-4000-8000-000000000001',
      name: 'Monthly retainer',
      customer_email: 'priya@example.com',
      status: 'active',
      amount: 99,
      currency: 'sgd',
    },
  ],
  coupon: [{ id: '9c1e000b-0000-4000-8000-000000000001', name: 'Welcome', code: 'WELCOME10', percentage: 10 }],
  discount: [
    {
      id: '9c1e000c-0000-4000-8000-000000000001',
      name: 'Staff 10%',
      discount_type: 'percentage',
      percentage: 10,
      pos_discount: true,
    },
  ],
  tax: [{ id: '9c1e000d-0000-4000-8000-000000000001', name: 'GST 9%', rate: 0.09, tax_inclusive: false }],
  shipping: [{ id: '9c1e000e-0000-4000-8000-000000000001', name: 'Standard', is_active: true, calculation: 'flat' }],
  pickup: [
    { id: '9c1e000f-0000-4000-8000-000000000001', name: 'Main Store pickup', address: '1 Harbourfront', status: 'active' },
  ],
  'add-on': [{ id: '9c1e0010-0000-4000-8000-000000000001', name: 'Gift wrap' }],
  'store-page': [
    { id: '9c1e0011-0000-4000-8000-000000000001', title: 'About', page_path: '/about', enabled: true, status: 'published' },
  ],
}

function includesNeedle(row: FakeRecord, keys: string[], needle: string) {
  if (!needle) return true
  return keys.some((key) => String(row[key] ?? '').toLowerCase().includes(needle))
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
        if (Array.isArray(channels) && !channels.map(String).includes(data.extras.channel)) return false
      }
      return true
    })
  }

  if (data.type === 'product-category') {
    rows = rows.filter((row) => {
      if (needle && !includesNeedle(row, ['name'], needle)) return false
      if (data.filter === 'active') return row.is_active !== false
      if (data.filter === 'inactive') return row.is_active === false
      return true
    })
  }

  if (data.type === 'customer' && needle) {
    rows = rows.filter((row) => customerMatches(row, needle))
  }

  if (data.type === 'order') {
    rows = rows.filter((row) => {
      if (needle && !includesNeedle(row, ['order_display_number', 'id'], needle)) return false
      return data.filter === 'all' || row.status === data.filter
    })
  }

  if (data.type === 'location' && needle) {
    rows = rows.filter((row) => includesNeedle(row, ['name'], needle))
  }

  if (data.type === 'charge') {
    rows = rows.filter((row) => {
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

  if (data.type === 'payment-request' && needle) {
    rows = rows.filter((row) => includesNeedle(row, ['purpose', 'reference_number', 'name', 'id'], needle))
  }

  if (data.type === 'subscription-plan' && needle) {
    rows = rows.filter((row) => includesNeedle(row, ['reference', 'name', 'id'], needle))
  }

  if (data.type === 'recurring-billing') {
    rows = rows.filter((row) => {
      if (data.filter !== 'all' && row.status !== data.filter) return false
      return !needle || includesNeedle(row, ['customer_email'], needle)
    })
  }

  if (data.type === 'coupon' && needle) {
    rows = rows.filter((row) => includesNeedle(row, ['name', 'code', 'id'], needle))
  }

  if (data.type === 'discount') {
    rows = rows.filter((row) => {
      if (data.filter === 'pos') return row.pos_discount === true
      if (data.filter === 'online') return row.pos_discount !== true
      return includesNeedle(row, ['name', 'id'], needle)
    })
  }

  if (data.type === 'tax' && needle) {
    rows = rows.filter((row) => includesNeedle(row, ['name', 'id'], needle))
  }

  if (data.type === 'add-on' && needle) {
    rows = rows.filter((row) => includesNeedle(row, ['name', 'id'], needle))
  }

  if (data.type === 'store-page') {
    rows = rows.filter((row) => {
      if ((data.filter === 'published' || data.filter === 'draft') && row.status !== data.filter) return false
      return includesNeedle(row, ['title', 'page_path', 'id'], needle)
    })
  }

  if (data.type === 'shipping') {
    return { shippings: rows }
  }

  return { data: rows }
}

export { fakeHitPayListPayload }
