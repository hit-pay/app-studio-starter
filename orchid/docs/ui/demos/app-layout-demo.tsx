import { AppLayout } from '@/components/layout/app-layout'
import { PageLayout } from '@/components/layout/page-layout'

function AppLayoutDemo() {
  return (
    <div className="flex min-h-0 flex-col gap-8">
      <div className="h-80 overflow-hidden rounded-lg border border-oc-border">
        <AppLayout
          className="h-full"
          appName="Invoices"
          variant="tabs"
          navigationItems={[
            { id: 'overview', label: 'Overview' },
            { id: 'sent', label: 'Sent' },
          ]}
          pages={{
            overview: (
              <PageLayout title="Overview">
                <p className="text-sm text-oc-muted-foreground">
                  Frame the embedded pane with AppLayout, then put PageLayout inside.
                </p>
              </PageLayout>
            ),
            sent: (
              <PageLayout title="Sent">
                <p className="text-sm text-oc-muted-foreground">
                  Sent invoices waiting for payment.
                </p>
              </PageLayout>
            ),
          }}
        />
      </div>
      <div className="h-80 overflow-hidden rounded-lg border border-oc-border">
        <AppLayout
          className="h-full"
          appName="Settings"
          variant="sidebar"
          sidebarItems={[
            { id: 'home', label: 'General' },
            { id: 'team', label: 'Team' },
          ]}
          sidebarPages={{
            home: (
              <PageLayout title="General">
                <p className="text-sm text-oc-muted-foreground">
                  Sidebar mode opens a drawer on small screens.
                </p>
              </PageLayout>
            ),
            team: (
              <PageLayout title="Team">
                <p className="text-sm text-oc-muted-foreground">
                  Manage staff access and roles.
                </p>
              </PageLayout>
            ),
          }}
        />
      </div>
    </div>
  )
}

export { AppLayoutDemo }
