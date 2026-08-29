import type { ComponentProps } from 'react'
import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cva, type VariantProps } from 'class-variance-authority'
import { XCircleIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

type BadgeTone =
  | 'blue'
  | 'purple'
  | 'orange'
  | 'red'
  | 'light-red'
  | 'white'
  | 'dark-blue'
  | 'grey'
  | 'tosca'
  | 'green'

type BadgeAppearance = 'soft' | 'outline' | 'ghost'

type BadgeColor =
  | 'Blue'
  | 'Purple'
  | 'Orange'
  | 'Red'
  | 'LightRed'
  | 'White'
  | 'DarkBlue'
  | 'Grey'
  | 'Tosca'
  | 'Green'

const badgeVariants = cva(
  'group/badge inline-flex min-h-6 w-fit min-w-8 shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-center text-xs leading-normal font-medium whitespace-nowrap transition-all focus-visible:border-oc-primary focus-visible:ring-3 focus-visible:ring-oc-info-border/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-oc-destructive aria-invalid:ring-oc-destructive-border/50 [&>svg]:pointer-events-none [&>svg]:size-3 [&>svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-oc-info-soft text-oc-primary [a]:hover:bg-oc-info-border',
        secondary:
          'bg-oc-neutral-soft text-oc-neutral-strong [a]:hover:bg-oc-neutral',
        destructive:
          'bg-oc-destructive-soft text-oc-destructive-strong [a]:hover:bg-oc-destructive-border',
        outline:
          'border-oc-border bg-oc-background text-oc-foreground [a]:hover:bg-oc-neutral',
        ghost:
          'min-w-0 bg-transparent px-0 text-oc-foreground hover:text-oc-muted-foreground',
        link: 'min-w-0 border-0 px-0 text-oc-primary underline-offset-4 hover:underline',
      },
      tone: {
        blue: 'text-oc-primary',
        purple: 'text-oc-purple',
        orange: 'text-oc-warning-strong',
        red: 'text-oc-destructive-strong',
        'light-red': 'text-oc-light-red',
        white: 'text-oc-muted-foreground',
        'dark-blue': 'text-oc-dark-blue',
        grey: 'text-oc-neutral-strong',
        tosca: 'text-oc-tosca',
        green: 'text-oc-success-strong',
      },
      appearance: {
        soft: 'px-2',
        outline: 'border-solid bg-oc-background px-2',
        ghost: 'min-w-0 bg-transparent px-0',
      },
    },
    compoundVariants: [
      { tone: 'blue', appearance: 'soft', class: 'bg-oc-info-soft' },
      { tone: 'blue', appearance: 'outline', class: 'border-oc-primary-300' },
      { tone: 'purple', appearance: 'soft', class: 'bg-oc-purple-soft' },
      { tone: 'purple', appearance: 'outline', class: 'border-oc-purple-border' },
      { tone: 'orange', appearance: 'soft', class: 'bg-oc-warning-soft' },
      { tone: 'orange', appearance: 'outline', class: 'border-oc-warning-chip-border' },
      { tone: 'red', appearance: 'soft', class: 'bg-oc-destructive-soft' },
      { tone: 'red', appearance: 'outline', class: 'border-oc-destructive-border' },
      { tone: 'light-red', appearance: 'soft', class: 'bg-oc-light-red-soft' },
      { tone: 'light-red', appearance: 'outline', class: 'border-oc-light-red-border' },
      {
        tone: 'white',
        appearance: 'soft',
        class: 'border-oc-border bg-oc-background',
      },
      { tone: 'white', appearance: 'outline', class: 'border-oc-neutral-border' },
      { tone: 'dark-blue', appearance: 'soft', class: 'bg-oc-dark-blue-soft' },
      { tone: 'dark-blue', appearance: 'outline', class: 'border-oc-dark-blue-border' },
      { tone: 'grey', appearance: 'soft', class: 'bg-oc-neutral-soft' },
      { tone: 'grey', appearance: 'outline', class: 'border-oc-neutral-border' },
      { tone: 'tosca', appearance: 'soft', class: 'bg-oc-tosca-soft' },
      { tone: 'tosca', appearance: 'outline', class: 'border-oc-tosca-border' },
      { tone: 'green', appearance: 'soft', class: 'bg-oc-success-soft' },
      { tone: 'green', appearance: 'outline', class: 'border-oc-success-chip-border' },
    ],
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Badge({
  className,
  variant = 'default',
  tone,
  appearance = 'soft',
  render,
  ...props
}: useRender.ComponentProps<'span'> & {
  variant?: VariantProps<typeof badgeVariants>['variant']
  tone?: BadgeTone
  appearance?: BadgeAppearance
}) {
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      {
        className: cn(
          badgeVariants({
            variant: tone ? null : variant,
            tone,
            appearance: tone ? appearance : null,
          }),
          className,
        ),
      },
      props,
    ),
    render,
    state: {
      slot: 'badge',
      variant,
      tone,
      appearance: tone ? appearance : undefined,
    },
  })
}

function BadgeRemove({
  className,
  children,
  ...props
}: ComponentProps<'button'>) {
  return (
    <button
      type="button"
      data-slot="badge-remove"
      aria-label="Remove"
      className={cn(
        '-mr-0.5 inline-flex size-4.5 cursor-pointer items-center justify-center text-current outline-none',
        className,
      )}
      {...props}
    >
      {children ?? <XCircleIcon className="size-4.5" />}
    </button>
  )
}

const USER_ROLE: Record<'Owner' | 'Admin' | 'Manager' | 'Cashier', BadgeTone> = {
  Owner: 'blue',
  Admin: 'purple',
  Manager: 'dark-blue',
  Cashier: 'green',
}

function UserBadge({
  role = 'Owner',
  className,
  ...props
}: Omit<ComponentProps<typeof Badge>, 'variant' | 'tone' | 'appearance' | 'children'> & {
  role?: 'Owner' | 'Admin' | 'Manager' | 'Cashier'
}) {
  return (
    <Badge tone={USER_ROLE[role]} className={className} {...props}>
      {role}
    </Badge>
  )
}

export { Badge, BadgeRemove, UserBadge, badgeVariants }
export type { BadgeAppearance, BadgeColor, BadgeTone }
