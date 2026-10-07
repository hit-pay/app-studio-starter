import { createHash, createHmac, timingSafeEqual } from 'node:crypto'

import { createServerFn } from '@tanstack/react-start'

import { ROLES } from '#/enums'
import { requireRoles } from '#/lib/server/current-user'
import { db } from '#/lib/server/db'
import type { HitpayWebhookEvent } from '#/types'

/** Set by the Studio gateway after it has verified HitPay's own `Hitpay-Signature`. */
export const STUDIO_SIGNATURE_HEADER = 'x-app-studio-signature'

/** HMAC-SHA256 of the raw body with this app's secret, hex encoded. */
export function verifyStudioSignature(body: string, signature: string | null): boolean {
  const secret = process.env.APP_STUDIO_APP_SECRET?.trim()
  if (!secret || !signature) return false

  const expected = Buffer.from(createHmac('sha256', secret).update(body).digest('hex'))
  const provided = Buffer.from(signature)

  return expected.length === provided.length && timingSafeEqual(expected, provided)
}

/**
 * Store an incoming event once. HitPay retries resend the same body, so the
 * body hash is the id and a retry becomes a no-op. Returns false for a duplicate.
 */
export async function storeHitpayWebhookEvent(input: {
  eventObject: string
  eventType: string
  body: string
}): Promise<boolean> {
  const id = createHash('sha256').update(`${input.eventObject}.${input.eventType}:${input.body}`).digest('hex')
  const result = await db.execute({
    sql: `INSERT INTO hitpay_webhook_events (id, event_object, event_type, payload, received_at)
      VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(id) DO NOTHING
      RETURNING id`,
    args: [id, input.eventObject, input.eventType, input.body, new Date().toISOString()],
  })

  return result.rows.length > 0
}

function eventFromRow(row: Record<string, unknown>): HitpayWebhookEvent {
  return {
    id: String(row.id),
    eventObject: String(row.event_object),
    eventType: String(row.event_type),
    payload: JSON.parse(String(row.payload)) as Record<string, unknown>,
    status: String(row.status) as HitpayWebhookEvent['status'],
    receivedAt: String(row.received_at),
    processedAt: row.processed_at == null ? null : String(row.processed_at),
  }
}

export const listPendingHitpayWebhookEvents = createServerFn({ method: 'GET' })
  .validator((data: { eventObject?: string; eventType?: string }) => data)
  .handler(async ({ data }): Promise<HitpayWebhookEvent[]> => {
    await requireRoles(ROLES)
    const result = await db.execute({
      sql: `SELECT * FROM hitpay_webhook_events
        WHERE status = 'pending'
          AND (? IS NULL OR event_object = ?)
          AND (? IS NULL OR event_type = ?)
        ORDER BY received_at ASC
        LIMIT 100`,
      args: [
        data.eventObject ?? null, data.eventObject ?? null,
        data.eventType ?? null, data.eventType ?? null,
      ],
    })
    return result.rows.map((row) => eventFromRow(row as Record<string, unknown>))
  })

/** Claims the event; returns false when another tab or staff already processed it. */
export const markHitpayWebhookEventProcessed = createServerFn({ method: 'POST' })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }): Promise<boolean> => {
    await requireRoles(ROLES)
    const result = await db.execute({
      sql: `UPDATE hitpay_webhook_events SET status = 'processed', processed_at = ?
        WHERE id = ? AND status = 'pending'
        RETURNING id`,
      args: [new Date().toISOString(), data.id],
    })
    return result.rows.length > 0
  })
