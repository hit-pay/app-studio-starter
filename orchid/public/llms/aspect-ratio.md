<!-- Generated from content/docs/components/aspect-ratio.mdx. Do not edit. -->

# Aspect Ratio

shadcn-compatible box that keeps a width/height ratio, such as 16/9.

## Example

```tsx
import { AspectRatio } from '@/components/ui/aspect-ratio'

function AspectRatioDemo() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          16 / 9
        </p>
        <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg bg-oc-muted">
          <div className="absolute inset-0 flex items-center justify-center text-sm text-oc-muted-foreground">
            Menu photo
          </div>
        </AspectRatio>
      </div>
      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          1 / 1
        </p>
        <AspectRatio ratio={1} className="overflow-hidden rounded-lg bg-oc-muted">
          <div className="absolute inset-0 flex items-center justify-center text-sm text-oc-muted-foreground">
            Logo
          </div>
        </AspectRatio>
      </div>
    </div>
  )
}

export { AspectRatioDemo }
```

## Usage

```tsx
import { AspectRatio } from '@/components/ui/aspect-ratio'

<AspectRatio ratio={16 / 9}>
  <img src="/menu.jpg" alt="" className="absolute inset-0 size-full object-cover" />
</AspectRatio>
```

`ratio` is width ÷ height (`16/9`, `4/3`, `1`).
