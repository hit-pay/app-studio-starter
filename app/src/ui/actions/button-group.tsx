import { Children, type ComponentProps } from 'react'
import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { Separator } from '@ui/utils/separator'

const buttonGroupVariants = cva(
  'flex w-fit *:focus-visible:relative *:focus-visible:z-10 has-[>[data-slot=button-group]]:gap-2 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-lg [&>[data-slot=select-trigger]:not([class*="w-"])]:w-fit [&>input]:flex-1',
  {
    variants: {
      orientation: {
        horizontal: '',
        vertical: 'flex-col',
      },
      variant: {
        default: 'items-stretch',
        ghost: 'items-center gap-0.5',
        border:
          'items-center gap-0.5 rounded border border-solid border-oc-dark-blue-border bg-oc-background p-0.5',
      },
    },
    compoundVariants: [
      {
        variant: 'default',
        orientation: 'horizontal',
        class:
          '*:data-slot:rounded-r-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-lg! [&>[data-slot]~[data-slot]]:rounded-l-none [&>[data-slot]~[data-slot]]:border-l-0',
      },
      {
        variant: 'default',
        orientation: 'vertical',
        class:
          '*:data-slot:rounded-b-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-lg! [&>[data-slot]~[data-slot]]:rounded-t-none [&>[data-slot]~[data-slot]]:border-t-0',
      },
    ],
    defaultVariants: {
      orientation: 'horizontal',
      variant: 'default',
    },
  },
)

function ButtonGroup({
  className,
  orientation,
  variant,
  children,
  ...props
}: ComponentProps<'div'> & VariantProps<typeof buttonGroupVariants>) {
  const items = Children.toArray(children)
  const withDividers = variant === 'border' && items.length > 1

  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      data-variant={variant}
      className={cn(buttonGroupVariants({ orientation, variant }), className)}
      {...props}
    >
      {withDividers
        ? items.flatMap((child, index) =>
            index === 0
              ? [child]
              : [
                  <span
                    key={`divider-${index}`}
                    aria-hidden="true"
                    data-slot="button-group-divider"
                    className="h-4 w-px shrink-0 bg-oc-dark-blue-border"
                  />,
                  child,
                ],
          )
        : children}
    </div>
  )
}

function ButtonGroupText({
  className,
  render,
  ...props
}: useRender.ComponentProps<'div'>) {
  return useRender({
    defaultTagName: 'div',
    props: mergeProps<'div'>(
      {
        className: cn(
          'flex items-center gap-2 rounded-lg border border-oc-border bg-oc-neutral px-2.5 text-sm font-medium text-oc-foreground [&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4',
          className,
        ),
      },
      props,
    ),
    render,
    state: {
      slot: 'button-group-text',
    },
  })
}

function ButtonGroupSeparator({
  className,
  orientation = 'vertical',
  ...props
}: ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        'relative self-stretch bg-oc-border data-horizontal:mx-px data-horizontal:w-auto data-vertical:my-px data-vertical:h-auto',
        className,
      )}
      {...props}
    />
  )
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
}
