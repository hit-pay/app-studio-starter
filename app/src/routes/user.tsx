import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { useCurrentUser } from '#/lib/current-user'
import { PageLayout } from '@/components/layout/page-layout'
import { Spinner } from '@ui/spinner'

export const Route = createFileRoute('/user')({
  component: UserPage,
})

function UserPage() {
  const navigate = useNavigate()
  const { user, error, loading } = useCurrentUser()

  return (
    <PageLayout
      title="Current user"
      onBack={() => navigate({ to: '/' })}
    >
      {loading ? (
        <Spinner className="size-4" />
      ) : error ? (
        <p className="text-sm text-oc-destructive">{error}</p>
      ) : user ? (
        <dl className="space-y-4 text-sm">
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
    </PageLayout>
  )
}
