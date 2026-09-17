// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const sliderRegistry = registry.items.find(
  (item: { name: string }) => item.name === "slider",
);

const sliderDocs = {
  ...sliderRegistry,
  category: "ui",
  props: {
    min: "number",
    max: "number",
    disabled: "boolean",
  },
  examples: [
    {
      description: "Single value",
      code: `<Slider defaultValue={8} max={20} />`,
    },
    {
      description: "Default range",
      code: `<Slider defaultValue={15} />`,
    },
    {
      description: "Range selection",
      code: `<Slider defaultValue={[25, 75]} />`,
    },
  ],
  related_components: ["field", "switch", "form-builder"],
};

export default sliderDocs;
