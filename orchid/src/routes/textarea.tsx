import { createFileRoute } from '@tanstack/react-router'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'

export const Route = createFileRoute('/textarea')({
  component: TextareaExamplesPage,
})

function TextareaExamplesPage() {
  return (
    <DocExamplePage to="/textarea">
      <FieldGroup className="max-w-sm">
        <Field>
          <FieldLabel htmlFor="notes">Label</FieldLabel>
          <Textarea id="notes" placeholder="Placeholder" />
          <FieldDescription>This is a hint text to help user.</FieldDescription>
        </Field>
        <Field data-invalid>
          <FieldLabel htmlFor="notes-error">Error</FieldLabel>
          <Textarea id="notes-error" placeholder="Placeholder" aria-invalid />
          <FieldError>This is a hint text to help user.</FieldError>
        </Field>
      </FieldGroup>
    </DocExamplePage>
  )
}
