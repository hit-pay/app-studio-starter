export const DOC_COMPONENTS = [
  {
    to: "/base-ui/button" as const,
    name: "Button",
    description:
      "Standard variants, sizes, icon buttons, native props, and polymorphic rendering.",
  },
  {
    to: "/base-ui/button-group" as const,
    name: "Button Group",
    description:
      "Attached controls, plus ghost and border icon toolbars. Compose overflow with DropdownMenu.",
  },
  {
    to: "/base-ui/copy-button" as const,
    name: "Copy Button",
    description: "Copy icon that writes a value and shows Copied!.",
  },
  {
    to: "/base-ui/dropdown-menu" as const,
    name: "Dropdown Menu",
    description:
      "Items, selection, submenus, and shortcuts with Orchid styling.",
  },
  {
    to: "/base-ui/toast" as const,
    name: "Toast",
    description:
      "Toast manager with semantic types, actions, close, and placement.",
  },
  {
    to: "/base-ui/banner" as const,
    name: "Banner",
    description:
      "In-page notification with semantic variants and an optional action.",
  },
  {
    to: "/base-ui/empty" as const,
    name: "Empty",
    description:
      "Compound empty state with Orchid media variants.",
  },
  {
    to: "/base-ui/badge" as const,
    name: "Badge",
    description:
      "Standard variants with Orchid tones, appearances, removal, and user roles.",
  },
  {
    to: "/base-ui/accordion" as const,
    name: "Accordion",
    description:
      "Composable expand-and-collapse sections with primitives.",
  },
  {
    to: "/base-ui/progress" as const,
    name: "Progress",
    description:
      "Progress with composable label, value, track, and indicator.",
  },
  {
    to: "/base-ui/avatar" as const,
    name: "Avatar",
    description:
      "Image, fallback, badge, and group primitives with Orchid styling.",
  },
  {
    to: "/base-ui/tooltip" as const,
    name: "Tooltip",
    description:
      "Hover and focus tooltip with Orchid styling.",
  },
  {
    to: "/base-ui/tabs" as const,
    name: "Tabs",
    description:
      "Horizontal or vertical tabs with default and line variants.",
  },
  {
    to: "/base-ui/skeleton" as const,
    name: "Skeleton",
    description: "Placeholder pulse with Orchid styling.",
  },
  {
    to: "/base-ui/spinner" as const,
    name: "Spinner",
    description:
      "Indeterminate loading icon sized through className.",
  },
  {
    to: "/base-ui/dialog" as const,
    name: "Dialog",
    description:
      "Dialog primitives with Orchid sizes and persistent mode.",
  },
  {
    to: "/base-ui/drawer" as const,
    name: "Drawer",
    description:
      "Swipeable edge panel. Set swipeDirection to up, right, down, or left.",
  },
  {
    to: "/base-ui/pagination" as const,
    name: "Pagination",
    description:
      "Page links with previous, next, ellipsis, and an optional range label.",
  },
  {
    to: "/base-ui/kbd" as const,
    name: "Kbd",
    description: "Keyboard key and grouped shortcut display.",
  },
  {
    to: "/base-ui/collapsible" as const,
    name: "Collapsible",
    description:
      "Expand-and-collapse primitives with Orchid styling.",
  },
  {
    to: "/base-ui/aspect-ratio" as const,
    name: "Aspect Ratio",
    description:
      "Box that keeps a width/height ratio, such as 16/9.",
  },
  {
    to: "/base-ui/chart" as const,
    name: "Chart",
    description:
      "Recharts wrapper with Orchid tooltip, legend, and chart tokens.",
  },
  {
    to: "/base-ui/file-upload" as const,
    name: "File Upload",
    description:
      "File and image upload row with upload state, media, and a vertical group.",
  },
] as const;

export function docComponentsByName() {
  return [...DOC_COMPONENTS].sort((a, b) => a.name.localeCompare(b.name));
}

