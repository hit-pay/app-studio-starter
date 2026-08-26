import { createFileRoute } from '@tanstack/react-router'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectMultiple,
  SelectMultipleGroup,
  SelectMultipleItem,
  SelectMultipleLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const Route = createFileRoute('/select')({
  component: SelectExamplesPage,
})

function SelectExamplesPage() {
  return (
    <DocExamplePage to="/select">
      <div className="grid gap-8 md:grid-cols-2">
        <FieldGroup>
          <Field>
            <FieldLabel>Default</FieldLabel>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Placeholder" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="one">Option</SelectItem>
                <SelectItem value="two">Option</SelectItem>
                <SelectItem value="three">Option</SelectItem>
                <SelectItem value="four">Option</SelectItem>
                <SelectItem value="five">Option</SelectItem>
              </SelectContent>
            </Select>
            <FieldDescription>This is a hint text to help user.</FieldDescription>
          </Field>

          <Field data-invalid>
            <FieldLabel>Error</FieldLabel>
            <Select>
              <SelectTrigger aria-invalid>
                <SelectValue placeholder="Placeholder" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="one">Option</SelectItem>
                <SelectItem value="two">Option</SelectItem>
              </SelectContent>
            </Select>
            <FieldError>This is a hint text to help user.</FieldError>
          </Field>
        </FieldGroup>

        <FieldGroup>
          <Field>
            <FieldLabel>Multiple</FieldLabel>
            <SelectMultiple defaultValue={['one', 'two', 'three', 'four', 'five']}>
              <SelectMultipleItem value="one">Text</SelectMultipleItem>
              <SelectMultipleItem value="two">Text</SelectMultipleItem>
              <SelectMultipleItem value="three">Text</SelectMultipleItem>
              <SelectMultipleItem value="four">Text</SelectMultipleItem>
              <SelectMultipleItem value="five">Text</SelectMultipleItem>
              <SelectMultipleItem value="six">Text</SelectMultipleItem>
            </SelectMultiple>
            <FieldDescription>This is a hint text to help user.</FieldDescription>
          </Field>

          <Field>
            <FieldLabel>Grouped</FieldLabel>
            <SelectMultiple>
              <SelectMultipleGroup>
                <SelectMultipleLabel>Group head</SelectMultipleLabel>
                <SelectMultipleItem value="a">Option</SelectMultipleItem>
                <SelectMultipleItem value="b">Option</SelectMultipleItem>
                <SelectMultipleItem value="c">Option</SelectMultipleItem>
                <SelectMultipleItem value="d">Option</SelectMultipleItem>
                <SelectMultipleItem value="e">Option</SelectMultipleItem>
              </SelectMultipleGroup>
              <SelectMultipleGroup>
                <SelectMultipleLabel>Group head</SelectMultipleLabel>
                <SelectMultipleItem value="f">Option</SelectMultipleItem>
                <SelectMultipleItem value="g">Option</SelectMultipleItem>
                <SelectMultipleItem value="h">Option</SelectMultipleItem>
                <SelectMultipleItem value="i">Option</SelectMultipleItem>
                <SelectMultipleItem value="j">Option</SelectMultipleItem>
              </SelectMultipleGroup>
            </SelectMultiple>
            <FieldDescription>This is a hint text to help user.</FieldDescription>
          </Field>
        </FieldGroup>
      </div>
    </DocExamplePage>
  )
}
