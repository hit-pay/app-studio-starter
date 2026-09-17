// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const textareaRegistry = registry.items.find(
  (item: { name: string }) => item.name === "textarea",
);

const textareaDocs = {
  ...textareaRegistry,
  category: "ui",
  props: {
    disabled: "boolean",
    "aria-invalid": "boolean",
    rows: "number",
  },
  examples: [
    {
      description: "With field label",
      code: `<Field>
  <FieldLabel htmlFor="invoice-notes">Invoice notes</FieldLabel>
  <Textarea
    id="invoice-notes"
    placeholder="Payment due in 14 days. Bank transfer details on the PDF."
  />
  <FieldDescription>Visible to the customer on the invoice.</FieldDescription>
</Field>`,
    },
    {
      description: "Default value",
      code: `<Field>
  <FieldLabel htmlFor="product-desc">Product description</FieldLabel>
  <Textarea
    id="product-desc"
    defaultValue="Soft cotton tee. Ships from Singapore."
  />
</Field>`,
    },
    {
      description: "Validation error",
      code: `<Field data-invalid>
  <FieldLabel htmlFor="refund-reason">Refund reason</FieldLabel>
  <Textarea id="refund-reason" placeholder="Describe the refund" aria-invalid />
  <FieldError>A refund reason is required for this payment.</FieldError>
</Field>`,
    },
  ],
  related_components: ["field", "input", "input-group", "form-builder"],
};

export default textareaDocs;
