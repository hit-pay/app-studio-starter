# Orchid UI (kit)

Use this kit so humans and agents pick the same component.

## Files and names

- One widget per kebab-case file: `button.tsx` → `@orchid/button` → `/button`.
- Compound children stay prefixed: `ListItemTitle`, `ComboboxItem`, `FieldLabel`.
- Tabs: `TabsList` + `TabsTrigger` + `TabsPanel`.
- Form layout: `FormSection` + `FormSectionGroup` + `FormSectionItem`.
- Dialog panel: `ModalPopup`.

## Button

```tsx
<Button variant="Primary">Save</Button>
<Button variant="Secondary" style="Border">Cancel</Button>
<Button variant="Primary" type="submit">Submit</Button>
```

- `variant`: Primary | Secondary | Destructive
- `type`: native submit | button | reset (default button)
- `style`: Default | Border | Transparent
- `size`: Small | Default | Big

## Which control

| Need | Use |
| --- | --- |
| One value from a short list | `Select` |
| Searchable / many options / multi | `Combobox` |
| Visible options as cards | `ChoiceCard` + `ChoiceCardGroup` |
| Actions (Edit, Delete), not a value | `DropdownMenu` |
| In-page alert | `Banner` |
| Floating notice | `toast.add` + root `Toaster` |
| Custom dialog | `Modal` + `ModalPopup` |
| Delete / warn / success / yes-no | `ConfirmDialog` (`Warning` confirms with Continue) |
| Date in a form | `DatePicker` |
| Date building blocks | `Popover` + `Calendar` |

Variants are PascalCase (`Small`, `Border`, `Pills`).

## Forms

`FieldGroup` > `Field` > `FieldLabel` + control. Invalid: `data-invalid` on Field, `aria-invalid` on the control.

SchemaForm keys: `showIf`, `maxLength`, `forceDisplay`. Types include `date` and `quantity`. See `SCHEMA_FORM_EXAMPLE_FIELDS`.

## Customer card

Pass `phone` and optional `phoneCountryCode`.
