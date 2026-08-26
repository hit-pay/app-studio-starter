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

function CurrencySelect({ defaultValue = 'USD' }: { defaultValue?: string }) {
  return (
    <Select defaultValue={defaultValue}>
      <SelectTrigger size="Inline">
        <SelectValue className="uppercase" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="USD">USD</SelectItem>
        <SelectItem value="SGD">SGD</SelectItem>
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
          <FieldLabel>Currency leading</FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <CurrencySelect />
            </InputGroupAddon>
            <InputGroupSeparator />
            <InputGroupInput placeholder="Placeholder" />
          </InputGroup>
          <FieldDescription>This is a hint text to help user.</FieldDescription>
        </Field>

        <Field>
          <FieldLabel>Currency trailing</FieldLabel>
          <InputGroup>
            <InputGroupInput placeholder="Placeholder" />
            <InputGroupSeparator />
            <InputGroupAddon align="inline-end">
              <CurrencySelect />
            </InputGroupAddon>
          </InputGroup>
          <FieldDescription>This is a hint text to help user.</FieldDescription>
        </Field>

        <Field>
          <FieldLabel>Prefix + input</FieldLabel>
          <InputGroup>
            <InputGroupAddon className="self-stretch bg-[#f8f9fc]">
              <InputGroupText>https://hitpay.shop/</InputGroupText>
            </InputGroupAddon>
            <InputGroupSeparator />
            <InputGroupInput placeholder="Placeholder" />
          </InputGroup>
          <FieldDescription>This is a hint text to help user.</FieldDescription>
        </Field>
      </FieldGroup>
    </DocExamplePage>
  )
}
