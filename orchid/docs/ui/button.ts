import registry from "../../registry.json" with { type: "json" };

const buttonRegistry = registry.items.find((item) => item.name === "button");

const buttonDocs = {
  category: "ui",
  ...buttonRegistry,
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
      description: "Button sizes",
      code: `<Button size="lg">Large</Button>`,
    },
    {
      description: "Icon-only buttons",
      code: `<Button size="icon" aria-label="Add"><AddIcon /></Button>`,
    },
    {
      description: "Render as a link",
      code: `<Button variant="outline" render={<a href="/settings" />}>
  Review settings
</Button>`,
    },
    {
      description: "Disabled states",
      code: `<Button disabled>Default</Button>`,
    },
  ],
  related_components: ["button-group"],
};

export default buttonDocs;
