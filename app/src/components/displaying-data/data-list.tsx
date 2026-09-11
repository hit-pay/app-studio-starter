import type { ComponentProps, ReactNode } from 'react'
import { More1Regular } from '@mingcute/react/core-regular'

import { cn } from '@/lib/utils'
import { CopyButton } from '@ui/actions/copy-button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@ui/overlays/dropdown-menu'

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

type DataListMenuItem = {
  key?: string
  label: string
  destructive?: boolean
  onClick?: () => void
}

type DataListMedia = {
  src: string
  alt?: string
}

type DataListActions = {
  onClick?: () => void
  trailing?: ReactNode
  menu?: DataListMenuItem[]
  hover?: DataListHoverAction[]
}

type DataListItem = {
  key: string
  title: ReactNode
  description?: ReactNode
  badges?: ReactNode
  details?: DataListDetail[]
  tokens?: ReactNode[]
  tokensLabel?: ReactNode
  copyRows?: DataListCopyRow[]
  media?: ReactNode | DataListMedia
  logo?: ReactNode
  meta?: ReactNode
  layout?: DataListLayout
  selected?: boolean
  className?: string
  onClick?: () => void
  trailing?: ReactNode
  menu?: DataListMenuItem[]
  hoverActions?: DataListHoverAction[]
  actions?: DataListActions
}

type DataListProps = Omit<ComponentProps<'div'>, 'children'> & {
  items: DataListItem[]
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
        <DataListCard key={item.key} item={normalizeItem(item)} fallbackLayout={layout} />
      ))}
    </div>
  )
}

type NormalizedItem = DataListItem & {
  onClick?: () => void
  trailing?: ReactNode
  menu?: DataListMenuItem[]
  hoverActions?: DataListHoverAction[]
}

function normalizeItem(item: DataListItem): NormalizedItem {
  return {
    ...item,
    onClick: item.actions?.onClick ?? item.onClick,
    trailing: item.actions?.trailing ?? item.trailing,
    menu: item.actions?.menu ?? item.menu,
    hoverActions: item.actions?.hover ?? item.hoverActions,
  }
}

function DataListCard({
  item,
  fallbackLayout,
}: {
  item: NormalizedItem
  fallbackLayout: DataListLayout
}) {
  const itemLayout = item.layout ?? (hasMedia(item) ? 'media' : fallbackLayout)
  const hoverActions = renderHoverActions(item.hoverActions)
  const moreMenu = renderMenu(item.menu)

  return (
    <div
      data-slot="data-list-item"
      data-selected={item.selected || undefined}
      data-layout={itemLayout}
      className={cn(
        'group/data-list-item relative flex w-auto min-w-0 max-w-full gap-3 rounded-lg border border-solid bg-oc-background px-4 py-3',
        itemLayout === 'stack' && 'flex-col items-stretch gap-4',
        itemLayout === 'media' && 'items-center',
        itemLayout === 'default' && 'items-start',
        item.selected
          ? 'border-2 border-oc-primary'
          : 'border-oc-border hover:shadow-[0_3px_11px_rgba(38,42,50,0.09)]',
        item.onClick && 'cursor-pointer',
        item.className,
      )}
      onClick={item.onClick}
    >
      {itemLayout === 'stack' ? (
        <DataListStackBody item={item} hoverActions={hoverActions} moreMenu={moreMenu} />
      ) : (
        <>
          {hasMedia(item) ? <DataListMediaSlot item={item} /> : null}
          <div
            className={cn(
              'flex min-w-0 flex-1 flex-col gap-3',
              itemLayout === 'media' && 'gap-1',
            )}
          >
            <div className={item.description != null ? 'space-y-1' : undefined}>
              <DataListTitleBlock item={item} />
              {item.description != null ? (
                <p
                  className={cn(
                    'text-xs leading-[1.5] text-oc-foreground',
                    itemLayout === 'media' && 'line-clamp-2',
                  )}
                >
                  {item.description}
                </p>
              ) : null}
            </div>
            <DataListMeta item={item} />
            {itemLayout !== 'media' ? hoverActions : null}
          </div>
          {item.trailing != null || moreMenu != null ? (
            <div className="flex shrink-0 items-center gap-2">
              {moreMenu != null ? <DataListMore menu={moreMenu} /> : null}
              {item.trailing}
            </div>
          ) : null}
        </>
      )}
    </div>
  )
}

function DataListStackBody({
  item,
  hoverActions,
  moreMenu,
}: {
  item: NormalizedItem
  hoverActions: ReactNode
  moreMenu: ReactNode
}) {
  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 flex-wrap items-baseline gap-1">
          <p className="text-sm font-medium leading-[1.5] text-oc-foreground">{item.title}</p>
          {item.meta}
        </div>
        {moreMenu != null ? <DataListMore menu={moreMenu} /> : null}
      </div>
      {item.copyRows?.length ? (
        <div className="space-y-2">
          {item.copyRows.map((row, index) => (
            <DataListCopyRow key={row.key ?? `${row.label}-${index}`} label={row.label} value={row.value} />
          ))}
        </div>
      ) : null}
      {hoverActions}
    </>
  )
}

