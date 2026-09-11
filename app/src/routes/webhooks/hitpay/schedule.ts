import { createFileRoute } from '@tanstack/react-router'

import { persistScheduledWake } from '#/lib/server/hitpay-wake'

export const Route = createFileRoute('/webhooks/hitpay/schedule')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const event = await persistScheduledWake(await request.text())

          return Response.json({ ok: true, id: event?.id ?? null })
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Wake webhook failed.'
          const status = message.includes('signature') ? 401 : 400

          return Response.json({ ok: false, error: message }, { status })
        }
      },
    },
  },
})
