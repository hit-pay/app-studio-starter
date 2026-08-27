import {
  createContext,
  useContext,
  useState,
  useRef,
  type ComponentProps,
  type RefObject,
} from 'react'
import { Combobox as ComboboxPrimitive } from '@base-ui/react/combobox'
import { CheckIcon, ChevronDownIcon, MinusIcon, XCircleIcon, XIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { checkboxControlVariants } from './checkbox'
import { badgeVariants, type BadgeColor } from './badge'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from './input-group'

type ComboboxSelectionContextValue = {
  items: readonly unknown[] | undefined
  value: unknown
  multiple: boolean
  setValue: (value: unknown) => void
}

const ComboboxSelectionContext = createContext<ComboboxSelectionContextValue | null>(null)
const ComboboxFieldAnchorContext = createContext<RefObject<HTMLDivElement | null> | null>(null)

function flattenComboboxItems(items: readonly unknown[] | undefined) {
  if (!items?.length) return []
  const first = items[0]
  if (first && typeof first === 'object' && first !== null && 'items' in first) {
    return items.flatMap((group) => {
      const nested = (group as { items?: unknown[] }).items
      return Array.isArray(nested) ? nested : []
    })
  }
  return [...items]
}

function Combobox({
  items,
  value,
  defaultValue,
  onValueChange,
  multiple = false,
  children,
  ...props
}: ComboboxPrimitive.Root.Props<any, boolean | undefined>) {
  const [uncontrolled, setUncontrolled] = useState(
    () => defaultValue ?? (multiple ? [] : null),
  )
  const selected = value !== undefined ? value : uncontrolled
  const fieldAnchor = useRef<HTMLDivElement>(null)

  function handleChange(...args: Parameters<NonNullable<ComboboxPrimitive.Root.Props<any, boolean | undefined>['onValueChange']>>) {
    const next = args[0]
    if (value === undefined) setUncontrolled(next as typeof uncontrolled)
    onValueChange?.(...args)
  }

  return (
    <ComboboxFieldAnchorContext.Provider value={fieldAnchor}>
    <ComboboxSelectionContext.Provider
      value={{
        items,
        value: selected,
        multiple: Boolean(multiple),
        setValue: (next) => handleChange(next as never, undefined as never),
      }}
    >
      <ComboboxPrimitive.Root
        {...props}
        items={items}
        value={selected as never}
        multiple={multiple}
        onValueChange={handleChange}
      >
        {children}
      </ComboboxPrimitive.Root>
    </ComboboxSelectionContext.Provider>
    </ComboboxFieldAnchorContext.Provider>
  )
}

function ComboboxValue({ ...props }: ComboboxPrimitive.Value.Props) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />
}

function ComboboxTrigger({ className, children, ...props }: ComboboxPrimitive.Trigger.Props) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      className={cn("cursor-pointer [&_svg:not([class*='size-'])]:size-4", className)}
      {...props}
    >
      {children}
      <ChevronDownIcon className="pointer-events-none size-4 text-oc-muted-foreground" />
    </ComboboxPrimitive.Trigger>
  )
}

function ComboboxClear({ className, ...props }: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      className={cn(className)}
      render={<InputGroupButton iconOnly size="Small" variant="Secondary" style="Transparent" />}
      {...props}
    >
      <XIcon className="pointer-events-none size-4" />
    </ComboboxPrimitive.Clear>
  )
}

function ComboboxInput({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}: ComboboxPrimitive.Input.Props & {
  showTrigger?: boolean
  showClear?: boolean
}) {
  const fieldAnchor = useContext(ComboboxFieldAnchorContext)

  return (
    <InputGroup ref={fieldAnchor ?? undefined}>
      <ComboboxPrimitive.Input
        disabled={disabled}
        className={className}
        render={<InputGroupInput disabled={disabled} />}
        {...props}
      />
      {showClear ? (
        <InputGroupAddon align="inline-end" className="has-[[data-slot=combobox-clear]]:px-1">
          <ComboboxClear />
        </InputGroupAddon>
      ) : null}
      {showTrigger ? (
        <InputGroupAddon align="inline-end" className="px-1">
          <ComboboxPrimitive.Trigger
            data-slot="combobox-trigger"
            disabled={disabled}
            render={
              <InputGroupButton
                iconOnly
                size="Small"
                variant="Secondary"
                style="Transparent"
                className="text-oc-muted-foreground data-pressed:bg-transparent"
              />
            }
          >
            <ChevronDownIcon />
          </ComboboxPrimitive.Trigger>
        </InputGroupAddon>
      ) : null}
      {children}
    </InputGroup>
  )
}

