# List Charges

`GET /v1/charges` — cursor-paginated charges.

Call only from `createServerFn` via `hitpayRequest` in `#/lib/server/hitpay-api`.

`keywords` (without `payout_id`) or `remark` uses the search index; otherwise the standard index.

## Call

```ts
import { createServerFn } from '@tanstack/react-start'
import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import { hitpayRequest } from '#/lib/server/hitpay-api'

const listCharges = createServerFn({ method: 'GET' })
  .inputValidator((data: {
    date_from?: string
    date_to?: string
    location_ids?: string[]
    payment_methods?: string[]
    status?: string
  } = {}) => data)
  .handler(async ({ data }) => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    const query = new URLSearchParams()
    query.set('per_page', '25')
    if (data.date_from) query.set('date_from', data.date_from)
    if (data.date_to) query.set('date_to', data.date_to)
    if (data.status) query.set('status', data.status)
    for (const id of data.location_ids ?? []) query.append('location_ids[]', id)
    for (const method of data.payment_methods ?? []) query.append('payment_methods[]', method)
    const response = await hitpayRequest(`/v1/charges?${query}`)
    if (!response.ok) throw new Error('Could not load charges.')
    return response.json()
  })
```

## Query

| Name | Type | Notes |
|---|---|---|
| `per_page` | integer | Default `25`. Allowed: `10`, `15`, `20`, `25`, `40`, `50`, `75`, `99` |
| `cursor` | string | Next page |
| `keywords` | string | Max 100. Switches to search when `payout_id` is absent |
| `remark` | string | Max 255. Also switches to search |
| `status` | `succeeded` \| `failed` \| `refunded` | Shorthand. `succeeded` → statuses `succeeded` and `refunded=false`. `failed` → `failed` + `canceled`. `refunded` → `refunded=true` |
| `statuses` | string[] | Max 10. `canceled`, `failed`, `refunded`, `partially_refunded`, `requires_customer_action`, `requires_payment_method`, `succeeded`, `succeeded_manually`, `void`, `pending`. Omit (and no `refunded`) → `succeeded`, `succeeded_manually`, `refunded`, `void` |
| `refunded` | boolean | |
| `location_ids` | string[] | Max 10 |
| `user_ids` | string[] | Max 10, distinct |
| `date_from` / `date_to` | `Y-m-d` | Must be before tomorrow |
| `amount_from` / `amount_to` | number | `>= 0` |
| `payment_methods` | string[] | e.g. `cash`, `card` |
| `payment_request_id` | UUID | |
| `customer_id` | UUID | Must belong to the business |
| `relatable` | string | `type:id` |
| `channel` | string | Plugin channel |
| `order_reference_number` | string | Max 255 |
| `customer_email` | email | |
| `payment_reference_number` | string | Max 255 |
| `customer_name` | string | Max 255 |
| `id` | UUID | One charge id |
| `payout_id` | UUID | Uses the index (not search) even with keywords |

## Response

Cursor envelope: `{ data, links, meta }` with `meta.next_cursor`, `meta.prev_cursor`, `meta.per_page`.

### Charge (list)

| Field | Type | Notes |
|---|---|---|
| `id` | UUID | |
| `currency` / `home_currency` | string | |
| `exchange_rate` | string \| number \| null | |
| `amount` | number | Charge currency, major units |
| `home_currency_amount` | number \| null | |
| `fixed_fee` / `discount_fee` | number | Home currency |
| `discount_fee_rate` | number | Percent |
| `net_amount` | number | Home amount minus fees |
| `remark` | string \| null | |
| `status` | string | `partially_refunded` when the charge is only partly refunded |
| `payment_method` | object | Method name, logos, optional card `data` |
| `customer_id` | UUID \| null | |
| `customer` | object \| null | |
| `payment_request_id` | string \| null | Plugin provider reference |
| `webhook_status` | boolean | |
| `order_reference_number` | string \| null | |
| `payment_reference_number` | string \| null | Provider charge id |
| `executor` | object \| null | |
| `location` | `{ id, name, address }` \| null | |
| `channel` | string \| null | Plugin provider |
| `admin_fee` | boolean | |
| `closed_at` / `created_at` / `updated_at` | datetime \| null | Atom |
| `metadata` | object | |
| `xborder` | boolean | Always `false` |

## App rules

- ResourcePicker `charge` for picking. Totals-only cash-up may call this list with date/location/method filters — do not render charge rows. Do not use scheduled wake or invent a charges webhook.
- Never invent another charges list path.
