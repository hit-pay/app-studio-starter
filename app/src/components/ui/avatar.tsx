import type { ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const avatarVariants = cva(
  'inline-flex shrink-0 items-center justify-center overflow-clip rounded-full border border-solid border-oc-neutral-border font-bold select-none',
  {
    variants: {
      size: {
        24: 'size-6 text-xs leading-none',
        28: 'size-7 text-xs leading-none',
        32: 'size-8 text-base leading-none',
        40: 'size-10 text-lg leading-none',
        48: 'size-12 text-xl leading-none',
        64: 'size-16 text-[30px] leading-none',
      },
      variant: {
        Default: 'bg-oc-neutral-strong text-oc-primary-foreground',
        Business: 'bg-oc-primary text-oc-primary-foreground',
        Image: 'bg-oc-neutral-soft text-oc-muted-foreground',
      },
    },
    defaultVariants: {
      size: 32,
      variant: 'Default',
    },
  },
)

type AvatarSize = 24 | 28 | 32 | 40 | 48 | 64

function Avatar({
  className,
  size = 32,
  variant = 'Default',
  src,
  alt = '',
  children = 'H',
  ...props
}: Omit<ComponentProps<'div'>, 'children'> &
  VariantProps<typeof avatarVariants> & {
    size?: AvatarSize
    variant?: 'Default' | 'Business' | 'Image'
    src?: string
    alt?: string
    children?: string
  }) {
  const showImage = Boolean(src) || variant === 'Image'

  return (
    <div
      data-slot="avatar"
      data-size={size}
      data-variant={variant}
      className={cn(avatarVariants({ size, variant: showImage && src ? 'Image' : variant }), className)}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt} className="size-full object-cover" />
      ) : (
        children
      )}
    </div>
  )
}

export { Avatar, avatarVariants }
export type { AvatarSize }
