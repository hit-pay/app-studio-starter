import { CircleIcon } from 'lucide-react'
import { createFileRoute } from '@tanstack/react-router'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'

export const Route = createFileRoute('/input')({
  component: InputExamplesPage,
})

function InputExamplesPage() {
  return (
    <DocExamplePage to="/input">
      <FieldGroup className="max-w-sm">
        <Field>
          <FieldLabel htmlFor="basic">Label</FieldLabel>
          <Input id="basic" placeholder="Placeholder" />
          <FieldDescription>This is a hint text to help user.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="leading">Leading</FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <CircleIcon />
            </InputGroupAddon>
            <InputGroupInput id="leading" placeholder="Placeholder" />
          </InputGroup>
          <FieldDescription>This is a hint text to help user.</FieldDescription>
        </Field>
        <Field data-invalid>
          <FieldLabel htmlFor="error">Error</FieldLabel>
          <Input id="error" placeholder="Placeholder" aria-invalid />
          <FieldError>This is a hint text to help user.</FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor="disabled">Disabled</FieldLabel>
          <Input id="disabled" placeholder="Placeholder" disabled />
        </Field>
      </FieldGroup>
    </DocExamplePage>
  )
}
