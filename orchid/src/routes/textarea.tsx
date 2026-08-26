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
      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Invoice
        </p>
        <FieldGroup className="max-w-sm">
          <Field>
            <FieldLabel htmlFor="invoice-notes">Invoice notes</FieldLabel>
            <Textarea
              id="invoice-notes"
              placeholder="Payment due in 14 days. Bank transfer details on the PDF."
            />
            <FieldDescription>Visible to the customer on the invoice.</FieldDescription>
          </Field>
        </FieldGroup>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Online Store
        </p>
        <FieldGroup className="max-w-sm">
          <Field>
            <FieldLabel htmlFor="product-desc">Product description</FieldLabel>
            <Textarea
              id="product-desc"
              defaultValue="Soft cotton tee. Ships from Singapore. Available in-store and online."
            />
            <FieldDescription>Used on the product page and POS receipt.</FieldDescription>
          </Field>
          <Field data-invalid>
            <FieldLabel htmlFor="refund-reason">Refund reason</FieldLabel>
            <Textarea id="refund-reason" placeholder="Describe the refund" aria-invalid />
            <FieldError>A refund reason is required for this payment.</FieldError>
          </Field>
        </FieldGroup>
      </div>
    </DocExamplePage>
  )
}
