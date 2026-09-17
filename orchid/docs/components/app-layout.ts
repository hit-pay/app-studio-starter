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
    activeSidebar: "string",
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
    activeNavigation="overview"
  >
    <PageLayout title="Overview">
      <p className="text-sm text-oc-muted-foreground">
        Frame the embedded pane with AppLayout, then put PageLayout inside.
      </p>
    </PageLayout>
  </AppLayout>
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
    activeSidebar="home"
  >
    <PageLayout title="General">
      <p className="text-sm text-oc-muted-foreground">
        Sidebar mode opens a drawer on small screens.
      </p>
    </PageLayout>
  </AppLayout>
</div>`,
    },
  ],
  related_components: ["page-layout", "drawer", "button"],
};

export default appLayoutDocs;
