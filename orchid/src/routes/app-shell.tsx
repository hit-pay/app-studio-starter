import type { ReactNode } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import {
  AppShell,
  AppShellNav,
  AppShellNavGroup,
  AppShellNavItem,
} from '@/components/ui/app-shell'
import { PageTitle } from '@/components/ui/page-title'

export const Route = createFileRoute('/app-shell')({
  component: AppShellExamplesPage,
})

function Preview({ children }: { children: ReactNode }) {
  return <div className="h-[28rem] overflow-hidden bg-oc-muted">{children}</div>
}

function AppShellExamplesPage() {
  return (
    <DocExamplePage to="/app-shell">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            With nav
          </p>
          <p className="text-sm text-oc-muted-foreground">
            Several pages. Header is full width above the nav, like HitPay settings. Use AppShellNavItem
            with active for the current route. Do not show a signed-in user.
          </p>
          <Preview>
            <AppShell
              nav={
                <AppShellNav>
                  <AppShellNavGroup label="Catalog">
                    <AppShellNavItem active>Products</AppShellNavItem>
                    <AppShellNavItem>Inventory</AppShellNavItem>
                  </AppShellNavGroup>
                  <AppShellNavGroup label="Account">
                    <AppShellNavItem>Settings</AppShellNavItem>
                  </AppShellNavGroup>
                </AppShellNav>
              }
              header={
                <div className="px-6 py-4">
                  <PageTitle title="Products" />
                </div>
              }
            >
              <p className="text-sm text-oc-muted-foreground">Main. SchemaTable or SchemaForm.</p>
            </AppShell>
          </Preview>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Without nav
          </p>
          <p className="text-sm text-oc-muted-foreground">Single screen. Omit nav.</p>
          <Preview>
            <AppShell
              header={
                <div className="px-6 py-4">
                  <PageTitle title="Products" />
                </div>
              }
            >
              <p className="text-sm text-oc-muted-foreground">Main. SchemaTable or SchemaForm.</p>
            </AppShell>
          </Preview>
        </div>
      </div>
    </DocExamplePage>
  )
}
