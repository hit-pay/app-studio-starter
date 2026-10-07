---
name: webhooks
description: React to HitPay events (new order, payment completed, …) received by the app. Use when a feature should happen automatically when something happens in HitPay, such as auto-printing new orders.
---

# HitPay webhooks

HitPay events arrive at `src/routes/api/hitpay-webhook.ts`, which verifies them and stores each one once in the `hitpay_webhook_events` table with `status = 'pending'`. Do not change the receiver or its migration.

Each event has `eventObject` (e.g. `order`, `charge`), `eventType` (e.g. `created`, `updated`) and the HitPay JSON `payload`.

## Reacting to events

In UI, use `useHitpayWebhookEvents` from `#/lib/hitpay-webhooks`. It polls while the page is open, claims each pending event and calls `onEvent` once per event across all open tabs and devices:

```tsx
useHitpayWebhookEvents({
  eventObject: 'order',
  eventType: 'created',
  onEvent: async (event) => {
    // print, notify, …
  },
})
```

Do not query `hitpay_webhook_events` directly from new code or mark events processed some other way.
