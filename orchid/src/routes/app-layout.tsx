import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import { DocCodePanel } from '@/components/doc/doc-code-panel'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { AppLayout } from '@/components/ui/app-layout'
import { Button } from '@/components/ui/button'
import { Page, PageContent, PageHeader } from '@/components/ui/page'

export const Route = createFileRoute('/app-layout')({
  component: AppLayoutExamplesPage,
})

const TABS_USAGE = `import { useState } from 'react'
import { AppLayout } from '@/components/ui/app-layout'
import { Button } from '@/components/ui/button'
import { Page, PageContent, PageHeader } from '@/components/ui/page'

function TabsAppLayout() {
  const [activeNavigation, setActiveNavigation] = useState('receipt')

  return (
    <AppLayout
      variant="tabs"
      appName="Email Templates App"
      navigationItems={[
        { id: 'receipt', label: 'Payment Receipt' },
        { id: 'order', label: 'Order Confirmation' },
        { id: 'recurring', label: 'Recurring Invoice' },
      ]}
      activeNavigation={activeNavigation}
      onNavigationChange={setActiveNavigation}
    >
      <Page>
        <PageHeader
          title="Email Templates"
          description="Customize customer messaging."
          actions={<Button size="sm">New template</Button>}
        />
        <PageContent>
          <div className="rounded-lg border border-dashed border-oc-border p-6 text-sm text-oc-muted-foreground">
            Email template content
          </div>
        </PageContent>
      </Page>
    </AppLayout>
  )
}`

const SIDEBAR_USAGE = `import { useState } from 'react'
import { AppLayout } from '@/components/ui/app-layout'
import { Button } from '@/components/ui/button'
import { Page, PageContent, PageHeader } from '@/components/ui/page'

function SidebarAppLayout() {
  const [activeSidebar, setActiveSidebar] = useState('general')

  return (
    <AppLayout
      variant="sidebar"
      appName="Inventory App"
      sidebarItems={[
        { id: 'general', label: 'General settings' },
        { id: 'tracking', label: 'Tracking Tools' },
        { id: 'seo', label: 'SEO' },
        { id: 'currency', label: 'Multi-currency converter' },
        { id: 'tax', label: 'Tax Settings' },
        { id: 'labels', label: 'Button Labels' },
        { id: 'payments', label: 'Payment methods' },
      ]}
      activeSidebar={activeSidebar}
      onSidebarChange={setActiveSidebar}
    >
      <Page>
        <PageHeader
          title="Inventory Overview"
          description="Track products and stock across locations."
          actions={<Button size="sm">Add product</Button>}
        />
        <PageContent>
          <div className="rounded-lg border border-dashed border-oc-border p-6 text-sm text-oc-muted-foreground">
            Inventory dashboard
          </div>
        </PageContent>
      </Page>
    </AppLayout>
  )
}`

function AppLayoutExamplesPage() {
  const [activeNavigation, setActiveNavigation] = useState('receipt')
  const [activeSidebar, setActiveSidebar] = useState('general')

  return (
    <DocExamplePage to="/app-layout">
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Tabs
        </p>
        <div className="h-112 overflow-hidden rounded-lg border border-oc-border">
          <AppLayout
            variant="tabs"
            appName="Email Templates App"
            navigationItems={[
              { id: 'receipt', label: 'Payment Receipt' },
              { id: 'order', label: 'Order Confirmation' },
              { id: 'recurring', label: 'Recurring Invoice' },
            ]}
            activeNavigation={activeNavigation}
            onNavigationChange={setActiveNavigation}
          >
            <Page>
              <PageHeader
                title="Email Templates"
                description="Customize customer messaging."
                actions={<Button size="sm">New template</Button>}
              />
              <PageContent>
                <div className="rounded-lg border border-dashed border-oc-border p-6 text-sm text-oc-muted-foreground">
                  Email template content
                </div>
              </PageContent>
            </Page>
          </AppLayout>
        </div>
        <div className="flex min-w-0 flex-col gap-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Usage
          </p>
          <DocCodePanel filename="tabs-app-layout.tsx" code={TABS_USAGE} />
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Sidebar
        </p>
        <div className="h-144 overflow-hidden rounded-lg border border-oc-border">
          <AppLayout
            variant="sidebar"
            appName="Inventory App"
            sidebarItems={[
              { id: 'general', label: 'General settings' },
              { id: 'tracking', label: 'Tracking Tools' },
              { id: 'seo', label: 'SEO' },
              { id: 'currency', label: 'Multi-currency converter' },
              { id: 'tax', label: 'Tax Settings' },
              { id: 'labels', label: 'Button Labels' },
              { id: 'payments', label: 'Payment methods' },
            ]}
            activeSidebar={activeSidebar}
            onSidebarChange={setActiveSidebar}
          >
            <Page>
              <PageHeader
                title="Inventory Overview"
                description="Track products and stock across locations."
                actions={<Button size="sm">Add product</Button>}
              />
              <PageContent>
                <div className="rounded-lg border border-dashed border-oc-border p-6 text-sm text-oc-muted-foreground">
                  Inventory dashboard
                </div>
              </PageContent>
            </Page>
          </AppLayout>
        </div>
        <div className="flex min-w-0 flex-col gap-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Usage
          </p>
          <DocCodePanel filename="sidebar-app-layout.tsx" code={SIDEBAR_USAGE} />
        </div>
      </div>
    </DocExamplePage>
  )
}
