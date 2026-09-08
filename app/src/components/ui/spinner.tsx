import * as React from 'react'
import { LoadingRegular } from '@mingcute/react/core-regular'

import { cn } from '@/lib/utils'

function Spinner({ className, ...props }: React.ComponentProps<typeof LoadingRegular>) {
  return (
    <LoadingRegular
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  )
}

export { Spinner }
