import { useNavigate, useRouterState } from '@tanstack/react-router'
import {
  SubSidebar,
  SubSidebarContent,
  SubSidebarGroup,
  SubSidebarGroupLabel,
  SubSidebarItem,
} from '@/components/ui/sub-sidebar'

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
    <SubSidebarGroup>
      <SubSidebarGroupLabel>{label}</SubSidebarGroupLabel>
      <div className="flex flex-col">
        {items.map((item) => (
          <SubSidebarItem
            key={item.to}
            href={item.to}
            active={pathname === item.to}
            onClick={(event) => {
              event.preventDefault()
              void navigate({ to: item.to })
            }}
          >
            {item.name}
          </SubSidebarItem>
        ))}
      </div>
    </SubSidebarGroup>
  )
}

function DocSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  if (pathname === '/') return null

  return (
    <SubSidebar className="hidden w-56 md:flex">
      <SubSidebarContent>
        <NavGroup label="Guides" items={DOC_GUIDES} pathname={pathname} />
        <NavGroup label="Component" items={docComponentsByName()} pathname={pathname} />
        <NavGroup label="Form" items={docFormsByName()} pathname={pathname} />
        <NavGroup label="Block" items={docBlocksByName()} pathname={pathname} />
      </SubSidebarContent>
    </SubSidebar>
  )
}

export { DocSidebar }
