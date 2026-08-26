import { useNavigate, useRouterState } from '@tanstack/react-router'
import { ClickableOption, ClickableOptionGroup } from '@/components/ui/clickable-option'

import { docComponentsByName } from './doc-components'

function DocSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const navigate = useNavigate()

  if (pathname === '/') return null

  return (
    <aside className="hidden h-full w-56 shrink-0 flex-col overflow-y-auto border-r border-solid border-border bg-background md:flex">
      <p className="sticky top-0 bg-background px-4 pt-4 pb-2 text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
        Components
      </p>
      <nav className="px-3 pb-4">
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
      </nav>
    </aside>
  )
}

export { DocSidebar }
