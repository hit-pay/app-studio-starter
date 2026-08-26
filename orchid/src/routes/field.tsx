import { createFileRoute } from '@tanstack/react-router'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Toggle } from '@/components/ui/toggle'

export const Route = createFileRoute('/field')({
  component: FieldExamplesPage,
})

function FieldExamplesPage() {
  return (
    <DocExamplePage to="/field">
      <FieldSet className="max-w-sm">
        <FieldLegend>Profile</FieldLegend>
        <FieldDescription>This appears on invoices and emails.</FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="full-name">Full name</FieldLabel>
            <Input id="full-name" placeholder="Placeholder" />
            <FieldDescription>This is a hint text to help user.</FieldDescription>
          </Field>
          <Field data-invalid>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input id="username" placeholder="Placeholder" aria-invalid />
            <FieldError>Choose another username.</FieldError>
          </Field>
          <Field orientation="horizontal">
            <Toggle />
            <FieldLabel>Subscribe to the newsletter</FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <Checkbox />
            <FieldLabel>Email alerts</FieldLabel>
          </Field>
        </FieldGroup>
      </FieldSet>
    </DocExamplePage>
  )
}
