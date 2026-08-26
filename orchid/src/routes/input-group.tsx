import { createFileRoute } from '@tanstack/react-router'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupSeparator,
  InputGroupText,
} from '@/components/ui/input-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export const Route = createFileRoute('/input-group')({
  component: InputGroupExamplesPage,
})

function CurrencySelect({ defaultValue = 'SGD' }: { defaultValue?: string }) {
  return (
    <Select defaultValue={defaultValue}>
      <SelectTrigger size="Inline">
        <SelectValue className="uppercase" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="SGD">SGD</SelectItem>
        <SelectItem value="USD">USD</SelectItem>
        <SelectItem value="MYR">MYR</SelectItem>
        <SelectItem value="IDR">IDR</SelectItem>
      </SelectContent>
    </Select>
  )
}

function InputGroupExamplesPage() {
  return (
    <DocExamplePage to="/input-group">
      <FieldGroup className="max-w-sm">
        <Field>
          <FieldLabel>Invoice amount</FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <CurrencySelect />
            </InputGroupAddon>
            <InputGroupSeparator />
            <InputGroupInput placeholder="128.00" />
          </InputGroup>
          <FieldDescription>Amount billed on this invoice.</FieldDescription>
        </Field>

        <Field>
          <FieldLabel>Payment link amount</FieldLabel>
          <InputGroup>
            <InputGroupInput placeholder="49.00" />
            <InputGroupSeparator />
            <InputGroupAddon align="inline-end">
              <CurrencySelect defaultValue="SGD" />
            </InputGroupAddon>
          </InputGroup>
          <FieldDescription>Fixed amount the customer pays via the link.</FieldDescription>
        </Field>

        <Field>
          <FieldLabel>Online Store URL</FieldLabel>
          <InputGroup>
            <InputGroupAddon className="self-stretch bg-oc-muted">
              <InputGroupText>https://hitpay.shop/</InputGroupText>
            </InputGroupAddon>
            <InputGroupSeparator />
            <InputGroupInput placeholder="studio" />
          </InputGroup>
          <FieldDescription>Public storefront path for this merchant.</FieldDescription>
        </Field>
      </FieldGroup>

      <FieldGroup className="max-w-sm">
        <Field>
          <FieldLabel>Recurring charge</FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <CurrencySelect />
            </InputGroupAddon>
            <InputGroupSeparator />
            <InputGroupInput placeholder="29.00" />
          </InputGroup>
          <FieldDescription>Billed each cycle until the plan is cancelled.</FieldDescription>
        </Field>

        <Field>
          <FieldLabel>POS tip amount</FieldLabel>
          <InputGroup>
            <InputGroupInput placeholder="2.00" />
            <InputGroupSeparator />
            <InputGroupAddon align="inline-end">
              <CurrencySelect />
            </InputGroupAddon>
          </InputGroup>
          <FieldDescription>Optional tip collected at the POS terminal.</FieldDescription>
        </Field>

        <Field>
          <FieldLabel>Payment channel fee</FieldLabel>
          <InputGroup>
            <InputGroupAddon className="self-stretch bg-oc-muted">
              <InputGroupText>%</InputGroupText>
            </InputGroupAddon>
            <InputGroupSeparator />
            <InputGroupInput placeholder="2.9" />
          </InputGroup>
          <FieldDescription>Percentage fee for this payment channel.</FieldDescription>
        </Field>
      </FieldGroup>
    </DocExamplePage>
  )
}
