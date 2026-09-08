import * as React from 'react'

import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'flex field-sizing-content min-h-16 w-full resize-y rounded-lg border border-oc-border bg-oc-background px-2.5 py-2 text-base leading-normal text-oc-foreground shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1.5px_1.5px_rgba(0,0,0,0.09)] outline-none transition-colors placeholder:text-oc-muted-foreground focus-visible:border-oc-primary focus-visible:ring-3 focus-visible:ring-oc-info-border/50 disabled:cursor-not-allowed disabled:bg-oc-muted disabled:opacity-50 aria-invalid:border-oc-destructive aria-invalid:ring-3 aria-invalid:ring-oc-destructive-border/50 md:text-sm',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
