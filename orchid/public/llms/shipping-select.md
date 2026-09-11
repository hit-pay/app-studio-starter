<!-- Generated from content/docs/components/shipping-select.mdx. Do not edit. -->

# Shipping Select

Shipping method dropdown. Loads GET /v1/shipping.

## Example

```tsx
import { useState } from 'react'

import { ShippingSelect } from '@/components/form/shipping-select'
import { FieldGroup } from '@ui/form/field'

function ShippingSelectDemo() {
  const [shippingId, setShippingId] = useState<string | null>(null)

  return (
    <FieldGroup className="max-w-sm">
      <ShippingSelect
        name="shipping_id"
        value={shippingId}
        description="GET /v1/shipping"
        onValueChange={(value) => setShippingId(typeof value === 'string' ? value : null)}
      />
    </FieldGroup>
  )
}

export { ShippingSelectDemo }
```

Shipping method dropdown. Loads `GET /v1/shipping`. Do not call `list-shipping` on the screen.

```tsx
import { ShippingSelect } from '@/components/form/shipping-select'

<ShippingSelect name="shipping_id" />
```

Persist `id` plus name snapshot. Optional: `multiple`.
