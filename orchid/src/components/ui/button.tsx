import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const PRIMARY_SOLID =
  'border-oc-primary-button-border bg-linear-to-b from-oc-primary-button-default-start to-oc-primary-button-default-stop text-oc-primary-button-text shadow-[0_1.5px_0_0_var(--oc-primary-button-shadow)] [text-shadow:0_1px_1px_rgba(0,0,0,0.12)] hover:from-oc-primary-button-hover-start hover:to-oc-primary-button-hover-stop active:from-oc-primary-button-pressed-start active:to-oc-primary-button-pressed-stop active:shadow-none disabled:from-oc-primary-button-disabled-start disabled:to-oc-primary-button-disabled-stop disabled:shadow-none'
const PRIMARY_GHOST =
  'border-transparent bg-transparent text-oc-primary shadow-none [text-shadow:none] hover:text-oc-primary-300 active:text-oc-primary-button-default-stop'
const PRIMARY_OUTLINE =
  'border-oc-primary bg-oc-background text-oc-primary shadow-none [text-shadow:none] hover:bg-oc-info-soft active:bg-oc-primary/15'
const SECONDARY_SOLID =
  'border-oc-secondary-button-border bg-linear-to-b from-oc-secondary-button-default-start to-oc-secondary-button-default-stop text-oc-secondary-button-text shadow-[0_1.5px_0_0_var(--oc-secondary-button-shadow)] [text-shadow:0_1px_1px_rgba(0,0,0,0.08)] hover:from-oc-secondary-button-hover-start hover:to-oc-secondary-button-hover-stop active:from-oc-secondary-button-pressed-start active:to-oc-secondary-button-pressed-stop active:shadow-none disabled:from-oc-secondary-button-disabled-start disabled:to-oc-secondary-button-disabled-stop disabled:shadow-none'
const SECONDARY_GHOST =
  'border-transparent bg-transparent text-oc-secondary-button-text shadow-none [text-shadow:none] hover:text-oc-foreground active:text-oc-foreground'
const SECONDARY_OUTLINE =
  'border-oc-border bg-oc-background text-oc-secondary-button-text shadow-none [text-shadow:none] hover:bg-oc-muted active:bg-oc-accent'
const DESTRUCTIVE_SOLID =
  'border-oc-destructive-button-border bg-linear-to-b from-oc-destructive-button-default-start to-oc-destructive-button-default-stop text-oc-destructive-button-text shadow-[0_1.5px_0_0_var(--oc-destructive-button-shadow)] [text-shadow:0_1px_1px_rgba(0,0,0,0.12)] hover:from-oc-destructive-button-hover-start hover:to-oc-destructive-button-hover-stop active:from-oc-destructive-button-pressed-start active:to-oc-destructive-button-pressed-stop active:shadow-none disabled:from-oc-destructive-button-disabled-start disabled:to-oc-destructive-button-disabled-stop disabled:shadow-none'
const DESTRUCTIVE_GHOST =
  'border-transparent bg-transparent text-oc-destructive shadow-none [text-shadow:none] hover:text-oc-destructive/80 active:text-oc-destructive-button-default-stop'
const DESTRUCTIVE_OUTLINE =
  'border-oc-destructive bg-oc-background text-oc-destructive shadow-none [text-shadow:none] hover:bg-oc-destructive-soft active:bg-oc-destructive/15'

const SIZE_SM =
  'h-7 min-w-7 gap-1.5 rounded-lg px-2 text-xs leading-normal has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*="size-"])]:size-4'
const SIZE_DEFAULT =
  'h-9 min-w-9 gap-2 rounded-lg px-3 py-2 text-sm leading-normal has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 [&_svg:not([class*="size-"])]:size-4.5'
const SIZE_LG =
  'h-11 min-w-11 gap-2 rounded-lg px-4 py-2.5 text-base leading-snug has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 [&_svg:not([class*="size-"])]:size-5'

