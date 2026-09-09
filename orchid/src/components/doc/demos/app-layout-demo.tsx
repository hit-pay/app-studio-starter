import { useState } from 'react'

import { AppLayout } from '@/components/layout/app-layout'
import { PageLayout } from '@/components/layout/page-layout'

function AppLayoutDemo() {
  const [tab, setTab] = useState('overview')
  const [sidebar, setSidebar] = useState('home')

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
          activeNavigation={tab}
          onNavigationChange={setTab}
        >
          <PageLayout title={tab === 'overview' ? 'Overview' : 'Sent'}>
            <p className="text-sm text-oc-muted-foreground">
              Frame the embedded pane with AppLayout, then put PageLayout inside.
            </p>
          </PageLayout>
        </AppLayout>
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
          activeSidebar={sidebar}
          onSidebarChange={setSidebar}
        >
          <PageLayout title={sidebar === 'home' ? 'General' : 'Team'}>
            <p className="text-sm text-oc-muted-foreground">
              Sidebar mode opens a drawer on small screens.
            </p>
          </PageLayout>
        </AppLayout>
      </div>
    </div>
  )
}

export { AppLayoutDemo }
