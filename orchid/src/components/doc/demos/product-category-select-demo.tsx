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
