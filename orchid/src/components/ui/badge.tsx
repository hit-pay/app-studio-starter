import { useState, type ComponentProps, type ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { XCircleIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex min-h-6 min-w-8 shrink-0 items-center justify-center gap-2 rounded-full py-0.5 text-center text-xs font-medium leading-[1.5] whitespace-nowrap [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4',
  {
    variants: {
      color: {
        Blue: 'text-oc-primary',
        Purple: 'text-oc-purple',
        Orange: 'text-oc-warning-strong',
        Red: 'text-oc-destructive-strong',
        LightRed: 'text-oc-light-red',
        White: 'text-oc-muted-foreground',
        DarkBlue: 'text-oc-dark-blue',
        Grey: 'text-oc-neutral-strong',
        Tosca: 'text-oc-tosca',
        Green: 'text-oc-success-strong',
      },
      type: {
        Background: 'px-2',
        Border: 'border border-solid bg-oc-background px-2',
        Transparent: 'bg-transparent px-0',
      },
    },
    compoundVariants: [
      { color: 'Blue', type: 'Background', class: 'bg-oc-info-soft' },
      { color: 'Blue', type: 'Border', class: 'border-oc-primary-300' },
      { color: 'Purple', type: 'Background', class: 'bg-oc-purple-soft' },
      { color: 'Purple', type: 'Border', class: 'border-oc-purple-border' },
      { color: 'Orange', type: 'Background', class: 'bg-oc-warning-soft' },
      { color: 'Orange', type: 'Border', class: 'border-oc-warning-chip-border' },
      { color: 'Red', type: 'Background', class: 'bg-oc-destructive-soft' },
      { color: 'Red', type: 'Border', class: 'border-oc-destructive-border' },
      { color: 'LightRed', type: 'Background', class: 'bg-oc-light-red-soft' },
      { color: 'LightRed', type: 'Border', class: 'border-oc-light-red-border' },
      { color: 'White', type: 'Background', class: 'border border-solid border-oc-border bg-oc-background' },
      { color: 'White', type: 'Border', class: 'border-oc-neutral-border' },
      { color: 'DarkBlue', type: 'Background', class: 'bg-oc-dark-blue-soft' },
      { color: 'DarkBlue', type: 'Border', class: 'border-oc-dark-blue-border' },
      { color: 'Grey', type: 'Background', class: 'bg-oc-neutral-soft' },
      { color: 'Grey', type: 'Border', class: 'border-oc-neutral-border' },
      { color: 'Tosca', type: 'Background', class: 'bg-oc-tosca-soft' },
      { color: 'Tosca', type: 'Border', class: 'border-oc-tosca-border' },
      { color: 'Green', type: 'Background', class: 'bg-oc-success-soft' },
      { color: 'Green', type: 'Border', class: 'border-oc-success-chip-border' },
    ],
    defaultVariants: {
      color: 'Blue',
      type: 'Background',
    },
  },
)

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

function Badge({
  className,
  color = 'Blue',
  type = 'Background',
  icon,
  closable = false,
  onRemove,
  children,
  ...props
}: Omit<ComponentProps<'span'>, 'color'> &
  VariantProps<typeof badgeVariants> & {
    color?: BadgeColor
    type?: 'Background' | 'Transparent' | 'Border'
    icon?: ReactNode
    closable?: boolean
    onRemove?: () => void
  }) {
  const canRemove = closable || onRemove != null
  const [open, setOpen] = useState(true)

  if (!open) return null

  return (
    <span
      data-slot="badge"
      data-color={color}
      data-type={type}
      className={cn(badgeVariants({ color, type }), className)}
      {...props}
    >
      {icon}
      {children}
      {canRemove ? (
        <button
          type="button"
          data-slot="badge-remove"
          aria-label="Remove"
          onPointerDown={(event) => {
            event.preventDefault()
            event.stopPropagation()
          }}
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
            setOpen(false)
            onRemove?.()
          }}
          className="-mr-0.5 inline-flex size-4.5 cursor-pointer items-center justify-center text-current outline-none"
        >
          <XCircleIcon className="size-4.5" />
        </button>
      ) : null}
    </span>
  )
}

const USER_CHIP: Record<
  'Owner' | 'Admin' | 'Manager' | 'Cashier',
  NonNullable<VariantProps<typeof badgeVariants>['color']>
> = {
  Owner: 'Blue',
  Admin: 'Purple',
  Manager: 'DarkBlue',
  Cashier: 'Green',
}

function UserBadge({
  type = 'Owner',
  className,
  ...props
}: Omit<ComponentProps<typeof Badge>, 'color' | 'children' | 'type'> & {
  type?: 'Owner' | 'Admin' | 'Manager' | 'Cashier'
}) {
  return (
    <Badge color={USER_CHIP[type]} type="Background" className={className} {...props}>
      {type}
    </Badge>
  )
}

export { Badge, UserBadge, badgeVariants }
export type { BadgeColor }
