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
            With tabs
          </p>
          <p className="text-sm text-oc-muted-foreground">
            Several pages. Header then a tab bar (same look as Tabs Default), then main. Use
            AppShellNavItem with active for the current route. No sidebar. Do not show a signed-in
            user.
          </p>
          <Preview>
            <AppShell
              tabs={
                <AppShellNav>
                  <AppShellNavGroup>
                    <AppShellNavItem active>General settings</AppShellNavItem>
                    <AppShellNavItem>Tracking Tools</AppShellNavItem>
                    <AppShellNavItem>SEO</AppShellNavItem>
                  </AppShellNavGroup>
                  <AppShellNavGroup>
                    <AppShellNavItem>Tax Settings</AppShellNavItem>
                    <AppShellNavItem>Button Labels</AppShellNavItem>
                  </AppShellNavGroup>
                </AppShellNav>
              }
              header={
                <div className="px-4 py-3 md:px-6 md:py-4">
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
            Without tabs
          </p>
          <p className="text-sm text-oc-muted-foreground">Single screen. Omit tabs.</p>
          <Preview>
            <AppShell
              header={
                <div className="px-4 py-3 md:px-6 md:py-4">
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
