import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { listHitpayWebhookEvents } from '#/lib/server/hitpay-webhooks'
import type { HitpayWebhookEvent } from '#/types'
import { PageLayout } from '@/components/layout/page-layout'

export const Route = createFileRoute('/webhook-logs')({ component: WebhookLogs })

function WebhookLogs() {
  const [events, setEvents] = useState<HitpayWebhookEvent[]>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    void listHitpayWebhookEvents({ data: { page, pageSize: 50 } })
      .then((result) => {
        setEvents(result.events)
        setTotal(result.total)
      })
      .catch((caught) => setError(caught instanceof Error ? caught.message : 'Gagal memuat webhook log.'))
      .finally(() => setLoading(false))
  }, [page])

  const pageCount = Math.max(1, Math.ceil(total / 50))

  return (
    <PageLayout
      title="Webhook log"
      description="Riwayat event yang diterima dari HitPay."
    >
      {loading ? (
        <p className="text-sm text-oc-muted-foreground">Memuat webhook log…</p>
      ) : error ? (
        <p className="text-sm text-oc-destructive">{error}</p>
      ) : events.length === 0 ? (
        <div className="rounded-xl border border-dashed border-oc-border px-4 py-10 text-center">
          <p className="text-sm text-oc-muted-foreground">Belum ada webhook yang diterima.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-oc-border">
          {events.map((event) => (
            <article key={event.id} className="border-b border-oc-border p-4 last:border-b-0">
              <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
                <span className="font-medium text-oc-foreground">
                  {event.eventObject}.{event.eventType}
                </span>
                <span className="rounded-full bg-oc-neutral-soft px-2 py-0.5 text-xs text-oc-muted-foreground">
                  {event.status}
                </span>
                <time className="text-xs text-oc-muted-foreground">
                  {new Date(event.receivedAt).toLocaleString('id-ID')}
                </time>
              </div>
              <pre className="max-h-80 overflow-auto rounded-lg bg-oc-neutral-soft p-3 text-xs leading-5 text-oc-foreground">
                {JSON.stringify(event.payload, null, 2)}
              </pre>
            </article>
          ))}
        </div>
      )}
      {!loading && !error && total > 0 ? (
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-sm text-oc-muted-foreground">
            Halaman {page} dari {pageCount} · {total} event
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage((current) => current - 1)}
              className="rounded-lg border border-oc-border px-3 py-2 text-sm disabled:opacity-40"
            >
              Sebelumnya
            </button>
            <button
              type="button"
              disabled={page >= pageCount}
              onClick={() => setPage((current) => current + 1)}
              className="rounded-lg border border-oc-border px-3 py-2 text-sm disabled:opacity-40"
            >
              Berikutnya
            </button>
          </div>
        </div>
      ) : null}
    </PageLayout>
  )
}
