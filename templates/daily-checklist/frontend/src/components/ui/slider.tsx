import { Slider as SliderPrimitive } from '@base-ui/react/slider'

import { cn } from '@/lib/utils'

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: SliderPrimitive.Root.Props) {
  const values = Array.isArray(value)
    ? value
    : typeof value === 'number'
      ? [value]
    : Array.isArray(defaultValue)
      ? defaultValue
      : typeof defaultValue === 'number'
        ? [defaultValue]
        : [min, max]

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      className={cn('data-horizontal:w-full data-vertical:h-full', className)}
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      thumbAlignment="edge"
      {...props}
    >
      <SliderPrimitive.Control className="relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col">
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="relative grow overflow-hidden rounded-full bg-oc-neutral-soft select-none data-horizontal:h-2 data-horizontal:w-full data-vertical:h-full data-vertical:w-2"
        >
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className="rounded-full bg-oc-primary select-none data-horizontal:h-full data-vertical:w-full"
          />
        </SliderPrimitive.Track>
        {Array.from({ length: values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            className="relative flex size-5 shrink-0 items-center justify-center rounded-full bg-oc-background shadow-[0_1px_3px_rgba(0,0,0,0.1),0_3px_22px_rgba(38,42,50,0.09)] ring-oc-info-border/50 transition-[color,box-shadow] outline-none after:absolute after:-inset-2 hover:ring-3 focus-visible:ring-3 disabled:pointer-events-none disabled:opacity-50"
          >
            <span className="size-2.5 rounded-full bg-oc-primary" />
          </SliderPrimitive.Thumb>
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { Slider }