export const DOC_FORMS = [
  {
    to: "/base-ui/field" as const,
    name: "Field",
    description:
      "Label, description, error, and grouped field composition.",
  },
  {
    to: "/base-ui/label" as const,
    name: "Label",
    description: "Accessible label with Orchid typography.",
  },
  {
    to: "/base-ui/input" as const,
    name: "Input",
    description: "Text and file input with Orchid states.",
  },
  {
    to: "/base-ui/input-group" as const,
    name: "Input Group",
    description:
      "Input, textarea, addon, and button composition.",
  },
  {
    to: "/base-ui/textarea" as const,
    name: "Textarea",
    description:
      "Auto-sizing textarea with Orchid form styling.",
  },
  {
    to: "/base-ui/select" as const,
    name: "Select",
    description:
      "Base UI select with groups, states, and Orchid styling.",
  },
  {
    to: "/base-ui/combobox" as const,
    name: "Combobox",
    description:
      "Searchable select with Orchid chips and bulk selection helpers.",
  },
  {
    to: "/base-ui/checkbox" as const,
    name: "Checkbox",
    description:
      "Checkbox with Orchid states and an optional group helper.",
  },
  {
    to: "/base-ui/radio-group" as const,
    name: "Radio Group",
    description:
      "Radio group and item primitives with Orchid styling.",
  },
  {
    to: "/base-ui/switch" as const,
    name: "Switch",
    description: "Switch in default and small Orchid sizes.",
  },
  {
    to: "/base-ui/slider" as const,
    name: "Slider",
    description:
      "Single, range, or vertical slider with Orchid styling.",
  },
  {
    to: "/base-ui/calendar" as const,
    name: "Calendar",
    description:
      "Single, range, and multiple date selection used by Date Picker.",
  },
  {
    to: "/base-ui/form-section" as const,
    name: "Form Section",
    description: "Heading plus FormSectionGroup and FormSectionItem.",
  },
] as const;

export function docFormsByName() {
  return [...DOC_FORMS].sort((a, b) => a.name.localeCompare(b.name));
}

export const DOC_BLOCKS = [
  {
    to: "/components/sidebar" as const,
    name: "Sidebar",
    description:
      "JSON-configured navigation that opens nested items in a back-enabled panel.",
  },
  {
    to: "/components/choice-card" as const,
    name: "Choice Card",
    description: "Selectable cards with left or center icon, no radio dot.",
  },
  {
    to: "/components/customer-card" as const,
    name: "Customer Card",
    description: "Small, Big, and Float customer or beneficiary cards.",
  },
  {
    to: "/components/date-picker" as const,
    name: "Date Picker",
    description:
      "Date, range, and date-time selection with popover and calendar helpers.",
  },
  {
    to: "/components/detail-card" as const,
    name: "Detail Card",
    description:
      "Read-only key/value card for one record. Not a collection.",
  },
  {
    to: "/components/data-list" as const,
    name: "Data List",
    description:
      "Card/row collection when search, filters, sort, or pagination are not needed.",
  },
  {
    to: "/components/quantity-input" as const,
    name: "Quantity Input",
    description: "Minus/plus stepper; click the value to type.",
  },
  {
    to: "/components/text-editor" as const,
    name: "Text Editor",
    description: "Lexical rich text: bold, italic, heading, lists. Persist editor JSON.",
  },
  {
    to: "/components/metric-card" as const,
    name: "Metric Card",
    description:
      "Dashboard KPI tile. Use for summaries, not a record's fields.",
  },
  {
    to: "/components/app-layout" as const,
    name: "App Layout",
    description:
      "HitPay App Studio embedded pane frame. Not generic app chrome.",
  },
  {
    to: "/components/page-layout" as const,
    name: "Page Layout",
    description:
      "Standard route page with header, optional onBack, and scrollable content.",
  },
  {
    to: "/components/form-layout" as const,
    name: "Form Layout",
    description: "Create and edit form shell with page and modal modes.",
  },
  {
    to: "/components/form-builder" as const,
    name: "Form Builder",
    description:
      "Schema-driven create/edit form. Use Detail Card for a read-only record.",
  },
  {
    to: "/components/data-table" as const,
    name: "Data Table",
    description:
      "Rows-and-columns table with search, filters, sort, and pagination.",
  },
  {
    to: "/components/confirmation-modal" as const,
    name: "Confirmation Modal",
    description:
      "Prebuilt Promise-based confirmation modal invoked with useConfirmationModal.",
  },
  {
    to: "/components/resource-picker" as const,
    name: "Resource Picker",
    description:
      "Search and select HitPay products, categories, customers, orders, or locations.",
  },
  {
    to: "/components/command" as const,
    name: "Command",
    description:
      "Searchable command palette. Drive it with open, onOpenChange, and groups.",
  },
] as const;

export function docBlocksByName() {
  return [...DOC_BLOCKS].sort((a, b) => a.name.localeCompare(b.name));
}

export const DOC_ALL_COMPONENTS = [
  ...DOC_COMPONENTS,
  ...DOC_FORMS,
  ...DOC_BLOCKS,
] as const;

export function docAllComponentsByName() {
  return [...DOC_ALL_COMPONENTS].sort((a, b) => a.name.localeCompare(b.name));
}

export function docBaseComponentsByName() {
  return [...DOC_COMPONENTS, ...DOC_FORMS].sort((a, b) =>
    a.name.localeCompare(b.name),
  );
}

