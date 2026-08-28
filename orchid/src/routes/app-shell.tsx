import { createFileRoute } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import {
  AppShell,
  AppShellNav,
  AppShellNavGroup,
  AppShellNavItem,
} from '@/components/ui/app-shell'
import { Button } from '@/components/ui/button'
import { PageTitle } from '@/components/ui/page-title'
import {
  SubSidebar,
  SubSidebarContent,
  SubSidebarGroup,
  SubSidebarGroupLabel,
  SubSidebarItem,
} from '@/components/ui/sub-sidebar'

export const Route = createFileRoute('/app-shell')({
  component: AppShellExamplesPage,
})

function AppShellExamplesPage() {
  return (
    <DocExamplePage
      to="/app-shell"
      usage={`import {
  AppShell,
  AppShellNav,
  AppShellNavGroup,
  AppShellNavItem,
} from '@/components/ui/app-shell'
import { PageTitle } from '@/components/ui/page-title'

<AppShell
  variant="tabs"
  appName="Email Templates App"
  header={<PageTitle title="Settings" description="Manage your application." />}
  navigation={
    <AppShellNav>
      <AppShellNavGroup>
        <AppShellNavItem active>General</AppShellNavItem>
        <AppShellNavItem>Notifications</AppShellNavItem>
      </AppShellNavGroup>
    </AppShellNav>
  }
>
  Page content
</AppShell>

<AppShell
  variant="sidebar"
  appName="Inventory App"
  sidebar={
    <SubSidebar>
      <SubSidebarContent>
        <SubSidebarItem active>Overview</SubSidebarItem>
        <SubSidebarItem>Products</SubSidebarItem>
      </SubSidebarContent>
    </SubSidebar>
  }
  header={<PageTitle title="Overview" />}
>
  Page content
</AppShell>`}
    >
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Page title only
        </p>
        <div className="overflow-hidden rounded-lg border border-solid border-oc-border">
          <AppShell
            appName="Orders App"
            header={
              <div className="px-6 pt-6">
                <PageTitle
                  title="Orders"
                  description="View and manage customer orders."
                  actions={<Button size="sm">Create order</Button>}
                />
              </div>
            }
          >
            <div className="rounded-lg border border-dashed border-oc-border p-6 text-sm text-oc-muted-foreground">
              Orders content
            </div>
          </AppShell>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Page title with tabs
        </p>
        <div className="overflow-hidden rounded-lg border border-solid border-oc-border">
          <AppShell
            variant="tabs"
            appName="Email Templates App"
            header={
              <div className="px-6 pt-6">
                <PageTitle title="Email Templates" description="Customize customer messaging." />
              </div>
            }
            navigation={
              <AppShellNav>
                <AppShellNavGroup>
                  <AppShellNavItem active>Payment Receipt</AppShellNavItem>
                  <AppShellNavItem>Order Confirmation</AppShellNavItem>
                  <AppShellNavItem>Recurring Invoice</AppShellNavItem>
                  <AppShellNavItem>Invoicing</AppShellNavItem>
                </AppShellNavGroup>
              </AppShellNav>
            }
          >
            <div className="rounded-lg border border-dashed border-oc-border p-6 text-sm text-oc-muted-foreground">
              Email template form
            </div>
          </AppShell>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Page title with sub-sidebar
        </p>
        <div className="h-160 overflow-hidden rounded-lg border border-solid border-oc-border">
          <AppShell
            variant="sidebar"
            appName="Inventory App"
            sidebar={
              <SubSidebar>
                <SubSidebarContent>
                  <SubSidebarGroup>
                    <SubSidebarGroupLabel>Inventory</SubSidebarGroupLabel>
                    <SubSidebarItem href="#overview" active>
                      Overview
                    </SubSidebarItem>
                    <SubSidebarItem href="#products">Products</SubSidebarItem>
                    <SubSidebarItem href="#stock-counts">Stock Counts</SubSidebarItem>
                  </SubSidebarGroup>
                  <SubSidebarGroup>
                    <SubSidebarGroupLabel>Settings</SubSidebarGroupLabel>
                    <SubSidebarItem href="#locations">Locations</SubSidebarItem>
                    <SubSidebarItem href="#notifications">Notifications</SubSidebarItem>
                  </SubSidebarGroup>
                </SubSidebarContent>
              </SubSidebar>
            }
            header={
              <div className="px-6 pt-6">
                <PageTitle
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
          </AppShell>
        </div>
      </div>
    </DocExamplePage>
  )
}
