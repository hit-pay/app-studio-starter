<!-- Generated from content/docs/components/input.mdx. Do not edit. -->

# Input

Text and file input with Orchid states.

## Example

```tsx
import {
  MailRegular,
  SearchRegular,
} from '@mingcute/react/core-regular'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@ui/form/field'
import { Input } from '@ui/form/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@ui/form/input-group'

function InputDemo() {
  return (
    <>
      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Invoice
        </p>
        <FieldGroup className="max-w-sm">
          <Field>
            <FieldLabel htmlFor="invoice-number">Invoice number</FieldLabel>
            <Input id="invoice-number" defaultValue="INV-2048" placeholder="INV-0001" />
            <FieldDescription>Shown on the PDF and payment page.</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="customer-email">Customer email</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <MailRegular />
              </InputGroupAddon>
              <InputGroupInput id="customer-email" placeholder="alex@example.com" />
            </InputGroup>
            <FieldDescription>Where we send the invoice and receipt.</FieldDescription>
          </Field>
          <Field data-invalid>
            <FieldLabel htmlFor="invoice-amount">Amount</FieldLabel>
            <Input id="invoice-amount" placeholder="0.00" aria-invalid />
            <FieldError>Enter an amount greater than SGD 0.00.</FieldError>
          </Field>
        </FieldGroup>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Product Data
        </p>
        <FieldGroup className="max-w-sm">
          <Field>
            <FieldLabel htmlFor="sku">SKU</FieldLabel>
            <Input id="sku" defaultValue="TEE-WHT-M" placeholder="SKU" />
            <FieldDescription>Used in Online Store and Point of Sale.</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="product-search">Search products</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <SearchRegular />
              </InputGroupAddon>
              <InputGroupInput id="product-search" placeholder="Classic White Tee" />
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor="sku-disabled">Archived SKU</FieldLabel>
            <Input id="sku-disabled" defaultValue="OLD-SKU-01" disabled />
          </Field>
        </FieldGroup>
      </div>
    </>
  )
}

export { InputDemo }
```
