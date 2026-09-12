<!-- Generated from content/docs/components/app-layout.mdx. Do not edit. -->

# App Layout

HitPay App Studio embedded pane frame. Not generic app chrome.

`AppLayout` is the HitPay App Studio embedded pane frame. Use it around
every route inside the dashboard iframe — not as generic website chrome.
Put `PageLayout` or `FormLayout` inside for page chrome.

## Interactive example

The interactive example is rendered on the Orchid documentation page. Use the usage guidance below and verify the installed component source for the exact API.

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