function ComboboxContent({
  className,
  side = 'bottom',
  sideOffset = 4,
  align = 'start',
  alignOffset = 0,
  anchor,
  ...props
}: ComboboxPrimitive.Popup.Props &
  Pick<ComboboxPrimitive.Positioner.Props, 'side' | 'align' | 'sideOffset' | 'alignOffset' | 'anchor'>) {
  const fieldAnchor = useContext(ComboboxFieldAnchorContext)

  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        anchor={anchor ?? fieldAnchor ?? undefined}
        className="isolate z-50"
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          data-chips={anchor ? true : undefined}
          className={cn(
            'group/combobox-content relative z-50 max-h-(--available-height) w-(--anchor-width) min-w-(--anchor-width) origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg border border-oc-border bg-oc-background p-2 text-oc-foreground shadow-oc-popup outline-none duration-100 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
            className,
          )}
          {...props}
        />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  )
}

function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn('flex w-full flex-col gap-1 outline-none data-empty:hidden', className)}
      {...props}
    />
  )
}

function ComboboxItem({
  className,
  children,
  variant = 'Default',
  ...props
}: ComboboxPrimitive.Item.Props & {
  variant?: 'Default' | 'Checkbox'
}) {
  const checkbox = variant === 'Checkbox'

  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      data-variant={variant}
      className={cn(
        'group/combobox-item relative flex w-full cursor-pointer items-center gap-2 rounded p-2 text-sm leading-[1.5] text-oc-foreground outline-hidden select-none hover:bg-oc-dark-blue-soft data-highlighted:bg-oc-dark-blue-soft data-selected:bg-oc-info-soft data-selected:hover:bg-oc-info-soft data-selected:data-highlighted:bg-oc-info-soft aria-selected:bg-oc-info-soft aria-selected:hover:bg-oc-info-soft data-disabled:pointer-events-none data-disabled:opacity-50',
        !checkbox && 'pr-8',
        className,
      )}
      {...props}
    >
      {checkbox ? (
        <span
          className={cn(
            checkboxControlVariants(),
            'pointer-events-none shadow-none hover:shadow-none',
            'group-aria-selected/combobox-item:border-oc-primary group-aria-selected/combobox-item:bg-oc-primary group-aria-selected/combobox-item:text-oc-primary-foreground',
            'group-data-selected/combobox-item:border-oc-primary group-data-selected/combobox-item:bg-oc-primary group-data-selected/combobox-item:text-oc-primary-foreground',
          )}
        >
          <ComboboxPrimitive.ItemIndicator className="flex items-center justify-center text-current">
            <CheckIcon className="size-2.5" />
          </ComboboxPrimitive.ItemIndicator>
        </span>
      ) : null}
      {children}
      {checkbox ? null : (
        <ComboboxPrimitive.ItemIndicator className="pointer-events-none absolute right-2 flex items-center justify-center">
          <CheckIcon className="size-4" />
        </ComboboxPrimitive.ItemIndicator>
      )}
    </ComboboxPrimitive.Item>
  )
}

