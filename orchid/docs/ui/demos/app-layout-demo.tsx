import {
  Outlet,
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'

import { AppLayout } from '@/components/layout/app-layout'
import { PageLayout } from '@/components/layout/page-layout'
import { Button } from '@ui/button'

function DemoRoot() {
  return (
    <div className="flex h-full min-h-0 flex-col bg-oc-background">
      <Outlet />
    </div>
  )
}

const invoicesRootRoute = createRootRoute({ component: DemoRoot })

function InvoicesShell() {
  return (
    <AppLayout
      className="h-full min-h-0"
      appName="Invoices"
      appBarActions={<Button size="sm">Create invoice</Button>}
      variant="tabs"
      navigationItems={[
        { id: 'overview', label: 'Overview', to: '/invoices' },
        { id: 'sent', label: 'Sent', to: '/invoices/sent' },
      ]}
    >
      <Outlet />
    </AppLayout>
  )
}

const invoicesRoute = createRoute({
  getParentRoute: () => invoicesRootRoute,
  path: '/invoices',
  component: InvoicesShell,
})

const invoicesOverviewRoute = createRoute({
  getParentRoute: () => invoicesRoute,
  path: '/',
  component: () => (
    <PageLayout title="Overview">
      <p className="text-sm text-oc-muted-foreground">
        Open and paid invoices for PayNow and Cards.
      </p>
    </PageLayout>
  ),
})

const invoicesSentRoute = createRoute({
  getParentRoute: () => invoicesRoute,
  path: '/sent',
  component: () => (
    <PageLayout title="Sent">
      <p className="text-sm text-oc-muted-foreground">
        Invoices awaiting customer payment.
      </p>
    </PageLayout>
  ),
})

const invoicesDemoRouter = createRouter({
  routeTree: invoicesRootRoute.addChildren([
    invoicesRoute.addChildren([invoicesOverviewRoute, invoicesSentRoute]),
  ]),
  history: createMemoryHistory({ initialEntries: ['/invoices'] }),
})

const settingsRootRoute = createRootRoute({ component: DemoRoot })

function SettingsShell() {
  return (
    <AppLayout
      className="h-full min-h-0"
      appName="Settings"
      variant="sidebar"
      navigationItems={[
        { id: 'home', label: 'General', to: '/settings' },
        { id: 'team', label: 'Team', to: '/settings/team' },
      ]}
    >
      <Outlet />
    </AppLayout>
  )
}

const settingsRoute = createRoute({
  getParentRoute: () => settingsRootRoute,
  path: '/settings',
  component: SettingsShell,
})

const settingsHomeRoute = createRoute({
  getParentRoute: () => settingsRoute,
  path: '/',
  component: () => (
    <PageLayout title="General">
      <p className="text-sm text-oc-muted-foreground">
        Store name, timezone, and business profile.
      </p>
    </PageLayout>
  ),
})

const settingsTeamRoute = createRoute({
  getParentRoute: () => settingsRoute,
  path: '/team',
  component: () => (
    <PageLayout title="Team">
      <p className="text-sm text-oc-muted-foreground">Invite staff and manage roles.</p>
    </PageLayout>
  ),
})

const settingsDemoRouter = createRouter({
  routeTree: settingsRootRoute.addChildren([
    settingsRoute.addChildren([settingsHomeRoute, settingsTeamRoute]),
  ]),
  history: createMemoryHistory({ initialEntries: ['/settings'] }),
})

function AppLayoutDemoFrame({
  label,
  router,
}: {
  label: string
  router: typeof invoicesDemoRouter | typeof settingsDemoRouter
}) {
  return (
    <div className="grid gap-3">
      <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
        {label}
      </p>
      <div className="h-80 overflow-hidden rounded-lg border border-solid border-oc-border bg-oc-background">
        <div className="h-full min-h-0">
          <RouterProvider router={router} />
        </div>
      </div>
    </div>
  )
}

function AppLayoutDemo() {
  return (
    <div className="flex min-h-0 flex-col gap-8">
      <AppLayoutDemoFrame label="Tabs" router={invoicesDemoRouter} />
      <AppLayoutDemoFrame label="Sidebar" router={settingsDemoRouter} />
    </div>
  )
}

export { AppLayoutDemo }
