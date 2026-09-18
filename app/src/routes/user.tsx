import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { useCurrentUser } from '#/lib/current-user'
import { DetailCard } from '@/components/displaying-data/detail-card'
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
        <DetailCard
          title="Profile"
          columns={2}
          style="border"
          items={[
            {
              key: 'name',
              label: 'Name',
              value: user.name || '—',
              alignment: 'vertical',
            },
            {
              key: 'email',
              label: 'Email',
              value: user.email,
              copyValue: user.email,
              alignment: 'vertical',
            },
            {
              key: 'role',
              label: 'Role',
              value: user.role?.title || '—',
              alignment: 'vertical',
            },
          ]}
        />
      ) : null}
    </PageLayout>
  )
}
