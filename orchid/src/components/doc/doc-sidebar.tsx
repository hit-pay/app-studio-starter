import { useNavigate, useRouterState } from '@tanstack/react-router'
import { ClickableOption, ClickableOptionGroup } from '@/components/ui/clickable-option'

import { DOC_GUIDES, docBlocksByName, docComponentsByName } from './doc-components'

function DocSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const navigate = useNavigate()

  if (pathname === '/') return null

  return (
    <aside className="hidden h-full w-56 shrink-0 flex-col overflow-y-auto border-r border-solid border-oc-border bg-oc-background md:flex">
      <nav className="flex flex-col gap-6 px-3 pt-4 pb-4">
        <div>
          <p className="px-1 pb-2 text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Guides
          </p>
          <ClickableOptionGroup
            alignment="Vertical"
            value={pathname}
            onValueChange={(value) => {
              if (value) void navigate({ to: value })
            }}
            className="gap-2"
          >
            {DOC_GUIDES.map((item) => (
              <ClickableOption
                key={item.to}
                value={item.to}
                title={item.name}
                alignment="Left"
                className="px-3 py-2"
              />
            ))}
          </ClickableOptionGroup>
        </div>
        <div>
          <p className="px-1 pb-2 text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Components
          </p>
          <ClickableOptionGroup
            alignment="Vertical"
            value={pathname}
            onValueChange={(value) => {
              if (value) void navigate({ to: value })
            }}
            className="gap-2"
          >
            {docComponentsByName().map((item) => (
              <ClickableOption
                key={item.to}
                value={item.to}
                title={item.name}
                alignment="Left"
                className="px-3 py-2"
              />
            ))}
          </ClickableOptionGroup>
        </div>
        <div>
          <p className="px-1 pb-2 text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Block
          </p>
          <ClickableOptionGroup
            alignment="Vertical"
            value={pathname}
            onValueChange={(value) => {
              if (value) void navigate({ to: value })
            }}
            className="gap-2"
          >
            {docBlocksByName().map((item) => (
              <ClickableOption
                key={item.to}
                value={item.to}
                title={item.name}
                alignment="Left"
                className="px-3 py-2"
              />
            ))}
          </ClickableOptionGroup>
        </div>
      </nav>
    </aside>
  )
}

export { DocSidebar }
