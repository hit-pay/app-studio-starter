<!-- Generated from content/docs/components/tax-select.mdx. Do not edit. -->

# Tax Select

Tax dropdown. Loads GET /v1/taxes.

## Example

```tsx
import { useState } from 'react'

import { TaxSelect } from '@/components/form/tax-select'
import { FieldGroup } from '@ui/form/field'

function TaxSelectDemo() {
  const [taxId, setTaxId] = useState<string | null>(null)

  return (
    <FieldGroup className="max-w-sm">
      <TaxSelect
        name="tax_id"
        value={taxId}
        description="GET /v1/taxes"
        onValueChange={(value) => setTaxId(typeof value === 'string' ? value : null)}
      />
    </FieldGroup>
  )
}

export { TaxSelectDemo }
```

Tax dropdown. Loads `GET /v1/taxes`. Do not call `list-taxes` on the screen.

```tsx
import { TaxSelect } from '@/components/form/tax-select'

<TaxSelect name="tax_id" />
```

Persist `id` plus name snapshot. Optional: `multiple`.
