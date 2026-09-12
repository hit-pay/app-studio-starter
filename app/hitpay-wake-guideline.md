# Scheduled wakes

The HitPay → app webhook is the prebuilt `POST /webhooks/hitpay/schedule`.

Persist POST `data` and show it from Turso. Do not re-list HitPay to rebuild wake rows.

Wire wake UI/send only if the merchant asked for a scheduled reminder that maps to a `source` below. Otherwise leave the prebuilt route unused.

Read `#/lib/hitpay-wake` (browser `createServerFn` wrappers). Persist is already `received` / `pending`. Destinations: `upsertWakeDestination`. After send: `updateWakeRowDelivery`. Extend `#/lib/server/hitpay-wake-hook` (`onScheduledWake`) only — do not replace the webhook route.

## Shipped `source` values

| `source` | When the merchant asked for | `data` |
|---|---|---|
| `none` | A clock tick only | none |
| `low_stock` | Stock below alert | product + qty |
| `top_products` | Best sellers + stock (e.g. stock reminder for most sold) | product + sold + qty |

## Code

| Path | Role |
|---|---|
| `src/routes/webhooks/hitpay/schedule.ts` | Prebuilt webhook |
| `src/lib/hitpay-wake.ts` | `listWakeEvents`, `listLatestWakeRows`, `listWakeRows`, `upsertWakeDestination`, `updateWakeRowDelivery`, … |
| `src/lib/server/hitpay-wake.ts` | Persist + query |
| `src/lib/server/hitpay-wake-hook.ts` | `onScheduledWake` |
| `src/lib/server/hitpay-wake-types.ts` | `WakeEvent`, `WakeRow`, `WakeDestination`, channels |

Channels: `in_app` | `discord` | `resend` | `twilio`.
