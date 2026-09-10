import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@/lib/utils'
import {
  ListItem,
  ListItemAction,
  ListItemActionDivider,
  ListItemBody,
  ListItemCopyRow,
  ListItemDescription,
  ListItemDetail,
  ListItemHoverActions,
  ListItemLogo,
  ListItemMedia,
  ListItemMeta,
  ListItemMore,
  ListItemTitle,
  ListItemToken,
  ListItemTrailing,
} from '@/base-ui/displaying-data/list'

type DataListLayout = 'default' | 'stack' | 'media'

type DataListDetail = {
  key: string
  text: ReactNode
  icon?: ReactNode
}

type DataListCopyRow = {
  key?: string
  label: string
  value: string
}

type DataListHoverAction = {
  key: string
  label: string
  icon?: ReactNode
  destructive?: boolean
  onClick?: () => void
}

type DataListRow = {
  key: string
  title: ReactNode
  description?: ReactNode
  badges?: ReactNode
  details?: DataListDetail[]
  tokens?: ReactNode[]
  tokensLabel?: ReactNode
  copyRows?: DataListCopyRow[]
  media?: ReactNode
  mediaSrc?: string
  mediaAlt?: string
  logo?: ReactNode
  trailing?: ReactNode
  moreMenu?: ReactNode
  hoverActions?: DataListHoverAction[]
  meta?: ReactNode
  layout?: DataListLayout
  selected?: boolean
  className?: string
  onClick?: () => void
}

type DataListProps = Omit<ComponentProps<'div'>, 'children'> & {
  items: DataListRow[]
  layout?: DataListLayout
  empty?: ReactNode
}

function DataList({ className, items, layout = 'default', empty, ...props }: DataListProps) {
  if (items.length === 0 && empty != null) {
    return (
      <div data-slot="data-list" className={cn('flex w-full min-w-0 flex-col gap-3', className)} {...props}>
        {empty}
      </div>
    )
  }

  return (
    <div data-slot="data-list" className={cn('flex w-full min-w-0 flex-col gap-3', className)} {...props}>
      {items.map((item) => (
        <DataListCard key={item.key} item={item} fallbackLayout={layout} />
      ))}
    </div>
  )
}

function DataListCard({
  item,
  fallbackLayout,
}: {
  item: DataListRow
  fallbackLayout: DataListLayout
}) {
  const itemLayout = item.layout ?? (hasMedia(item) ? 'media' : fallbackLayout)
  const hoverActions = renderHoverActions(item.hoverActions)

  return (
    <ListItem
      layout={itemLayout}
      selected={item.selected}
      className={cn(item.onClick && 'cursor-pointer', item.className)}
      onClick={item.onClick}
    >
      {itemLayout === 'stack' ? (
        <DataListStackBody item={item} hoverActions={hoverActions} />
      ) : (
        <>
          {hasMedia(item) ? (
            <ListItemMedia>
              {item.media ?? (
                <img alt={item.mediaAlt ?? ''} className="size-full object-cover" src={item.mediaSrc} />
              )}
            </ListItemMedia>
          ) : null}
          <ListItemBody className={itemLayout === 'media' ? 'gap-1' : undefined}>
            <div className={item.description != null ? 'space-y-1' : undefined}>
              <DataListTitleBlock item={item} />
              {item.description != null ? (
                <ListItemDescription className={itemLayout === 'media' ? 'line-clamp-2' : undefined}>
                  {item.description}
                </ListItemDescription>
              ) : null}
            </div>
            <DataListMeta item={item} />
            {itemLayout !== 'media' ? hoverActions : null}
          </ListItemBody>
          {item.trailing != null || item.moreMenu != null ? (
            <ListItemTrailing>
              {item.moreMenu != null ? <ListItemMore menu={item.moreMenu} /> : null}
              {item.trailing}
            </ListItemTrailing>
          ) : null}
        </>
      )}
    </ListItem>
  )
}

function DataListStackBody({
  item,
  hoverActions,
}: {
  item: DataListRow
  hoverActions: ReactNode
}) {
  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 flex-wrap items-baseline gap-1">
          <ListItemTitle>{item.title}</ListItemTitle>
          {item.meta}
        </div>
        {item.moreMenu != null ? <ListItemMore menu={item.moreMenu} /> : null}
      </div>
      {item.copyRows?.length ? (
        <div className="space-y-2">
          {item.copyRows.map((row, index) => (
            <ListItemCopyRow key={row.key ?? `${row.label}-${index}`} label={row.label} value={row.value} />
          ))}
        </div>
      ) : null}
      {hoverActions}
    </>
  )
}

function DataListTitleBlock({ item }: { item: DataListRow }) {
  return (
    <div className="flex min-w-0 flex-wrap items-center gap-2">
      {item.logo != null ? <ListItemLogo>{item.logo}</ListItemLogo> : null}
      <ListItemTitle>{item.title}</ListItemTitle>
      {item.badges}
    </div>
  )
}

function DataListMeta({ item }: { item: DataListRow }) {
  const hasDetails = Boolean(item.details?.length)
  const hasTokens = Boolean(item.tokens?.length)
  const hasMeta = item.meta != null

  if (!hasDetails && !hasTokens && !hasMeta) return null

  return (
    <ListItemMeta>
      {item.details?.map((detail) => (
        <ListItemDetail key={detail.key} icon={detail.icon}>
          {detail.text}
        </ListItemDetail>
      ))}
      {hasTokens ? (
        <div className="flex flex-wrap items-center gap-1">
          {item.tokensLabel != null ? (
            <p className="mr-1 text-xs font-medium text-oc-muted-foreground">{item.tokensLabel}</p>
          ) : null}
          {item.tokens?.map((token, index) => (
            <ListItemToken key={index}>{token}</ListItemToken>
          ))}
        </div>
      ) : null}
      {hasMeta ? <span className="text-xs leading-[1.5] text-oc-muted-foreground">{item.meta}</span> : null}
    </ListItemMeta>
  )
}

function renderHoverActions(actions?: DataListHoverAction[]) {
  if (!actions?.length) return null

  return (
    <ListItemHoverActions>
      {actions.map((action, index) => (
        <span key={action.key} className="inline-flex items-center">
          {index > 0 ? <ListItemActionDivider /> : null}
          <ListItemAction
            aria-label={action.label}
            destructive={action.destructive}
            onClick={(event) => {
              event.stopPropagation()
              action.onClick?.()
            }}
          >
            {action.icon}
          </ListItemAction>
        </span>
      ))}
    </ListItemHoverActions>
  )
}

function hasMedia(item: DataListRow) {
  return item.media != null || Boolean(item.mediaSrc)
}

export { DataList }
export type {
  DataListCopyRow,
  DataListDetail,
  DataListHoverAction,
  DataListLayout,
  DataListProps,
  DataListRow,
}
