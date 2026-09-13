# List Product Categories

`GET /v1/product-category` — list all product categories.

Call only from `createServerFn` via `hitpayRequest` in `#/lib/server/hitpay-api`. Do not fetch docs.hitpayapp.com from the running app.

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
    return response.json() as Promise<ListProductCategoriesResponse>
  })
```

The path is `/v1/product-category` (singular). Do not call `/v1/product-categories` or `/v1/categories`.

## Query

| Name | Type | Notes |
|---|---|---|
| `perPage` | integer | Default `20` |
| `page` | integer | Default `1` |
| `active` | boolean | Filter by active status |
| `parent_id` | string | Parent category id; lists that parent's subcategories |
| `keywords` | string | Filter by name |

## Response

Paginated envelope:

```ts
type ListProductCategoriesResponse = {
  data: HitPayProductCategory[]
  links: {
    first: string
    last: string
    prev: string | null
    next: string | null
  }
  meta: {
    current_page: number
    from: number
    last_page: number
    path: string
    per_page: number
    to: number
    total: number
  }
}
```

### Category

| Field | Type | Notes |
|---|---|---|
| `id` | UUID | HitPay category id |
| `name` | string | |
| `description` | string \| null | |
| `is_active` | boolean | |
| `order` | integer | Sort order |
| `children` | array | Nested categories |
| `is_parent` | boolean | |
| `image` | object \| null | See below |
| `emoji` | string \| null | |
| `pos_color` | string \| null | e.g. `#4C689C` |

### Image

`id`, `caption`, `alt_text`, `group`, `order`, `extension`, `status`, `disk`, `url`, `other_dimensions[]` (`size`, `path`), `urls` (`icon`, `large`, `small`, `medium`, `thumbnail`).

## App rules

- Use category `id` values as `categories` / `category_ids` on product list and create.
- Snapshot categories into Turso when the workflow needs a local working set. Keep the HitPay `id`.
- Do not refetch `/v1/product-category` on every row after a snapshot exists.
- Never invent another category list path. Never return connector tokens to the browser.
