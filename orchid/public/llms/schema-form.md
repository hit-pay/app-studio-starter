<!-- Generated from content/docs/components/schema-form.mdx. Do not edit. -->

# Schema Form

TanStack Form plus Orchid fields. Types include date, datetime, file, quantity, switch.

## Example

```tsx
import { useState } from "react";

import { DocCodePanel } from "@/components/doc/doc-code-panel";
import { Button } from "@/components/ui/button";
import {
  SchemaForm,
  useSchemaForm,
  type SchemaFormChange,
  type SchemaFormField,
} from "@/components/ui/schema-form";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";

const OPTIONS = [
  { value: "a", label: "Option A" },
  { value: "b", label: "Option B" },
];

const ACCOUNT_FIELDS: SchemaFormField[] = [
  {
    key: "section",
    title: "Account",
    type: "section",
    description: "One SchemaForm instance.",
  },
  {
    key: "input",
    title: "Input",
    type: "input",
    placeholder: "Placeholder",
    required: true,
    maxLength: 32,
    value: "",
  },
  {
    key: "email",
    title: "Email",
    type: "input",
    placeholder: "name@example.com",
    validation: "email",
    value: "",
  },
  {
    key: "password",
    title: "Password",
    type: "password",
    required: true,
    placeholder: "At least 8 characters",
    description: "At least 8 characters, with a letter and a number.",
    validation: "/^(?=.*[A-Za-z])(?=.*\\d).{8,}$/",
    value: "",
  },
  {
    key: "textarea",
    title: "Textarea",
    type: "textarea",
    placeholder: "Placeholder",
    minLength: 12,
    description: "At least 12 characters.",
    value: "",
  },
  {
    key: "select",
    title: "Select",
    type: "select",
    placeholder: "Select",
    required: true,
    options: OPTIONS,
    value: "a",
  },
  {
    key: "combobox",
    title: "Combobox",
    type: "combobox",
    placeholder: "Search",
    options: OPTIONS,
    value: "a",
  },
  {
    key: "combobox_multiple",
    title: "Combobox (multiple)",
    type: "combobox",
    props: { multiple: true },
    placeholder: "Search",
    options: OPTIONS,
    value: ["a"],
  },
  {
    key: "qty",
    title: "Quantity",
    type: "quantity",
    value: 1,
    min: 1,
    max: 99,
  },
  {
    key: "when",
    title: "Date",
    type: "date",
    value: "",
  },
  {
    key: "at",
    title: "Date and time",
    type: "datetime",
    value: "",
  },
];

const DETAILS_FIELDS: SchemaFormField[] = [
  {
    key: "section",
    title: "Details",
    type: "section",
    description: "Second SchemaForm on the same page.",
  },
  {
    key: "radio",
    title: "Radio",
    type: "radio",
    options: OPTIONS,
    value: "a",
  },
  {
    key: "channel",
    title: "Channel",
    type: "choice-card",
    required: true,
    options: [
      { value: "paynow", label: "PayNow", description: "Instant bank transfer" },
      { value: "card", label: "Card", description: "Visa, Mastercard, AMEX" },
    ],
    props: { alignment: "vertical", cardAlignment: "left" },
    value: "paynow",
  },
  {
    key: "accepted",
    title: "I accept the terms",
    type: "accepted",
    required: true,
    validation: "accepted",
    value: false,
  },
  {
    key: "address",
    title: "Address",
    type: "object",
    fields: [
      {
        key: "heading",
        title: "Address",
        type: "section",
        description: "Nested object — values live under address.",
      },
      {
        key: "line1",
        title: "Line 1",
        type: "input",
        placeholder: "1 Harbourfront Avenue",
        required: true,
        value: "",
      },
      {
        key: "city",
        title: "City",
        type: "input",
        placeholder: "Singapore",
        value: "Singapore",
      },
      {
        key: "postal",
        title: "Postal code",
        type: "input",
        placeholder: "098632",
        value: "",
      },
    ],
  },
  {
    key: "checkbox_group",
    title: "Checkbox group",
    type: "checkbox-group",
    options: OPTIONS,
    value: ["a"],
  },
  {
    key: "switch",
    title: "Switch",
    type: "switch",
    value: false,
  },
  {
    key: "slider",
    title: "Slider",
    type: "slider",
    value: 40,
    max: 100,
  },
  {
    key: "min+max",
    title: "Slider range",
    type: "slider",
    value: { min: 20, max: 80 },
    max: 100,
  },
  {
    key: "slider_range",
    title: "Slider range (object)",
    type: "slider",
    value: { min: 10, max: 70 },
    max: 100,
  },
  {
    key: "date",
    title: "Date",
    type: "date",
    value: "2026-08-15",
  },
  {
    key: "from+to",
    title: "Date range",
    type: "date-range",
    value: { from: "2026-01-20", to: "2026-02-09" },
  },
  {
    key: "date_range",
    title: "Date range (object)",
    type: "date-range",
    value: { from: "2026-03-01", to: "2026-03-15" },
  },
  {
    key: "amount+currency",
    title: "Input group",
    type: "input-group",
    placeholder: "0.00",
    options: [
      { value: "sgd", label: "SGD" },
      { value: "usd", label: "USD" },
      { value: "myr", label: "MYR" },
    ],
    required: true,
    props: { align: "end" },
    value: { amount: "", currency: "sgd" },
  },
  {
    key: "receipt",
    title: "Receipt",
    type: "file",
    description: "Upload one file.",
  },
  {
    key: "documents",
    title: "Documents",
    type: "file",
    props: { multiple: true },
    description: "Upload several files.",
  },
  {
    key: "password_protection",
    title: "Password protection",
    type: "section-item",
    description:
      "Visitors must enter a password before they can view the store.",
    value: false,
  },
  {
    key: "store_password",
    title: "Store password",
    type: "password",
    placeholder: "Enter password",
    required: true,
    showIf: "password_protection",
    showIfValue: true,
  },
  {
    key: "guest_checkout",
    title: "Guest checkout",
    type: "section-item",
    description: "Let customers pay without creating an account.",
    props: { background: true },
    showIf: "password_protection",
    showIfValue: true,
    value: false,
  },
];

const TYPE_PROMPT = `Schema Form field prompt

