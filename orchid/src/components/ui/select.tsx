import {
  Children,
  isValidElement,
  useMemo,
  type ComponentProps,
  type ReactNode,
} from 'react'
import { Select as SelectPrimitive } from '@base-ui/react/select'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

const selectTriggerClass =
  'flex w-full cursor-pointer items-center gap-2 rounded-lg border border-oc-border bg-oc-background px-2 text-left text-sm leading-[1.5] text-oc-foreground shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1.5px_1.5px_rgba(0,0,0,0.09)] outline-none select-none focus-visible:border-oc-primary focus-visible:shadow-[0_0_0_3px_var(--oc-info-border)] aria-expanded:border-oc-primary aria-expanded:shadow-[0_0_0_3px_var(--oc-info-border)] data-popup-open:border-oc-primary data-popup-open:shadow-[0_0_0_3px_var(--oc-info-border)] data-open:border-oc-primary data-open:shadow-[0_0_0_3px_var(--oc-info-border)] disabled:cursor-not-allowed disabled:bg-oc-muted disabled:opacity-50 aria-invalid:border-oc-destructive aria-invalid:shadow-[0_0_0_3px_var(--oc-destructive-border)] data-placeholder:text-oc-muted-foreground'

function getNodeText(node: ReactNode): string {
  if (node == null || typeof node === 'boolean') return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(getNodeText).join('')
  if (isValidElement(node)) {
    return getNodeText((node.props as { children?: ReactNode }).children)
  }
  return ''
}

function collectSelectItems(node: ReactNode, acc: Record<string, ReactNode>) {
  Children.forEach(node, (child) => {
    if (!isValidElement(child)) return
    if (child.type === SelectItem) {
      const { value, children, label } = child.props as SelectPrimitive.Item.Props
      if (typeof value === 'string' || typeof value === 'number') {
        acc[String(value)] = label || getNodeText(children) || children
      }
    }
    collectSelectItems((child.props as { children?: ReactNode }).children, acc)
  })
}

function Select({ items, children, ...props }: SelectPrimitive.Root.Props<unknown>) {
  const resolvedItems = useMemo(() => {
    if (items) return items
    const acc: Record<string, ReactNode> = {}
    collectSelectItems(children, acc)
    return acc
  }, [children, items])

  return (
    <SelectPrimitive.Root items={resolvedItems} {...props}>
      {children}
    </SelectPrimitive.Root>
  )
}

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
        className={cn('flex w-full flex-col gap-1', className)}
      {...props}
    />
  )
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn('flex flex-1 text-left', className)}
      {...props}
    />
  )
}

function SelectTrigger({
  className,
  children,
  size = 'Default',
  ...props
}: SelectPrimitive.Trigger.Props & {
  size?: 'Default' | 'Inline'
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        size === 'Inline'
          ? 'inline-flex h-full w-auto shrink-0 cursor-pointer items-center gap-1 border-0 bg-transparent px-0 text-xs font-medium leading-[1.5] text-oc-muted-foreground shadow-none outline-none select-none'
          : cn(selectTriggerClass, 'h-9'),
        className,
      )}
      {...props}
    >
      {children}
      {size === 'Inline' ? <ChevronDownIcon className="size-3.5 text-oc-muted-foreground" /> : null}
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  side = 'bottom',
  sideOffset = 0,
  align = 'start',
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    'align' | 'alignOffset' | 'side' | 'sideOffset' | 'alignItemWithTrigger'
  >) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-50"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          className={cn(
            'relative z-50 max-h-(--available-height) w-(--anchor-width) min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg border border-oc-border bg-oc-background p-2 text-oc-foreground shadow-oc-popup outline-none duration-100 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
            className,
          )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List className="flex w-full flex-col gap-1">{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({ className, ...props }: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn(
        'px-2 pt-2 pb-1 text-[10px] leading-[18px] font-medium tracking-[0.3px] text-oc-foreground uppercase',
        className,
      )}
      {...props}
    />
  )
}

function SelectItem({ className, children, label, ...props }: SelectPrimitive.Item.Props) {
  const resolvedLabel = label || getNodeText(children) || undefined

  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      label={resolvedLabel}
      className={cn(
        'relative flex w-full cursor-pointer items-center gap-2 rounded p-2 pr-8 text-sm leading-[1.5] text-oc-foreground outline-hidden select-none hover:bg-oc-dark-blue-soft focus:bg-oc-dark-blue-soft data-highlighted:bg-oc-dark-blue-soft data-selected:bg-oc-info-soft data-selected:hover:bg-oc-info-soft data-selected:data-highlighted:bg-oc-info-soft data-disabled:pointer-events-none data-disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex flex-1 items-center gap-2">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="pointer-events-none absolute right-2 flex items-center justify-center">
        <CheckIcon className="size-4" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({ className, ...props }: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn('pointer-events-none my-1 h-px bg-oc-border', className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn('top-0 z-10 flex w-full items-center justify-center bg-oc-background py-1', className)}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpArrow>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        'bottom-0 z-10 flex w-full items-center justify-center bg-oc-background py-1',
        className,
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownArrow>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
