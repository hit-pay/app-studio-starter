import { createFileRoute } from '@tanstack/react-router'

import {
  STUDIO_SIGNATURE_HEADER,
  storeHitpayWebhookEvent,
  verifyStudioSignature,
} from '#/lib/server/hitpay-webhooks'

/**
 * HitPay webhook receiver, reached through the Studio gateway at
 * POST /{appId}/api/hitpay-webhook. Stores the event and answers fast; the app
 * reads pending events with `listPendingHitpayWebhookEvents`.
 */
export const Route = createFileRoute('/api/hitpay-webhook')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.text()

        if (!verifyStudioSignature(body, request.headers.get(STUDIO_SIGNATURE_HEADER))) {
          return new Response('Invalid signature.', { status: 401 })
        }

        try {
          JSON.parse(body)
        } catch {
          return new Response('Body must be JSON.', { status: 400 })
        }

        await storeHitpayWebhookEvent({
          eventObject: request.headers.get('hitpay-event-object') ?? 'unknown',
          eventType: request.headers.get('hitpay-event-type') ?? 'unknown',
          body,
        })

        return new Response(null, { status: 204 })
      },
    },
  },
})