Each item in fields is one control.

Required
- key, title, type

Optional
- required, placeholder, description, options, value
- validation, hidden, maxLength, minLength, min, max
- props — control options (e.g. combobox multiple, section-item background, colSpan)
- fields — nested object children
- showIf / showIfValue — show a field when another field matches

Layout
- layout.columns — responsive column count, 1 through 4
- layout.fields — span by field key or nested path
- layout.types — default span by control type
- props.colSpan — field-level override; accepts 1, 2, 3, 4, or "full"

Types
- input | password | textarea | phone
- select
- combobox — searchable; add props.multiple for chips
- radio | choice-card | checkbox | checkbox-group | accepted | switch
- choice-card — pick one; options may include description; props.alignment vertical|horizontal
- slider — single value; range via key "min+max" or one key with value { min, max }
- input-group — key "amount+currency" writes amount + currency
- date | datetime | date-range | file | quantity
- file — one File; add props.multiple for File[]
- date-range — key "from+to" writes from + to, or one key with { from, to }
- object — nest with fields[]
- hidden | section | section-item — row with title + switch

showIf
- showIf: "password_protection"
- showIfValue: true
- or arrays (AND): showIf: ["a", "b"], showIfValue: [true, "delivery"]

Validation
- pipes: email | max:255 | phone | valid_url | accepted
- or regex: /^[A-Z]{4}SG[A-Z0-9]{2}([A-Z0-9]{3})?$/

hidden: true hides the control (or type: "hidden"); the value still submits.

State lives in useSchemaForm. Render with <SchemaForm form={account} />. Call account.submit() from the host.

Example — combobox multiple
{
  "key": "channels",
  "title": "Payment channels",
  "type": "combobox",
  "props": { "multiple": true },
  "options": [
    { "value": "paynow", "label": "PayNow" },
    { "value": "card", "label": "Card" }
  ],
  "value": ["paynow"]
}

