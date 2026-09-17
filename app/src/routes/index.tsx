import { createFileRoute, Link } from '@tanstack/react-router'

import { PageLayout } from '@/components/layout/page-layout'
import { buttonVariants } from '@ui/button'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <PageLayout title="Home" description="HitPay Dashboard app.">
      <div className="flex flex-col gap-3 rounded-xl border border-oc-border p-6">
        <p className="text-sm text-oc-muted-foreground">Start building from this page.</p>
        <Link to="/prebuild" className={buttonVariants({ variant: 'outline', size: 'sm' })}>
          Prebuild examples
        </Link>
      </div>
    </PageLayout>
  )
}
