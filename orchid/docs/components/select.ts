// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const selectRegistry = registry.items.find(
  (item: { name: string }) => item.name === "select",
);

export const SELECT_CURRENCY_OPTIONS = [
  { value: "SGD", label: "SGD — Singapore Dollar" },
  { value: "USD", label: "USD — US Dollar" },
  { value: "MYR", label: "MYR — Malaysian Ringgit" },
  { value: "IDR", label: "IDR — Indonesian Rupiah" },
];

export const SELECT_CHANNEL_OPTIONS = [
  { value: "pos", label: "POS" },
  { value: "invoice", label: "Invoice" },
  { value: "online_store", label: "Online Store" },
];

const selectDocs = {
  ...selectRegistry,
  category: "components",
  props: {
    options: "SelectOption[]",
    value: "string | string[] | null",
    defaultValue: "string | string[] | null",
    onValueChange: "function",
    multiple: "boolean",
    searchable: "boolean",
    placeholder: "string",
    searchPlaceholder: "string",
    empty: "string",
    disabled: "boolean",
    invalid: "boolean",
    size: ["sm", "default", "inline"],
    clearable: "boolean",
  },
  examples: [
    {
      description: "Closed list",
      code: `<Field>
  <FieldLabel>Currency</FieldLabel>
  <Select options={CURRENCY_OPTIONS} defaultValue="SGD" />
  <FieldDescription>Ordinary dropdown — no search field.</FieldDescription>
</Field>`,
    },
    {
      description: "Searchable",
      code: `<Field>
  <FieldLabel>Sales channel</FieldLabel>
  <Select
    searchable
    options={CHANNEL_OPTIONS}
    placeholder="Search channels"
  />
</Field>`,
    },
    {
      description: "Multiple with chips",
      code: `<Field>
  <FieldLabel>Methods</FieldLabel>
  <Select multiple options={CHANNEL_OPTIONS} defaultValue={["pos"]} />
</Field>`,
    },
  ],
  related_components: [
    "field",
    "form-builder",
    "resource-picker",
  ],
};

export default selectDocs;
