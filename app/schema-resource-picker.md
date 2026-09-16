# Resource Picker Schema

Use `ResourcePicker` to add catalog resources from HitPay. ResourcePicker is only for selecting data; after `pick({ type })`, persist the payload to Turso and render from Turso.

## Supported resource types

- `product`
- `customer`
- `order`
- `charge`
- `invoice`
- `location`
- `product-category`

## Minimum payload

Each selected item provides a HitPay `id` and relevant snapshot fields, typically `name`, `title`, `number`, `status`, `amount`, or `currency`, depending on the resource.

```ts
type ResourcePickerItem = {
  id: string
  [key: string]: unknown
}
```

Store the HitPay `id` as the primary identifier. Store display fields as snapshots so the workflow does not need to call the API again for every row.

## Response schemas

When implementing a resource picker workflow, read the matching response schema before writing code. Do not add API response JSON to this file.

- Product: `docs/hitpay/products.md` (`hitpay_list_products`)
- Customer: `docs/hitpay/customers.md` (`hitpay_list_customers`)
- Order: `docs/hitpay/orders.md` (`hitpay_list_orders`)
- Charge: `docs/hitpay/charges.md` (`hitpay_list_charges`)
- Invoice: `docs/hitpay/invoices.md` (`hitpay_list_invoices`)
- Location: `hitpay_list_locations`
- Product category: `hitpay_list_product_categories`

## Product and variation selection

A selected product is one parent item. Its selected variations are separate child items inside `children`.

If one product has two selected variations, the result contains:

```ts
[
  {
    id: 'product_123',
    resource: {
      // Full product response. Read docs/hitpay/products.md.
    },
    children: [
      {
        id: 'variation_1',
        resource: {
          // Full variation response.
        },
      },
      {
        id: 'variation_2',
        resource: {
          // Full variation response.
        },
      },
    ],
  },
]
```

Implementation requirements:

- Treat `result.length` as the number of selected parent products.
- Treat `result[i].children.length` as the number of selected variations for that product.
- Iterate over every child when saving or processing variant-level data.
- Do not use only `result[0].resource` when variants are selected.
- If `children` is absent or empty, the selection is product-level.

## Implementation rules

- Call ResourcePicker with `useResourcePicker()` and `pick({ type })`.
- Send the picker payload to `createServerFn`.
- Validate roles and persist the payload on the server; do not trust client-provided identity.
- Do not send connector values, tokens, or credentials to the browser.
- Do not use unsupported legacy resources such as add-ons, coupons, discounts, taxes, shipping, or pickups.
