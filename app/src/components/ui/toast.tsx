import * as React from 'react'
import { Toast as ToastPrimitive } from '@base-ui/react/toast'
import {
  CheckIcon,
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from 'lucide-react'

import { cn } from '@/lib/utils'

const toast = ToastPrimitive.createToastManager()

const TYPE_TO_COLOR: Record<string, string> = {
  success: 'border-success-border bg-success-soft text-success',
  info: 'border-info-border bg-info-soft text-primary',
  warning: 'border-warning-border bg-warning-soft text-warning',
  error: 'border-destructive-border bg-destructive-soft text-destructive',
  loading: 'border-neutral-border bg-neutral-soft text-muted-foreground',
}

function snackbarColor(type: string | undefined) {
  return TYPE_TO_COLOR[type ?? ''] ?? 'border-success-border bg-success-soft text-success'
}

function ToastProvider({ ...props }: ToastPrimitive.Provider.Props) {
  return <ToastPrimitive.Provider {...props} />
}

function ToastPortal({ ...props }: ToastPrimitive.Portal.Props) {
  return <ToastPrimitive.Portal data-slot="toast-portal" {...props} />
}

function ToastViewport({ className, ...props }: ToastPrimitive.Viewport.Props) {
  return (
    <ToastPrimitive.Viewport
      data-slot="toast-viewport"
      className={cn(
        'pointer-events-none fixed top-4 left-1/2 z-50 w-[min(calc(100vw-2rem),24rem)] -translate-x-1/2 outline-none',
        className,
      )}
      {...props}
    />
  )
}

function Toast({ className, swipeDirection = ['up', 'left', 'right'], ...props }: ToastPrimitive.Root.Props) {
  return (
    <ToastPrimitive.Root
      data-slot="toast"
      swipeDirection={swipeDirection}
      className={cn(
        'group/toast pointer-events-auto absolute top-0 left-0 z-[calc(1000-var(--toast-index))] w-full origin-top rounded-lg bg-transparent shadow-none will-change-transform outline-none select-none',
        '[--gap:0.75rem] [--height:var(--toast-frontmost-height,var(--toast-height))] [--offset-y:calc(var(--toast-offset-y)+calc(var(--toast-index)*var(--gap))+var(--toast-swipe-movement-y))] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))]',
        'h-(--height) [transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)+(var(--toast-index)*var(--peek))+(var(--shrink)*var(--height))))_scale(var(--scale))] [transition:transform_500ms_cubic-bezier(0.22,1,0.36,1),opacity_500ms,height_150ms]',
        "after:absolute after:bottom-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
        'data-expanded:h-(--toast-height) data-expanded:[transform:translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))]',
        'data-limited:opacity-0 data-starting-style:[transform:translateY(-150%)]',
        '[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(-150%)]',
        'data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]',
        'data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]',
        'data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]',
        'data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]',
        'data-expanded:data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]',
        'data-expanded:data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]',
        'data-expanded:data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]',
        'data-expanded:data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]',
        className,
      )}
      {...props}
    />
  )
}

function ToastContent({ className, ...props }: ToastPrimitive.Content.Props) {
  return (
    <ToastPrimitive.Content
      data-slot="toast-content"
      className={cn(
        'flex w-full items-start overflow-visible p-0 transition-opacity duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] data-behind:opacity-0 data-expanded:opacity-100',
        className,
      )}
      {...props}
    />
  )
}

function ToastTitle({ className, ...props }: ToastPrimitive.Title.Props) {
  return (
    <ToastPrimitive.Title
      data-slot="toast-title"
      className={cn('text-sm font-medium text-foreground', className)}
      {...props}
    />
  )
}

function ToastDescription({ className, ...props }: ToastPrimitive.Description.Props) {
  return (
    <ToastPrimitive.Description
      data-slot="toast-description"
      className={cn('text-sm text-foreground', className)}
      {...props}
    />
  )
}

function ToastAction({
  className,
  render = (
    <button
      type="button"
      className="inline-flex h-7 shrink-0 items-center rounded-lg border border-border bg-background px-2.5 text-xs font-medium"
    />
  ),
  ...props
}: ToastPrimitive.Action.Props) {
  return (
    <ToastPrimitive.Action
      data-slot="toast-action"
      render={render}
      className={cn('shrink-0', className)}
      {...props}
    />
  )
}

function ToastIcon({ type }: { type: string | undefined }) {
  let icon: React.ReactNode = <CheckIcon aria-hidden="true" />

  if (type === 'success') icon = <CircleCheckIcon aria-hidden="true" />
  if (type === 'info') icon = <InfoIcon aria-hidden="true" />
  if (type === 'warning') icon = <TriangleAlertIcon aria-hidden="true" />
  if (type === 'error') icon = <OctagonXIcon aria-hidden="true" />
  if (type === 'loading') icon = <Loader2Icon className="animate-spin" aria-hidden="true" />

  return (
    <span className="inline-flex size-6 shrink-0 items-center justify-center [&_svg]:size-6">
      {icon}
    </span>
  )
}

function ToastList() {
  const { toasts } = ToastPrimitive.useToastManager()

  return toasts.map((toastItem) => {
    const hasTitle = Boolean(toastItem.title)
    const hasDescription = Boolean(toastItem.description)
    const compact = !(hasTitle && hasDescription)
    const hasAction = Boolean(toastItem.actionProps)

    return (
      <Toast key={toastItem.id} toast={toastItem}>
        <ToastContent>
          <div
            role="status"
            className={cn(
              'relative mx-auto flex w-fit max-w-full flex-nowrap items-center rounded-lg border border-solid text-foreground shadow-[0_8px_6px_rgba(42,50,82,0.04)]',
              snackbarColor(toastItem.type),
              compact ? 'gap-1 py-2 pr-3 pl-2 text-xs' : 'gap-3 py-3 pr-4 pl-3 text-sm',
            )}
          >
            <ToastIcon type={toastItem.type} />
            <div className="flex shrink-0 flex-col gap-0.5 whitespace-nowrap">
              {hasTitle ? <ToastTitle className={cn(compact && 'text-xs font-normal')} /> : null}
              {hasDescription ? <ToastDescription className={cn(compact && 'text-xs')} /> : null}
            </div>
            {hasAction ? (
              <div className="ml-1 shrink-0">
                <ToastAction />
              </div>
            ) : null}
          </div>
        </ToastContent>
      </Toast>
    )
  })
}

function Toaster({
  children,
  toastManager = toast,
  ...props
}: ToastPrimitive.Provider.Props) {
  return (
    <ToastProvider toastManager={toastManager} {...props}>
      {children}
      <ToastPortal>
        <ToastViewport>
          <ToastList />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  )
}

const createToastManager = ToastPrimitive.createToastManager
const useToastManager = ToastPrimitive.useToastManager

export {
  Toaster,
  Toast,
  ToastAction,
  ToastContent,
  ToastDescription,
  ToastPortal,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  createToastManager,
  toast,
  useToastManager,
}
