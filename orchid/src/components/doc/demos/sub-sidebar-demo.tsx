import { useState } from 'react'

import { SubSidebar } from '@/components/ui/sub-sidebar'

const items = [
  { id: 'general', label: 'General settings' },
  { id: 'tracking', label: 'Tracking tools' },
  { id: 'seo', label: 'SEO' },
  { id: 'currency', label: 'Multi-currency converter' },
  { id: 'tax', label: 'Tax settings' },
  { id: 'labels', label: 'Button labels' },
  { id: 'payments', label: 'Payment methods' },
]

function SubSidebarDemo() {
  const [active, setActive] = useState('general')

  return (
    <div className="h-120 overflow-hidden rounded-lg border border-oc-border">
      <SubSidebar
        items={items}
        activeItem={active}
        onItemChange={setActive}
      />
    </div>
  )
}

export { SubSidebarDemo }
