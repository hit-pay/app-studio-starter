import type { FormEvent, ReactNode } from 'react'
import { useForm } from '@tanstack/react-form'

import { cn } from '@/lib/utils'
import { Button } from './button'
import { Checkbox } from './checkbox'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from './field'
import { Input } from './input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select'
import { Textarea } from './textarea'
import { Toggle } from './toggle'

type FormBuilderControl = 'input' | 'textarea' | 'select' | 'toggle' | 'checkbox'

type FormBuilderOption = {
  value: string
  label: string
}

type FormBuilderField<T extends Record<string, unknown>> = {
  name: keyof T & string
  label: string
  description?: string
  placeholder?: string
  control?: FormBuilderControl
  type?: 'text' | 'email' | 'number' | 'tel' | 'url'
  options?: FormBuilderOption[]
  required?: boolean
  validate?: (value: unknown) => string | undefined
  checkboxLabel?: string
}

function errorText(errors: unknown[]) {
  return errors
    .flatMap((error) => {
      if (typeof error === 'string') return [error]
      if (error && typeof error === 'object' && 'message' in error) {
        const message = (error as { message?: unknown }).message
        return message == null ? [] : [String(message)]
      }
      return error == null ? [] : [String(error)]
    })
    .join(', ')
}

function isEmpty(value: unknown) {
  if (value == null) return true
  if (typeof value === 'string') return value.trim() === ''
  if (typeof value === 'boolean') return value === false
  return false
}

function FormBuilder<T extends Record<string, unknown>>({
  className,
  defaultValues,
  fields,
  onSubmit,
  submitLabel = 'Save',
  cancelLabel,
  onCancel,
  footer,
}: {
  className?: string
  defaultValues: T
  fields: FormBuilderField<T>[]
  onSubmit: (value: T) => void | Promise<void>
  submitLabel?: string
  cancelLabel?: string
  onCancel?: () => void
  footer?: ReactNode
}) {
  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      await onSubmit(value as T)
    },
  })

  return (
    <form
      className={cn('flex w-full max-w-xl flex-col gap-6', className)}
      onSubmit={(event: FormEvent) => {
        event.preventDefault()
        event.stopPropagation()
        void form.handleSubmit()
      }}
    >
      <FieldGroup>
        {fields.map((item) => (
          <form.Field
            key={item.name}
            name={item.name}
            validators={{
              onBlur: ({ value }) => {
                if (item.required && isEmpty(value)) return `${item.label} is required`
                return item.validate?.(value)
              },
              onSubmit: ({ value }) => {
                if (item.required && isEmpty(value)) return `${item.label} is required`
                return item.validate?.(value)
              },
            }}
          >
            {(field) => {
              const invalid = field.state.meta.isTouched && !field.state.meta.isValid
              const message = errorText(field.state.meta.errors)
              const control = item.control ?? 'input'
              const value = field.state.value

              if (control === 'toggle') {
                return (
                  <Field orientation="horizontal" data-invalid={invalid || undefined}>
                    <Toggle
                      id={item.name}
                      checked={Boolean(value)}
                      onCheckedChange={(checked) => field.handleChange(checked as never)}
                      onBlur={field.handleBlur}
                    />
                    <FieldLabel htmlFor={item.name}>{item.label}</FieldLabel>
                    {item.description ? <FieldDescription>{item.description}</FieldDescription> : null}
                    {invalid && message ? <FieldError>{message}</FieldError> : null}
                  </Field>
                )
              }

              if (control === 'checkbox') {
                return (
                  <Field data-invalid={invalid || undefined}>
                    <Checkbox
                      checked={Boolean(value)}
                      onCheckedChange={(checked) =>
                        field.handleChange((checked === true) as never)
                      }
                      onBlur={field.handleBlur}
                      error={invalid}
                    >
                      {item.checkboxLabel ?? item.label}
                    </Checkbox>
                    {item.description ? <FieldDescription>{item.description}</FieldDescription> : null}
                    {invalid && message ? <FieldError>{message}</FieldError> : null}
                  </Field>
                )
              }

              return (
                <Field data-invalid={invalid || undefined}>
                  <FieldLabel htmlFor={item.name}>{item.label}</FieldLabel>
                  {control === 'textarea' ? (
                    <Textarea
                      id={item.name}
                      name={item.name}
                      placeholder={item.placeholder}
                      value={String(value ?? '')}
                      aria-invalid={invalid || undefined}
                      onBlur={field.handleBlur}
                      onChange={(event) => field.handleChange(event.target.value as never)}
                    />
                  ) : control === 'select' ? (
                    <Select
                      value={(value as string | null | undefined) ?? null}
                      onValueChange={(next) => field.handleChange(next as never)}
                    >
                      <SelectTrigger id={item.name} aria-invalid={invalid || undefined} onBlur={field.handleBlur}>
                        <SelectValue placeholder={item.placeholder ?? 'Select'} />
                      </SelectTrigger>
                      <SelectContent>
                        {(item.options ?? []).map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id={item.name}
                      name={item.name}
                      type={item.type ?? 'text'}
                      placeholder={item.placeholder}
                      value={value == null ? '' : String(value)}
                      aria-invalid={invalid || undefined}
                      onBlur={field.handleBlur}
                      onChange={(event) => {
                        const next =
                          item.type === 'number'
                            ? (event.target.value === '' ? '' : Number(event.target.value))
                            : event.target.value
                        field.handleChange(next as never)
                      }}
                    />
                  )}
                  {item.description ? <FieldDescription>{item.description}</FieldDescription> : null}
                  {invalid && message ? <FieldError>{message}</FieldError> : null}
                </Field>
              )
            }}
          </form.Field>
        ))}
      </FieldGroup>

      {footer}

      <div className="flex flex-wrap gap-2">
        {onCancel ? (
          <Button type="Secondary" style="Border" htmlType="button" onClick={onCancel}>
            {cancelLabel ?? 'Cancel'}
          </Button>
        ) : null}
        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting] as const}>
          {([canSubmit, isSubmitting]) => (
            <Button htmlType="submit" disabled={!canSubmit || isSubmitting}>
              {isSubmitting ? 'Saving…' : submitLabel}
            </Button>
          )}
        </form.Subscribe>
      </div>
    </form>
  )
}

export { FormBuilder, useForm }
export type { FormBuilderControl, FormBuilderField, FormBuilderOption }
