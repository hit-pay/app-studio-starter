import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { useCurrentUser } from '#/lib/current-user'
import { PageLayout } from '@/components/layout/page-layout'

export const Route = createFileRoute('/current-user')({
  component: CurrentUserPage,
})

function CurrentUserPage() {
  const navigate = useNavigate()
  const { user, error, loading } = useCurrentUser()

  return (
    <PageLayout
      title="Current user"
      description={user?.email}
      loading={loading}
      onBack={() => navigate({ to: '/' })}
    >
      {error ? (
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
