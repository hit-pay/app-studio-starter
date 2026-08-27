import type { ReactNode } from 'react'
import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'
import { ChevronDownIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './dropdown-menu'

const buttonVariants = cva(
  'group/button inline-flex shrink-0 cursor-pointer items-center justify-center overflow-clip border border-solid font-medium whitespace-nowrap outline-none select-none disabled:pointer-events-none disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
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
        Small:
          'h-7 min-w-9 gap-1.5 rounded-lg p-2 text-xs leading-[1.5] [&_svg:not([class*="size-"])]:size-4',
        Default:
          'h-9 min-w-9 gap-2 rounded-lg px-3 py-2 text-sm leading-[1.5] [&_svg:not([class*="size-"])]:size-[18px]',
        Big: 'h-11 min-w-11 gap-2 rounded-lg px-4 py-2.5 text-base leading-[1.4] [&_svg:not([class*="size-"])]:size-5',
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
      {
        variant: 'Primary',
        style: 'Default',
        class:
          'border-oc-primary-button-border bg-linear-to-b from-oc-primary-button-default-start to-oc-primary-button-default-stop text-oc-primary-button-text shadow-[0_1.5px_0_0_var(--oc-primary-button-shadow)] [text-shadow:0_1px_1px_rgba(0,0,0,0.12)] hover:from-oc-primary-button-hover-start hover:to-oc-primary-button-hover-stop active:from-oc-primary-button-pressed-start active:to-oc-primary-button-pressed-stop active:shadow-none disabled:from-oc-primary-button-disabled-start disabled:to-oc-primary-button-disabled-stop disabled:shadow-none',
      },
      {
        variant: 'Primary',
        style: 'Transparent',
        class:
          'text-oc-primary hover:text-oc-primary-300 active:text-oc-primary-button-default-stop',
      },
      {
        variant: 'Primary',
        style: 'Border',
        class:
          'border-oc-primary text-oc-primary hover:bg-oc-info-soft active:bg-oc-primary/15',
      },
      {
        variant: 'Destructive',
        style: 'Default',
        class:
          'border-oc-destructive-button-border bg-linear-to-b from-oc-destructive-button-default-start to-oc-destructive-button-default-stop text-oc-destructive-button-text shadow-[0_1.5px_0_0_var(--oc-destructive-button-shadow)] [text-shadow:0_1px_1px_rgba(0,0,0,0.12)] hover:from-oc-destructive-button-hover-start hover:to-oc-destructive-button-hover-stop active:from-oc-destructive-button-pressed-start active:to-oc-destructive-button-pressed-stop active:shadow-none disabled:from-oc-destructive-button-disabled-start disabled:to-oc-destructive-button-disabled-stop disabled:shadow-none',
      },
      {
        variant: 'Destructive',
        style: 'Transparent',
        class:
          'text-oc-destructive hover:text-oc-destructive/80 active:text-oc-destructive-button-default-stop',
      },
      {
        variant: 'Destructive',
        style: 'Border',
        class:
          'border-oc-destructive text-oc-destructive hover:bg-oc-destructive-soft active:bg-oc-destructive/15',
      },
      {
        variant: 'Secondary',
        style: 'Default',
        class:
          'border-oc-secondary-button-border bg-linear-to-b from-oc-secondary-button-default-start to-oc-secondary-button-default-stop text-oc-secondary-button-text shadow-[0_1.5px_0_0_var(--oc-secondary-button-shadow)] [text-shadow:0_1px_1px_rgba(0,0,0,0.08)] hover:from-oc-secondary-button-hover-start hover:to-oc-secondary-button-hover-stop active:from-oc-secondary-button-pressed-start active:to-oc-secondary-button-pressed-stop active:shadow-none disabled:from-oc-secondary-button-disabled-start disabled:to-oc-secondary-button-disabled-stop disabled:shadow-none',
      },
      {
        variant: 'Secondary',
        style: 'Transparent',
        class:
          'text-oc-secondary-button-text hover:text-oc-foreground active:text-oc-foreground',
      },
      {
        variant: 'Secondary',
        style: 'Border',
        class:
          'border-oc-border text-oc-secondary-button-text hover:bg-oc-muted active:bg-oc-accent',
      },
    ],
    defaultVariants: {
      variant: 'Primary',
      style: 'Default',
      size: 'Default',
      iconOnly: false,
      shape: 'Default',
    },
  },
)

