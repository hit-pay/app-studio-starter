'use client'

import { GripVerticalIcon } from 'lucide-react'
import {
  Group as ResizablePrimitiveGroup,
  Panel as ResizablePrimitivePanel,
  Separator as ResizablePrimitiveSeparator,
  type GroupProps,
  type PanelProps,
  type SeparatorProps,
} from 'react-resizable-panels'

import { cn } from '@/lib/utils'

function ResizablePanelGroup({ className, ...props }: GroupProps) {
  return (
    <ResizablePrimitiveGroup
      data-slot="resizable-panel-group"
      className={cn('flex h-full w-full aria-[orientation=vertical]:flex-col', className)}
      {...props}
    />
  )
}

function ResizablePanel(props: PanelProps) {
  return <ResizablePrimitivePanel data-slot="resizable-panel" {...props} />
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}: SeparatorProps & { withHandle?: boolean }) {
  return (
    <ResizablePrimitiveSeparator
      data-slot="resizable-handle"
      className={cn(
        'relative flex w-px items-center justify-center bg-oc-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-oc-info-border/50 focus-visible:outline-hidden aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:after:left-0 aria-[orientation=horizontal]:after:h-1 aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:translate-x-0 aria-[orientation=horizontal]:after:-translate-y-1/2 [&[aria-orientation=horizontal]>div]:rotate-90',
        className,
      )}
      {...props}
    >
      {withHandle ? (
        <div className="z-10 flex h-6 w-3 items-center justify-center rounded-sm border border-oc-border bg-oc-background">
          <GripVerticalIcon className="size-2.5 text-oc-muted-foreground" />
        </div>
      ) : null}
    </ResizablePrimitiveSeparator>
  )
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup }
