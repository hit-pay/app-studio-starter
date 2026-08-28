import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import {
  AppLayout,
  AppNav,
  AppNavGroup,
  AppNavItem,
  AppSidebar,
  AppSidebarContent,
  AppSidebarItem,
} from '@/components/ui/app-layout'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/ui/page'

export const Route = createFileRoute('/app-layout')({
  component: AppLayoutExamplesPage,
})

function AppLayoutExamplesPage() {
  return (
    <DocExamplePage
      to="/app-layout"
      usage={`import {
  AppLayout,
  AppNav,
  AppNavGroup,
  AppNavItem,
  AppSidebar,
  AppSidebarContent,
  AppSidebarItem,
} from '@/components/ui/app-layout'

<AppLayout
  variant="tabs"
  appName="Email Templates App"
  header={<PageHeader title="Settings" />}
  navigation={
    <AppNav>
      <AppNavGroup>
        <AppNavItem active>General</AppNavItem>
        <AppNavItem>Notifications</AppNavItem>
      </AppNavGroup>
    </AppNav>
  }
>
  Page content
</AppLayout>

<AppLayout
  variant="sidebar"
  sidebar={
    <AppSidebar>
      <AppSidebarContent>
        <AppSidebarItem active>General settings</AppSidebarItem>
        <AppSidebarItem>Tracking Tools</AppSidebarItem>
        <AppSidebarItem>SEO</AppSidebarItem>
      </AppSidebarContent>
    </AppSidebar>
  }
>
  Page content
</AppLayout>`}
    >
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Tabs
        </p>
        <div className="h-112 overflow-hidden rounded-lg border border-oc-border">
          <AppLayout
            variant="tabs"
            appName="Email Templates App"
            header={
              <div className="px-6 pt-6">
                <PageHeader
                  title="Email Templates"
                  description="Customize customer messaging."
                  actions={<Button size="sm">New template</Button>}
                />
              </div>
            }
            navigation={
              <AppNav>
                <AppNavGroup>
                  <AppNavItem active>Payment Receipt</AppNavItem>
                  <AppNavItem>Order Confirmation</AppNavItem>
                  <AppNavItem>Recurring Invoice</AppNavItem>
                </AppNavGroup>
              </AppNav>
            }
          >
            <div className="rounded-lg border border-dashed border-oc-border p-6 text-sm text-oc-muted-foreground">
              Email template content
            </div>
          </AppLayout>
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
            sidebar={
              <AppSidebar>
                <AppSidebarContent>
                  <AppSidebarItem active>General settings</AppSidebarItem>
                  <AppSidebarItem>Tracking Tools</AppSidebarItem>
                  <AppSidebarItem>SEO</AppSidebarItem>
                  <AppSidebarItem>Multi-currency converter</AppSidebarItem>
                  <AppSidebarItem>Tax Settings</AppSidebarItem>
                  <AppSidebarItem>Button Labels</AppSidebarItem>
                  <AppSidebarItem>Payment methods</AppSidebarItem>
                </AppSidebarContent>
              </AppSidebar>
            }
            header={
              <div className="px-6 pt-6">
                <PageHeader
                  title="Inventory Overview"
                  description="Track products and stock across locations."
                  actions={<Button size="sm">Add product</Button>}
                />
              </div>
            }
          >
            <div className="rounded-lg border border-dashed border-oc-border p-6 text-sm text-oc-muted-foreground">
              Inventory dashboard
            </div>
          </AppLayout>
        </div>
      </div>
    </DocExamplePage>
  )
}
