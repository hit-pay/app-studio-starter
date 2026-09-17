import registry from "../../registry.json" with { type: "json" };

const buttonRegistry = registry.items.find((item) => item.name === "button");

const buttonDocs = {
  category: "ui",
  ...buttonRegistry,
  // Custom AI guidance.
  when_to_use: ["Submit form", "Save data", "Trigger an action"],
  avoid_when: ["Navigating between pages", "Displaying passive status"],
  props: {
    variant: ["default", "outline", "secondary", "ghost", "destructive", "link"],
    size: ["xs", "sm", "default", "lg", "icon-xs", "icon-sm", "icon", "icon-lg"],
    iconOnly: [true, false],
    shape: ["default", "circle"],
    disabled: "boolean",
  },
  examples: [
    {
      description: "Save action",
      code: "<Button onClick={save}>Save</Button>",
    },
    {
      description: "All visual variants",
      code: `<>
  <Button variant="default">Default</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="destructive">Delete</Button>
  <Button variant="link">Learn more</Button>
</>`,
    },
    {
      description: "Button sizes",
      code: `<>
  <Button size="xs">Extra small</Button>
  <Button size="sm">Small</Button>
  <Button size="default">Default</Button>
  <Button size="lg">Large</Button>
</>`,
    },
    {
      description: "Icon-only buttons",
      code: `<>
  <Button size="icon-sm" aria-label="Add"><AddIcon /></Button>
  <Button size="icon" aria-label="Add"><AddIcon /></Button>
  <Button size="icon-lg" aria-label="Add"><AddIcon /></Button>
</>`,
    },
    {
      description: "Render as a link",
      code: `<Button variant="outline" render={<a href="/settings" />}>
  Review settings
</Button>`,
    },
    {
      description: "Disabled states",
      code: `<>
  <Button disabled>Default</Button>
  <Button variant="outline" disabled>Outline</Button>
  <Button variant="destructive" disabled>Destructive</Button>
</>`,
    },
  ],
  related_components: ["button-group"],
};

export default buttonDocs;
