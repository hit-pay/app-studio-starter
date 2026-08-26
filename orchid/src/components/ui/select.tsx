import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
  type ComponentProps,
  type ReactNode,
} from 'react'
import { Select as SelectPrimitive } from '@base-ui/react/select'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Chip } from './chip'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

const selectTriggerOpenClass =
  'border-primary shadow-[0_0_0_3px_var(--info-border)]'

const selectTriggerClass =
  'flex w-full items-center gap-2 rounded-lg border border-border bg-background px-2 text-left text-sm leading-[1.5] text-foreground shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1.5px_1.5px_rgba(0,0,0,0.09)] outline-none select-none focus-visible:border-primary focus-visible:shadow-[0_0_0_3px_var(--info-border)] aria-expanded:border-primary aria-expanded:shadow-[0_0_0_3px_var(--info-border)] data-popup-open:border-primary data-popup-open:shadow-[0_0_0_3px_var(--info-border)] data-open:border-primary data-open:shadow-[0_0_0_3px_var(--info-border)] disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-50 aria-invalid:border-destructive aria-invalid:shadow-[0_0_0_3px_var(--destructive-border)] data-placeholder:text-[#9295a5]'

const Select = SelectPrimitive.Root

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn('flex w-full flex-col', className)}
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
          ? 'inline-flex h-full w-auto shrink-0 items-center gap-1 border-0 bg-transparent px-0 text-xs font-medium leading-[1.5] text-muted-foreground shadow-none outline-none select-none'
          : cn(selectTriggerClass, 'h-9'),
        className,
      )}
      {...props}
    >
      {children}
      {size === 'Inline' ? <ChevronDownIcon className="size-3.5 text-muted-foreground" /> : null}
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  side = 'bottom',
  sideOffset = 4,
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
            'relative z-50 max-h-(--available-height) w-(--anchor-width) min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg border border-border bg-background p-2 text-foreground shadow-[0_3px_11px_rgba(38,42,50,0.09)] outline-none duration-100 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
            className,
          )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List className="flex w-full flex-col">{children}</SelectPrimitive.List>
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
        'px-2 pt-2 pb-1 text-[10px] leading-[18px] font-medium tracking-[0.3px] text-foreground uppercase',
        className,
      )}
      {...props}
    />
  )
}

function SelectItem({ className, children, ...props }: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        'relative flex w-full cursor-default items-center gap-2 rounded p-2 text-sm leading-[1.5] outline-hidden select-none hover:bg-[#f5f6f9] focus:bg-[#f5f6f9] data-disabled:pointer-events-none data-disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex flex-1 items-center gap-2">
        {children}
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({ className, ...props }: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn('pointer-events-none my-1 h-px bg-border', className)}
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
      className={cn('top-0 z-10 flex w-full items-center justify-center bg-background py-1', className)}
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
        'bottom-0 z-10 flex w-full items-center justify-center bg-background py-1',
        className,
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownArrow>
  )
}

type SelectMultipleContextValue = {
  value: string[]
  toggle: (next: string) => void
  register: (option: string, label: string) => void
  labels: Record<string, string>
}

const SelectMultipleContext = createContext<SelectMultipleContextValue | null>(null)

function useSelectMultiple() {
  const context = useContext(SelectMultipleContext)
  if (!context) {
    throw new Error('SelectMultipleItem must be used inside SelectMultiple')
  }
  return context
}

function SelectMultiple({
  className,
  value,
  defaultValue,
  onValueChange,
  placeholder = 'Placeholder',
  children,
}: {
  className?: string
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  placeholder?: string
  children: ReactNode
}) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue ?? [])
  const [labels, setLabels] = useState<Record<string, string>>({})
  const [open, setOpen] = useState(false)
  const selected = value ?? uncontrolled
  const filled = selected.length > 0

  function commit(next: string[]) {
    setUncontrolled(next)
    onValueChange?.(next)
  }

  function toggle(next: string) {
    commit(selected.includes(next) ? selected.filter((item) => item !== next) : [...selected, next])
  }

  const register = useCallback((option: string, label: string) => {
    setLabels((current) => (current[option] === label ? current : { ...current, [option]: label }))
  }, [])

  return (
    <SelectMultipleContext.Provider value={{ value: selected, toggle, register, labels }}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <button
              type="button"
              data-slot="select-multiple-trigger"
              data-popup-open={open || undefined}
              aria-expanded={open}
              className={cn(
                selectTriggerClass,
                filled ? 'h-auto min-h-9 items-start px-2 py-1.5' : 'h-9',
                open && selectTriggerOpenClass,
                className,
              )}
            />
          }
        >
          {filled ? (
            <span className="flex min-w-0 flex-1 flex-wrap content-start items-start gap-1.5">
              {selected.map((item) => (
                <Chip
                  key={item}
                  color="Blue"
                  type="Background"
                  onRemove={() => commit(selected.filter((valueItem) => valueItem !== item))}
                >
                  {labels[item] ?? item}
                </Chip>
              ))}
            </span>
          ) : (
            <span className="text-[#9295a5]">{placeholder}</span>
          )}
        </PopoverTrigger>
        <PopoverContent
          align="start"
          sideOffset={4}
          className="w-(--anchor-width) min-w-(--anchor-width) gap-0.5 overflow-x-hidden overflow-y-auto border border-border p-2 shadow-[0_3px_11px_rgba(38,42,50,0.09)]"
        >
          {children}
        </PopoverContent>
      </Popover>
    </SelectMultipleContext.Provider>
  )
}

function SelectMultipleGroup({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="select-multiple-group" className={cn('flex w-full flex-col', className)} {...props} />
}

function SelectMultipleLabel({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      data-slot="select-multiple-label"
      className={cn(
        'px-2 pt-2 pb-1 text-[10px] leading-[18px] font-medium tracking-[0.3px] text-foreground uppercase',
        className,
      )}
      {...props}
    />
  )
}

function SelectMultipleItem({
  className,
  value,
  children,
  ...props
}: ComponentProps<'button'> & { value: string }) {
  const { value: selected, toggle, register } = useSelectMultiple()
  const label = typeof children === 'string' ? children : value
  useLayoutEffect(() => {
    register(value, label)
  }, [label, register, value])
  const isSelected = selected.includes(value)

  return (
    <button
      type="button"
      data-slot="select-multiple-item"
      data-selected={isSelected || undefined}
      className={cn(
        'flex w-full items-center rounded p-2 text-left text-sm leading-[1.5] text-foreground outline-none hover:bg-[#f5f6f9] data-selected:bg-[#f5f6f9]',
        isSelected && 'bg-[#f5f6f9]',
        className,
      )}
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        toggle(value)
      }}
      {...props}
    >
      {children}
    </button>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectMultiple,
  SelectMultipleGroup,
  SelectMultipleItem,
  SelectMultipleLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