type ButtonVariant = 'Primary' | 'Secondary' | 'Destructive'
type ButtonType = ButtonVariant
type ButtonStyle = 'Default' | 'Transparent' | 'Border'
type ButtonSize = 'Small' | 'Default' | 'Big'
type ButtonNativeType = NonNullable<ButtonPrimitive.Props['type']>

/**
 * Orchid action button.
 *
 * `variant`: Primary | Secondary | Destructive.
 * `type`: native submit | button | reset (default button).
 */
function Button({
  className,
  variant = 'Primary',
  type = 'button',
  style = 'Default',
  size = 'Default',
  iconOnly,
  shape = 'Default',
  additional,
  menu,
  children,
  ...props
}: Omit<ButtonPrimitive.Props, 'type'> &
  VariantProps<typeof buttonVariants> & {
    type?: ButtonNativeType
    additional?: ReactNode
    menu?: ReactNode
  }) {
  const classNameResolved = cn(
    buttonVariants({
      variant,
      style,
      size,
      iconOnly: Boolean(iconOnly),
      shape,
    }),
    className,
  )
  const additionalWidth =
    size === 'Small' ? 'w-8 min-w-8' : size === 'Big' ? 'w-12 min-w-12' : 'w-10 min-w-10'
  const divider =
    variant === 'Secondary' || style !== 'Default'
      ? 'border-l-current/20'
      : 'border-l-white/25'
  const splitShadow =
    style !== 'Default'
      ? ''
      : variant === 'Destructive'
        ? 'shadow-[0_1.5px_0_0_var(--oc-destructive-button-shadow)]'
        : variant === 'Secondary'
          ? 'shadow-[0_1.5px_0_0_var(--oc-secondary-button-shadow)]'
          : 'shadow-[0_1.5px_0_0_var(--oc-primary-button-shadow)]'

  const actionIcon = additional ?? <ChevronDownIcon />
  const showSplit = additional != null || menu != null

  if (showSplit) {
    const trigger = (
      <ButtonPrimitive
        type="button"
        disabled={props.disabled}
        data-slot="button-additional"
        data-variant={variant}
        data-style={style}
        data-size={size}
        className={cn(
          buttonVariants({
            variant,
            style,
            size,
            iconOnly: false,
            shape: 'Default',
          }),
          additionalWidth,
          'h-auto self-stretch rounded-l-none border-l p-0 shadow-none',
          divider,
        )}
      >
        {actionIcon}
      </ButtonPrimitive>
    )

    return (
      <span
        data-slot="button-split"
        className={cn(
          'inline-flex items-stretch overflow-hidden rounded-lg has-[:active]:shadow-none',
          splitShadow,
          props.disabled && 'shadow-none',
        )}
      >
        <ButtonPrimitive
          type={type}
          data-slot="button"
          data-variant={variant}
          data-style={style}
          data-size={size}
          className={cn(classNameResolved, 'rounded-r-none border-r-0 shadow-none')}
          {...props}
        >
          {children}
        </ButtonPrimitive>
        {menu ? (
          <DropdownMenu>
            <DropdownMenuTrigger
              nativeButton
              className="flex self-stretch"
              render={trigger}
            />
            <DropdownMenuContent align="end">{menu}</DropdownMenuContent>
          </DropdownMenu>
        ) : (
          trigger
        )}
      </span>
    )
  }

  return (
    <ButtonPrimitive
      type={type}
      data-slot="button"
      data-variant={variant}
      data-style={style}
      data-size={size}
      className={classNameResolved}
      {...props}
    >
      {children}
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }
export type { ButtonNativeType, ButtonSize, ButtonStyle, ButtonType, ButtonVariant }
