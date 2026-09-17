import { createFileRoute } from '@tanstack/react-router'
import { useHitPayUser } from '#/lib/hitpay'

export const Route = createFileRoute('/current-user')({
  component: CurrentUserPage,
})

function CurrentUserPage() {
  const { user, error, loading } = useHitPayUser()

  return (
    <main className="mx-auto w-full max-w-2xl p-6">
      <h1 className="text-2xl font-semibold tracking-tight">Current user</h1>
      {loading ? (
        <p className="mt-4 text-sm text-oc-muted-foreground">Loading…</p>
      ) : error ? (
        <p className="mt-4 text-sm text-oc-destructive">{error}</p>
      ) : user ? (
        <dl className="mt-6 space-y-4 text-sm">
          <div>
            <dt className="text-oc-muted-foreground">Name</dt>
            <dd className="font-medium">{user.name || '—'}</dd>
          </div>
          <div>
            <dt className="text-oc-muted-foreground">Email</dt>
            <dd className="font-medium">{user.email}</dd>
          </div>
          <div>
            <dt className="text-oc-muted-foreground">Role</dt>
            <dd className="font-medium">{user.role?.title || '—'}</dd>
          </div>
        </dl>
      ) : null}
    </main>
  )
}
