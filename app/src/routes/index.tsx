import { createFileRoute } from '@tanstack/react-router'
import { useHitPayUser } from '#/lib/hitpay'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const { user } = useHitPayUser()
  const displayName = user?.name?.trim() || user?.email || null

  return (
    <main className="fixed inset-0 flex items-center justify-center bg-muted">
      <div className="flex w-full max-w-[400px] flex-col items-center px-6 text-center">
        <div className="mb-8 flex size-14 items-center justify-center rounded-2xl bg-primary shadow-lg">
          <span className="size-6 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" />
        </div>

        <p className="text-xs font-medium tracking-[0.14em] text-primary uppercase">
          App Studio
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
          Preparing your app
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Please wait a moment. Your app is being prepared and should be ready in a few minutes.
        </p>

        {displayName ? (
          <p className="mt-8 text-xs text-muted-foreground">Signed in as {displayName}</p>
        ) : null}
      </div>
    </main>
  )
}
