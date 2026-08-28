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
import { Switch } from '@/components/ui/switch'

export const Route = createFileRoute('/field')({
  component: FieldExamplesPage,
})

function FieldExamplesPage() {
  return (
    <DocExamplePage
      to="/field"
      usage={`import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'

<Field data-invalid>
  <FieldLabel htmlFor="email">Email</FieldLabel>
  <Input id="email" aria-invalid />
  <FieldDescription>Used to send payment receipts.</FieldDescription>
  <FieldError>Enter a valid email address.</FieldError>
</Field>`}
    >
      <div className="space-y-8">
        <FieldSet className="max-w-sm">
          <FieldLegend>Customer Data</FieldLegend>
          <FieldDescription>Shown on invoices, receipts, and Online Store orders.</FieldDescription>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="full-name">Full name</FieldLabel>
              <Input id="full-name" placeholder="Alex Turner" />
              <FieldDescription>Billing name on INV-2048.</FieldDescription>
            </Field>
            <Field data-invalid>
              <FieldLabel htmlFor="customer-email">Email</FieldLabel>
              <Input id="customer-email" placeholder="alex@example.com" aria-invalid />
              <FieldError>Enter a valid email to send the payment link.</FieldError>
            </Field>
            <Field orientation="horizontal">
              <Switch defaultChecked />
              <FieldLabel>Email receipt after Point of Sale</FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="save-customer-data" defaultChecked />
              <FieldLabel htmlFor="save-customer-data">Save to Customer Data</FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>

        <FieldSet className="max-w-sm">
          <FieldLegend>Product Data</FieldLegend>
          <FieldDescription>Shared by Online Store and Point of Sale.</FieldDescription>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="product-name">Product name</FieldLabel>
              <Input id="product-name" defaultValue="Classic White Tee" />
              <FieldDescription>Catalog title on the storefront.</FieldDescription>
            </Field>
            <Field orientation="horizontal">
              <Switch />
              <FieldLabel>Track inventory</FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
      </div>
    </DocExamplePage>
  )
}
