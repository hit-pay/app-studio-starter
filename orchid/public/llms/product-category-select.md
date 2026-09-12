<!-- Generated from content/docs/components/product-category-select.mdx. Do not edit. -->

# Product Category Select

Category dropdown. Loads GET /v1/product-category.

## Interactive example

The interactive example is rendered on the Orchid documentation page. Use the usage guidance below and verify the installed component source for the exact API.

Product category dropdown. Loads `GET /v1/product-category`. Do not call `list-product-categories` on the screen.

```tsx
import { ProductCategorySelect } from '@/components/form/product-category-select'

<ProductCategorySelect name="category_id" />
```

Persist `id` plus name snapshot. Optional: `multiple`.
