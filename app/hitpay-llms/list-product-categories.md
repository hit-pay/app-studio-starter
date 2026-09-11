# List Product Categories

`GET /v1/product-category` — product categories (path is singular).

Call only from `createServerFn` via `hitpayRequest` in `#/lib/server/hitpay-api`.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const listProductCategories = createServerFn({ method: 'GET' })
  .inputValidator((data: { page?: number; keywords?: string; parentId?: string } = {}) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const query = new URLSearchParams()
    query.set('page', String(data.page ?? 1))
    query.set('perPage', '20')
    if (data.keywords) query.set('keywords', data.keywords)
    if (data.parentId) query.set('parent_id', data.parentId)
    const response = await hitpayRequest(`/v1/product-category?${query}`)
    if (!response.ok) throw new Error('Could not load product categories.')
    return response.json()
  })
```

Do not call `/v1/product-categories` or `/v1/categories`.

Without `parent_id`, `keywords`, or `get_children=1`, only top-level categories (`parent_id` null) are returned. Nested rows appear in `children`.

## Query

| Name | Type | Notes |
|---|---|---|
| `page` | integer | Default `1` |
| `perPage` / `per_page` | integer | Default `20`, max `100` |
| `paginate` | boolean | Default `true`. `false` returns a bare array (no `data`/`meta`) |
| `active` | boolean | Also applied to nested children |
| `parent_id` | UUID | Direct children of that category |
| `keywords` | string | Space-split name search (includes nested rows; skips the top-level-only default) |
| `get_children` | boolean | Include non-root categories in the top list |
| `include_products` | boolean | Adds `products` on each category |
| `channels` | `pos` \| `invoice` \| `online_store` \| `self_serve` | Repeat. Categories with no channel rows still match |
| `format` | `minimal` \| `flat` | `flat` depth-first flattens the tree before paging |
| `sort` / `sort_by` | `order` \| `name` | |
| `order` / `sort_by_direction` | `asc` \| `desc` | |

The public list always eager-loads two levels of children plus images.

## Response

Default (`paginate` true):

```ts
type ListProductCategoriesResponse = {
  data: Category[]
  links: {
    first: string
    last: string
    prev: string | null
    next: string | null
  }
  meta: {
    current_page: number
    from: number | null
    last_page: number
    path: string
    per_page: number
    to: number | null
    total: number
  }
}
```

`paginate=false` is a JSON array of `Category`.

### Category

| Field | Type | Notes |
|---|---|---|
| `id` | UUID | |
| `name` | string | |
| `handle` | string \| null | |
| `description` | string \| null | |
| `is_active` | boolean | From `active` |
| `order` | integer | |
| `children` | ChildCategory[] | Up to two nested levels |
| `total_products` | integer | |
| `products` | omitted \| `{ total: number; data: CategoryProduct[] }` | Only when `include_products=1` |
| `is_parent` | boolean | `parent_id` is null |
| `image` | Image \| null | First image |
| `channels` | string[] \| omitted | Only when the `channels` relation was loaded |
| `emoji` | string \| null | |
| `pos_color` | string \| null | |

### Child category

`id`, `name`, `description`, `is_active`, `order`, `total_products`, `children` (one more level, then `[]`), `channels`, `image`, `emoji`, `pos_color`.

### Category product (`include_products`)

`id`, `name`, `status`, `variations_count`, `emoji`, optional `images` (`id` + `url`).

### Image

Same image object as products: `id`, `caption`, `alt_text`, `group`, `order`, `extension`, `status`, `disk`, `url`, `other_dimensions[]`, `urls`, `created_at`.

## App rules

- ResourcePicker `product-category` is the only generated-screen list. This file is for the picker loader.
- Snapshot from the picker (`id` + `resource`). Never invent another category path.
