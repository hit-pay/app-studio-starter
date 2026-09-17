// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const selectRegistry = registry.items.find(
  (item: { name: string }) => item.name === "select",
);

const CURRENCY_OPTIONS = `[
  { value: "SGD", label: "SGD — Singapore Dollar" },
  { value: "USD", label: "USD — US Dollar" },
  { value: "MYR", label: "MYR — Malaysian Ringgit" },
  { value: "IDR", label: "IDR — Indonesian Rupiah" },
]`;

const CHANNEL_OPTIONS = `[
  { value: "pos", label: "POS" },
  { value: "invoice", label: "Invoice" },
  { value: "online_store", label: "Online Store" },
]`;

const LOCATION_OPTIONS = `[
  {
    value: "loc-main",
    label: "Main Store",
    description: "1 Harbourfront Walk, Singapore 098632",
  },
  {
    value: "loc-wh",
    label: "Warehouse",
    description: "10 Tuas Avenue, Singapore 639135",
  },
  {
    value: "loc-popup",
    label: "Pop-up @ Orchard",
    description: "Limited hours · Fri–Sun only",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=64&h=64&fit=crop",
  },
]`;

const selectDocs = {
  ...selectRegistry,
  category: "components",
  props: {
    "options[].value": "string (required)",
    "options[].label": "string (required) — trigger, chips, default row title",
    "options[].description": "string — secondary line in menu; searchable",
    "options[].image": "string | null — thumbnail URL in menu row",
    "options[].disabled": "boolean",
    options: "SelectOption[]",
    value: "string | string[] | null",
    defaultValue: "string | string[] | null",
    onValueChange: "(value: string | string[] | null) => void",
    multiple: "boolean — chip input + checkbox rows",
    searchable: "boolean — filter by label and description",
    placeholder: "string — closed trigger or multi chip input",
    searchPlaceholder: "string — searchable input placeholder",
    empty: "string — no matches message",
    disabled: "boolean",
    invalid: "boolean",
    id: "string",
    size: ["sm", "default", "inline"],
    contentClassName: "string",
    clearable: "boolean — searchable single select only",
    onBlur: "function",
    renderOption: "(option: SelectOption) => ReactNode — custom row; label still drives trigger and search",
  },
  examples: [
    {
      description: "Closed list",
      code: `function CurrencySelectExample() {
  const CURRENCY_OPTIONS = ${CURRENCY_OPTIONS};
  return (
    <Field>
      <FieldLabel>Currency</FieldLabel>
      <Select options={CURRENCY_OPTIONS} defaultValue="SGD" />
      <FieldDescription>Ordinary dropdown — no search field.</FieldDescription>
    </Field>
  );
}

render(<CurrencySelectExample />);`,
    },
    {
      description: "Searchable",
      code: `function ChannelSelectExample() {
  const CHANNEL_OPTIONS = ${CHANNEL_OPTIONS};
  return (
    <Field>
      <FieldLabel>Sales channel</FieldLabel>
      <Select
        searchable
        options={CHANNEL_OPTIONS}
        placeholder="Search channels"
      />
    </Field>
  );
}

render(<ChannelSelectExample />);`,
    },
    {
      description: "Rich options (name + description + image)",
      code: `function LocationSelectExample() {
  const LOCATION_OPTIONS = ${LOCATION_OPTIONS};
  return (
    <Field>
      <FieldLabel>Location</FieldLabel>
      <Select
        searchable
        clearable
        options={LOCATION_OPTIONS}
        placeholder="Choose location"
      />
      <FieldDescription>
        Pass description or image on each option. Trigger shows label only.
      </FieldDescription>
    </Field>
  );
}

render(<LocationSelectExample />);`,
    },
    {
      description: "Multiple with chips",
      code: `function MultiSelectExample() {
  const CHANNEL_OPTIONS = ${CHANNEL_OPTIONS};
  return (
    <Field>
      <FieldLabel>Methods</FieldLabel>
      <Select multiple options={CHANNEL_OPTIONS} defaultValue={["pos"]} />
    </Field>
  );
}

render(<MultiSelectExample />);`,
    },
  ],
  related_components: [
    "field",
    "form-builder",
    "choice-card",
  ],
};

export default selectDocs;
