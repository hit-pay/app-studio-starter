<!-- Generated from content/docs/components/button.mdx. Do not edit. -->

# Button

Standard variants, sizes, icon buttons, native props, and polymorphic rendering.

## Example

```tsx
import {
  ArrowRightUpRegular,
  CircleDashRegular,
  AddRegular,
  Delete2Regular,
} from '@mingcute/react/core-regular'

import { Button } from '@/components/ui/button'

const VARIANTS = ['default', 'outline', 'secondary', 'ghost', 'destructive', 'link'] as const
const SIZES = ['xs', 'sm', 'default', 'lg'] as const
const ICON_SIZES = ['icon-xs', 'icon-sm', 'icon', 'icon-lg'] as const

function ButtonDemo() {
  return (
    <>
      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          shadcn-compatible variants
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {VARIANTS.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant === 'destructive' ? <Delete2Regular data-icon="inline-start" /> : null}
              {variant}
            </Button>
          ))}
        </div>
      </div>

      <div id="sizes" className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Size
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {SIZES.map((size) => (
            <Button key={size} size={size}>
              <CircleDashRegular data-icon="inline-start" />
              {size}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Icon size
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {ICON_SIZES.map((size) => (
            <Button key={size} size={size} aria-label={`Add with ${size} button`}>
              <AddRegular />
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Render as link
        </p>
        <Button variant="outline" render={<a href="#sizes" />}>
          Review sizes
          <ArrowRightUpRegular data-icon="inline-end" />
        </Button>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Disabled
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button disabled>Default</Button>
          <Button variant="outline" disabled>
            Outline
          </Button>
          <Button variant="destructive" disabled>
            Destructive
          </Button>
        </div>
      </div>
    </>
  )
}

export { ButtonDemo }
```

## Usage

```tsx
import { Button } from '@/components/ui/button'
import { AddRegular } from '@mingcute/react/core-regular'

<Button>Create invoice</Button>
<Button variant="outline">View details</Button>
<Button variant="secondary">Save draft</Button>
<Button variant="ghost">Cancel</Button>
<Button variant="destructive">Refund</Button>
<Button variant="link">View documentation</Button>

<Button size="icon" aria-label="Create invoice">
  <AddRegular />
</Button>

<Button render={<a href="/invoices" />}>
  View invoices
</Button>
```
