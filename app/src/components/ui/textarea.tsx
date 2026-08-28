import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'flex min-h-[100px] w-full resize-y rounded-lg border border-oc-border bg-oc-background px-2 py-2 text-base leading-[1.5] text-oc-foreground shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1.5px_1.5px_rgba(0,0,0,0.09)] outline-none placeholder:text-oc-muted-foreground focus-visible:border-oc-primary focus-visible:shadow-[0_0_0_3px_var(--oc-info-border)] disabled:cursor-not-allowed disabled:bg-oc-muted disabled:opacity-50 aria-invalid:border-oc-destructive aria-invalid:shadow-[0_0_0_3px_var(--oc-destructive-border)] md:text-sm',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
