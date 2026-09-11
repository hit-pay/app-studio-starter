# List Charges

`GET /v1/charges` — list charges with pagination and filters. Public docs: charges list (`per_page`).

Call only from `createServerFn` via `hitpayRequest` in `#/lib/server/hitpay-api`. Do not fetch docs.hitpayapp.com from the running app. Scope: `payments:read`.

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

Repeat array keys (`location_ids[]`, `payment_methods[]`, `statuses[]`, `user_ids[]`).

## Query

| Name | Type | Notes |
|---|---|---|
| `per_page` | integer | Default `25`. Allowed page sizes include `10`, `15`, `20`, `25`, `40`, `50`, `75`, `99`. One page only — do not walk `cursor` through history. |
| `cursor` | string | `meta.next_cursor` from the previous page. Do not use unless the user asked for another page. |
| `keywords` | string | Search amount, charge id, customer email, remark |
| `status` | `succeeded` \| `failed` \| `refunded` | Shorthand; maps to `statuses` |
| `statuses[]` | `success` \| `succeeded` \| `succeeded_manually` \| `pending` \| `failed` \| `refunded` \| `cancelled` \| `partially_refunded` \| `void` | Repeat for multiple. Default (if omitted): succeeded, succeeded_manually, refunded, void |
| `location_ids[]` | UUID[] | Max 10 |
| `user_ids[]` | string[] | Staff uuid or numeric id |
| `date_from` / `date_to` | `YYYY-MM-DD` | Created date range |
| `amount_from` / `amount_to` | number | |
| `payment_methods[]` | string | e.g. `cash`, `card` — till / cash-up |
| `payment_request_id` | UUID | |
| `customer_id` | UUID | |
| `payout_id` | UUID | |

No filter-by-charge-id list. Do not invent `ids[]`.

## Response

`{ data, links, meta }`. Use `data`. `meta.next_cursor` / `meta.prev_cursor`, `meta.per_page`.

### Charge

| Field | Type | Notes |
|---|---|---|
| `id` | string | HitPay charge id |
| `currency` / `home_currency` | string | |
| `amount` | number | Display amount |
| `status` | string | |
| `payment_method` | object | `name` (e.g. `card`, `cash`) plus logos / card `data` |
| `customer_id` / `customer` | string / object \| null | |
| `location` | `{ id, name, address }` \| null | |
| `channel` | string | |
| `remark` | string | |
| `order_reference_number` | string | |
| `closed_at` / `created_at` / `updated_at` | datetime | |

## App rules

- Browse / add charges: ResourcePicker `type: 'charge'`. Call this list only from the picker loader, a cash-up sheet (filters), or a scheduled wake.
- Persist the **sheet** (totals, counts, optional line snapshot of this one page). Do not grow a full charges replica or page until empty.
- Cash-up: `date_from` + `date_to` + `location_ids[]` + `payment_methods[]=cash` + `status=succeeded`.
- Never invent another charges list path. Never return connector tokens to the browser.
