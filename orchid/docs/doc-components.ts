import { docNavFromRegistry } from "./registry-meta";

export const DOC_COMPONENTS = [
  docNavFromRegistry("/ui/button", "button"),
  docNavFromRegistry("/ui/button-group", "button-group"),
  docNavFromRegistry("/ui/dropdown-menu", "dropdown-menu"),
  docNavFromRegistry("/ui/toast", "toast"),
  docNavFromRegistry("/ui/banner", "banner"),
  docNavFromRegistry("/ui/badge", "badge"),
  docNavFromRegistry("/ui/avatar", "avatar"),
  docNavFromRegistry("/ui/tooltip", "tooltip"),
  docNavFromRegistry("/ui/tabs", "tabs"),
  docNavFromRegistry("/ui/skeleton", "skeleton"),
  docNavFromRegistry("/ui/spinner", "spinner"),
  docNavFromRegistry("/ui/dialog", "dialog"),
  docNavFromRegistry("/ui/drawer", "drawer"),
  docNavFromRegistry("/ui/pagination", "pagination"),
  docNavFromRegistry("/ui/file-upload", "file-upload"),
] as const;

export function docComponentsByName() {
  return [...DOC_COMPONENTS].sort((a, b) => a.name.localeCompare(b.name));
}

export const DOC_FORMS = [
  docNavFromRegistry("/ui/field", "field"),
  docNavFromRegistry("/ui/label", "label"),
  docNavFromRegistry("/ui/input", "input"),
  docNavFromRegistry("/ui/input-group", "input-group"),
  docNavFromRegistry("/ui/textarea", "textarea"),
  docNavFromRegistry("/ui/checkbox", "checkbox"),
  docNavFromRegistry("/ui/radio-group", "radio-group"),
  docNavFromRegistry("/ui/switch", "switch"),
  docNavFromRegistry("/ui/slider", "slider"),
  docNavFromRegistry("/ui/form-section", "form-section"),
] as const;

export function docFormsByName() {
  return [...DOC_FORMS].sort((a, b) => a.name.localeCompare(b.name));
}

export const DOC_BLOCKS = [
  docNavFromRegistry("/components/choice-card", "choice-card"),
  docNavFromRegistry("/components/customer-card", "customer-card"),
  docNavFromRegistry("/components/date-picker", "date-picker"),
  docNavFromRegistry("/components/select", "select"),
  docNavFromRegistry("/components/detail-card", "detail-card"),
  docNavFromRegistry("/components/empty", "empty"),
  docNavFromRegistry("/components/data-list", "data-list"),
  docNavFromRegistry("/components/quantity-input", "quantity-input"),
  docNavFromRegistry("/components/text-editor", "text-editor"),
  docNavFromRegistry("/components/metric-card", "metric-card"),
  docNavFromRegistry("/components/app-layout", "app-layout"),
  docNavFromRegistry("/components/page-layout", "page-layout"),
  docNavFromRegistry("/components/form-layout", "form-layout"),
  docNavFromRegistry("/components/form-builder", "form-builder"),
  docNavFromRegistry("/components/data-table", "data-table"),
  docNavFromRegistry("/components/confirmation-modal", "confirmation-modal"),
  docNavFromRegistry("/components/command", "command"),
  docNavFromRegistry("/components/copy-button", "copy-button"),
] as const;

export function docBlocksByName() {
  return [...DOC_BLOCKS].sort((a, b) => a.name.localeCompare(b.name));
}

export const DOC_ALL_COMPONENTS = [
  ...DOC_BLOCKS,
  ...DOC_COMPONENTS,
  ...DOC_FORMS,
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
    "/ui/button",
    "/ui/button-group",
  ]),
  baseGroup("Displaying Data", [
    "/ui/avatar",
    "/ui/badge",
  ]),
  baseGroup("Feedback", [
    "/ui/banner",
    "/ui/skeleton",
    "/ui/spinner",
    "/ui/toast",
  ]),
  baseGroup("Form", [
    "/ui/checkbox",
    "/ui/field",
    "/ui/file-upload",
    "/ui/form-section",
    "/ui/input",
    "/ui/input-group",
    "/ui/label",
    "/ui/radio-group",
    "/ui/slider",
    "/ui/switch",
    "/ui/textarea",
  ]),
  baseGroup("Layout", [
    "/ui/tabs",
  ]),
  baseGroup("Navigation", ["/ui/pagination"]),
  baseGroup("Overlays", [
    "/ui/dialog",
    "/ui/dropdown-menu",
    "/ui/drawer",
    "/ui/tooltip",
  ]),
  baseGroup("Utils", []),
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
  blockGroup("Actions", ["/components/copy-button"]),
  blockGroup("Displaying Data", [
    "/components/customer-card",
    "/components/data-table",
    "/components/detail-card",
    "/components/data-list",
    "/components/empty",
    "/components/metric-card",
  ]),
  blockGroup("Form", [
    "/components/choice-card",
    "/components/select",
    "/components/date-picker",
    "/components/form-builder",
    "/components/quantity-input",
    "/components/text-editor",
  ]),
  blockGroup("Layout", ["/components/app-layout", "/components/form-layout", "/components/page-layout"]),
  blockGroup("Overlays", ["/components/command", "/components/confirmation-modal"]),
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
  "/ui": "Base Components",
  ...Object.fromEntries(DOC_GUIDE_ITEMS.map((item) => [item.to, item.name])),
  ...Object.fromEntries(DOC_COMPONENTS.map((item) => [item.to, item.name])),
  ...Object.fromEntries(DOC_FORMS.map((item) => [item.to, item.name])),
  ...Object.fromEntries(DOC_BLOCKS.map((item) => [item.to, item.name])),
};
