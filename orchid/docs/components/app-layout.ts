// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const appLayoutRegistry = registry.items.find(
  (item: { name: string }) => item.name === "app-layout",
);

const appLayoutDocs = {
  ...appLayoutRegistry,
  category: "components",
  requiresTanStackRouter: true,
  props: {
    variant: ["default (no nav chrome)", "tabs (horizontal)", "sidebar (vertical)"],
    appName: "ReactNode",
    appBarActions: "ReactNode (right of app name in top bar)",
    "navigationItems[].id": "string",
    "navigationItems[].label": "ReactNode",
    "navigationItems[].to": "TanStack Router path (Link + active from URL)",
  },
  examples: [
    {
      description: "Tab layout route (route.tsx)",
      code: `import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@ui/button";

export const Route = createFileRoute("/invoices")({
  component: InvoicesShell,
});

function InvoicesShell() {
  return (
    <AppLayout
      className="h-full min-h-0"
      appName="Invoices"
      appBarActions={<Button size="sm">Create invoice</Button>}
      variant="tabs"
      navigationItems={[
        { id: "overview", label: "Overview", to: "/invoices" },
        { id: "sent", label: "Sent", to: "/invoices/sent" },
      ]}
    >
      <Outlet />
    </AppLayout>
  );
}`,
    },
    {
      description: "Sidebar layout route (route.tsx)",
      code: `import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/app-layout";

export const Route = createFileRoute("/settings")({
  component: SettingsShell,
});

function SettingsShell() {
  return (
    <AppLayout
      className="h-full min-h-0"
      appName="Settings"
      variant="sidebar"
      navigationItems={[
        { id: "home", label: "General", to: "/settings" },
        { id: "team", label: "Team", to: "/settings/team" },
      ]}
    >
      <Outlet />
    </AppLayout>
  );
}`,
    },
    {
      description: "Child route page",
      code: `import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/page-layout";

export const Route = createFileRoute("/invoices/sent")({
  component: SentInvoicesPage,
});

function SentInvoicesPage() {
  return (
    <PageLayout title="Sent" description="Invoices awaiting payment.">
      {/* DataTable, Empty, etc. */}
    </PageLayout>
  );
}`,
    },
  ],
  related_components: ["page-layout", "form-layout", "drawer", "button"],
};

export default appLayoutDocs;
