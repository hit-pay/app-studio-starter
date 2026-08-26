import { createFileRoute } from '@tanstack/react-router'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
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
            <FieldLabel>Grouped</FieldLabel>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Placeholder" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Group head</SelectLabel>
                  <SelectItem value="a">Option</SelectItem>
                  <SelectItem value="b">Option</SelectItem>
                  <SelectItem value="c">Option</SelectItem>
                  <SelectItem value="d">Option</SelectItem>
                  <SelectItem value="e">Option</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Group head</SelectLabel>
                  <SelectItem value="f">Option</SelectItem>
                  <SelectItem value="g">Option</SelectItem>
                  <SelectItem value="h">Option</SelectItem>
                  <SelectItem value="i">Option</SelectItem>
                  <SelectItem value="j">Option</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FieldDescription>This is a hint text to help user.</FieldDescription>
          </Field>
        </FieldGroup>
      </div>
    </DocExamplePage>
  )
}
