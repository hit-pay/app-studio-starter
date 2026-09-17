// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const appLayoutRegistry = registry.items.find(
  (item: { name: string }) => item.name === "app-layout",
);

const appLayoutDocs = {
  ...appLayoutRegistry,
  category: "components",
  props: {
    variant: ["default", "tabs", "sidebar"],
    appName: "ReactNode",
    activeNavigation: "string",
    defaultActiveNavigation: "string",
    onNavigationChange: "function",
    activeSidebar: "string",
    defaultActiveSidebar: "string",
    onSidebarChange: "function",
    pages: "Record<string, ReactNode>",
    sidebarPages: "Record<string, ReactNode>",
  },
  examples: [
    {
      description: "Tabs navigation",
      code: `<div className="h-64 overflow-hidden rounded-lg border border-oc-border">
  <AppLayout
    className="h-full"
    appName="Invoices"
    variant="tabs"
    navigationItems={[
      { id: "overview", label: "Overview" },
      { id: "sent", label: "Sent" },
    ]}
    pages={{
      overview: (
        <PageLayout title="Overview">
          <p className="text-sm text-oc-muted-foreground">
            Open and paid invoices for PayNow and Cards.
          </p>
        </PageLayout>
      ),
      sent: (
        <PageLayout title="Sent">
          <p className="text-sm text-oc-muted-foreground">
            Invoices awaiting customer payment.
          </p>
        </PageLayout>
      ),
    }}
  />
</div>`,
    },
    {
      description: "Sidebar navigation",
      code: `<div className="h-64 overflow-hidden rounded-lg border border-oc-border">
  <AppLayout
    className="h-full"
    appName="Settings"
    variant="sidebar"
    sidebarItems={[
      { id: "home", label: "General" },
      { id: "team", label: "Team" },
    ]}
    sidebarPages={{
      home: (
        <PageLayout title="General">
          <p className="text-sm text-oc-muted-foreground">
            Store name, timezone, and business profile.
          </p>
        </PageLayout>
      ),
      team: (
        <PageLayout title="Team">
          <p className="text-sm text-oc-muted-foreground">
            Invite staff and manage roles.
          </p>
        </PageLayout>
      ),
    }}
  />
</div>`,
    },
  ],
  related_components: ["page-layout", "drawer", "button"],
};

export default appLayoutDocs;
