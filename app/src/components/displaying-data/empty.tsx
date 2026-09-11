import type { ComponentProps, ReactNode } from 'react'
import { cva } from 'class-variance-authority'
import {
  AlertRegular,
  FileRegular,
  SearchRegular,
} from '@mingcute/react/core-regular'

import { cn } from '@/lib/utils'
import { Button } from '@ui/actions/button'

type EmptyMedia = 'icon' | 'search' | 'upgrade'

type EmptyAction = {
  key: string
  label: string
  variant?: ComponentProps<typeof Button>['variant']
  disabled?: boolean
  icon?: ReactNode
}

type EmptyProps = Omit<ComponentProps<'div'>, 'title'> & {
  title: string
  description?: string
  media?: EmptyMedia
  icon?: ReactNode
  actions?: EmptyAction[]
  onAction?: (action: EmptyAction) => void
}

const emptyMediaVariants = cva(
  'mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        icon: 'size-16 rounded-full border border-oc-neutral-soft bg-oc-neutral text-oc-muted-foreground [&_svg:not([class*=size-])]:size-8',
        search:
          'size-16 rounded-full border border-oc-neutral-soft bg-oc-neutral text-oc-muted-foreground [&_svg:not([class*=size-])]:size-8',
        upgrade:
          'size-16 rounded-full border border-oc-warning-chip-border bg-oc-warning-soft text-oc-warning [&_svg:not([class*=size-])]:size-8',
      },
    },
  },
)

function defaultMediaIcon(media: EmptyMedia) {
  if (media === 'search') return <SearchRegular />
  if (media === 'upgrade') return <AlertRegular />
  return <FileRegular />
}

function Empty({
  title,
  description,
  media,
  icon,
  actions,
  onAction,
  className,
  ...props
}: EmptyProps) {
  const mediaIcon = media ? (icon ?? defaultMediaIcon(media)) : icon
  const rowActions = (actions?.length ?? 0) > 1

  return (
    <div
      data-slot="empty"
      className={cn(
        'flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-xl p-6 text-center text-balance',
        className,
      )}
      {...props}
    >
      <div data-slot="empty-header" className="flex max-w-sm flex-col items-center gap-2">
        {mediaIcon ? (
          <div
            data-slot="empty-icon"
            data-variant={media ?? 'icon'}
            className={emptyMediaVariants({ variant: media ?? 'icon' })}
          >
            {mediaIcon}
          </div>
        ) : null}
        <div data-slot="empty-title" className="text-base leading-6 font-medium text-oc-foreground">
          {title}
        </div>
        {description ? (
          <p
            data-slot="empty-description"
            className="text-sm leading-normal text-oc-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-oc-primary"
          >
            {description}
          </p>
        ) : null}
      </div>
      {actions?.length ? (
        <div
          data-slot="empty-content"
          className={cn(
            'flex w-full max-w-sm min-w-0 items-center gap-2.5 text-sm text-balance',
            rowActions ? 'flex-row justify-center' : 'flex-col',
          )}
        >
          {actions.map((action) => (
            <Button
              key={action.key}
              variant={action.variant ?? 'default'}
              size="sm"
              disabled={action.disabled}
              onClick={() => onAction?.(action)}
            >
              {action.icon}
              {action.label}
            </Button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export { Empty }
export type { EmptyAction, EmptyMedia, EmptyProps }
