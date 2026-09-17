// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const quantityInputRegistry = registry.items.find(
  (item: { name: string }) => item.name === "quantity-input",
);

const quantityInputDocs = {
  ...quantityInputRegistry,
  category: "components",
  props: {
    value: "number",
    defaultValue: "number",
    min: "number",
    max: "number",
    step: "number",
    disabled: "boolean",
    name: "string",
    onValueChange: "function",
  },
  examples: [
    {
      description: "Invoice line quantity",
      code: `<QuantityInput defaultValue={2} min={0} max={99} />`,
    },
    {
      description: "With field label",
      code: `<Field>
  <FieldLabel>Quantity</FieldLabel>
  <QuantityInput name="quantity" defaultValue={1} min={1} max={10} />
  <FieldDescription>POS cart · SKU-TEA-12</FieldDescription>
</Field>`,
    },
    {
      description: "Disabled",
      code: `<QuantityInput defaultValue={5} disabled />`,
    },
  ],
  related_components: ["field", "input", "slider", "form-builder"],
};

export default quantityInputDocs;
