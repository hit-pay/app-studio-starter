import type { ComponentProps } from 'react'
import { Input as InputPrimitive } from '@base-ui/react/input'

import { cn } from '@/lib/utils'

const inputSurface =
  'h-9 w-full min-w-0 rounded-lg border border-border bg-background px-2 text-sm leading-[1.5] text-foreground shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1.5px_1.5px_rgba(0,0,0,0.09)] outline-none transition-shadow placeholder:text-[#9295a5] focus-visible:border-primary focus-visible:shadow-[0_0_0_3px_var(--info-border)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-50 aria-invalid:border-destructive aria-invalid:shadow-[0_0_0_3px_var(--destructive-border)] file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium'

function Input({ className, type, ...props }: ComponentProps<'input'>) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(inputSurface, className)}
      {...props}
    />
  )
}

export { Input, inputSurface }
