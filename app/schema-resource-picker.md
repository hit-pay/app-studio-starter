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

## Implementation rules

- Call ResourcePicker with `useResourcePicker()` and `pick({ type })`.
- Send the picker payload to `createServerFn`.
- Validate roles and persist the payload on the server; do not trust client-provided identity.
- Do not send connector values, tokens, or credentials to the browser.
- Use the matching `*Select` for coupons, discounts, taxes, shipping, pickups, categories, and locations—not ResourcePicker.
