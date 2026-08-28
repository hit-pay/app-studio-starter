import type { ComponentProps, ReactNode } from 'react'
import { cva } from 'class-variance-authority'
import { PencilIcon, UserPlusIcon, XCircleIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import { Button } from './button'
import { Badge } from './badge'
import { CopyButton } from './copy-button'
import { Skeleton } from './skeleton'

type CustomerCardAddress = {
  street?: string
  city?: string
  state?: string
  postal_code?: string
  country?: string
}

type CustomerCardData = {
  name?: string
  email?: string
  phone?: string
  phoneCountryCode?: string
  src?: string
  currency?: string
  bank_name?: string
  bank_account_number?: string
  address?: CustomerCardAddress
}

const customerCardVariants = cva(
  'group/customer-card relative flex w-full rounded-lg border border-solid border-oc-border bg-oc-background',
  {
    variants: {
      variant: {
        Small: 'flex-row items-center gap-2 px-3 py-2',
        Big: 'flex-col items-start justify-center gap-2 p-3',
        Float: 'flex-col items-start justify-center gap-2 p-3 shadow-[0_3px_11px_rgba(38,42,50,0.09)]',
        Empty: 'flex-col items-start justify-center gap-2 px-3 py-4',
      },
      hover: {
        true: 'transition-shadow hover:shadow-[0_3px_11px_rgba(38,42,50,0.09)]',
        false: '',
      },
      active: {
        true: 'border-2 border-oc-primary',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'Small',
      hover: false,
      active: false,
    },
  },
)

function formatPhone(customer: CustomerCardData) {
  const phone = customer.phone
  const code = customer.phoneCountryCode
  if (code && phone && !phone.includes('+')) return `+${code} ${phone}`
  if (phone) return phone
  return '-'
}

function formatAddress(address?: CustomerCardAddress) {
  if (!address) return '-'
  const street = address.street?.trim()
  const rest = [address.city, address.state, address.postal_code, address.country]
    .filter(Boolean)
    .join(' ')
    .trim()
  if (street && rest) {
    return (
      <>
        {street}
        <br />
        {rest}
      </>
    )
  }
  return street || rest || '-'
}

function DetailRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex w-full min-w-0 items-start gap-4">
      <span className="w-20 shrink-0 text-xs leading-[1.5] text-oc-muted-foreground">{label}</span>
      <span className="min-w-0 flex-1 text-xs leading-[1.5] text-oc-foreground">{children}</span>
    </div>
  )
}

