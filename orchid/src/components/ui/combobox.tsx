import { useRef } from 'react'
import { Combobox as ComboboxPrimitive } from '@base-ui/react/combobox'
import { CheckIcon, ChevronDownIcon, XCircleIcon, XIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { chipVariants } from './chip'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from './input-group'

const Combobox = ComboboxPrimitive.Root

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
      render={<InputGroupButton iconOnly size="Small" type="Secondary" style="Transparent" />}
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
  return (
    <InputGroup>
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
                type="Secondary"
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
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className="isolate z-50"
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          data-chips={anchor ? true : undefined}
          className={cn(
            'group/combobox-content relative z-50 max-h-(--available-height) w-(--anchor-width) min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg border border-oc-border bg-oc-background p-2 text-oc-foreground shadow-[0_3px_11px_rgba(38,42,50,0.09)] outline-none duration-100 data-[chips=true]:min-w-(--anchor-width) data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
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

function ComboboxItem({ className, children, ...props }: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={cn(
        'relative flex w-full cursor-pointer items-center gap-2 rounded p-2 pr-8 text-sm leading-[1.5] outline-hidden select-none hover:bg-[#f5f6f9] data-highlighted:bg-[#f5f6f9] data-disabled:pointer-events-none data-disabled:opacity-50',
        className,
      )}
      {...props}
    >
      {children}
      <ComboboxPrimitive.ItemIndicator className="pointer-events-none absolute right-2 flex items-center justify-center">
        <CheckIcon className="size-4" />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
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
  ...props
}: ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean
}) {
  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      className={cn(chipVariants({ color: 'Blue', type: 'Background' }), className)}
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
        'min-w-12 flex-1 border-0 bg-transparent p-0 text-sm leading-[1.5] text-oc-foreground outline-none placeholder:text-[#9295a5]',
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
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
}
