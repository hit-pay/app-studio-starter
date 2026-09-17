// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const datePickerRegistry = registry.items.find(
  (item: { name: string }) => item.name === "date-picker",
);

const datePickerDocs = {
  ...datePickerRegistry,
  category: "components",
  props: {
    placeholder: "string",
    captionLayout: ["dropdown", "label", "month", "year"],
    defaultSelected: "Date | DateRange",
    selected: "Date | DateRange",
    onSelect: "function",
    startMonth: "Date",
    endMonth: "Date",
    disabled: "Matcher | Matcher[]",
  },
  examples: [
    {
      description: "Single date",
      code: `<>
  <Label>Invoice due date</Label>
  <DatePicker />
</>`,
    },
    {
      description: "Settlement range",
      code: `<DatePickerRange
  defaultSelected={{
    from: new Date(2026, 0, 20),
    to: new Date(2026, 1, 9),
  }}
/>`,
    },
    {
      description: "Date and time",
      code: `<>
  <Label>Delivery at</Label>
  <DateTimePicker defaultSelected={new Date(2026, 8, 15, 9, 30)} />
</>`,
    },
    {
      description: "Bounded (date of birth)",
      code: `<DatePicker
  placeholder="Select date"
  defaultSelected={new Date(1994, 5, 15)}
  startMonth={new Date(1900, 0)}
  endMonth={new Date()}
/>`,
    },
  ],
  related_components: ["field", "label", "input", "form-builder"],
};

export default datePickerDocs;
