type NamedRow = { id: string; name?: string | null; code?: string | null; address?: string | null }

const FAKE: Record<string, NamedRow[]> = {
  coupon: [{ id: '9c1e000b-0000-4000-8000-000000000001', name: 'Welcome', code: 'WELCOME10' }],
  discount: [{ id: '9c1e000c-0000-4000-8000-000000000001', name: 'Staff 10%' }],
  tax: [{ id: '9c1e000d-0000-4000-8000-000000000001', name: 'GST 9%' }],
  shipping: [{ id: '9c1e000e-0000-4000-8000-000000000001', name: 'Standard' }],
  pickup: [{ id: '9c1e000f-0000-4000-8000-000000000001', name: 'Main Store pickup', address: '1 Harbourfront' }],
  'product-category': [
    { id: '9c1e0002-0000-4000-8000-000000000001', name: 'Furniture' },
    { id: '9c1e0002-0000-4000-8000-000000000002', name: 'Lighting' },
  ],
  location: [
    { id: '9c1e0005-0000-4000-8000-000000000001', name: 'Main Store' },
    { id: '9c1e0005-0000-4000-8000-000000000002', name: 'Warehouse' },
  ],
}

function fakeLoad(key: keyof typeof FAKE) {
  return Promise.resolve({ items: FAKE[key] })
}

const loadCouponsForSelect = () => fakeLoad('coupon')
const loadDiscountsForSelect = () => fakeLoad('discount')
const loadTaxesForSelect = () => fakeLoad('tax')
const loadShippingsForSelect = () => fakeLoad('shipping')
const loadPickupsForSelect = () => fakeLoad('pickup')
const loadProductCategoriesForSelect = () => fakeLoad('product-category')
const loadLocationsForSelect = () => fakeLoad('location')

export {
  loadCouponsForSelect,
  loadDiscountsForSelect,
  loadLocationsForSelect,
  loadPickupsForSelect,
  loadProductCategoriesForSelect,
  loadShippingsForSelect,
  loadTaxesForSelect,
}
export type { NamedRow }
