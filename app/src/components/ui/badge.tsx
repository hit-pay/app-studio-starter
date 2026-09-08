import type { ComponentProps } from 'react'
import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cva } from 'class-variance-authority'
import { CloseCircleRegular } from '@mingcute/react/core-regular'

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

const VARIANT_SHORTCUT: Record<
  'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link',
  { tone: BadgeTone; appearance: BadgeAppearance }
> = {
  default: { tone: 'blue', appearance: 'soft' },
  secondary: { tone: 'grey', appearance: 'soft' },
  destructive: { tone: 'red', appearance: 'soft' },
  outline: { tone: 'grey', appearance: 'outline' },
  ghost: { tone: 'grey', appearance: 'ghost' },
  link: { tone: 'blue', appearance: 'ghost' },
}

const badgeVariants = cva(
  'group/badge inline-flex min-h-6 w-fit min-w-8 shrink-0 items-center justify-center gap-1 overflow-visible rounded-full border border-transparent px-2 py-0.5 text-center text-xs leading-4 font-medium whitespace-nowrap transition-all focus-visible:border-oc-primary focus-visible:ring-3 focus-visible:ring-oc-info-border/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-oc-destructive aria-invalid:ring-oc-destructive-border/50 [&>svg]:pointer-events-none [&>svg]:size-3 [&>svg]:shrink-0',
  {
    variants: {
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
      tone: 'blue',
      appearance: 'soft',
    },
  },
)

type BadgeVariant = keyof typeof VARIANT_SHORTCUT

function Badge({
  className,
  variant = 'default',
  tone,
  appearance,
  render,
  ...props
}: useRender.ComponentProps<'span'> & {
  variant?: BadgeVariant
  tone?: BadgeTone
  appearance?: BadgeAppearance
}) {
  const shortcut = VARIANT_SHORTCUT[variant]
  const resolvedTone = tone ?? shortcut.tone
  const resolvedAppearance = appearance ?? (tone ? 'soft' : shortcut.appearance)

  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      {
        className: cn(
          badgeVariants({
            tone: resolvedTone,
            appearance: resolvedAppearance,
          }),
          variant === 'link' && !tone && 'underline-offset-4 hover:underline',
          className,
        ),
      },
      props,
    ),
    render,
    state: {
      slot: 'badge',
      variant,
      tone: resolvedTone,
      appearance: resolvedAppearance,
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
      {children ?? <CloseCircleRegular className="size-4.5" />}
    </button>
  )
}

const USER_ROLE: Record<'owner' | 'admin' | 'manager' | 'cashier', BadgeTone> = {
  owner: 'blue',
  admin: 'purple',
  manager: 'dark-blue',
  cashier: 'green',
}

const USER_ROLE_LABEL: Record<keyof typeof USER_ROLE, string> = {
  owner: 'Owner',
  admin: 'Admin',
  manager: 'Manager',
  cashier: 'Cashier',
}

function UserBadge({
  role = 'owner',
  className,
  ...props
}: Omit<ComponentProps<typeof Badge>, 'variant' | 'tone' | 'appearance' | 'children'> & {
  role?: 'owner' | 'admin' | 'manager' | 'cashier'
}) {
  return (
    <Badge tone={USER_ROLE[role]} className={className} {...props}>
      {USER_ROLE_LABEL[role]}
    </Badge>
  )
}

export { Badge, BadgeRemove, UserBadge, badgeVariants }
export type { BadgeAppearance, BadgeColor, BadgeTone }
