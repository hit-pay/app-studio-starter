import { createFileRoute } from '@tanstack/react-router'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
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
            <FieldLabel>Inventory</FieldLabel>
            <Select defaultValue="in-stock">
              <SelectTrigger>
                <SelectValue placeholder="Select inventory" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in-stock">In Stock</SelectItem>
                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
            <FieldDescription>Two fixed stock states.</FieldDescription>
          </Field>

          <Field data-invalid>
            <FieldLabel>Inventory</FieldLabel>
            <Select>
              <SelectTrigger aria-invalid>
                <SelectValue placeholder="Select inventory" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in-stock">In Stock</SelectItem>
                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
            <FieldError>Inventory status is required.</FieldError>
          </Field>
        </FieldGroup>

        <FieldGroup>
          <Field>
            <FieldLabel>Channel</FieldLabel>
            <Select defaultValue="online-store">
              <SelectTrigger>
                <SelectValue placeholder="Select channel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="online-store">Online Store</SelectItem>
                <SelectItem value="point-of-sale">Point Of Sale</SelectItem>
                <SelectItem value="invoicing">Invoicing</SelectItem>
              </SelectContent>
            </Select>
            <FieldDescription>Sales channels — short list, no search needed.</FieldDescription>
          </Field>

          <Field>
            <FieldLabel>Calculation</FieldLabel>
            <Select defaultValue="flat-rate">
              <SelectTrigger>
                <SelectValue placeholder="Select calculation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flat-rate">Flat rate</SelectItem>
                <SelectItem value="fee-per-unit">Fee per Unit</SelectItem>
                <SelectItem value="weight-base">Weight Base</SelectItem>
              </SelectContent>
            </Select>
            <FieldDescription>How the fee is calculated.</FieldDescription>
          </Field>
        </FieldGroup>
      </div>
    </DocExamplePage>
  )
}
