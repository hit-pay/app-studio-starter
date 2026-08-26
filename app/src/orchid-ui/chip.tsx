import type { ComponentProps, ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { XCircleIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

const chipVariants = cva(
  'inline-flex min-h-6 min-w-8 shrink-0 items-center justify-center gap-2 rounded-full py-0.5 text-center text-xs font-medium leading-[1.5] whitespace-nowrap [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4',
  {
    variants: {
      color: {
        Blue: 'text-primary',
        Purple: 'text-purple',
        Orange: 'text-warning-strong',
        Red: 'text-destructive-strong',
        LightRed: 'text-light-red',
        White: 'text-muted-foreground',
        DarkBlue: 'text-dark-blue',
        Grey: 'text-neutral-strong',
        Tosca: 'text-tosca',
        Green: 'text-success-strong',
      },
      type: {
        Background: 'px-2',
        Border: 'border border-solid bg-background px-2',
        Transparent: 'bg-transparent px-0',
      },
    },
    compoundVariants: [
      { color: 'Blue', type: 'Background', class: 'bg-info-soft' },
      { color: 'Blue', type: 'Border', class: 'border-primary-300' },
      { color: 'Purple', type: 'Background', class: 'bg-purple-soft' },
      { color: 'Purple', type: 'Border', class: 'border-purple-border' },
      { color: 'Orange', type: 'Background', class: 'bg-warning-soft' },
      { color: 'Orange', type: 'Border', class: 'border-warning-chip-border' },
      { color: 'Red', type: 'Background', class: 'bg-destructive-soft' },
      { color: 'Red', type: 'Border', class: 'border-destructive-border' },
      { color: 'LightRed', type: 'Background', class: 'bg-light-red-soft' },
      { color: 'LightRed', type: 'Border', class: 'border-light-red-border' },
      { color: 'White', type: 'Background', class: 'border border-solid border-border bg-background' },
      { color: 'White', type: 'Border', class: 'border-neutral-border' },
      { color: 'DarkBlue', type: 'Background', class: 'bg-dark-blue-soft' },
      { color: 'DarkBlue', type: 'Border', class: 'border-dark-blue-border' },
      { color: 'Grey', type: 'Background', class: 'bg-neutral-soft' },
      { color: 'Grey', type: 'Border', class: 'border-neutral-border' },
      { color: 'Tosca', type: 'Background', class: 'bg-tosca-soft' },
      { color: 'Tosca', type: 'Border', class: 'border-tosca-border' },
      { color: 'Green', type: 'Background', class: 'bg-success-soft' },
      { color: 'Green', type: 'Border', class: 'border-success-chip-border' },
    ],
    defaultVariants: {
      color: 'Blue',
      type: 'Background',
    },
  },
)

const COLOR_ALIAS: Record<string, NonNullable<VariantProps<typeof chipVariants>['color']>> = {
  Blue: 'Blue',
  Purple: 'Purple',
  Orange: 'Orange',
  Red: 'Red',
  'Light Red': 'LightRed',
  LightRed: 'LightRed',
  White: 'White',
  'Dark Blue': 'DarkBlue',
  DarkBlue: 'DarkBlue',
  Grey: 'Grey',
  Tosca: 'Tosca',
  Green: 'Green',
}

type ChipColor =
  | 'Blue'
  | 'Purple'
  | 'Orange'
  | 'Red'
  | 'LightRed'
  | 'Light Red'
  | 'White'
  | 'DarkBlue'
  | 'Dark Blue'
  | 'Grey'
  | 'Tosca'
  | 'Green'

function Chip({
  className,
  color = 'Blue',
  type = 'Background',
  icon,
  onRemove,
  children,
  ...props
}: Omit<ComponentProps<'span'>, 'color'> &
  VariantProps<typeof chipVariants> & {
    color?: ChipColor
    type?: 'Background' | 'Transparent' | 'Border'
    icon?: ReactNode
    onRemove?: () => void
  }) {
  const resolvedColor = COLOR_ALIAS[color] ?? 'Blue'

  return (
    <span
      data-slot="chip"
      data-color={resolvedColor}
      data-type={type}
      className={cn(chipVariants({ color: resolvedColor, type }), className)}
      {...props}
    >
      {icon}
      {children}
      {onRemove ? (
        <button
          type="button"
          data-slot="chip-remove"
          aria-label="Remove"
          onPointerDown={(event) => {
            event.preventDefault()
            event.stopPropagation()
          }}
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
            onRemove()
          }}
          className="-mr-0.5 inline-flex size-4.5 items-center justify-center text-current outline-none"
        >
          <XCircleIcon className="size-4.5" />
        </button>
      ) : null}
    </span>
  )
}

const USER_CHIP: Record<
  'Owner' | 'Admin' | 'Manager' | 'Cashier',
  NonNullable<VariantProps<typeof chipVariants>['color']>
> = {
  Owner: 'Blue',
  Admin: 'Purple',
  Manager: 'DarkBlue',
  Cashier: 'Green',
}

function UserChip({
  type = 'Owner',
  className,
  ...props
}: Omit<ComponentProps<typeof Chip>, 'color' | 'children' | 'type'> & {
  type?: 'Owner' | 'Admin' | 'Manager' | 'Cashier'
}) {
  return (
    <Chip color={USER_CHIP[type]} type="Background" className={className} {...props}>
      {type}
    </Chip>
  )
}

export { Chip, UserChip, chipVariants }
