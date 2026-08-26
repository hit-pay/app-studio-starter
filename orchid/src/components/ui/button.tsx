import type { ReactNode } from 'react'
import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'
import { ChevronDownIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './dropdown-menu'

const buttonVariants = cva(
  'group/button inline-flex shrink-0 items-center justify-center overflow-clip border border-solid font-medium whitespace-nowrap outline-none select-none disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      type: {
        Primary: '',
        Secondary: '',
        Destructive: '',
      },
      style: {
        Default: '',
        Transparent: 'border-transparent bg-transparent shadow-none [text-shadow:none]',
        Border: 'bg-background shadow-none [text-shadow:none] border-[1.5px]',
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
        type: 'Primary',
        style: 'Default',
        class:
          'border-primary-button-border bg-linear-to-b from-primary-button-default-start to-primary-button-default-stop text-primary-button-text shadow-[0_1.5px_0_0_var(--primary-button-shadow)] [text-shadow:0_1px_1px_rgba(0,0,0,0.12)] hover:from-primary-button-hover-start hover:to-primary-button-hover-stop active:from-primary-button-pressed-start active:to-primary-button-pressed-stop active:shadow-none disabled:from-primary-button-disabled-start disabled:to-primary-button-disabled-stop disabled:shadow-none',
      },
      {
        type: 'Primary',
        style: 'Transparent',
        class:
          'text-primary hover:text-primary-300 active:text-primary-button-default-stop',
      },
      {
        type: 'Primary',
        style: 'Border',
        class:
          'border-primary text-primary hover:bg-info-soft active:bg-primary/15',
      },
      {
        type: 'Destructive',
        style: 'Default',
        class:
          'border-destructive-button-border bg-linear-to-b from-destructive-button-default-start to-destructive-button-default-stop text-destructive-button-text shadow-[0_1.5px_0_0_var(--destructive-button-shadow)] [text-shadow:0_1px_1px_rgba(0,0,0,0.12)] hover:from-destructive-button-hover-start hover:to-destructive-button-hover-stop active:from-destructive-button-pressed-start active:to-destructive-button-pressed-stop active:shadow-none disabled:from-destructive-button-disabled-start disabled:to-destructive-button-disabled-stop disabled:shadow-none',
      },
      {
        type: 'Destructive',
        style: 'Transparent',
        class:
          'text-destructive hover:text-destructive/80 active:text-destructive-button-default-stop',
      },
      {
        type: 'Destructive',
        style: 'Border',
        class:
          'border-destructive text-destructive hover:bg-destructive-soft active:bg-destructive/15',
      },
      {
        type: 'Secondary',
        style: 'Default',
        class:
          'border-secondary-button-border bg-linear-to-b from-secondary-button-default-start to-secondary-button-default-stop text-secondary-button-text shadow-[0_1.5px_0_0_var(--secondary-button-shadow)] [text-shadow:0_1px_1px_rgba(0,0,0,0.08)] hover:from-secondary-button-hover-start hover:to-secondary-button-hover-stop active:from-secondary-button-pressed-start active:to-secondary-button-pressed-stop active:shadow-none disabled:from-secondary-button-disabled-start disabled:to-secondary-button-disabled-stop disabled:shadow-none',
      },
      {
        type: 'Secondary',
        style: 'Transparent',
        class:
          'text-secondary-button-text hover:text-foreground active:text-foreground',
      },
      {
        type: 'Secondary',
        style: 'Border',
        class:
          'border-border text-secondary-button-text hover:bg-muted active:bg-accent',
      },
    ],
    defaultVariants: {
      type: 'Primary',
      style: 'Default',
      size: 'Default',
      iconOnly: false,
      shape: 'Default',
    },
  },
)

type ButtonType = 'Primary' | 'Secondary' | 'Destructive'
type ButtonStyle = 'Default' | 'Transparent' | 'Border'
type ButtonSize = 'Small' | 'Default' | 'Big'

