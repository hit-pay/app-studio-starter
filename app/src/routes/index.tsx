import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useHitPayUser } from '#/lib/hitpay'
import { Spinner } from '@/base-ui/feedback/spinner'
import { AppLayout } from '@/components/layout/app-layout'

export const Route = createFileRoute('/')({ component: Home })

function formatElapsed(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function Home() {
  const { user } = useHitPayUser()
  const firstName = user?.name?.trim().split(/\s+/)[0] || null
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setElapsed((seconds) => seconds + 1)
    }, 1000)

    return () => window.clearInterval(id)
  }, [])

  return (
    <AppLayout appName="Your app" className="h-full min-h-0">
      <div className="flex min-h-[calc(100dvh-3rem)] w-full items-center justify-center px-6">
        <div className="flex w-full max-w-md flex-col items-center text-center">
          <Spinner className="size-6 text-oc-primary" aria-label="Building your app" />
          <p className="mt-5 text-xs font-medium tracking-[0.14em] text-oc-primary uppercase">
            App Studio
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-oc-foreground">
            {firstName
              ? `${firstName}, we’re building this for you`
              : 'We’re building this for you'}
          </h1>
          <p className="mt-2 text-sm leading-6 text-oc-muted-foreground">
            Take a breath. Your idea is becoming a tool your team can open and use — screens,
            records, and the little details that make a business run. This usually takes a few
            minutes.
          </p>
          <p
            className="mt-8 font-medium tabular-nums text-oc-foreground"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="block text-xs font-medium tracking-wide text-oc-muted-foreground uppercase">
              Time so far
            </span>
            <span className="mt-1 block text-3xl tracking-tight">{formatElapsed(elapsed)}</span>
          </p>
        </div>
      </div>
    </AppLayout>
  )
}
