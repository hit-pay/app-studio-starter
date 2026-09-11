<!-- Generated from content/docs/components/app-layout.mdx. Do not edit. -->

# App Layout

HitPay App Studio embedded pane frame. Not generic app chrome.

`AppLayout` is the HitPay App Studio embedded pane frame. Use it around
every route inside the dashboard iframe — not as generic website chrome.
Put `PageLayout` or `FormLayout` inside for page chrome.

## Example

```tsx
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
```

## Default

```tsx
import { AppLayout } from "@/components/layout/app-layout";
import { PageLayout } from "@/components/layout/page-layout";

<AppLayout appName="Invoices" className="h-full">
  <PageLayout title="Invoices">…</PageLayout>
</AppLayout>
```

## Tabs

Pass `navigationItems` for in-app tabs. `variant` can stay `default` or
`tabs`.

## Sidebar

`variant="sidebar"` plus `sidebarItems` adds a flat child nav. On small
screens the list opens in a drawer.
