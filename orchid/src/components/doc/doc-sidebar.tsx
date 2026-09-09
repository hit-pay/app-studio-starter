import { Link, useRouterState } from "@tanstack/react-router";

import {
  DOC_BASE_GROUPS,
  DOC_BLOCK_GROUPS,
  DOC_GUIDES,
} from "./doc-components";

function NavLinks({
  items,
  pathname,
}: {
  items: readonly { to: string; name: string }[];
  pathname: string;
}) {
  return (
    <div className="flex flex-col">
      {items.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          aria-current={pathname === item.to ? "page" : undefined}
          className={[
            "flex min-h-8 w-full min-w-0 items-center gap-2 rounded px-2 py-1.5 text-sm text-oc-foreground outline-none transition-colors",
            "hover:bg-oc-neutral focus-visible:ring-2 focus-visible:ring-oc-ring",
            pathname === item.to
              ? "bg-oc-neutral font-medium text-oc-primary hover:bg-oc-neutral"
              : "",
          ].join(" ")}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}

function NavGroup({
  label,
  items,
  pathname,
}: {
  label: string;
  items: readonly { to: string; name: string }[];
  pathname: string;
}) {
  return (
    <div className="mb-5 flex min-w-0 flex-col last:mb-0">
      <div className="mb-1 px-2 text-[10px] leading-5 font-medium tracking-[0.16em] text-oc-muted-foreground uppercase">
        {label}
      </div>
      <NavLinks items={items} pathname={pathname} />
    </div>
  );
}

function GroupedNav({
  label,
  groups,
  pathname,
}: {
  label: string;
  groups: readonly { label: string; items: readonly { to: string; name: string }[] }[];
  pathname: string;
}) {
  return (
    <div className="mb-5 flex min-w-0 flex-col last:mb-0">
      <div className="mb-2 px-2 text-[10px] leading-5 font-medium tracking-[0.16em] text-oc-muted-foreground uppercase">
        {label}
      </div>
      {groups.map((group) => (
        <div key={group.label} className="mb-3 last:mb-0">
          <div className="mb-0.5 px-2 text-xs font-medium text-oc-muted-foreground">
            {group.label}
          </div>
          <NavLinks items={group.items} pathname={pathname} />
        </div>
      ))}
    </div>
  );
}

function DocSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (pathname === "/" || pathname === "/components") return null;

  return (
    <aside className="hidden h-full w-56 shrink-0 flex-col border-r border-solid border-oc-border bg-oc-background md:flex">
      <nav
        aria-label="Documentation navigation"
        className="min-h-0 flex-1 overflow-y-auto px-3 py-4"
      >
        <NavGroup label="Guides" items={DOC_GUIDES} pathname={pathname} />
        <GroupedNav
          label="Components & Blocks"
          groups={DOC_BLOCK_GROUPS}
          pathname={pathname}
        />
        <GroupedNav
          label="Base Components"
          groups={DOC_BASE_GROUPS}
          pathname={pathname}
        />
      </nav>
    </aside>
  );
}

export { DocSidebar };
