---
description: UI components and how to add screens. Use when building or changing pages. Follow the user's layout, not a single template.
---

# Screens

Compose screens from the Orchid kit (`@/ui/…` → `src/orchid-ui/`) plus app composites (`@/components/…` → `src/components/`). Tokens live in `src/styles.css`. Merge classes with `cn()` from `@/lib/utils`. Icons: `lucide-react`.

Do **not** run `shadcn add` / `bunx shadcn add` from ui.shadcn.com (`@shadcn/…`) or any other third-party registry. Do **not** add `@radix-ui/*`. Primitives are Base UI (`@base-ui/react`). Do **not** put UI kit files in `src/components/ui`.

Default: use files already in `src/orchid-ui/` (`@/ui/…`) and the APIs below. Do **not** fetch the registry or run `shadcn add` unless a needed kit piece is missing from that folder.

Only then: fetch `https://app-studio-starter.vercel.app/registry.json` (`items[].name` where `type` is `registry:ui`, skip `utils`). If the name is in the catalog:

```bash
bunx shadcn add @orchid/<name> --yes
```

That writes `src/orchid-ui/<name>.tsx`. Import `@/ui/<name>`. Item JSON: `https://app-studio-starter.vercel.app/r/{name}.json`. Namespace `@orchid` is in `components.json`.

If it is **not** in the catalog, **create an app component** — never add it to `src/orchid-ui/` (kit only). Do not pull shadcn/ui. Match Orchid visually:

- File: `src/components/<name>.tsx`. Import as `@/components/<name>`. Do **not** use `src/components/ui`.
- Build it from kit pieces (`Button`, `Field`, `Chip`, … imported as `@/ui/…`). Relative kit imports are for `orchid-ui` files only.
- Copy Orchid patterns from `src/orchid-ui/button.tsx` / `chip.tsx`: `cva` + `cn()`, PascalCase visual props (`type` `Primary` | `Secondary`, `size` `Small` | `Default` | `Big`, `style` `Default` | `Border` | `Transparent`) — not shadcn `variant="outline"` / `size="sm"`.
- Color, radius, type, shadow: tokens in `src/styles.css` only (`primary`, `border`, `muted-foreground`, `destructive`, info/success/warning soft+border). No one-off hex unless a kit file already uses the same value.
- Behavior: `@base-ui/react` only (no `@radix-ui/*`). Icons: `lucide-react`.
- Do not add a kit entry below for app-only components.

Add as many routes and layout regions as the request needs. Shared chrome goes in `__root.tsx`. SSR: first paint must not read `window`. HitPay user/role in the browser (`#/lib/hitpay`). Links via TanStack `Link` / `createFileRoute` — do not hardcode the app-id path.

```ts
import { Button } from '@/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu'
import {
  Snackbar,
  SnackbarBody,
  SnackbarDescription,
  SnackbarIcon,
  SnackbarTitle,
} from '@/ui/snackbar'
import { Chip, UserChip } from '@/ui/chip'
import { ProgressBar } from '@/ui/progress-bar'
import { ListItem, ListItemBody, ListItemTitle } from '@/ui/list-item'
import { InputStepper } from '@/ui/input-stepper'
import { Avatar } from '@/ui/avatar'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/ui/tooltip'
import { TabMenu, TabMenuList, TabMenuPanel, TabMenuTab } from '@/ui/tab-menu'
import { ClickableOption, ClickableOptionGroup } from '@/ui/clickable-option'
import { OverviewItem } from '@/ui/overview-item'
import { SubHeader } from '@/ui/sub-header'
import { PageTitle } from '@/ui/page-title'
import {
  BoxDetail,
  BoxDetailGrid,
  BoxDetailHeader,
  BoxDetailRow,
  BoxDetailTitle,
} from '@/ui/box-detail'
import {
  GroupIcon,
  GroupIconButton,
  GroupIconLink,
  GroupIconMenu,
} from '@/ui/group-icon'
import { CopyTooltip } from '@/ui/copy-tooltip'
import { CustomerCard } from '@/ui/customer-card'
import { Checkbox, CheckboxGroup } from '@/ui/checkbox'
import { Radio, RadioGroup } from '@/ui/radio-group'
import { Toggle } from '@/ui/toggle'
import { Slider } from '@/ui/slider'
import { EmptyPage } from '@/ui/empty-page'
import { Modal, ModalPopup, ModalTrigger } from '@/ui/modal'
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from '@/ui/accordion'
import { Label } from '@/ui/label'
import { Separator } from '@/ui/separator'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/ui/field'
import { Input } from '@/ui/input'
import { Textarea } from '@/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectMultiple,
  SelectMultipleGroup,
  SelectMultipleItem,
  SelectMultipleLabel,
  SelectTrigger,
  SelectValue,
} from '@/ui/select'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupSeparator,
  InputGroupText,
} from '@/ui/input-group'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/ui/popover'
import { Calendar } from '@/ui/calendar'
import { DatePicker, DatePickerRange } from '@/ui/date-picker'
```