const buttonVariants = cva(
  'group/button inline-flex shrink-0 cursor-pointer items-center justify-center overflow-clip border border-solid bg-clip-padding font-medium whitespace-nowrap outline-none transition-all select-none focus-visible:border-oc-primary focus-visible:ring-3 focus-visible:ring-oc-info-border/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-oc-destructive aria-invalid:ring-3 aria-invalid:ring-oc-destructive-border/50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: PRIMARY_SOLID,
        outline: SECONDARY_OUTLINE,
        secondary: SECONDARY_SOLID,
        ghost: SECONDARY_GHOST,
        destructive: DESTRUCTIVE_SOLID,
        link: `${PRIMARY_GHOST} underline-offset-4 hover:underline`,
        Primary: '',
        Secondary: '',
        Destructive: '',
      },
      style: {
        Default: '',
        Transparent: 'border-transparent bg-transparent shadow-none [text-shadow:none]',
        Border: 'bg-oc-background shadow-none [text-shadow:none] border-[1.5px]',
      },
      size: {
        default: SIZE_DEFAULT,
        xs: 'h-6 min-w-6 gap-1 rounded-lg px-2 text-xs leading-none has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*="size-"])]:size-3',
        sm: SIZE_SM,
        lg: SIZE_LG,
        icon: 'size-9 min-w-9 rounded-lg p-0 [&_svg:not([class*="size-"])]:size-4.5',
        'icon-xs': 'size-6 min-w-6 rounded-lg p-0 [&_svg:not([class*="size-"])]:size-3',
        'icon-sm': 'size-7 min-w-7 rounded-lg p-0 [&_svg:not([class*="size-"])]:size-4',
        'icon-lg': 'size-11 min-w-11 rounded-lg p-0 [&_svg:not([class*="size-"])]:size-5',
        Small: SIZE_SM,
        Default: SIZE_DEFAULT,
        Big: SIZE_LG,
      },
      iconOnly: {
        true: 'p-0',
        false: '',
      },
      shape: {
        Default: '',
        Circle: 'rounded-full',
      },
    },
    compoundVariants: [
      { size: 'Small', iconOnly: true, class: 'size-7 min-w-7' },
      { size: 'Default', iconOnly: true, class: 'size-9 min-w-9' },
      { size: 'Big', iconOnly: true, class: 'size-11 min-w-11' },
      { size: 'sm', iconOnly: true, class: 'size-7 min-w-7' },
      { size: 'default', iconOnly: true, class: 'size-9 min-w-9' },
      { size: 'lg', iconOnly: true, class: 'size-11 min-w-11' },
      { variant: 'Primary', style: 'Default', class: PRIMARY_SOLID },
      { variant: 'Primary', style: 'Transparent', class: PRIMARY_GHOST },
      { variant: 'Primary', style: 'Border', class: PRIMARY_OUTLINE },
      { variant: 'Secondary', style: 'Default', class: SECONDARY_SOLID },
      { variant: 'Secondary', style: 'Transparent', class: SECONDARY_GHOST },
      { variant: 'Secondary', style: 'Border', class: SECONDARY_OUTLINE },
      { variant: 'Destructive', style: 'Default', class: DESTRUCTIVE_SOLID },
      { variant: 'Destructive', style: 'Transparent', class: DESTRUCTIVE_GHOST },
      { variant: 'Destructive', style: 'Border', class: DESTRUCTIVE_OUTLINE },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
      iconOnly: false,
      shape: 'Default',
    },
  },
)

type LegacyButtonStyle = 'Default' | 'Transparent' | 'Border'
type ButtonVariantProps = VariantProps<typeof buttonVariants>

function Button({
  className,
  variant = 'default',
  type = 'button',
  style,
  size = 'default',
  iconOnly,
  shape = 'Default',
  ...props
}: Omit<ButtonPrimitive.Props, 'style'> &
  Omit<ButtonVariantProps, 'style'> & {
    style?: ButtonPrimitive.Props['style'] | LegacyButtonStyle
  }) {
  const legacyVariant =
    variant === 'Primary' || variant === 'Secondary' || variant === 'Destructive'
  const legacyStyle = typeof style === 'string' ? style : legacyVariant ? 'Default' : null
  const nativeStyle = typeof style === 'string' ? undefined : style

  return (
    <ButtonPrimitive
      type={type}
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-style={legacyStyle ?? undefined}
      style={nativeStyle}
      className={cn(
        buttonVariants({
          variant,
          style: legacyStyle,
          size,
          iconOnly: Boolean(iconOnly),
          shape,
        }),
        className,
      )}
      {...props}
    />
  )
}

export { Button, buttonVariants }
