<!-- Generated from content/docs/components/product-category-select.mdx. Do not edit. -->

# Product Category Select

Category dropdown. Loads GET /v1/product-category.

## Example

```tsx
import { useState } from 'react'

import { ProductCategorySelect } from '@/components/form/product-category-select'
import { FieldGroup } from '@ui/form/field'

function ProductCategorySelectDemo() {
  const [categoryId, setCategoryId] = useState<string | null>(null)

  return (
    <FieldGroup className="max-w-sm">
      <ProductCategorySelect
        name="category_id"
        value={categoryId}
        description="GET /v1/product-category"
        onValueChange={(value) => setCategoryId(typeof value === 'string' ? value : null)}
      />
    </FieldGroup>
  )
}

export { ProductCategorySelectDemo }
```

Product category dropdown. Loads `GET /v1/product-category`. Do not call `list-product-categories` on the screen.

```tsx
import { ProductCategorySelect } from '@/components/form/product-category-select'

<ProductCategorySelect name="category_id" />
```

Persist `id` plus name snapshot. Optional: `multiple`.