Do not use shadcn APIs (`variant="outline"`, `size="sm"`) as the primary API.

### Button

`type`: `Primary` | `Secondary` | `Destructive` (default `Primary`). Visual only — use `htmlType` for submit.  
`style`: `Default` | `Transparent` | `Border`.  
`size`: `Small` | `Default` | `Big`.  
`iconOnly`, `shape`: `Default` | `Circle`.  
`menu` / `additional`: split button.

```tsx
<Button type="Primary" style="Default">Save</Button>
<Button type="Secondary" style="Border">Cancel</Button>
<Button type="Primary" menu={<DropdownMenuItem>Edit</DropdownMenuItem>}>Actions</Button>
```

### Dropdown menu

Base UI `Menu`. Typical: `DropdownMenu`, `DropdownMenuTrigger` (`nativeButton` + `render={<Button … />}`), `DropdownMenuContent`, `DropdownMenuItem` (`variant="destructive"` for danger), `DropdownMenuSeparator`, groups/labels/checkbox/radio/sub.

### Snackbar

`color`: `Default` (success) | `Blue` | `Red` | `Orange` | `Grey`.  
`size`: `Small` | `Default` | `Big`.  
`action`: `Bottom` | `Right` (Big).  
`onClose` only if you need a close control. Parts: `SnackbarIcon`, `SnackbarBody`, `SnackbarTitle`, `SnackbarDescription`, `SnackbarAction`.

### Chip

`color`: `Blue` `Purple` `Orange` `Red` `LightRed` `White` `DarkBlue` `Grey` `Tosca` `Green`.  
`type`: `Background` | `Border` | `Transparent`. Optional `icon`, `onRemove`.  
`UserChip` `type`: `Owner` | `Admin` | `Manager` | `Cashier`.

### Accordion

`src/orchid-ui/accordion.tsx` — import `@/ui/accordion`. Base UI Accordion. `multiple` default true. Title 14/1.5 medium, description 12/1.5, header padding 12×8, content 14/1.5 with 12 padding. Item gap 8. Closed: `dark-blue-soft`; open: border + gray header, white panel.

```tsx
<Accordion defaultValue={['a']}>
  <AccordionItem value="a">
    <AccordionTrigger title="Additional Information" description="Description" />
    <AccordionPanel>Content</AccordionPanel>
  </AccordionItem>
</Accordion>
```

`AccordionTrigger`: `title`, `description`, `leading`, `label` (e.g. Chip), `progress` `{ label, value }` (`value` 0–1), `trailing`, `chevron` (default true).

### Progress Bar

`src/orchid-ui/progress-bar.tsx` — import `@/ui/progress-bar`.

`size`: `Default` (8px track) | `Small` (5px). `value` and `max` (label `70/100`). Track is fluid width, not a fixed pixel width. `showLabel` default true.

### List Item

`src/orchid-ui/list-item.tsx` — import `@/ui/list-item`. Compose `ListItem` (`selected` for primary border), `ListItemBody`, `ListItemTitle`, `ListItemDescription`, `ListItemMeta` + `ListItemDetail`, `ListItemMedia` (64px thumbnail, e.g. page cover), `ListItemTrailing` (edit/delete + primary button, top right), `ListItemHoverActions` (edit/delete on hover, or `className="static flex"` inside trailing), `ListItemCopyRow`, `ListItemMore`, `ListItemLogo`, `ListItemMethod`. Fluid width. Use `Chip` and `Button` from the kit.

### Input Stepper

`src/orchid-ui/input-stepper.tsx` — import `@/ui/input-stepper`. Minus / plus steppers. Click the number to type. `value` / `defaultValue`, `min`, `max`, `step`, `onValueChange`.

### Avatar

`src/orchid-ui/avatar.tsx` — import `@/ui/avatar`. `size`: `24` `28` `32` `40` `48` `64` (default `32`). `type`: `Default` | `Business` | `Image`. Initials as children; `src` / `alt` for photos.

### Tooltip

