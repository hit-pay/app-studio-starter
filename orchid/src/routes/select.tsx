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
            <FieldDescription>Two fixed stock states for Product Data.</FieldDescription>
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

          <Field>
            <FieldLabel>Recurring interval</FieldLabel>
            <Select defaultValue="monthly">
              <SelectTrigger>
                <SelectValue placeholder="Select interval" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            <FieldDescription>How often the Recurring plan charges the customer.</FieldDescription>
          </Field>

          <Field>
            <FieldLabel>POS terminal</FieldLabel>
            <Select defaultValue="orchard-01">
              <SelectTrigger>
                <SelectValue placeholder="Select terminal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="orchard-01">Orchard 01</SelectItem>
                <SelectItem value="orchard-02">Orchard 02</SelectItem>
                <SelectItem value="tanjong-pagar">Tanjong Pagar</SelectItem>
              </SelectContent>
            </Select>
            <FieldDescription>Register this sale against a POS device.</FieldDescription>
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
                <SelectItem value="payment-link">Payment Link</SelectItem>
                <SelectItem value="recurring">Recurring</SelectItem>
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

          <Field>
            <FieldLabel>Product tax class</FieldLabel>
            <Select defaultValue="standard">
              <SelectTrigger>
                <SelectValue placeholder="Select tax class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard GST</SelectItem>
                <SelectItem value="zero">Zero-rated</SelectItem>
                <SelectItem value="exempt">Exempt</SelectItem>
                <SelectItem value="digital">Digital services</SelectItem>
              </SelectContent>
            </Select>
            <FieldDescription>Applied to invoices, Online Store, and POS.</FieldDescription>
          </Field>

          <Field>
            <FieldLabel>Payment channel</FieldLabel>
            <Select defaultValue="paynow">
              <SelectTrigger>
                <SelectValue placeholder="Select payment channel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paynow">PayNow</SelectItem>
                <SelectItem value="card">Card</SelectItem>
                <SelectItem value="grabpay">GrabPay</SelectItem>
                <SelectItem value="paylah">PayLah!</SelectItem>
              </SelectContent>
            </Select>
            <FieldDescription>Default method for this invoice or payment link.</FieldDescription>
          </Field>
        </FieldGroup>
      </div>
    </DocExamplePage>
  )
}
