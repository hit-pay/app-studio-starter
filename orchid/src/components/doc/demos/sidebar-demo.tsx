import { useState } from 'react'
import {
  BarChart3Icon,
  ClipboardListIcon,
  LayoutGridIcon,
  PackageIcon,
  SettingsIcon,
  ShoppingBagIcon,
  UsersIcon,
} from 'lucide-react'

import {
  Sidebar,
  type SidebarGroupConfig,
} from '@/components/ui/sidebar'

const groups: SidebarGroupConfig[] = [
  {
    id: 'commerce',
    items: [
      { id: 'web-pos', label: 'Web POS', icon: 'pos', href: '#web-pos' },
      { id: 'orders', label: 'Orders', icon: 'orders', href: '#orders' },
      { id: 'reports', label: 'Reports', icon: 'reports', href: '#reports' },
      { id: 'customers', label: 'Customers', icon: 'customers', href: '#customers' },
      {
        id: 'products',
        label: 'Products',
        icon: 'products',
        childrenMode: 'inline',
        items: [
          { id: 'all-products', label: 'All products', href: '#all-products' },
          { id: 'collections', label: 'Collections', href: '#collections' },
          { id: 'inventory', label: 'Inventory', href: '#inventory' },
        ],
      },
    ],
  },
  {
    id: 'others',
    label: 'Others',
    items: [
      {
        id: 'settings',
        label: 'Settings',
        icon: 'settings',
        childrenMode: 'sub-sidebar',
        items: [
          { id: 'general', label: 'General', href: '#general' },
          { id: 'payments', label: 'Payments', href: '#payments' },
          { id: 'notifications', label: 'Notifications', href: '#notifications' },
        ],
      },
    ],
  },
]

const icons = {
  pos: LayoutGridIcon,
  orders: ClipboardListIcon,
  reports: BarChart3Icon,
  customers: UsersIcon,
  products: ShoppingBagIcon,
  settings: SettingsIcon,
}

function SidebarDemo() {
  const [activeItem, setActiveItem] = useState('products')
  const [activeSubItem, setActiveSubItem] = useState('all-products')

  return (
    <div className="flex h-160 min-h-0 overflow-x-auto rounded-lg border border-oc-border">
      <Sidebar
        header="Commerce"
        groups={groups}
        icons={icons}
        activeItem={activeItem}
        activeSubItem={activeSubItem}
        onItemChange={(id, item) => {
          setActiveItem(id)
          if (item.items?.length) setActiveSubItem(item.items[0]!.id)
        }}
        onSubItemChange={setActiveSubItem}
        onSubSidebarClose={() => setActiveItem('')}
        footer={
          <div className="flex min-w-0 items-center gap-2">
            <span className="grid size-8 shrink-0 place-items-center rounded bg-oc-primary text-oc-primary-foreground">
              <PackageIcon className="size-4" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-xs font-medium">My Store</span>
              <span className="block truncate text-xs text-oc-muted-foreground">Custom footer</span>
            </span>
          </div>
        }
      />
      <div className="grid min-w-80 flex-1 place-items-center bg-oc-background text-sm text-oc-muted-foreground">
        Application content
      </div>
    </div>
  )
}

export { SidebarDemo }
