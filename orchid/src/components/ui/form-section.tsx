import type { ComponentProps, ReactNode } from 'react'
import { CircleHelpIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip'

function SectionHint({ hint }: { hint: string }) {
  return (
    <Tooltip>
      <TooltipTrigger
        className="inline-flex size-4 shrink-0 cursor-pointer items-center justify-center text-oc-muted-foreground outline-none"
        aria-label="Info"
      >
        <CircleHelpIcon className="size-4" />
      </TooltipTrigger>
      <TooltipContent>{hint}</TooltipContent>
    </Tooltip>
  )
}

function FormSection({
  className,
  title,
  description,
  badge,
  hint,
  notification,
  actions,
  ...props
}: ComponentProps<'div'> & {
  title: string
  description?: string
  badge?: ReactNode
  hint?: string
  notification?: number | string
  actions?: ReactNode
}) {
  return (
    <div
      data-slot="form-section"
      className={cn('flex w-full min-w-0 items-center gap-8', className)}
      {...props}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <h2 className="text-base font-medium leading-[1.4] text-oc-foreground">{title}</h2>
          {notification != null ? (
            <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-oc-destructive text-[10px] font-medium leading-[18px] tracking-[0.3px] text-white uppercase">
              {notification}
            </span>
          ) : null}
          {hint ? <SectionHint hint={hint} /> : null}
          {badge ? badge : null}
        </div>
        {description ? (
          <p className="min-w-0 text-xs leading-[1.5] text-oc-muted-foreground">{description}</p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">{actions}</div>
      ) : null}
    </div>
  )
}

function FormSectionItem({
  className,
  title,
  description,
  badge,
  hint,
  type = 'Default',
  actions,
  children,
  ...props
}: ComponentProps<'div'> & {
  title: string
  description?: string
  badge?: ReactNode
  hint?: string
  type?: 'Default' | 'Background'
  actions?: ReactNode
}) {
  return (
    <div
      data-slot="form-section-item"
      data-type={type}
      className={cn(
        'flex w-full min-w-0 flex-col gap-2',
        type === 'Background' && 'rounded-lg bg-oc-muted p-3',
        className,
      )}
      {...props}
    >
      <div className="flex w-full min-w-0 items-start gap-6">
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <p className="text-sm font-medium leading-[1.5] text-oc-foreground">{title}</p>
            {hint ? <SectionHint hint={hint} /> : null}
            {badge ? badge : null}
          </div>
          {description ? (
            <p className="min-w-0 text-xs leading-[1.5] text-oc-muted-foreground">{description}</p>
          ) : null}
        </div>
        {actions ? <div className="flex shrink-0 items-center pt-0.5">{actions}</div> : null}
      </div>
      {children ? <div className="min-w-0 w-full">{children}</div> : null}
    </div>
  )
}

function FormSectionGroup({ className, ...props }: ComponentProps<'section'>) {
  return (
    <section
      data-slot="form-section-group"
      className={cn('flex w-full min-w-0 flex-col gap-4', className)}
      {...props}
    />
  )
}

export { FormSection, FormSectionGroup, FormSectionItem }
