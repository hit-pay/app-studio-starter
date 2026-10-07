export type HitpayWebhookEvent = {
  id: string
  /** `Hitpay-Event-Object`, e.g. `order`, `charge`. */
  eventObject: string
  /** `Hitpay-Event-Type`, e.g. `created`, `updated`. */
  eventType: string
  payload: Record<string, unknown>
  status: 'pending' | 'processed'
  receivedAt: string
  processedAt: string | null
}
