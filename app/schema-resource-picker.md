# Resource Picker Schema

Use `ResourcePicker` to add catalog resources from HitPay. ResourcePicker is only for selecting data; after `pick({ type })`, persist the payload to Turso and render from Turso.

## Supported resource types

- `product`
- `customer`
- `order`
- `charge`
- `invoice`
- `add-on`

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

- Product: `docs/schema-product.md`
- Customer: `docs/schema-customer.md`
- Order: `docs/schema-order.md`
- Charge: `docs/schema-charge.md`
- Invoice: `docs/schema-invoice.md`
- Add-on: `docs/schema-add-on.md`

## Product and variation selection

A selected product is one parent item. Its selected variations are separate child items inside `children`.

If one product has two selected variations, the result contains:

```ts
[
  {
    id: 'product_123',
    resource: {
      // Full product response. Read docs/schema-product.md.
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
- Use the matching `*Select` for coupons, discounts, taxes, shipping, pickups, categories, and locations—not ResourcePicker.