`src/orchid-ui/tooltip.tsx` — import `@/ui/tooltip`. Wrap a tree in `TooltipProvider`. Compose `Tooltip`, `TooltipTrigger` (`nativeButton` + `render={<Button … />}`), `TooltipContent` (`side` `top` | `bottom` | `left` | `right`, `arrowHidden`).

### Copy Tooltip

`src/orchid-ui/copy-tooltip.tsx` — import `@/ui/copy-tooltip`. Copy icon. `value` is written to the clipboard; tooltip shows `label` (default `Copied!`).

### Tab Menu

`src/orchid-ui/tab-menu.tsx` — import `@/ui/tab-menu`. Base UI Tabs. `type`: `Default` (underline) | `Pills`. `size`: `Default` | `Big`. Compose `TabMenu`, `TabMenuList`, `TabMenuTab` (`value`, optional `icon`, `count`), `TabMenuPanel`.

### Clickable Option

`src/orchid-ui/clickable-option.tsx` — import `@/ui/clickable-option`. Selectable cards, no radio dot. Wrap in `ClickableOptionGroup` (`value` / `defaultValue`, `onValueChange`, `alignment` `Vertical` | `Horizontal`). Each `ClickableOption` needs `value`; optional `title`, `description`, `icon`, `alignment` `Left` | `Center`, `iconAlign` `Left` | `Center`. Selected state is the primary border.

### Overview Item

`src/orchid-ui/overview-item.tsx` — import `@/ui/overview-item`. Metric card: header (`icon`, `title`, optional `info` + `tooltip`) with a divider, then `content` plus outlined `percentValue` badge. `iconColor`: `Blue` | `Green` | `Red` | `Grey`. Optional `footer`, `transparent`, `loading`. Lay out several cards in a CSS grid (e.g. 4 columns). Wrap the page in `TooltipProvider` if using tooltips.

### Sub Header

`src/orchid-ui/sub-header.tsx` — import `@/ui/sub-header`. Bar with bottom border. `left` `Back` (chevron + Back) | `Close` (Close + `esc` hint). `onBack`. Right: `actions`. Put `PageTitle` below, not inside.

### Page Title

`src/orchid-ui/page-title.tsx` — import `@/ui/page-title`. Heading row: title 18/24 medium + optional `chip` and `description` 14/20 on the left; `actions` (Buttons) on the right. Optional `copyValue` (`CopyTooltip`), `loading`. Put `BoxDetail` below, not inside.

### Box Detail

`src/orchid-ui/box-detail.tsx` — import `@/ui/box-detail`. Labeled fields. Always one outer card border. `type`: `Default` (gaps between fields) | `Border` (table lines on every row/column). Compose `BoxDetail`, `BoxDetailHeader`, `BoxDetailTitle`, `BoxDetailGrid` (`columns`), `BoxDetailRow` (`label`, `alignment` `Horizontal` | `Vertical`, `size` `Small` | `Big`, `copyValue`, `colSpan` inside a grid).

### Group Icon

`src/orchid-ui/group-icon.tsx` — import `@/ui/group-icon`. Icon action cluster. `type`: `Default` | `Border`. Compose `GroupIcon`, `GroupIconButton`, `GroupIconLink` (opens a new tab), `GroupIconDivider`, `GroupIconMenu` (dropdown, uses horizontal ellipsis).

### Customer Card

`src/orchid-ui/customer-card.tsx` — import `@/ui/customer-card`. Profile card. `variant`: `Small` | `Big` | `Float` | `Empty`. Pass `customer` (`name`, `email`, `phone` / `phone_number`, `address`, optional `src`). `active`, `loading`, `hover`, `edit`, `closable`, `chip`, `avatar`, `onAdd`, `onEdit`, `onClose`, `bottom`. `beneficiary` optional (bank chip + subtitle). Big/Float phone uses `CopyTooltip`.

### Checkbox

`src/orchid-ui/checkbox.tsx` — import `@/ui/checkbox`. `Checkbox` (`value`, `error`, `indeterminate`, `description`, `disabled`). Wrap several in `CheckboxGroup` (`label`, `alignment` `Vertical` | `Horizontal`, `value` / `defaultValue`).

### Radio Group

`src/orchid-ui/radio-group.tsx` — import `@/ui/radio-group`. Wrap `Radio` (`value`, `error`, `description`) in `RadioGroup` (`label`, `alignment` `Vertical` | `Horizontal`).

### Toggle

`src/orchid-ui/toggle.tsx` — import `@/ui/toggle`. Switch. `size`: `Default` | `Small`. `checked` / `defaultChecked`, `disabled`.

### Slider

