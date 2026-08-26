import { useEffect, useId, useRef, useState, type ComponentProps } from 'react'
import { MinusIcon, PlusIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from './button'

function clamp(value: number, min?: number, max?: number) {
  let next = value
  if (min != null && Number.isFinite(min)) next = Math.max(min, next)
  if (max != null && Number.isFinite(max)) next = Math.min(max, next)
  return next
}

function InputStepper({
  className,
  value,
  defaultValue = 1,
  min,
  max,
  step = 1,
  disabled,
  name,
  onValueChange,
  ...props
}: Omit<ComponentProps<'div'>, 'onChange'> & {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  name?: string
  onValueChange?: (value: number) => void
}) {
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const isControlled = value !== undefined
  const [internal, setInternal] = useState(defaultValue)
  const numeric = isControlled ? value : internal
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(String(numeric))

  useEffect(() => {
    if (!editing) setDraft(String(numeric))
  }, [numeric, editing])

  useEffect(() => {
    if (!editing) return
    const node = inputRef.current
    node?.focus()
    node?.select()
  }, [editing])

  function commit(next: number) {
    if (!Number.isFinite(next)) {
      setDraft(String(numeric))
      setEditing(false)
      return
    }
    const clamped = clamp(next, min, max)
    if (!isControlled) setInternal(clamped)
    onValueChange?.(clamped)
    setDraft(String(clamped))
    setEditing(false)
  }

  function bump(direction: -1 | 1) {
    const parsed = editing ? Number(draft) : numeric
    const base = Number.isFinite(parsed) ? parsed : numeric
    commit(base + direction * step)
  }

  return (
    <div
      data-slot="input-stepper"
      className={cn(
        'flex h-9 w-full items-center gap-2 overflow-clip rounded-lg border border-solid border-border bg-background px-1 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1.5px_1.5px_rgba(0,0,0,0.09)]',
        disabled && 'pointer-events-none opacity-50',
        className,
      )}
      {...props}
    >
      <Button
        type="Secondary"
        size="Small"
        iconOnly
        htmlType="button"
        disabled={disabled || (min != null && numeric <= min)}
        aria-label="Decrease"
        onClick={() => bump(-1)}
      >
        <MinusIcon />
      </Button>
      {name ? <input type="hidden" name={name} value={numeric} /> : null}
      {editing ? (
        <input
          id={inputId}
          ref={inputRef}
          inputMode="decimal"
          aria-label="Number"
          disabled={disabled}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={() => commit(Number(draft))}
          onKeyDown={(event) => {
            if (event.key === 'Enter') commit(Number(draft))
            if (event.key === 'Escape') {
              setDraft(String(numeric))
              setEditing(false)
            }
          }}
          className="min-w-0 flex-1 bg-transparent text-center text-sm leading-[1.5] text-foreground outline-none"
        />
      ) : (
        <button
          type="button"
          id={inputId}
          disabled={disabled}
          aria-label="Edit number"
          onClick={() => setEditing(true)}
          className="min-w-0 flex-1 truncate text-center text-sm leading-[1.5] text-muted-foreground outline-none"
        >
          {numeric}
        </button>
      )}
      <Button
        type="Secondary"
        size="Small"
        iconOnly
        htmlType="button"
        disabled={disabled || (max != null && numeric >= max)}
        aria-label="Increase"
        onClick={() => bump(1)}
      >
        <PlusIcon />
      </Button>
    </div>
  )
}

export { InputStepper }
