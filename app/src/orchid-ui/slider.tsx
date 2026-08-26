import { useState } from 'react'
import { Slider as SliderPrimitive } from '@base-ui/react/slider'

import { cn } from '@/lib/utils'

function toValues(
  value: number | readonly number[] | undefined,
  fallback: number[],
) {
  if (typeof value === 'number') return [value]
  if (Array.isArray(value) && value.length > 0) return [...value]
  return fallback
}

function Slider({
  className,
  defaultValue = 50,
  value,
  min = 0,
  max = 100,
  showIndicator = true,
  showRange = true,
  onValueChange,
  onValueCommitted,
  ...props
}: SliderPrimitive.Root.Props & {
  showIndicator?: boolean
  showRange?: boolean
}) {
  const initial = toValues(defaultValue, [min])
  const [internal, setInternal] = useState(initial)
  const [dragging, setDragging] = useState(false)
  const current = value !== undefined ? toValues(value, internal) : internal

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      data-dragging={dragging || undefined}
      min={min}
      max={max}
      thumbAlignment="edge"
      value={value}
      defaultValue={defaultValue}
      className={cn('flex w-full flex-col gap-1 data-horizontal:w-full', className)}
      onValueChange={(next, details) => {
        setInternal(toValues(next, current))
        setDragging(details.reason === 'drag')
        onValueChange?.(next, details)
      }}
      onValueCommitted={(next, details) => {
        setDragging(false)
        onValueCommitted?.(next, details)
      }}
      {...props}
    >
      <SliderPrimitive.Control className="relative flex w-full touch-none items-center py-1.5 select-none">
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-2xl bg-neutral-soft">
          <SliderPrimitive.Indicator className="rounded-2xl bg-primary" />
        </SliderPrimitive.Track>
        {current.map((thumbValue, index) => (
          <SliderPrimitive.Thumb
            key={index}
            className="relative flex size-5 shrink-0 items-center justify-center rounded-full bg-background shadow-[0_1px_3px_rgba(0,0,0,0.1),0_3px_22px_rgba(38,42,50,0.09)] outline-none"
          >
            <span className="size-2.5 rounded-full bg-primary" />
            {showIndicator && dragging ? (
              <span className="absolute top-full mt-1 rounded bg-foreground px-1.5 py-0.5 text-xs font-medium leading-5 whitespace-nowrap text-primary-foreground">
                {thumbValue}
              </span>
            ) : null}
          </SliderPrimitive.Thumb>
        ))}
      </SliderPrimitive.Control>
      {showRange ? (
        <div className="flex w-full items-center justify-between text-sm leading-[1.5] text-foreground">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      ) : null}
    </SliderPrimitive.Root>
  )
}

export { Slider }
