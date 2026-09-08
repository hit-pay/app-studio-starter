import type { ComponentProps, CSSProperties } from 'react'

import { cn } from '@/lib/utils'

function AspectRatio({
  ratio,
  className,
  style,
  ...props
}: ComponentProps<'div'> & { ratio: number }) {
  return (
    <div
      data-slot="aspect-ratio"
      style={{ '--ratio': ratio, ...style } as CSSProperties}
      className={cn('relative w-full [aspect-ratio:var(--ratio)]', className)}
      {...props}
    />
  )
}

export { AspectRatio }
