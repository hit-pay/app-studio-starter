// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const inputRegistry = registry.items.find(
  (item: { name: string }) => item.name === "input",
);

const inputDocs = {
  ...inputRegistry,
  category: "ui",
  props: {
    type: "string",
    disabled: "boolean",
    "aria-invalid": "boolean",
  },
  examples: [
    {
      description: "With field label",
      code: `<Field>
  <FieldLabel htmlFor="invoice-number">Invoice number</FieldLabel>
  <Input id="invoice-number" defaultValue="INV-2048" placeholder="INV-0001" />
  <FieldDescription>Shown on the PDF and payment page.</FieldDescription>
</Field>`,
    },
    {
      description: "Invalid state",
      code: `<Field data-invalid>
  <FieldLabel htmlFor="invoice-amount">Amount</FieldLabel>
  <Input id="invoice-amount" placeholder="0.00" aria-invalid />
  <FieldError>Enter an amount greater than SGD 0.00.</FieldError>
</Field>`,
    },
    {
      description: "Disabled",
      code: `<Field>
  <FieldLabel htmlFor="sku-disabled">Archived SKU</FieldLabel>
  <Input id="sku-disabled" defaultValue="OLD-SKU-01" disabled />
</Field>`,
    },
  ],
  related_components: ["field", "input-group", "textarea", "label"],
};

export default inputDocs;
