import type { ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const avatarVariants = cva(
  'inline-flex shrink-0 items-center justify-center overflow-clip rounded-full border border-solid border-neutral-border font-bold select-none',
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
      type: {
        Default: 'bg-neutral-strong text-primary-foreground',
        Business: 'bg-primary text-primary-foreground',
        Image: 'bg-neutral-soft text-muted-foreground',
      },
    },
    defaultVariants: {
      size: 32,
      type: 'Default',
    },
  },
)

type AvatarSize = 24 | 28 | 32 | 40 | 48 | 64

function Avatar({
  className,
  size = 32,
  type = 'Default',
  src,
  alt = '',
  children = 'H',
  ...props
}: Omit<ComponentProps<'div'>, 'children'> &
  VariantProps<typeof avatarVariants> & {
    size?: AvatarSize
    type?: 'Default' | 'Business' | 'Image'
    src?: string
    alt?: string
    children?: string
  }) {
  const showImage = Boolean(src) || type === 'Image'

  return (
    <div
      data-slot="avatar"
      data-size={size}
      data-type={type}
      className={cn(avatarVariants({ size, type: showImage && src ? 'Image' : type }), className)}
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
