// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };
import { SCHEMA_FORM_TYPES } from "../../src/components/form/form-builder-model";

const formBuilderRegistry = registry.items.find(
  (item: { name: string }) => item.name === "form-builder",
);

const formBuilderDocs = {
  ...formBuilderRegistry,
  category: "components",
  props: {
    type: [...SCHEMA_FORM_TYPES],
    columns: [1, 2, 3, 4],
    colSpan: [1, 2, 3, 4, "full"],
    required: "boolean",
    showIf: "string | string[]",
    renderField: "function",
  },
  examples: [
    {
      description: "Schema-driven fields",
      code: `function FormBuilderExample() {
  const form = useFormBuilder({
    fields: [
      {
        key: "name",
        title: "Customer name",
        type: "input",
        placeholder: "Priya Nair",
        required: true,
      },
      { key: "qty", title: "Quantity", type: "quantity", value: 1, min: 1, max: 99 },
      { key: "due", title: "Due date", type: "date" },
      {
        key: "channel",
        title: "Payment channel",
        type: "choice-card",
        options: [
          { value: "paynow", label: "PayNow", description: "Instant bank transfer" },
          { value: "card", label: "Card", description: "Visa, Mastercard, AMEX" },
        ],
      },
    ],
    onSubmit: () => undefined,
  });

  return (
    <>
      <FormBuilder form={form} id="invoice-form" />
      <Button type="submit" form="invoice-form">
        Save invoice
      </Button>
    </>
  );
}

render(<FormBuilderExample />);`,
    },
    {
      description: "Two-column layout",
      code: `function FormLayoutExample() {
  const form = useFormBuilder({
    fields: [
      { key: "basics", title: "Basics", type: "section" },
      { key: "name", title: "Product name", type: "input", required: true, value: "" },
      { key: "sku", title: "SKU", type: "input", value: "" },
      { key: "price", title: "Price (SGD)", type: "input", required: true, value: "" },
      { key: "qty", title: "Quantity", type: "quantity", value: 1, min: 0, max: 999 },
      {
        key: "description",
        title: "Description",
        type: "textarea",
        props: { colSpan: "full" },
        value: "",
      },
    ],
    onSubmit: () => undefined,
  });

  return (
    <FormBuilder
      form={form}
      layout={{ columns: 2, types: { section: "full", textarea: "full" } }}
    />
  );
}

render(<FormLayoutExample />);`,
    },
    {
      description: "Conditional field (showIf)",
      code: `function ConditionalFormExample() {
  const form = useFormBuilder({
    fields: [
      {
        key: "kind",
        title: "Fulfillment",
        type: "radio",
        options: [
          { value: "shipping", label: "Shipping" },
          { value: "pickup", label: "Pickup" },
        ],
        value: "shipping",
      },
      {
        key: "address",
        title: "Shipping address",
        type: "textarea",
        showIf: "kind",
        showIfValue: "shipping",
        value: "",
      },
      {
        key: "pickup_note",
        title: "Pickup instructions",
        type: "input",
        showIf: "kind",
        showIfValue: "pickup",
        value: "",
      },
    ],
    onSubmit: () => undefined,
  });

  return <FormBuilder form={form} />;
}

render(<ConditionalFormExample />);`,
    },
  ],
  related_components: [
    "form-layout",
    "field",
    "choice-card",
    "date-picker",
    "detail-card",
  ],
};

export default formBuilderDocs;