Example — choice-card
{
  "key": "channel",
  "title": "Channel",
  "type": "choice-card",
  "required": true,
  "options": [
    { "value": "paynow", "label": "PayNow", "description": "Instant bank transfer" },
    { "value": "card", "label": "Card", "description": "Visa, Mastercard, AMEX" }
  ],
  "props": { "alignment": "vertical", "cardAlignment": "left" },
  "value": "paynow"
}`;

function JsonPanel({ filename, data }: { filename: string; data: unknown }) {
  const code =
    typeof data === "string"
      ? data
      : JSON.stringify(
          data,
          (_key, value) =>
            value instanceof File
              ? { name: value.name, size: value.size, type: value.type }
              : value,
          2,
        );
  return <DocCodePanel filename={filename} code={code} />;
}

function SchemaFormDemo() {
  const account = useSchemaForm({ fields: ACCOUNT_FIELDS });
  const details = useSchemaForm({ fields: DETAILS_FIELDS });
  const [tab, setTab] = useState("result");
  const [lastChange, setLastChange] = useState<SchemaFormChange | null>(null);
  const validating = account.isSubmitting || details.isSubmitting;

  return (
    <>
      <div className="grid min-w-0 gap-6 xl:grid-cols-3">
        <SchemaForm
          form={account}
          onChange={(_values, change) => setLastChange(change)}
          className="max-w-none"
          layout={{
            columns: 2,
            fields: { input: "full" },
            types: { textarea: "full" },
          }}
        />
        <SchemaForm form={details} className="max-w-none" />
        <div className="flex min-w-0 flex-col gap-4">
          <Button
            variant="default"
            disabled={validating}
            aria-busy={validating}
            onClick={() =>
              void Promise.all([account.submit(), details.submit()])
            }
          >
            {validating ? "Validating…" : "Validate"}
          </Button>
          <Tabs
            value={tab}
            onValueChange={(value) => setTab(String(value))}
            className="min-w-0 gap-3"
          >
            <TabsList variant="line">
              <TabsTrigger value="result">Result</TabsTrigger>
              <TabsTrigger value="errors">Errors</TabsTrigger>
              <TabsTrigger value="schema">Schema</TabsTrigger>
              <TabsTrigger value="prompt">Prompt</TabsTrigger>
            </TabsList>
            <TabsContent value="result" className="min-w-0">
              <JsonPanel
                filename="result.json"
                data={{
                  account: account.values,
                  details: details.values,
                  lastChange,
                }}
              />
            </TabsContent>
            <TabsContent value="errors" className="min-w-0">
              <JsonPanel
                filename="errors.json"
                data={{ account: account.errors, details: details.errors }}
              />
            </TabsContent>
            <TabsContent value="schema" className="min-w-0">
              <JsonPanel
                filename="fields.json"
                data={{ account: ACCOUNT_FIELDS, details: DETAILS_FIELDS }}
              />
            </TabsContent>
            <TabsContent value="prompt" className="min-w-0">
              <JsonPanel filename="prompt.txt" data={TYPE_PROMPT} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export { SchemaFormDemo };
```

Unknown `type` values throw. Use only the listed SchemaForm types. Render inside `FormLayout`. Do not wrap in `Card`.

## Usage

