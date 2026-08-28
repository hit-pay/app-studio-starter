import { createFileRoute, Link } from '@tanstack/react-router'

import { DocExamplePage } from '@/components/doc/doc-example-page'
import {
  SubSidebar,
  SubSidebarContent,
  SubSidebarGroup,
  SubSidebarGroupLabel,
  SubSidebarHeader,
  SubSidebarItem,
} from '@/components/ui/sub-sidebar'

export const Route = createFileRoute('/sub-sidebar')({
  component: SubSidebarExamplesPage,
})

const GROUPS = [
  {
    label: 'Account',
    items: ['Business Details', 'Account Verification', 'Bank Accounts'],
  },
  {
    label: 'Team',
    items: ['Staff', 'Audit Logs'],
  },
  {
    label: 'Online Store',
    items: ['Store Settings'],
  },
  {
    label: 'Branding',
    items: ['Checkout Customisation', 'Order Form Customisation'],
  },
  {
    label: 'Communications',
    items: ['Email Templates', 'Notifications'],
  },
]

function SubSidebarExamplesPage() {
  return (
    <DocExamplePage
      to="/sub-sidebar"
      usage={`import {
  SubSidebar,
  SubSidebarContent,
  SubSidebarGroup,
  SubSidebarGroupLabel,
  SubSidebarHeader,
  SubSidebarItem,
} from '@/components/ui/sub-sidebar'

<SubSidebar>
  <SubSidebarHeader>Settings</SubSidebarHeader>
  <SubSidebarContent>
    <SubSidebarGroup>
      <SubSidebarGroupLabel>Account</SubSidebarGroupLabel>
      <SubSidebarItem href="/business-details">Business Details</SubSidebarItem>
      <SubSidebarItem href="/account-verification" active>
        Account Verification
      </SubSidebarItem>
    </SubSidebarGroup>
  </SubSidebarContent>
</SubSidebar>`}
    >
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Settings navigation
        </p>
        <div className="h-160 overflow-hidden rounded-lg border border-solid border-oc-border">
          <SubSidebar>
            <SubSidebarHeader render={<Link to="/" />}>Settings</SubSidebarHeader>
            <SubSidebarContent>
              {GROUPS.map((group) => (
                <SubSidebarGroup key={group.label}>
                  <SubSidebarGroupLabel>{group.label}</SubSidebarGroupLabel>
                  {group.items.map((item) => (
                    <SubSidebarItem
                      key={item}
                      href={`#${item.toLowerCase().replaceAll(' ', '-')}`}
                      active={item === 'Checkout Customisation'}
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
    </DocExamplePage>
  )
}