function CustomerCardSkeleton({ expanded }: { expanded: boolean }) {
  return (
    <div className="flex w-full flex-col gap-2" aria-hidden>
      <div className={cn('flex items-center gap-2', expanded && 'w-full min-w-0')}>
        <Skeleton className="size-8 shrink-0 rounded-full" />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-3.5 w-full" />
        </div>
      </div>
      {expanded ? (
        <div className="flex w-full min-w-0 flex-col gap-3 pt-3">
          <div className="flex w-full items-center gap-4">
            <Skeleton className="h-3.5 w-20 shrink-0" />
            <Skeleton className="h-3.5 flex-1" />
          </div>
          <div className="flex w-full items-start gap-4">
            <Skeleton className="h-3.5 w-20 shrink-0" />
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <Skeleton className="h-3.5 w-full" />
              <Skeleton className="h-3.5 w-2/3" />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function CustomerCard({
  className,
  variant = 'Small',
  customer,
  hover = false,
  edit = false,
  closable = false,
  beneficiary = false,
  active = false,
  loading = false,
  avatar = true,
  badge,
  leading,
  bottom,
  onAdd,
  onEdit,
  onClose,
  ...props
}: ComponentProps<'div'> & {
  variant?: 'Small' | 'Big' | 'Float' | 'Empty'
  customer?: CustomerCardData | null
  hover?: boolean
  edit?: boolean
  closable?: boolean
  beneficiary?: boolean
  active?: boolean
  loading?: boolean
  avatar?: boolean
  badge?: ReactNode
  leading?: ReactNode
  bottom?: ReactNode
  onAdd?: () => void
  onEdit?: () => void
  onClose?: () => void
}) {
  const empty = !loading && (variant === 'Empty' || !customer)
  const expanded = variant === 'Big' || variant === 'Float'
  const phone = customer ? formatPhone(customer) : '-'

  return (
    <div
      data-slot="customer-card"
      data-variant={empty ? 'Empty' : variant}
      data-active={active || undefined}
      className={cn(
        customerCardVariants({
          variant: empty ? 'Empty' : variant,
          hover: hover && !active && !empty,
          active: active && !empty,
        }),
        className,
      )}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <CustomerCardSkeleton expanded={expanded} />
      ) : empty || !customer ? (
        <>
          <div className="flex w-full flex-col items-center justify-center gap-2">
            {avatar ? (
              <span className="inline-flex size-8 items-center justify-center rounded-full border border-solid border-oc-neutral-border bg-oc-neutral-strong text-oc-primary-foreground">
                <UserPlusIcon className="size-4" />
              </span>
            ) : null}
            <div className="flex w-full flex-col text-center font-medium">
              <span className="text-sm leading-[1.5] text-oc-foreground">No customer attached</span>
              <span className="text-xs leading-[1.5] text-oc-muted-foreground">
                Add customer detail to this transaction
              </span>
            </div>
          </div>
          <Button variant="Secondary" size="Small"  className="w-full" onClick={onAdd}>
            Add customer
          </Button>
        </>
      ) : (
        <>
          <div className={cn('flex items-center gap-2', expanded && 'w-full min-w-0')}>
            {avatar ? (
              <Avatar className="text-sm leading-5">
                {customer.src ? <AvatarImage src={customer.src} alt="" /> : null}
                <AvatarFallback>
                  {(customer.name?.[0] ?? 'A').toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ) : null}
            <div className="flex min-w-0 flex-1 flex-col items-start">
              <div className="flex min-w-0 items-start gap-1">
                <span className="min-w-0 truncate text-sm font-medium leading-[1.5] text-oc-foreground">
                  {customer.name || '-'}
                </span>
                {badge ? badge : null}
                {beneficiary && customer.currency ? (
                  <Badge color="Blue">{customer.currency.toUpperCase()}</Badge>
                ) : null}
              </div>
              <span className="min-w-0 truncate text-xs font-medium leading-[1.5] text-oc-muted-foreground">
                {beneficiary
                  ? [customer.bank_name, customer.bank_account_number].filter(Boolean).join(' / ')
                  : customer.email || formatPhone(customer)}
              </span>
            </div>
          </div>

          {expanded ? (
            <div className="flex w-full min-w-0 flex-col gap-3 pt-3">
              {beneficiary ? (
                <DetailRow label="Email">{customer.email ?? '-'}</DetailRow>
              ) : (
                <>
                  <DetailRow label="Phone">
                    <span className="inline-flex min-w-0 items-center gap-0.5">
                      <span>{phone}</span>
                      {phone !== '-' ? <CopyButton value={phone} className="size-3.5" /> : null}
                    </span>
                  </DetailRow>
                  <DetailRow label="Address">{formatAddress(customer.address)}</DetailRow>
                </>
              )}
            </div>
          ) : null}

          {bottom ? (
            <div
              className={cn(
                'flex w-full flex-col items-center justify-center',
                hover && 'opacity-0 group-hover/customer-card:opacity-100',
              )}
            >
              {bottom}
            </div>
          ) : null}
        </>
      )}

      {edit && !empty && !loading ? (
        <div
          className={cn(
            'absolute top-1.5 right-1.5',
            hover && 'opacity-0 transition-opacity group-hover/customer-card:opacity-100',
          )}
        >
          <Button
            variant="Secondary"
            size="Small"
            iconOnly
            
            aria-label="Edit"
            onClick={onEdit}
          >
            <PencilIcon />
          </Button>
        </div>
      ) : null}

      {closable && !empty ? (
        <button
          type="button"
          aria-label="Close"
          className="-top-1 -right-1 absolute cursor-pointer rounded-full bg-oc-background text-oc-muted-foreground outline-none hover:text-oc-destructive-strong"
          onClick={onClose}
        >
          <XCircleIcon className="size-[18px] fill-oc-background" />
        </button>
      ) : null}

      {leading ? <div className="shrink-0">{leading}</div> : null}
    </div>
  )
}

export { CustomerCard }
export type { CustomerCardAddress, CustomerCardData }
