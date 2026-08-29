import { SearchIcon } from 'lucide-react'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupSeparator,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'


function CurrencySelect({ defaultValue = 'SGD' }: { defaultValue?: string }) {
  return (
    <Select defaultValue={defaultValue}>
      <SelectTrigger size="Inline" className="gap-2">
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

function InputGroupDemo() {
  return (
    <>
      <FieldGroup className="max-w-sm">
        <Field>
          <FieldLabel>Invoice amount</FieldLabel>
          <InputGroup>
            <InputGroupAddon className="px-2 py-0">
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
            <InputGroupAddon align="inline-end" className="px-2 py-0">
              <CurrencySelect defaultValue="SGD" />
            </InputGroupAddon>
          </InputGroup>
          <FieldDescription>Fixed amount the customer pays via the link.</FieldDescription>
        </Field>

        <Field>
          <FieldLabel>Online Store URL</FieldLabel>
          <InputGroup>
            <InputGroupAddon className="self-stretch bg-oc-muted">
              <InputGroupText className='pr-2'>https://hitpay.shop/</InputGroupText>
            </InputGroupAddon>
            <InputGroupSeparator />
            <InputGroupInput placeholder="studio" />
          </InputGroup>
          <FieldDescription>Public storefront path for this merchant.</FieldDescription>
        </Field>

        <Field>
          <FieldLabel>Customer search</FieldLabel>
          <InputGroup>
            <InputGroupInput placeholder="Search customers" />
            <InputGroupAddon align="inline-end">
              <InputGroupButton size="icon-xs" aria-label="Search">
                <SearchIcon />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </FieldGroup>

      <FieldGroup className="max-w-sm">
        <Field>
          <FieldLabel>Recurring charge</FieldLabel>
          <InputGroup>
            <InputGroupAddon className="px-2 py-0">
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
            <InputGroupAddon align="inline-end" className="px-2 py-0">
              <CurrencySelect />
            </InputGroupAddon>
          </InputGroup>
          <FieldDescription>Optional tip collected at the POS terminal.</FieldDescription>
        </Field>

        <Field>
          <FieldLabel>Payment channel fee</FieldLabel>
          <InputGroup>
            <InputGroupAddon className="self-stretch bg-oc-muted">
              <InputGroupText className="pr-2">%</InputGroupText>
            </InputGroupAddon>
            <InputGroupSeparator />
            <InputGroupInput placeholder="2.9" />
          </InputGroup>
          <FieldDescription>Percentage fee for this payment channel.</FieldDescription>
        </Field>

        <Field>
          <FieldLabel>Payment note</FieldLabel>
          <InputGroup>
            <InputGroupAddon align="block-start">Internal note</InputGroupAddon>
            <InputGroupTextarea placeholder="Add context for your team…" />
            <InputGroupAddon align="block-end">Visible only to staff</InputGroupAddon>
          </InputGroup>
        </Field>
      </FieldGroup>
    </>
  )
}

export { InputGroupDemo }
