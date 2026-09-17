import { createFileRoute } from '@tanstack/react-router'

import { PageLayout } from '@/components/layout/page-layout'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <PageLayout title="Home" description="HitPay Dashboard app.">
      <div className="rounded-xl border border-oc-border p-6 text-sm text-oc-muted-foreground">
        Start building from this page.
      </div>
    </PageLayout>
  )
}
