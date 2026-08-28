import { createFileRoute } from '@tanstack/react-router'
import { useHitPayUser } from '#/lib/hitpay'
import { AppLayout } from '@/components/ui/app-layout'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const { user } = useHitPayUser()
  const displayName = user?.name?.trim() || user?.email || null

  return (
    <AppLayout appName="App Studio" className="h-full">
      <div className="flex h-full items-center justify-center">
        <div className="flex w-full max-w-md flex-col items-center px-6 text-center">
          <div className="mb-8 flex size-14 items-center justify-center rounded-2xl bg-oc-primary shadow-lg">
            <span className="size-6 animate-spin rounded-full border-2 border-oc-primary-foreground/40 border-t-oc-primary-foreground" />
          </div>

          <p className="text-xs font-medium tracking-[0.14em] text-oc-primary uppercase">
            App Studio
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-oc-foreground">
            AI is building your app
          </h1>
          <p className="mt-2 text-sm leading-6 text-oc-muted-foreground">
            Your request is being turned into a working app. This may take a few minutes.
          </p>

          {displayName ? (
            <p className="mt-8 text-xs text-oc-muted-foreground">Signed in as {displayName}</p>
          ) : null}
        </div>
      </div>
    </AppLayout>
  )
}
