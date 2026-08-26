---
description: Orchid UI. Open when building screens.
---

# Screens

Pick components from **one file**: `.agents/orchid-ui.json` (generated from the Orchid registry). Do **not** open every `src/orchid-ui/*.tsx`. Open a kit `.tsx` only after you chose that `name`.

Import `@/ui/<name>`. Tokens: `src/styles.css`. `cn()` from `@/lib/utils`. Icons: `lucide-react`. Base UI: `render={<Button />}`, never `asChild` or `@radix-ui/*`. No `src/components/ui`. Never `bunx shadcn add` from `@shadcn`.

**Orchid first.** Custom → `src/components/<name>.tsx` only if no catalog item fits.

Missing kit file:

```bash
bunx shadcn add @orchid/<name> --yes
```

```tsx
<Button type="Primary">Save</Button>
<Button type="Secondary" style="Border">Cancel</Button>
```

`type` is visual (Primary | Secondary | Destructive); submit uses `htmlType`. Triggers: `nativeButton` + `render={<Button … />}`. Modal always has `title`. Forms: `FieldGroup` + `Field` + `FieldLabel`. Invalid: `data-invalid` on Field, `aria-invalid` on the control. Prefix: `InputGroup` + `InputGroupInput`, never raw Input inside. `flex gap-*`, not `space-y-*`. `className` = layout only. Tokens, not `bg-blue-500`.