```tsx
import { useState } from "react";

import { DocCodePanel } from "@/components/doc/doc-code-panel";
import { Button } from "@/components/ui/button";
import { SchemaForm, useSchemaForm } from "@/components/ui/schema-form";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";

// In src/routes/schema-form.tsx, ACCOUNT_FIELDS and DETAILS_FIELDS are the
// complete schemas displayed by the Schema tab; TYPE_PROMPT feeds Prompt.
function JsonPanel({ filename, data }: { filename: string; data: unknown }) {
  const code = typeof data === "string" ? data : JSON.stringify(data, null, 2);
  return <DocCodePanel filename={filename} code={code} />;
}

function SchemaFormShowcase() {
  const account = useSchemaForm({
    fields: ACCOUNT_FIELDS,
    onSubmit: async (values) => saveAccount(values),
  });
  const details = useSchemaForm({ fields: DETAILS_FIELDS });
  const [tab, setTab] = useState("result");
  const validating = account.isSubmitting || details.isSubmitting;

  return (
    <div className="grid min-w-0 gap-6 xl:grid-cols-3">
      <SchemaForm
        form={account}
        onChange={(values, change) => {
          console.log(change.path, change.paths, change.previousValue, change.value);
          previewAccount(values);
        }}
        className="max-w-none"
        layout={{
          columns: 2,
          fields: {
            name: "full",
            barcode: 1,
          },
          types: {
            textarea: "full",
            radio: 2,
          },
        }}
      />
      <SchemaForm form={details} className="max-w-none" />
      <div className="flex min-w-0 flex-col gap-4">
        <Button
          variant="default"
          disabled={validating}
          aria-busy={validating}
          onClick={() => void Promise.all([account.submit(), details.submit()])}
        >
          {validating ? "Validating…" : "Validate"}
        </Button>
        <Tabs
          value={tab}
          onValueChange={(value) => setTab(String(value))}
          className="min-w-0 gap-3"
        >
          <TabsList variant="line">
            <TabsTrigger value="result">Result</TabsTrigger>
            <TabsTrigger value="errors">Errors</TabsTrigger>
            <TabsTrigger value="schema">Schema</TabsTrigger>
            <TabsTrigger value="prompt">Prompt</TabsTrigger>
          </TabsList>
          <TabsContent value="result" className="min-w-0">
            <JsonPanel
              filename="result.json"
              data={{ account: account.values, details: details.values }}
            />
          </TabsContent>
          <TabsContent value="errors" className="min-w-0">
            <JsonPanel
              filename="errors.json"
              data={{ account: account.errors, details: details.errors }}
            />
          </TabsContent>
          <TabsContent value="schema" className="min-w-0">
            <JsonPanel
              filename="fields.json"
              data={{ account: ACCOUNT_FIELDS, details: DETAILS_FIELDS }}
            />
          </TabsContent>
          <TabsContent value="prompt" className="min-w-0">
            <JsonPanel filename="prompt.txt" data={TYPE_PROMPT} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
```

## Change callback

`SchemaForm` accepts `onChange?: (values: SchemaFormValues, change: SchemaFormChange) => void`.
It runs once for each user interaction, after constructing the latest nested values snapshot. It
does not run on the initial render or when props rerender.

`change.path` is the primary changed path, `change.paths` contains every path changed by that
interaction, and `change.value` / `change.previousValue` describe the primary value. The
`changedValues` and `previousValues` records contain path-keyed metadata for every changed value,
while `change.field` identifies the related flattened schema field.

Paired controls such as `amount+currency`, `from+to`, and range sliders emit one callback per
interaction. When both values change together, both paths are included in `change.paths`. Custom
`renderField` controls use the same behavior when their `onChange` writes a paired object.

Submission remains external. Configure submission through `useSchemaForm({ onSubmit })`, assign an
`id` to the form, and point an external button at that id:

```tsx
const form = useSchemaForm({ fields, onSubmit: saveValues })

<SchemaForm id="settings-form" form={form} onChange={handleChange} />
<Button type="submit" form="settings-form">Save</Button>
```

## Column layout

`columns` creates a responsive grid: one column on small screens, then the configured number of columns at the appropriate breakpoints. Rules can target fields by name or control type.

```tsx
const fields = [
  {
    key: "product_name",
    title: "Product Name",
    type: "input",
    props: { colSpan: "full" },
  },
  { key: "sku", title: "SKU", type: "input" },
  { key: "barcode", title: "Barcode", type: "input" },
]

<SchemaForm
  form={form}
  layout={{
    columns: 2,
    fields: { product_name: "full" },
    types: { textarea: "full" },
  }}
/>
```

Span priority is `props.colSpan`, `layout.fields`, `layout.types`, then one column. `section` and `section-item` fields always span the full row.

## Choice card

Use `type: "choice-card"` for a single card-style choice. Each option can include a `description`. The stored value is the selected `option.value`.

```tsx
const fields = [
  {
    key: "channel",
    title: "Channel",
    type: "choice-card",
    required: true,
    options: [
      { value: "paynow", label: "PayNow", description: "Instant bank transfer" },
      { value: "card", label: "Card", description: "Visa, Mastercard, AMEX" },
    ],
    value: "paynow",
  },
]
```

`props.alignment` is `Vertical` (default) or `Horizontal`. `props.cardAlignment` is `Left` (default) or `Center`.