const BASE_BY_TO = new Map(
  [...DOC_COMPONENTS, ...DOC_FORMS].map((item) => [item.to, item]),
);

function baseGroup(
  label: string,
  tos: readonly (
    | (typeof DOC_COMPONENTS)[number]["to"]
    | (typeof DOC_FORMS)[number]["to"]
  )[],
) {
  return {
    label,
    items: tos
      .map((to) => BASE_BY_TO.get(to))
      .filter((item): item is NonNullable<typeof item> => item != null)
      .sort((a, b) => a.name.localeCompare(b.name)),
  };
}

/** AlignUI-style groups for Base Components. */
export const DOC_BASE_GROUPS = [
  baseGroup("Actions", [
    "/base-ui/button",
    "/base-ui/button-group",
    "/base-ui/copy-button",
  ]),
  baseGroup("Displaying Data", [
    "/base-ui/avatar",
    "/base-ui/badge",
    "/base-ui/chart",
    "/base-ui/empty",
  ]),
  baseGroup("Feedback", [
    "/base-ui/banner",
    "/base-ui/progress",
    "/base-ui/skeleton",
    "/base-ui/spinner",
    "/base-ui/toast",
  ]),
  baseGroup("Form", [
    "/base-ui/calendar",
    "/base-ui/checkbox",
    "/base-ui/combobox",
    "/base-ui/field",
    "/base-ui/file-upload",
    "/base-ui/form-section",
    "/base-ui/input",
    "/base-ui/input-group",
    "/base-ui/label",
    "/base-ui/radio-group",
    "/base-ui/select",
    "/base-ui/slider",
    "/base-ui/switch",
    "/base-ui/textarea",
  ]),
  baseGroup("Layout", [
    "/base-ui/accordion",
    "/base-ui/aspect-ratio",
    "/base-ui/collapsible",
    "/base-ui/tabs",
  ]),
  baseGroup("Navigation", ["/base-ui/pagination"]),
  baseGroup("Overlays", [
    "/base-ui/dialog",
    "/base-ui/dropdown-menu",
    "/base-ui/drawer",
    "/base-ui/tooltip",
  ]),
  baseGroup("Utils", ["/base-ui/kbd"]),
] as const;

const BLOCK_BY_TO = new Map(DOC_BLOCKS.map((item) => [item.to, item]));

function blockGroup(
  label: string,
  tos: readonly (typeof DOC_BLOCKS)[number]["to"][],
) {
  return {
    label,
    items: tos
      .map((to) => BLOCK_BY_TO.get(to))
      .filter((item): item is NonNullable<typeof item> => item != null)
      .sort((a, b) => a.name.localeCompare(b.name)),
  };
}

/** AlignUI-style groups for Components & Blocks. Empty groups are omitted. */
export const DOC_BLOCK_GROUPS = [
  blockGroup("Displaying Data", [
    "/components/customer-card",
    "/components/data-table",
    "/components/detail-card",
    "/components/data-list",
    "/components/metric-card",
  ]),
  blockGroup("Form", [
    "/components/choice-card",
    "/components/date-picker",
    "/components/form-builder",
    "/components/quantity-input",
    "/components/text-editor",
  ]),
  blockGroup("Layout", ["/components/app-layout", "/components/form-layout", "/components/page-layout"]),
  blockGroup("Navigation", ["/components/sidebar"]),
  blockGroup("Overlays", ["/components/command", "/components/confirmation-modal", "/components/resource-picker"]),
].filter((group) => group.items.length > 0);

export const DOC_GUIDES = [
  {
    to: "/installation" as const,
    name: "Installation",
    description:
      "What Orchid is, how to initialize a project, and how to add components with the shadcn CLI.",
  },
  {
    to: "/components-json" as const,
    name: "components.json",
    description:
      "Configure aliases, Tailwind CSS, and the Orchid registry namespace.",
  },
  {
    to: "/theming" as const,
    name: "Theming",
    description:
      "Install Orchid tokens and customize light and dark themes with Tailwind CSS v4.",
  },
] as const;

export const DOC_GUIDE_ITEMS = DOC_GUIDES;

export const DOC_CRUMBS: Record<string, string> = {
  "/": "Home",
  "/components": "Components & Blocks",
  "/base-ui": "Base Components",
  ...Object.fromEntries(DOC_GUIDE_ITEMS.map((item) => [item.to, item.name])),
  ...Object.fromEntries(DOC_COMPONENTS.map((item) => [item.to, item.name])),
  ...Object.fromEntries(DOC_FORMS.map((item) => [item.to, item.name])),
  ...Object.fromEntries(DOC_BLOCKS.map((item) => [item.to, item.name])),
};
