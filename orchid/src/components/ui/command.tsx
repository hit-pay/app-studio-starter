import {
  createContext,
  useCallback,
  useContext,
  useId,
  useLayoutEffect,
  useMemo,
  useState,
  type ComponentProps,
  type ReactNode,
} from 'react'
import { SearchIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Dialog, DialogContent, DialogTrigger } from './dialog'
import { inputSurface } from './input'

type CommandContextValue = {
  query: string
  setQuery: (next: string) => void
  register: (id: string, match: boolean) => void
  visible: number
}

const CommandContext = createContext<CommandContextValue | null>(null)

function useCommand() {
  const context = useContext(CommandContext)
  if (!context) throw new Error('Command parts must be used inside Command')
  return context
}

function matchesQuery(query: string, value: string, keywords?: string) {
  const needle = query.trim().toLowerCase()
  if (!needle) return true
  const haystack = `${value} ${keywords ?? ''}`.toLowerCase()
  return haystack.includes(needle)
}

function Command({ className, ...props }: ComponentProps<'div'>) {
  const [query, setQuery] = useState('')
  const [matches, setMatches] = useState<Record<string, boolean>>({})

  const register = useCallback((id: string, match: boolean) => {
    setMatches((current) => {
      if (current[id] === match) return current
      return { ...current, [id]: match }
    })
  }, [])

  const visible = Object.values(matches).filter(Boolean).length

  const value = useMemo<CommandContextValue>(
    () => ({ query, setQuery, register, visible }),
    [query, register, visible],
  )

  return (
    <CommandContext.Provider value={value}>
      <div
        data-slot="command"
        className={cn('flex min-h-0 w-full flex-col', className)}
        {...props}
      />
    </CommandContext.Provider>
  )
}

function CommandDialog({
  title = 'Command',
  children,
  trigger,
  ...props
}: Omit<ComponentProps<typeof Dialog>, 'children'> & {
  title?: string
  trigger?: ReactNode
  children?: ReactNode
}) {
  return (
    <Dialog {...props}>
      {trigger ? <DialogTrigger render={trigger as never} /> : null}
      <DialogContent
        title={title}
        header={false}
        footer={false}
        size="Medium"
        className="max-h-[min(32rem,80vh)]"
      >
        <div className="-m-6">{children}</div>
      </DialogContent>
    </Dialog>
  )
}

function CommandInput({
  className,
  value,
  onValueChange,
  ...props
}: Omit<ComponentProps<'input'>, 'type' | 'value' | 'onChange'> & {
  value?: string
  onValueChange?: (next: string) => void
}) {
  const { query, setQuery } = useCommand()

  return (
    <div
      data-slot="command-input-wrap"
      className="flex items-center gap-2 border-b border-solid border-oc-border px-3"
    >
      <SearchIcon className="size-4 shrink-0 text-oc-muted-foreground" />
      <input
        data-slot="command-input"
        type="search"
        value={value ?? query}
        onChange={(event) => {
          const next = event.target.value
          setQuery(next)
          onValueChange?.(next)
        }}
        className={cn(
          inputSurface,
          'h-11 border-0 bg-transparent px-0 shadow-none focus-visible:border-0 focus-visible:shadow-none',
          className,
        )}
        {...props}
      />
    </div>
  )
}

function CommandList({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="command-list"
      className={cn('max-h-80 min-h-0 overflow-y-auto p-2', className)}
      {...props}
    />
  )
}

function CommandEmpty({ className, ...props }: ComponentProps<'p'>) {
  const { visible, query } = useCommand()
  if (!query.trim() || visible > 0) return null

  return (
    <p
      data-slot="command-empty"
      className={cn('px-2 py-6 text-center text-sm text-oc-muted-foreground', className)}
      {...props}
    />
  )
}

function CommandGroup({
  className,
  heading,
  children,
  ...props
}: ComponentProps<'div'> & {
  heading?: string
}) {
  return (
    <div data-slot="command-group" className={cn('flex flex-col gap-1 p-1', className)} {...props}>
      {heading ? (
        <p className="px-2 py-1 text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          {heading}
        </p>
      ) : null}
      {children}
    </div>
  )
}

function CommandSeparator({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="command-separator"
      className={cn('my-1 h-px w-full bg-oc-border', className)}
      {...props}
    />
  )
}

function CommandItem({
  className,
  value,
  keywords,
  onSelect,
  children,
  ...props
}: Omit<ComponentProps<'button'>, 'value' | 'onSelect'> & {
  value: string
  keywords?: string
  onSelect?: (value: string) => void
}) {
  const id = useId()
  const { query, register } = useCommand()
  const match = matchesQuery(query, value, keywords)

  useLayoutEffect(() => {
    register(id, match)
    return () => register(id, false)
  }, [id, match, register])

  if (!match) return null

  return (
    <button
      type="button"
      data-slot="command-item"
      className={cn(
        'flex w-full cursor-pointer items-center gap-2 rounded p-2 text-left text-sm leading-[1.5] text-oc-foreground outline-none hover:bg-oc-dark-blue-soft',
        className,
      )}
      {...props}
      onClick={(event) => {
        props.onClick?.(event)
        onSelect?.(value)
      }}
    >
      {children}
    </button>
  )
}

function CommandShortcut({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn('ml-auto text-xs text-oc-muted-foreground', className)}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
}