const TYPE_ALIAS: Record<string, ButtonType> = {
  Primary: 'Primary',
  primary: 'Primary',
  default: 'Primary',
  Destructive: 'Destructive',
  destructive: 'Destructive',
  Secondary: 'Secondary',
  secondary: 'Secondary',
}

const STYLE_ALIAS: Record<string, ButtonStyle> = {
  Default: 'Default',
  default: 'Default',
  Transparent: 'Transparent',
  transparent: 'Transparent',
  ghost: 'Transparent',
  link: 'Transparent',
  Border: 'Border',
  border: 'Border',
  outline: 'Border',
}

const SIZE_ALIAS: Record<string, ButtonSize> = {
  Small: 'Small',
  sm: 'Small',
  xs: 'Small',
  Default: 'Default',
  default: 'Default',
  Big: 'Big',
  lg: 'Big',
}

function Button({
  className,
  type: visualType = 'Primary',
  style = 'Default',
  size = 'Default',
  iconOnly,
  shape = 'Default',
  additional,
  menu,
  htmlType = 'button',
  children,
  ...props
}: Omit<ButtonPrimitive.Props, 'type'> &
  VariantProps<typeof buttonVariants> & {
    type?: ButtonType | 'primary' | 'destructive' | 'secondary' | 'default'
    style?: ButtonStyle | 'default' | 'transparent' | 'border' | 'ghost' | 'link' | 'outline'
    size?: ButtonSize | 'sm' | 'xs' | 'lg' | 'default'
    iconOnly?: boolean
    shape?: 'Default' | 'Circle'
    additional?: ReactNode
    menu?: ReactNode
    htmlType?: ButtonPrimitive.Props['type']
  }) {
  const resolvedType = TYPE_ALIAS[visualType] ?? 'Primary'
  const resolvedStyle = STYLE_ALIAS[style] ?? 'Default'
  const resolvedSize = SIZE_ALIAS[String(size)] ?? 'Default'
  const resolvedIconOnly = Boolean(iconOnly)
  const classNameResolved = cn(
    buttonVariants({
      type: resolvedType,
      style: resolvedStyle,
      size: resolvedSize,
      iconOnly: resolvedIconOnly,
      shape,
    }),
    className,
  )
  const additionalWidth =
    resolvedSize === 'Small' ? 'w-8 min-w-8' : resolvedSize === 'Big' ? 'w-12 min-w-12' : 'w-10 min-w-10'
  const divider =
    resolvedType === 'Secondary' || resolvedStyle !== 'Default'
      ? 'border-l-current/20'
      : 'border-l-white/25'
  const splitShadow =
    resolvedStyle !== 'Default'
      ? ''
      : resolvedType === 'Destructive'
        ? 'shadow-[0_1.5px_0_0_var(--destructive-button-shadow)]'
        : resolvedType === 'Secondary'
          ? 'shadow-[0_1.5px_0_0_var(--secondary-button-shadow)]'
          : 'shadow-[0_1.5px_0_0_var(--primary-button-shadow)]'

  const actionIcon = additional ?? <ChevronDownIcon />
  const showSplit = additional != null || menu != null

  if (showSplit) {
    const trigger = (
      <ButtonPrimitive
        type="button"
        disabled={props.disabled}
        data-slot="button-additional"
        data-type={resolvedType}
        data-style={resolvedStyle}
        data-size={resolvedSize}
        className={cn(
          buttonVariants({
            type: resolvedType,
            style: resolvedStyle,
            size: resolvedSize,
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
          type={htmlType}
          data-slot="button"
          data-type={resolvedType}
          data-style={resolvedStyle}
          data-size={resolvedSize}
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
      type={htmlType}
      data-slot="button"
      data-type={resolvedType}
      data-style={resolvedStyle}
      data-size={resolvedSize}
      className={classNameResolved}
      {...props}
    >
      {children}
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }
