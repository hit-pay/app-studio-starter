<!-- Generated from content/docs/components/select.mdx. Do not edit. -->

# Select

Props picker for a closed list or a searchable / multi select.

## Interactive example

The interactive example is rendered on the Orchid documentation page. Use the usage guidance below and verify the installed component source for the exact API.

One props-driven picker. Do not import `@ui/form/combobox` children.

```tsx
import { Select } from '@/components/form/select'

<Select
  options={[
    { value: 'sgd', label: 'SGD' },
    { value: 'usd', label: 'USD' },
  ]}
  value={currency}
  onValueChange={(value) => setCurrency(typeof value === 'string' ? value : null)}
/>
```

- Default is a closed list.
- `searchable` — type to filter.
- `multiple` — chips. Value is `string[]`.
- `size`: `default` | `sm` | `inline` (input-group addon).

In Form Builder, `type: "select"` is this block without search. `type: "combobox"` is the same block with `searchable`.