`src/orchid-ui/slider.tsx` — import `@/ui/slider`. Track + thumb. `min` / `max` / `step`, `value` / `defaultValue`, `showRange` (0–100 labels), `showIndicator` (value while dragging).

### Empty Page

`src/orchid-ui/empty-page.tsx` — import `@/ui/empty-page`. Centered empty state. `type`: `Default` | `Search` | `Upgrade`. `title`, `description`, optional `icon`, `badge` (default on except Upgrade), `actions` (Buttons).

### Modal

`src/orchid-ui/modal.tsx` — import `@/ui/modal`. Base UI Dialog. Wrap `ModalTrigger` + `ModalPopup` in `Modal`. `size`: `Small` | `Medium` | `Default`. `title`, `description`, `closeIcon`, `header`, `footer`, `borderless`, `persistent` (no backdrop close). Footer: `cancelLabel`, `confirmLabel`, `confirmType`, `onCancel`, `onConfirm`, or `footerContent`.

### Label

`src/orchid-ui/label.tsx` — import `@/ui/label`. Form label. Pair with a control via `htmlFor`. Prefer `FieldLabel` inside `Field`.

### Separator

`src/orchid-ui/separator.tsx` — import `@/ui/separator`. `orientation`: `horizontal` | `vertical`.

### Field

`src/orchid-ui/field.tsx` — import `@/ui/field`. Compose label, control, hint, and error. `orientation`: `vertical` | `horizontal` | `responsive`. Mark invalid with `data-invalid` on `Field` and `aria-invalid` on the control. Parts: `FieldSet`, `FieldLegend`, `FieldGroup`, `Field`, `FieldLabel`, `FieldDescription`, `FieldError`, `FieldContent`, `FieldTitle`, `FieldSeparator`.

```tsx
<Field>
  <FieldLabel htmlFor="name">Label</FieldLabel>
  <Input id="name" placeholder="Placeholder" />
  <FieldDescription>Hint text.</FieldDescription>
</Field>
```

### Input

`src/orchid-ui/input.tsx` — import `@/ui/input`. Standard text field. Use `placeholder`, `disabled`, `aria-invalid`. For a leading icon or prefix, use `InputGroup` + `InputGroupInput`.

### Textarea

`src/orchid-ui/textarea.tsx` — import `@/ui/textarea`. Multiline field. Same invalid/disabled pattern as `Input`.

### Select

`src/orchid-ui/select.tsx` — import `@/ui/select`. Single: `Select` + `SelectTrigger` + `SelectValue` + `SelectContent` + `SelectItem` (`SelectGroup` / `SelectLabel` optional). `SelectTrigger` `size`: `Default` | `Inline` (for currency inside `InputGroup`). Multiple: `SelectMultiple` + `SelectMultipleItem`; grouped: `SelectMultipleGroup` + `SelectMultipleLabel`.

```tsx
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Placeholder" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="one">Option</SelectItem>
  </SelectContent>
</Select>
```

### Input Group

`src/orchid-ui/input-group.tsx` — import `@/ui/input-group`. Combine input with prefix, select, or icon. `variant`: `Default` | `Underline`. Compose `InputGroup`, `InputGroupAddon` (`align` `inline-start` | `inline-end` | `block-start` | `block-end`), `InputGroupInput` / `InputGroupTextarea`, `InputGroupSeparator`, `InputGroupText`, `InputGroupButton`.

```tsx
<InputGroup>
  <InputGroupAddon>
    <Select defaultValue="USD">
      <SelectTrigger size="Inline">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="USD">USD</SelectItem>
      </SelectContent>
    </Select>
  </InputGroupAddon>
  <InputGroupSeparator />
  <InputGroupInput placeholder="Placeholder" />
</InputGroup>
```

### Popover

`src/orchid-ui/popover.tsx` — import `@/ui/popover`. Base UI Popover. Compose `Popover`, `PopoverTrigger` (`render={<Button … />}`), `PopoverContent` (`side`, `align`). Optional `PopoverHeader`, `PopoverTitle`, `PopoverDescription`.

### Calendar

`src/orchid-ui/calendar.tsx` — import `@/ui/calendar`. `react-day-picker` calendar. Prefer `DatePicker` / `DatePickerRange` unless you need a standalone month grid. `mode`: `single` | `range` | `multiple`.

### Date Picker

`src/orchid-ui/date-picker.tsx` — import `@/ui/date-picker`. Popover + Calendar. `DatePicker` for one day (`selected` / `defaultSelected` / `onSelect`). `DatePickerRange` for a range (`numberOfMonths` 2). Optional `disabled`, `placeholder`.