function ComboboxSelectAll({
  className,
  children = 'Select all',
  items: itemsProp,
  ...props
}: ComponentProps<'button'> & {
  items?: readonly unknown[]
}) {
  const context = useContext(ComboboxSelectionContext)
  if (!context) {
    throw new Error('ComboboxSelectAll must be used inside Combobox')
  }

  const all = flattenComboboxItems(itemsProp ?? context.items)
  const selected = Array.isArray(context.value) ? context.value : []
  const allSelected =
    all.length > 0 && all.every((item) => selected.some((value) => Object.is(value, item)))
  const someSelected = selected.length > 0 && !allSelected

  return (
    <button
      type="button"
      data-slot="combobox-select-all"
      data-selected={allSelected || undefined}
      className={cn(
        'flex w-full cursor-pointer items-center gap-2 rounded p-2 text-left text-sm leading-[1.5] text-oc-foreground outline-none hover:bg-oc-dark-blue-soft data-selected:bg-oc-info-soft data-selected:hover:bg-oc-info-soft',
        className,
      )}
      onClick={() => context.setValue(allSelected ? [] : all)}
      {...props}
    >
      <span
        className={cn(
          checkboxControlVariants(),
          'pointer-events-none shadow-none hover:shadow-none',
        )}
        data-checked={allSelected || undefined}
        data-indeterminate={someSelected || undefined}
      >
        {allSelected ? (
          <CheckIcon className="size-2.5" />
        ) : someSelected ? (
          <MinusIcon className="size-2.5" />
        ) : null}
      </span>
      {children}
    </button>
  )
}

function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props) {
  return (
    <ComboboxPrimitive.Group
      data-slot="combobox-group"
      className={cn('flex w-full flex-col gap-1', className)}
      {...props}
    />
  )
}

function ComboboxLabel({ className, ...props }: ComboboxPrimitive.GroupLabel.Props) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      className={cn(
        'px-2 pt-2 pb-1 text-[10px] leading-[18px] font-medium tracking-[0.3px] text-oc-foreground uppercase',
        className,
      )}
      {...props}
    />
  )
}

function ComboboxCollection({ ...props }: ComboboxPrimitive.Collection.Props) {
  return <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
}

function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn(
        'hidden w-full justify-center py-2 text-center text-sm text-oc-muted-foreground group-data-empty/combobox-content:flex',
        className,
      )}
      {...props}
    />
  )
}

function ComboboxSeparator({ className, ...props }: ComboboxPrimitive.Separator.Props) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={cn('pointer-events-none my-1 h-px bg-oc-border', className)}
      {...props}
    />
  )
}

function ComboboxChips({ className, ...props }: ComboboxPrimitive.Chips.Props) {
  return (
    <ComboboxPrimitive.Chips
      data-slot="combobox-chips"
      className={cn(
        'flex min-h-9 w-full cursor-text flex-wrap items-center gap-1 rounded-lg border border-oc-border bg-oc-background px-2 py-1.5 text-sm leading-[1.5] text-oc-foreground shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1.5px_1.5px_rgba(0,0,0,0.09)] outline-none transition-shadow focus-within:border-oc-primary focus-within:shadow-[0_0_0_3px_var(--oc-info-border)] has-aria-invalid:border-oc-destructive has-aria-invalid:shadow-[0_0_0_3px_var(--oc-destructive-border)] has-disabled:bg-oc-muted has-disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

function ComboboxChip({
  className,
  children,
  showRemove = true,
  color = 'Blue',
  style = 'Background',
  ...props
}: ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean
  color?: BadgeColor
  style?: 'Background' | 'Border' | 'Transparent'
}) {
  const resolvedColor = color

  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      className={cn(badgeVariants({ color: resolvedColor, style }), className)}
      {...props}
    >
      {children}
      {showRemove ? (
        <ComboboxPrimitive.ChipRemove
          data-slot="combobox-chip-remove"
          aria-label="Remove"
          className="-mr-0.5 inline-flex size-4.5 cursor-pointer items-center justify-center text-current outline-none"
        >
          <XCircleIcon className="size-4.5" />
        </ComboboxPrimitive.ChipRemove>
      ) : null}
    </ComboboxPrimitive.Chip>
  )
}

function ComboboxChipsInput({ className, ...props }: ComboboxPrimitive.Input.Props) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chip-input"
      className={cn(
        'min-w-12 flex-1 border-0 bg-transparent p-0 text-base leading-[1.5] text-oc-foreground outline-none placeholder:text-oc-muted-foreground md:text-sm',
        className,
      )}
      {...props}
    />
  )
}

function useComboboxAnchor() {
  return useRef<HTMLDivElement>(null)
}

export {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxClear,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSelectAll,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
}
