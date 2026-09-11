# Scheduled wakes (Turso)

The only inbound webhook is prebuilt `POST /webhooks/hitpay/schedule`. Do not create another route, HMAC, or event name.

## Allowed `source` (complete list)

| `source` | Use for | Do not use for |
|---|---|---|
| `none` | Clock tick | Fetching HitPay lists |
| `low_stock` | Products at/below alert | Cash-up, sales |
| `top_products` | Best sellers + stock | Cash-up, “all charges” |

There are no other sources. Do not invent `sales_summary`, `open_orders`, `unpaid_invoices`, charge/order/payout webhooks, or till events.

Cash-up / till reconcile → `list-charges` totals only (`hitpay-llms/list-charges.md`). No wake.

## Tables (already created)

- `wake_events` — one POST. `status`: `received` → `processed` / `failed`
- `wake_rows` — each `data` item. `delivery_status`: `pending` → `sent` / `skipped` / `failed`
- `wake_destinations` — send target if the user asked (`discord` / `resend` / `twilio` / `in_app`)

## Read / write

```ts
import { listLatestWakeRows, listWakeRows, upsertWakeDestination, updateWakeRowDelivery } from '#/lib/hitpay-wake'
```

Do not send from the webhook. Do not invent a HitPay send API.
