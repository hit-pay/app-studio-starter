import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { useCurrentUser } from '#/lib/current-user'
import { PageLayout } from '@/components/layout/page-layout'
import { Skeleton } from '@ui/skeleton'
import { Spinner } from '@ui/spinner'

export const Route = createFileRoute('/current-user')({
  component: CurrentUserPage,
})

function CurrentUserPage() {
  const navigate = useNavigate()
  const { user, error, loading } = useCurrentUser()

  return (
    <PageLayout
      title="Current user"
      description={loading ? undefined : user?.email}
      onBack={() => navigate({ to: '/' })}
    >
      {loading ? (
        <div className="flex max-w-sm flex-col gap-4">
          <div className="flex items-center gap-2 text-sm text-oc-muted-foreground">
            <Spinner className="size-4" />
            Loading
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-3.5 w-16" />
              <Skeleton className="h-4 w-40" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-3.5 w-16" />
              <Skeleton className="h-4 w-56" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-3.5 w-12" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
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
