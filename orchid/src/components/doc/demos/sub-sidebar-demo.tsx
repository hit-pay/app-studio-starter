import { Link } from "@tanstack/react-router";

import {
  SubSidebar,
  SubSidebarContent,
  SubSidebarGroup,
  SubSidebarGroupLabel,
  SubSidebarHeader,
  SubSidebarItem,
} from "@/components/ui/sub-sidebar";

const GROUPS = [
  {
    label: "Account",
    items: ["Business Details", "Account Verification", "Bank Accounts"],
  },
  {
    label: "Team",
    items: ["Staff", "Audit Logs"],
  },
  {
    label: "Online Store",
    items: ["Store Settings"],
  },
  {
    label: "Branding",
    items: ["Checkout Customisation", "Order Form Customisation"],
  },
  {
    label: "Communications",
    items: ["Email Templates", "Notifications"],
  },
];

function SubSidebarDemo() {
  return (
    <>
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Settings navigation
        </p>
        <div className="h-160 overflow-hidden rounded-lg border border-solid border-oc-border">
          <SubSidebar>
            <SubSidebarHeader render={<Link to="/" />}>
              Settings
            </SubSidebarHeader>
            <SubSidebarContent>
              {GROUPS.map((group) => (
                <SubSidebarGroup key={group.label}>
                  <SubSidebarGroupLabel>{group.label}</SubSidebarGroupLabel>
                  {group.items.map((item) => (
                    <SubSidebarItem
                      key={item}
                      href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
                      active={item === "Checkout Customisation"}
                    >
                      {item}
                    </SubSidebarItem>
                  ))}
                </SubSidebarGroup>
              ))}
            </SubSidebarContent>
          </SubSidebar>
        </div>
      </div>
    </>
  );
}

export { SubSidebarDemo };
