import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'flex min-h-[100px] w-full resize-y rounded-lg border border-border bg-background px-2 py-2 text-sm leading-[1.5] text-foreground shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1.5px_1.5px_rgba(0,0,0,0.09)] outline-none placeholder:text-[#9295a5] focus-visible:border-primary focus-visible:shadow-[0_0_0_3px_var(--info-border)] disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-50 aria-invalid:border-destructive aria-invalid:shadow-[0_0_0_3px_var(--destructive-border)]',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
