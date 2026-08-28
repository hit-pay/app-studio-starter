'use client'

import * as React from 'react'
import { Toast as ToastPrimitive } from '@base-ui/react/toast'
import {
  CheckIcon,
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
  XIcon,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const TOAST_BAR_COLOR: Record<string, string> = {
  Default:
    'border-oc-success-border bg-oc-success-soft [&_[data-slot=toast-bar-icon]]:text-oc-success',
  Blue: 'border-oc-info-border bg-oc-info-soft [&_[data-slot=toast-bar-icon]]:text-oc-primary',
  Red: 'border-oc-destructive-border bg-oc-destructive-soft [&_[data-slot=toast-bar-icon]]:text-oc-destructive',
  Orange:
    'border-oc-warning-border bg-oc-warning-soft [&_[data-slot=toast-bar-icon]]:text-oc-warning',
  Grey: 'border-oc-neutral-border bg-oc-neutral-soft [&_[data-slot=toast-bar-icon]]:text-oc-muted-foreground',
}

function ToastBar({
  className,
  color,
  size,
  children,
}: {
  className?: string
  color: string
  size: 'Small' | 'Default'
  children: React.ReactNode
}) {
  return (
    <div
      data-slot="toast-bar"
      className={cn(
        'relative flex w-fit max-w-full flex-nowrap items-center rounded-lg border border-solid text-oc-foreground shadow-[0_8px_6px_rgba(42,50,82,0.04)]',
        size === 'Small' ? 'gap-1 py-2 pr-3 pl-2 text-xs leading-normal' : 'gap-3 py-3 pr-4 pl-3 text-sm leading-normal',
        TOAST_BAR_COLOR[color] ?? TOAST_BAR_COLOR.Default,
        className,
      )}
    >
      {children}
    </div>
  )
}

/** Use `toast.add({ title, description, type })`. `type`: success|info|warning|error|loading — not sonner. Default color is green. */
const toast = ToastPrimitive.createToastManager()

type ToastPlacement =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

const ToastPlacementContext = React.createContext<ToastPlacement>('bottom-right')

const TYPE_TO_COLOR: Record<string, 'Default' | 'Blue' | 'Red' | 'Orange' | 'Grey'> = {
  success: 'Default',
  info: 'Blue',
  warning: 'Orange',
  error: 'Red',
  loading: 'Grey',
}

function ToastProvider({ ...props }: ToastPrimitive.Provider.Props) {
  return <ToastPrimitive.Provider {...props} />
}

function ToastPortal({ ...props }: ToastPrimitive.Portal.Props) {
  return <ToastPrimitive.Portal data-slot="toast-portal" {...props} />
}

function ToastViewport({
  className,
  placement = 'bottom-right',
  ...props
}: ToastPrimitive.Viewport.Props & {
  placement?: ToastPlacement
}) {
  return (
    <ToastPlacementContext.Provider value={placement}>
      <ToastPrimitive.Viewport
        data-slot="toast-viewport"
        data-placement={placement}
        className={cn(
          'pointer-events-none fixed z-50 w-[min(calc(100vw-2rem),24rem)] outline-none',
          placement === 'top-left' && 'top-4 left-4',
          placement === 'top-center' && 'top-4 left-1/2 -translate-x-1/2',
          placement === 'top-right' && 'top-4 right-4',
          placement === 'bottom-left' && 'bottom-4 left-4',
          placement === 'bottom-center' && 'bottom-4 left-1/2 -translate-x-1/2',
          placement === 'bottom-right' && 'right-4 bottom-4',
          className,
        )}
        {...props}
      />
    </ToastPlacementContext.Provider>
  )
}

function Toast({ className, ...props }: ToastPrimitive.Root.Props) {
  const placement = React.useContext(ToastPlacementContext)
  const fromTop = placement.startsWith('top-')

  return (
    <ToastPrimitive.Root
      data-slot="toast"
      data-placement={placement}
      className={cn(
        'group/toast pointer-events-auto absolute right-0 z-[calc(1000-var(--toast-index))] w-full rounded-lg bg-transparent shadow-none will-change-transform outline-none select-none',
        '[--gap:0.75rem] [--height:var(--toast-frontmost-height,var(--toast-height))] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))]',
        'h-(--height) [transition:transform_500ms_cubic-bezier(0.22,1,0.36,1),opacity_500ms,height_150ms]',
        'data-expanded:h-(--toast-height) data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))]',
        'data-limited:opacity-0',
        'data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+150%))]',
        'data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]',
        'data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]',
        'data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-150%))]',
        'data-expanded:data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+150%))]',
        'data-expanded:data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]',
        'data-expanded:data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]',
        'data-expanded:data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-150%))]',
        fromTop
          ? "top-0 origin-top [--offset-y:calc(var(--toast-offset-y)+calc(var(--toast-index)*var(--gap))+var(--toast-swipe-movement-y))] transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)+(var(--toast-index)*var(--peek))+(var(--shrink)*var(--height))))_scale(var(--scale))] after:absolute after:bottom-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-[''] data-starting-style:transform-[translateY(-150%)] [&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:transform-[translateY(-150%)]"
          : "bottom-0 origin-bottom [--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))] transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))] after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-[''] data-starting-style:transform-[translateY(150%)] [&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:transform-[translateY(150%)]",
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
      className={cn('text-sm font-medium text-oc-foreground', className)}
      {...props}
    />
  )
}

function ToastDescription({ className, ...props }: ToastPrimitive.Description.Props) {
  return (
    <ToastPrimitive.Description
      data-slot="toast-description"
      className={cn('text-oc-foreground', className)}
      {...props}
    />
  )
}

function ToastAction({
  className,
  render = <Button variant="outline" size="sm" />,
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

function ToastClose({
  className,
  children,
  render = <Button variant="ghost" size="icon-sm" />,
  ...props
}: ToastPrimitive.Close.Props) {
  return (
    <ToastPrimitive.Close
      data-slot="toast-close"
      aria-label="Close toast"
      render={render}
      className={cn(
        "relative shrink-0 text-oc-muted-foreground after:absolute after:-inset-2 after:content-[''] hover:text-oc-foreground",
        className,
      )}
      {...props}
    >
      {children ?? <XIcon aria-hidden="true" />}
    </ToastPrimitive.Close>
  )
}

function ToastIcon({ type, size }: { type: string | undefined; size: 'Small' | 'Default' }) {
  let icon: React.ReactNode = <CheckIcon aria-hidden="true" />

  if (type === 'success') {
    icon = <CircleCheckIcon aria-hidden="true" />
  }
  if (type === 'info') {
    icon = <InfoIcon aria-hidden="true" />
  }
  if (type === 'warning') {
    icon = <TriangleAlertIcon aria-hidden="true" />
  }
  if (type === 'error') {
    icon = <OctagonXIcon aria-hidden="true" />
  }
  if (type === 'loading') {
    icon = <Loader2Icon className="animate-spin" aria-hidden="true" />
  }

  return (
    <span
      data-slot="toast-bar-icon"
      className={cn(
        'inline-flex shrink-0 items-center justify-center [&_svg]:size-full',
        size === 'Small' ? 'size-4' : 'size-6',
      )}
    >
      {icon}
    </span>
  )
}

function ToastList() {
  const { toasts } = ToastPrimitive.useToastManager()

  return toasts.map((toastItem) => {
    const color = TYPE_TO_COLOR[toastItem.type ?? ''] ?? 'Default'
    const hasTitle = Boolean(toastItem.title)
    const hasDescription = Boolean(toastItem.description)
    const size = hasTitle && hasDescription ? 'Default' : 'Small'
    const hasAction = Boolean(toastItem.actionProps)

    return (
      <Toast key={toastItem.id} toast={toastItem}>
        <ToastContent>
          <ToastBar color={color} size={size} className="mx-auto">
            <ToastIcon type={toastItem.type} size={size} />
            <div className="flex shrink-0 flex-col gap-0.5 whitespace-nowrap">
              {hasTitle ? (
                <div className="w-auto text-sm font-medium text-oc-foreground">
                  <ToastTitle />
                </div>
              ) : null}
              {hasDescription ? (
                <div className="w-auto text-oc-foreground">
                  <ToastDescription className={size === 'Small' ? 'text-xs' : 'text-sm'} />
                </div>
              ) : null}
            </div>
            {hasAction ? (
              <div className="ml-1 shrink-0">
                <ToastAction />
              </div>
            ) : null}
            <ToastClose />
          </ToastBar>
        </ToastContent>
      </Toast>
    )
  })
}

function Toaster({
  children,
  toastManager = toast,
  placement = 'bottom-right',
  ...props
}: ToastPrimitive.Provider.Props & {
  placement?: ToastPlacement
}) {
  return (
    <ToastProvider toastManager={toastManager} {...props}>
      {children}
      <ToastPortal>
        <ToastViewport placement={placement}>
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
  ToastClose,
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

export type { ToastPlacement }