function DataListMediaSlot({ item }: { item: NormalizedItem }) {
  const media = item.media
  const fromObject = isMediaObject(media)

  return (
    <div className="size-16 shrink-0 overflow-clip rounded-lg border border-oc-border bg-oc-background">
      {fromObject ? (
        <img alt={media.alt ?? ''} className="size-full object-cover" src={media.src} />
      ) : (
        media
      )}
    </div>
  )
}

function DataListTitleBlock({ item }: { item: NormalizedItem }) {
  return (
    <div className="flex min-w-0 flex-wrap items-center gap-2">
      {item.logo != null ? (
        <div className="flex size-10 shrink-0 items-center justify-center rounded bg-oc-dark-blue-soft p-1 [&_svg]:size-8">
          {item.logo}
        </div>
      ) : null}
      <p className="text-sm font-medium leading-[1.5] text-oc-foreground">{item.title}</p>
      {item.badges}
    </div>
  )
}

function DataListMeta({ item }: { item: NormalizedItem }) {
  const hasDetails = Boolean(item.details?.length)
  const hasTokens = Boolean(item.tokens?.length)
  const hasMeta = item.meta != null

  if (!hasDetails && !hasTokens && !hasMeta) return null

  return (
    <div className="flex flex-wrap items-center gap-4">
      {item.details?.map((detail) => (
        <span
          key={detail.key}
          className="inline-flex items-center gap-1 text-xs leading-[1.5] text-oc-foreground"
        >
          {detail.icon ? (
            <span className="inline-flex size-4 shrink-0 [&_svg]:size-4">{detail.icon}</span>
          ) : null}
          {detail.text}
        </span>
      ))}
      {hasTokens ? (
        <div className="flex flex-wrap items-center gap-1">
          {item.tokensLabel != null ? (
            <p className="mr-1 text-xs font-medium text-oc-muted-foreground">{item.tokensLabel}</p>
          ) : null}
          {item.tokens?.map((token, index) => (
            <span
              key={index}
              className="inline-flex h-6 min-w-[35px] items-center justify-center overflow-clip rounded border border-oc-border bg-oc-background px-1 text-[10px] font-medium text-oc-foreground"
            >
              {token}
            </span>
          ))}
        </div>
      ) : null}
      {hasMeta ? <span className="text-xs leading-[1.5] text-oc-muted-foreground">{item.meta}</span> : null}
    </div>
  )
}

function DataListMore({ menu }: { menu: ReactNode }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        nativeButton
        className="inline-flex size-7 items-center justify-center rounded-lg p-0.5 opacity-0 outline-none group-hover/data-list-item:opacity-100"
        render={
          <button type="button" aria-label="More">
            <More1Regular className="size-[22px] text-oc-foreground" />
          </button>
        }
      />
      <DropdownMenuContent align="end">{menu}</DropdownMenuContent>
    </DropdownMenu>
  )
}

function DataListCopyRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-w-0 items-start gap-2 text-xs">
      <span className="shrink-0 font-medium leading-[1.5] text-oc-muted-foreground">{label}</span>
      <span className="group/copy flex min-w-0 items-center gap-2">
        <span className="min-w-0 break-all leading-[1.5] text-oc-foreground">{value}</span>
        <CopyButton
          value={value}
          className="text-oc-foreground opacity-0 group-hover/copy:opacity-100"
        />
      </span>
    </div>
  )
}

function renderMenu(menu?: DataListMenuItem[]) {
  if (!menu?.length) return null

  return (
    <>
      {menu.map((entry, index) => (
        <DropdownMenuItem
          key={entry.key ?? `${entry.label}-${index}`}
          variant={entry.destructive ? 'destructive' : 'default'}
          onClick={(event) => {
            event.stopPropagation()
            entry.onClick?.()
          }}
        >
          {entry.label}
        </DropdownMenuItem>
      ))}
    </>
  )
}

function renderHoverActions(actions?: DataListHoverAction[]) {
  if (!actions?.length) return null

  return (
    <div className="absolute top-3 right-4 z-10 hidden items-center gap-0.5 rounded border border-oc-dark-blue-border bg-oc-background p-0.5 group-hover/data-list-item:flex">
      {actions.map((action, index) => (
        <span key={action.key} className="inline-flex items-center">
          {index > 0 ? <span className="h-4 w-px bg-oc-dark-blue-border" /> : null}
          <button
            type="button"
            aria-label={action.label}
            className={cn(
              'inline-flex size-6 items-center justify-center rounded p-1 outline-none',
              action.destructive ? 'text-oc-destructive' : 'text-oc-foreground',
            )}
            onClick={(event) => {
              event.stopPropagation()
              action.onClick?.()
            }}
          >
            {action.icon}
          </button>
        </span>
      ))}
    </div>
  )
}

function isMediaObject(media: DataListItem['media']): media is DataListMedia {
  return Boolean(media && typeof media === 'object' && 'src' in media && typeof media.src === 'string')
}

function hasMedia(item: DataListItem) {
  return item.media != null
}

export { DataList }
export type {
  DataListActions,
  DataListCopyRow,
  DataListDetail,
  DataListHoverAction,
  DataListItem,
  DataListLayout,
  DataListMedia,
  DataListMenuItem,
  DataListProps,
}
