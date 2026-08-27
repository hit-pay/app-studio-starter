import type { ComponentProps } from 'react'
import { Loader2Icon } from 'lucide-react'

import { cn } from '@/lib/utils'

/**
 * Indeterminate loading. Use for a submit/refresh in progress.
 * Use Skeleton for a layout placeholder, Progress for a known percent.
 */
function Spinner({
  className,
  size = 'Default',
  label = 'Loading',
  ...props
}: Omit<ComponentProps<'span'>, 'children'> & {
  size?: 'Small' | 'Default' | 'Big'
  label?: string
}) {
  return (
    <span
      data-slot="spinner"
      data-size={size}
      role="status"
      aria-label={label}
      className={cn('inline-flex shrink-0 items-center justify-center text-current', className)}
      {...props}
    >
      <Loader2Icon
        aria-hidden
        className={cn(
          'animate-spin',
          size === 'Small' && 'size-4',
          size === 'Default' && 'size-5',
          size === 'Big' && 'size-8',
        )}
      />
    </span>
  )
}

export { Spinner }
