import { useState, type ComponentType } from 'react'
import {
  BarChart3Icon,
  CalendarDaysIcon,
  CirclePercentIcon,
  ClipboardListIcon,
  CreditCardIcon,
  FileTextIcon,
  GlobeIcon,
  ImageIcon,
  LayoutGridIcon,
  MapPinIcon,
  MonitorIcon,
  PaintbrushIcon,
  SettingsIcon,
  ShoppingBagIcon,
  StoreIcon,
  TicketCheckIcon,
  TruckIcon,
  UsersIcon,
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarItem,
  SidebarSubmenuIndicator,
} from '@/components/ui/sidebar'

type NavigationItem = {
  id: string
  label: string
  icon: ComponentType
  submenu?: boolean
}

const groups: Array<{ label?: string; items: NavigationItem[] }> = [
  {
    items: [
      { id: 'web-pos', label: 'Web POS', icon: LayoutGridIcon },
      { id: 'orders', label: 'Orders', icon: ClipboardListIcon },
      { id: 'reports', label: 'Reports', icon: BarChart3Icon },
      { id: 'customers', label: 'Customers', icon: UsersIcon },
      { id: 'products', label: 'Products', icon: ShoppingBagIcon },
    ],
  },
  {
    label: 'Marketing',
    items: [{ id: 'discounts', label: 'Discounts', icon: CirclePercentIcon }],
  },
  {
    label: 'Point of sale',
    items: [
      { id: 'terminals', label: 'Card Terminals', icon: CreditCardIcon },
      { id: 'mall', label: 'Mall GTO Integrations', icon: StoreIcon },
    ],
  },
  {
    label: 'Online store',
    items: [
      { id: 'overview', label: 'Store Overview', icon: MonitorIcon },
      { id: 'design', label: 'Store Design', icon: PaintbrushIcon },
      { id: 'pages', label: 'Pages', icon: FileTextIcon },
      { id: 'media', label: 'Media', icon: ImageIcon },
      { id: 'coupons', label: 'Coupons', icon: TicketCheckIcon },
      { id: 'booking', label: 'Booking', icon: CalendarDaysIcon },
      { id: 'domain', label: 'Domain', icon: GlobeIcon },
      { id: 'shipping', label: 'Shipping & Pickup', icon: TruckIcon },
    ],
  },
  {
    label: 'Others',
    items: [
      { id: 'locations', label: 'Locations', icon: MapPinIcon },
      { id: 'settings', label: 'Settings', icon: SettingsIcon, submenu: true },
    ],
  },
]

function SidebarDemo() {
  const [active, setActive] = useState('orders')

  return (
    <div className="flex h-180 min-h-0">
      <Sidebar>
        <SidebarHeader>Commerce</SidebarHeader>
        <SidebarContent>
          {groups.map((group, index) => (
            <SidebarGroup key={group.label ?? index}>
              {group.label ? <SidebarGroupLabel>{group.label}</SidebarGroupLabel> : null}
              {group.items.map((item) => {
                const Icon = item.icon

                return (
                  <SidebarItem
                    key={item.id}
                    href={`#${item.id}`}
                    icon={<Icon />}
                    active={active === item.id}
                    trailing={item.submenu ? <SidebarSubmenuIndicator /> : undefined}
                    onClick={(event) => {
                      event.preventDefault()
                      setActive(item.id)
                    }}
                  >
                    {item.label}
                  </SidebarItem>
                )
              })}
            </SidebarGroup>
          ))}
        </SidebarContent>
      </Sidebar>
    </div>
  )
}

export { SidebarDemo }
