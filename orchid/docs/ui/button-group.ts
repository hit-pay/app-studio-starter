// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const buttonGroupRegistry = registry.items.find(
  (item: { name: string }) => item.name === "button-group",
);

const buttonGroupDocs = {
  ...buttonGroupRegistry,
  category: "ui",
  props: {
    variant: ["default", "ghost", "border"],
    orientation: ["horizontal", "vertical"],
  },
  examples: [
    {
      description: "Grouped actions",
      code: `<ButtonGroup>
  <Button>Create invoice</Button>
  <Button size="icon" aria-label="More actions">
    <DownIcon />
  </Button>
</ButtonGroup>`,
    },
    {
      description: "Reporting period",
      code: `<ButtonGroup aria-label="Reporting period">
  <Button variant="outline">Day</Button>
  <Button variant="outline">Week</Button>
  <Button variant="outline">Month</Button>
</ButtonGroup>`,
    },
  ],
  related_components: ["button", "dropdown-menu", "separator"],
};

export default buttonGroupDocs;
