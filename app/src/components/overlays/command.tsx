import type { ReactNode } from 'react'
import { Command as CommandPrimitive } from 'cmdk'
import { SearchRegular } from '@mingcute/react/core-regular'

import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@ui/overlays/dialog'
import { InputGroup, InputGroupAddon } from '@ui/form/input-group'

type CommandItem = {
  value: string
  label: ReactNode
  keywords?: string[]
  shortcut?: string
  icon?: ReactNode
  disabled?: boolean
  onSelect?: (value: string) => void
}

type CommandGroup = {
  heading?: string
  items: CommandItem[]
}

function Command({
  open,
  onOpenChange,
  title = 'Command Palette',
  description = 'Search for a command to run...',
  placeholder = 'Search…',
  empty = 'No results',
  groups,
  className,
}: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: string
  description?: string
  placeholder?: string
  empty?: ReactNode
  groups: CommandGroup[]
  className?: string
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        size="medium"
        className={cn('max-h-[min(32rem,80vh)] overflow-hidden p-0', className)}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <CommandPrimitive
          data-slot="command"
          className="flex h-full w-auto min-w-0 max-w-full flex-col overflow-hidden rounded-xl bg-oc-background p-1 text-oc-foreground"
        >
          <div data-slot="command-input-wrapper" className="p-1 pb-0">
            <InputGroup className="h-9 border-oc-border bg-oc-background shadow-none">
              <CommandPrimitive.Input
                data-slot="command-input"
                placeholder={placeholder}
                className="order-2 min-w-0 flex-1 bg-transparent text-sm text-oc-foreground outline-hidden placeholder:text-oc-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              />
              <InputGroupAddon className="order-1 pl-2">
                <SearchRegular className="size-4 shrink-0 opacity-50" />
              </InputGroupAddon>
            </InputGroup>
          </div>
          <CommandPrimitive.List
            data-slot="command-list"
            className="max-h-72 scroll-py-1 overflow-x-hidden overflow-y-auto outline-none"
          >
            <CommandPrimitive.Empty
              data-slot="command-empty"
              className="py-6 text-center text-sm text-oc-muted-foreground"
            >
              {empty}
            </CommandPrimitive.Empty>
            {groups.map((group, groupIndex) => (
              <div key={group.heading ?? groupIndex}>
                {groupIndex > 0 ? (
                  <CommandPrimitive.Separator
                    data-slot="command-separator"
                    className="-mx-1 h-px bg-oc-border"
                  />
                ) : null}
                <CommandPrimitive.Group
                  data-slot="command-group"
                  heading={group.heading}
                  className="overflow-hidden p-1 text-oc-foreground **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:tracking-[0.18em] **:[[cmdk-group-heading]]:text-oc-muted-foreground **:[[cmdk-group-heading]]:uppercase"
                >
                  {group.items.map((item) => (
                    <CommandPrimitive.Item
                      key={item.value}
                      value={item.value}
                      keywords={item.keywords}
                      disabled={item.disabled}
                      data-slot="command-item"
                      className="group/command-item relative flex cursor-pointer items-center gap-2 rounded p-2 text-sm leading-normal text-oc-foreground outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[selected=true]:bg-oc-dark-blue-soft data-[selected=true]:text-oc-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4"
                      onSelect={() => {
                        onOpenChange?.(false)
                        item.onSelect?.(item.value)
                      }}
                    >
                      {item.icon}
                      {item.label}
                      {item.shortcut ? (
                        <span
                          data-slot="command-shortcut"
                          className="ml-auto text-xs tracking-widest text-oc-muted-foreground group-data-[selected=true]/command-item:text-oc-foreground"
                        >
                          {item.shortcut}
                        </span>
                      ) : null}
                    </CommandPrimitive.Item>
                  ))}
                </CommandPrimitive.Group>
              </div>
            ))}
          </CommandPrimitive.List>
        </CommandPrimitive>
      </DialogContent>
    </Dialog>
  )
}

export { Command }
export type { CommandGroup, CommandItem }
