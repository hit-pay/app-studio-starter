import { createFileRoute } from '@tanstack/react-router'

import { PageLayout } from '@/components/layout/page-layout'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <PageLayout title="Home" description="HitPay Dashboard app.">
      <p className="text-sm text-oc-muted-foreground">Start building from this page.</p>
    </PageLayout>
  )
}
