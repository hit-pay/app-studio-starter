import { useEffect, useRef } from 'react'

import {
  listPendingHitpayWebhookEvents,
  markHitpayWebhookEventProcessed,
} from '#/lib/server/hitpay-webhooks'
import type { HitpayWebhookEvent } from '#/types'

export type { HitpayWebhookEvent } from '#/types'

/**
 * Polls pending HitPay events while the page is open, claims each one and hands
 * it to `onEvent`. A claimed event is never handed to another tab or device.
 */
export function useHitpayWebhookEvents(options: {
  eventObject?: string
  eventType?: string
  intervalMs?: number
  enabled?: boolean
  onEvent: (event: HitpayWebhookEvent) => void | Promise<void>
}): void {
  const { eventObject, eventType, intervalMs = 5000, enabled = true } = options
  const onEvent = useRef(options.onEvent)
  onEvent.current = options.onEvent

  useEffect(() => {
    if (!enabled) return

    let running = false
    const poll = async () => {
      if (running) return
      running = true
      try {
        const events = await listPendingHitpayWebhookEvents({ data: { eventObject, eventType } })
        for (const event of events) {
          if (await markHitpayWebhookEventProcessed({ data: { id: event.id } })) {
            await onEvent.current(event)
          }
        }
      } catch (caught) {
        console.error('Failed to load HitPay events.', caught)
      } finally {
        running = false
      }
    }

    void poll()
    const timer = setInterval(poll, intervalMs)
    return () => clearInterval(timer)
  }, [eventObject, eventType, intervalMs, enabled])
}
