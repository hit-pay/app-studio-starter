'use client'

import * as React from 'react'
import { CheckIcon, CircleHelpIcon, Trash2Icon, TriangleAlertIcon, XIcon } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type ConfirmDialogType = 'delete' | 'warning' | 'success' | 'question'

type ConfirmDialogOptions = {
  type?: ConfirmDialogType
  title?: React.ReactNode
  message: React.ReactNode
  description?: React.ReactNode
  confirmLabel?: React.ReactNode
  cancelLabel?: React.ReactNode
  confirmPhrase?: string
  inputPlaceholder?: string
}

type ConfirmDialogManager = (options: ConfirmDialogOptions) => Promise<boolean>

type ConfirmDialogRequest = ConfirmDialogOptions & {
  resolve: (confirmed: boolean) => void
}

const PRESETS: Record<
  ConfirmDialogType,
  {
    icon: React.ReactNode
    iconClassName: string
    confirmLabel: string
    cancelLabel: string
    confirmVariant: React.ComponentProps<typeof Button>['variant']
    showCancel: boolean
  }
> = {
  delete: {
    icon: <Trash2Icon />,
    iconClassName: 'bg-oc-destructive-soft text-oc-destructive',
    confirmLabel: 'Delete',
    cancelLabel: 'Cancel',
    confirmVariant: 'destructive',
    showCancel: true,
  },
  warning: {
    icon: <TriangleAlertIcon />,
    iconClassName: 'bg-oc-warning-soft text-oc-warning',
    confirmLabel: 'Continue',
    cancelLabel: 'Cancel',
    confirmVariant: 'destructive',
    showCancel: true,
  },
  success: {
    icon: <CheckIcon />,
    iconClassName: 'bg-oc-success-soft text-oc-success',
    confirmLabel: 'OK',
    cancelLabel: 'Cancel',
    confirmVariant: 'default',
    showCancel: false,
  },
  question: {
    icon: <CircleHelpIcon />,
    iconClassName: 'bg-oc-info-soft text-oc-primary',
    confirmLabel: 'Yes',
    cancelLabel: 'No',
    confirmVariant: 'default',
    showCancel: true,
  },
}

const ConfirmDialogContext = React.createContext<ConfirmDialogManager | null>(null)

function ConfirmDialogProvider({ children }: { children: React.ReactNode }) {
  const [request, setRequest] = React.useState<ConfirmDialogRequest | null>(null)
  const [typed, setTyped] = React.useState('')
  const requestRef = React.useRef<ConfirmDialogRequest | null>(null)

  const finish = React.useCallback((confirmed: boolean) => {
    const current = requestRef.current
    requestRef.current = null
    setRequest(null)
    setTyped('')
    current?.resolve(confirmed)
  }, [])

  const confirm = React.useCallback<ConfirmDialogManager>((options) => {
    requestRef.current?.resolve(false)

    return new Promise<boolean>((resolve) => {
      const nextRequest = { ...options, resolve }
      requestRef.current = nextRequest
      setTyped('')
      setRequest(nextRequest)
    })
  }, [])

  React.useEffect(() => () => requestRef.current?.resolve(false), [])

  const type = request?.type ?? 'question'
  const preset = PRESETS[type]
  const matched = !request?.confirmPhrase || typed.trim() === request.confirmPhrase

  return (
    <ConfirmDialogContext.Provider value={confirm}>
      {children}
      <AlertDialog
        open={Boolean(request)}
        onOpenChange={(open) => {
          if (!open) finish(false)
        }}
      >
        <AlertDialogContent size={request?.confirmPhrase ? 'Medium' : 'Confirmation'}>
          <AlertDialogCancel
            variant="ghost"
            size="icon-sm"
            className="absolute top-2 right-2 text-oc-muted-foreground"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </AlertDialogCancel>
          <AlertDialogHeader>
            <AlertDialogTitle>{request?.title ?? 'Are you sure?'}</AlertDialogTitle>
          </AlertDialogHeader>
          <div
            className={cn(
              request?.confirmPhrase ? 'space-y-4 py-2' : 'flex flex-col items-center gap-4 py-4 text-center',
            )}
          >
            {!request?.confirmPhrase ? (
              <span
                className={cn(
                  'inline-flex size-12 items-center justify-center rounded-full [&_svg]:size-6',
                  preset.iconClassName,
                )}
              >
                {preset.icon}
              </span>
            ) : null}
            <AlertDialogDescription
              className={cn(!request?.confirmPhrase && 'max-w-64 text-center text-oc-foreground')}
            >
              {request?.message}
              {request?.description ? (
                <>
                  <br />
                  {request.description}
                </>
              ) : null}
            </AlertDialogDescription>
            {request?.confirmPhrase ? (
              <label className="block space-y-2 text-sm text-oc-foreground">
                <span>
                  Type <strong>{request.confirmPhrase}</strong> to confirm
                </span>
                <Input
                  value={typed}
                  onChange={(event) => setTyped(event.currentTarget.value)}
                  placeholder={request.inputPlaceholder ?? 'Type here...'}
                  autoFocus
                />
              </label>
            ) : null}
          </div>
          <AlertDialogFooter className={!request?.confirmPhrase ? 'sm:justify-center' : undefined}>
            {preset.showCancel ? (
              <AlertDialogCancel className="min-w-28">
                {request?.cancelLabel ?? preset.cancelLabel}
              </AlertDialogCancel>
            ) : null}
            <AlertDialogAction
              className="min-w-28"
              variant={preset.confirmVariant}
              disabled={!matched}
              onClick={() => finish(true)}
            >
              {request?.confirmLabel ?? preset.confirmLabel}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ConfirmDialogContext.Provider>
  )
}

function useConfirmDialog() {
  const confirm = React.useContext(ConfirmDialogContext)

  if (!confirm) {
    throw new Error('useConfirmDialog must be used within ConfirmDialogProvider.')
  }

  return confirm
}

export { ConfirmDialogProvider, useConfirmDialog }
export type { ConfirmDialogManager, ConfirmDialogOptions, ConfirmDialogType }
