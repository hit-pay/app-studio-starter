import { Checkbox, CheckboxGroup } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { Label } from "@/components/ui/label";

function CheckboxDemo() {
  return (
    <>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Basic
          </p>
          <div className="flex items-center gap-2">
            <Checkbox id="email-receipt" defaultChecked />
            <Label htmlFor="email-receipt">Send receipt by email</Label>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Description
          </p>
          <Field orientation="horizontal" className="max-w-sm">
            <Checkbox id="attach-product-data" />
            <FieldContent>
              <FieldLabel htmlFor="attach-product-data">
                Attach Product Data
              </FieldLabel>
              <FieldDescription>
                Include SKU, quantity, and SGD amount on INV-2026-0842.
              </FieldDescription>
            </FieldContent>
          </Field>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            States
          </p>
          <div className="flex flex-col gap-2">
            <Field orientation="horizontal">
              <Checkbox id="unchecked-state" />
              <FieldLabel htmlFor="unchecked-state">Unchecked</FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="checked-state" defaultChecked />
              <FieldLabel htmlFor="checked-state">Checked</FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="indeterminate-state" indeterminate />
              <FieldLabel htmlFor="indeterminate-state">
                Indeterminate
              </FieldLabel>
            </Field>
            <Field orientation="horizontal" data-invalid>
              <Checkbox id="invalid-state" aria-invalid />
              <FieldLabel htmlFor="invalid-state">Invalid</FieldLabel>
            </Field>
            <Field orientation="horizontal" data-disabled>
              <Checkbox id="disabled-state" disabled />
              <FieldLabel htmlFor="disabled-state">Disabled</FieldLabel>
            </Field>
            <Field orientation="horizontal" data-disabled>
              <Checkbox id="checked-disabled-state" defaultChecked disabled />
              <FieldLabel htmlFor="checked-disabled-state">
                Checked and disabled
              </FieldLabel>
            </Field>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Vertical group
          </p>
          <CheckboxGroup
            label="Payment Channels"
            alignment="Vertical"
            defaultValue={["paynow"]}
          >
            <Field orientation="horizontal">
              <Checkbox id="channel-paynow" value="paynow" />
              <FieldLabel htmlFor="channel-paynow">PayNow</FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="channel-cards" value="cards" />
              <FieldLabel htmlFor="channel-cards">Cards</FieldLabel>
            </Field>
            <Field orientation="horizontal">
              <Checkbox id="channel-grabpay" value="grabpay" />
              <FieldLabel htmlFor="channel-grabpay">GrabPay</FieldLabel>
            </Field>
          </CheckboxGroup>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Horizontal group
          </p>
          <CheckboxGroup
            label="Commerce"
            alignment="Horizontal"
            defaultValue={["invoice"]}
          >
            <Field orientation="horizontal" className="w-auto">
              <Checkbox id="commerce-invoice" value="invoice" />
              <FieldLabel htmlFor="commerce-invoice">Invoice</FieldLabel>
            </Field>
            <Field orientation="horizontal" className="w-auto">
              <Checkbox id="commerce-link" value="link" />
              <FieldLabel htmlFor="commerce-link">Payment Link</FieldLabel>
            </Field>
            <Field orientation="horizontal" className="w-auto">
              <Checkbox id="commerce-pos" value="pos" />
              <FieldLabel htmlFor="commerce-pos">Point of Sale</FieldLabel>
            </Field>
          </CheckboxGroup>
        </div>
      </div>
    </>
  );
}

export { CheckboxDemo };
