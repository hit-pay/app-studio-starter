<!-- Generated from content/docs/components/sub-sidebar.mdx. Do not edit. -->

# Sub Sidebar

JSON-configured flat child navigation with a blue active state.

## Example

```tsx
import { useState } from 'react'

import { SubSidebar } from '@/components/navigation/sub-sidebar'

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
```

Sub Sidebar is configured through one JSON-compatible `items` array. It does not export item or content primitives. `AppStudioLayout` composes it automatically when using sidebar mode.
