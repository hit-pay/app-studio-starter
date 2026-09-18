import { useNavigate, useRouterState } from "@tanstack/react-router";

import {
  Sidebar,
  type SidebarGroupConfig,
} from "@/components/navigation/sidebar";
import { DOC_BASE_GROUPS, DOC_BLOCK_GROUPS } from "./doc-components";

function asGroups(
  groups: readonly {
    label: string;
    items: readonly { to: string; name: string }[];
  }[],
): SidebarGroupConfig[] {
  return groups.map((group) => ({
    id: group.label,
    label: group.label,
    items: group.items.map((item) => ({
      id: item.to,
      label: item.name,
      href: item.to,
    })),
  }));
}

function DocSidebar() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (pathname === "/" || pathname === "/components" || pathname === "/ui") {
    return null;
  }

  const showBlocks = pathname.startsWith("/components/");
  const showBase = pathname.startsWith("/ui/");

  if (!showBlocks && !showBase) {
    return null;
  }

  const groups = showBlocks ? asGroups(DOC_BLOCK_GROUPS) : asGroups(DOC_BASE_GROUPS);

  return (
    <aside className="hidden h-full w-56 shrink-0 flex-col border-r border-solid border-oc-border bg-oc-background md:flex">
      <Sidebar
        className="h-full min-h-0 w-full"
        sidebarClassName="rounded-none border-0 bg-transparent"
        groups={groups}
        activeItem={pathname}
        onItemChange={(id) => {
          void navigate({ to: id });
        }}
      />
    </aside>
  );
}

export { DocSidebar };
