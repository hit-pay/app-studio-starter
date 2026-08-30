import { Link, useRouterState } from "@tanstack/react-router";

import {
  DOC_GUIDES,
  docBlocksByName,
  docComponentsByName,
  docFormsByName,
} from "./doc-components";

function NavGroup({
  label,
  items,
  pathname,
}: {
  label: string;
  items: readonly {
    to: string;
    name: string;
    children?: readonly { to: string; name: string }[];
  }[];
  pathname: string;
}) {
  return (
    <div className="mb-5 flex min-w-0 flex-col last:mb-0">
      <div className="mb-1 px-2 text-[10px] leading-5 font-medium tracking-[0.16em] text-oc-muted-foreground uppercase">
        {label}
      </div>
      <div className="flex flex-col">
        {items.map((item) => (
          <div key={item.to}>
            <Link
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
            {item.children ? (
              <div className="ml-3 border-l border-solid border-oc-border pl-2">
                {item.children.map((child) => (
                  <Link
                    key={child.to}
                    to={child.to}
                    aria-current={pathname === child.to ? "page" : undefined}
                    className={[
                      "flex min-h-8 items-center rounded px-2 py-1.5 text-sm text-oc-muted-foreground outline-none",
                      "hover:bg-oc-neutral hover:text-oc-foreground focus-visible:ring-2 focus-visible:ring-oc-ring",
                      pathname === child.to
                        ? "bg-oc-neutral font-medium text-oc-primary"
                        : "",
                    ].join(" ")}
                  >
                    {child.name}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function DocSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (pathname === "/") return null;

  return (
    <aside className="hidden h-full w-56 shrink-0 flex-col border-r border-solid border-oc-border bg-oc-background md:flex">
      <nav
        aria-label="Documentation navigation"
        className="min-h-0 flex-1 overflow-y-auto px-3 py-4"
      >
        <NavGroup label="Guides" items={DOC_GUIDES} pathname={pathname} />
        <NavGroup
          label="Component"
          items={docComponentsByName()}
          pathname={pathname}
        />
        <NavGroup label="Form" items={docFormsByName()} pathname={pathname} />
        <NavGroup label="Block" items={docBlocksByName()} pathname={pathname} />
      </nav>
    </aside>
  );
}

export { DocSidebar };
