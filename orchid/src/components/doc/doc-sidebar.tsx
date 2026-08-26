import { useNavigate, useRouterState } from '@tanstack/react-router'
import { ClickableOption, ClickableOptionGroup } from '@/components/ui/clickable-option'

import {
  DOC_GUIDES,
  docBlocksByName,
  docComponentsByName,
  docFormsByName,
} from './doc-components'

function NavGroup({
  label,
  items,
  pathname,
}: {
  label: string
  items: readonly { to: string; name: string }[]
  pathname: string
}) {
  const navigate = useNavigate()

  return (
    <div>
      <p className="px-1 pb-2 text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
        {label}
      </p>
      <ClickableOptionGroup
        alignment="Vertical"
        value={pathname}
        onValueChange={(value) => {
          if (value) void navigate({ to: value })
        }}
        className="gap-2"
      >
        {items.map((item) => (
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
  )
}

function DocSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  if (pathname === '/') return null

  return (
    <aside className="hidden h-full w-56 shrink-0 flex-col overflow-y-auto border-r border-solid border-oc-border bg-oc-background md:flex">
      <nav className="flex flex-col gap-6 px-3 pt-4 pb-4">
        <NavGroup label="Guides" items={DOC_GUIDES} pathname={pathname} />
        <NavGroup label="Component" items={docComponentsByName()} pathname={pathname} />
        <NavGroup label="Form" items={docFormsByName()} pathname={pathname} />
        <NavGroup label="Blok" items={docBlocksByName()} pathname={pathname} />
      </nav>
    </aside>
  )
}

export { DocSidebar }
