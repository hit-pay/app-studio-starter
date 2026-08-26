import { useState, type ComponentProps, type ReactNode } from 'react'
import { CheckIcon, CircleHelpIcon, Trash2Icon, TriangleAlertIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Input } from './input'
import { Modal, ModalClose, ModalPopup, ModalTrigger } from './modal'
import { Button } from './button'

type ConfirmationType = 'Delete' | 'Warning' | 'Success' | 'Question'
type ConfirmationSize = 'Small' | 'Medium'

const ICON_WRAP: Record<ConfirmationType, string> = {
  Delete: 'bg-oc-destructive-soft text-oc-destructive',
  Warning: 'bg-oc-warning-soft text-oc-warning',
  Success: 'bg-oc-success-soft text-oc-success',
  Question: 'bg-oc-info-soft text-oc-primary',
}

const DEFAULT_ICON: Record<ConfirmationType, ReactNode> = {
  Delete: <Trash2Icon className="size-6" />,
  Warning: <TriangleAlertIcon className="size-6" />,
  Success: <CheckIcon className="size-6" />,
  Question: <CircleHelpIcon className="size-6" />,
}

const ACTION_PRESET: Record<
  ConfirmationType,
  {
    cancelLabel: string
    confirmLabel: string
    confirmType: 'Primary' | 'Destructive' | 'Secondary'
    showCancel: boolean
  }
> = {
  Delete: {
    cancelLabel: 'Cancel',
    confirmLabel: 'Delete',
    confirmType: 'Destructive',
    showCancel: true,
  },
  Warning: {
    cancelLabel: 'Cancel',
    confirmLabel: 'Delete',
    confirmType: 'Destructive',
    showCancel: true,
  },
  Success: {
    cancelLabel: 'Cancel',
    confirmLabel: 'OK',
    confirmType: 'Primary',
    showCancel: false,
  },
  Question: {
    cancelLabel: 'No',
    confirmLabel: 'Yes',
    confirmType: 'Primary',
    showCancel: true,
  },
}

function ConfirmDialogContent({
  className,
  type = 'Delete',
  size = 'Small',
  message = 'Do you want to delete this payment link?',
  description,
  icon,
  children,
  ...props
}: ComponentProps<'div'> & {
  type?: ConfirmationType
  size?: ConfirmationSize
  message?: ReactNode
  description?: ReactNode
  icon?: ReactNode
}) {
  const medium = size === 'Medium'

  return (
    <div
      data-slot="confirm-dialog-content"
      data-type={type}
      data-size={size}
      className={cn(
        'flex w-full flex-col gap-3',
        medium ? 'items-start text-left' : 'items-center justify-center text-center',
        className,
      )}
      {...props}
    >
      {medium ? null : (
        <span
          className={cn(
            'inline-flex items-center justify-center rounded-full p-3',
            ICON_WRAP[type],
          )}
        >
          {icon ?? DEFAULT_ICON[type]}
        </span>
      )}
      {message ? (
        <p className="w-full text-sm font-normal leading-[1.5] text-oc-foreground">{message}</p>
      ) : null}
      {description ? (
        <p
          className={cn(
            'w-full text-sm font-normal leading-[1.5]',
            medium ? 'text-oc-foreground' : 'text-oc-muted-foreground',
          )}
        >
          {description}
        </p>
      ) : null}
      {children}
    </div>
  )
}

function ConfirmDialog({
  type = 'Delete',
  size = 'Small',
  title = 'Are you sure?',
  message,
  description,
  icon,
  cancelLabel,
  confirmLabel,
  confirmType,
  onCancel,
  onConfirm,
  confirmPhrase,
  inputPlaceholder = 'Type here...',
  children,
  persistent,
  ...props
}: Omit<ComponentProps<typeof Modal>, 'children'> & {
  type?: ConfirmationType
  size?: ConfirmationSize
  title?: string
  message?: ReactNode
  description?: ReactNode
  icon?: ReactNode
  cancelLabel?: string
  confirmLabel?: string
  confirmType?: 'Primary' | 'Destructive' | 'Secondary'
  onCancel?: () => void
  onConfirm?: () => void
  confirmPhrase?: string
  inputPlaceholder?: string
  children?: ReactNode
}) {
  const [typed, setTyped] = useState('')
  const preset = ACTION_PRESET[type]
  const medium = size === 'Medium'
  const needsMatch = Boolean(confirmPhrase)
  const matched = !needsMatch || typed.trim() === confirmPhrase
  const resolvedCancel = cancelLabel ?? preset.cancelLabel
  const resolvedDescription =
    description ??
    (confirmPhrase
      ? `Type “${confirmPhrase}” to confirm`
      : type === 'Delete' || type === 'Warning'
        ? "The action can't be undone."
        : undefined)
  const resolvedConfirm = confirmLabel ?? preset.confirmLabel
  const resolvedConfirmType = confirmType ?? preset.confirmType
  const showCancel = preset.showCancel

  return (
    <Modal persistent={persistent} {...props}>
      {children}
      <ModalPopup
        size={medium ? 'Medium' : 'Confirmation'}
        title={title}
        cancelLabel={resolvedCancel}
        confirmLabel={resolvedConfirm}
        confirmType={resolvedConfirmType}
        showCancel={showCancel}
        onCancel={onCancel}
        footerContent={
          <div
            className={cn(
              'flex min-w-0 flex-1 items-center',
              medium ? 'justify-end' : 'justify-center',
            )}
          >
            <div className="grid auto-cols-[minmax(7rem,1fr)] grid-flow-col gap-3">
              {showCancel ? (
                <ModalClose
                  render={<Button type="Secondary" className="w-full" onClick={onCancel} />}
                >
                  {resolvedCancel}
                </ModalClose>
              ) : null}
              <ModalClose
                disabled={!matched}
                render={
                  <Button
                    type={resolvedConfirmType}
                    className="w-full"
                    disabled={!matched}
                    onClick={onConfirm}
                  />
                }
              >
                {resolvedConfirm}
              </ModalClose>
            </div>
          </div>
        }
      >
        <ConfirmDialogContent
          type={type}
          size={size}
          message={message}
          description={resolvedDescription}
          icon={icon}
        >
          {needsMatch ? (
            <Input
              value={typed}
              onChange={(event) => setTyped(event.currentTarget.value)}
              placeholder={inputPlaceholder}
            />
          ) : null}
        </ConfirmDialogContent>
      </ModalPopup>
    </Modal>
  )
}

export {
  ConfirmDialog,
  ConfirmDialogContent,
  ModalTrigger as ConfirmDialogTrigger,
}
export type { ConfirmationSize, ConfirmationType }
