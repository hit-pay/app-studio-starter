---
description: Orchid UI kit. Open when building screens. Follow the user layout.
---

# Screens

Import kit from `@/ui/…` (`src/orchid-ui/`). Tokens: `src/styles.css`. `cn()` from `@/lib/utils`. Icons: `lucide-react`. Props are PascalCase (`type="Primary"`, `size="Small"`), not shadcn `variant="outline"`.

Do not `shadcn add` from ui.shadcn.com. No `@radix-ui/*`. No files in `src/components/ui`.

**Orchid first.** Open `src/orchid-ui/<name>.tsx` for the real API. Custom UI → `src/components/<name>.tsx` (`@/components/…`) only if the kit file does not exist. Missing kit file that is in the registry (only if you need it): `bunx shadcn add @orchid/<name> --yes`. Catalog: `https://app-studio-starter.vercel.app/registry.json`.

```tsx
import { Button } from '@/ui/button'
<Button type="Primary">Save</Button>
<Button type="Secondary" style="Border">Cancel</Button>
```

Kit files: `button` `dropdown-menu` `snackbar` `chip` `accordion` `progress-bar` `list-item` `input-stepper` `avatar` `tooltip` `copy-tooltip` `tab-menu` `clickable-option` `overview-item` `sub-header` `page-title` `box-detail` `group-icon` `customer-card` `checkbox` `radio-group` `toggle` `slider` `empty-page` `modal` `label` `separator` `field` `input` `textarea` `select` `input-group` `popover` `calendar` `date-picker`.

Button: `type` Primary | Secondary | Destructive; `style` Default | Transparent | Border; `size` Small | Default | Big. Field wraps Label + Input + description/error. Modal: `Modal` + `ModalTrigger` + `ModalPopup`.
