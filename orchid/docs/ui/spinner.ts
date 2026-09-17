// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const spinnerRegistry = registry.items.find(
  (item: { name: string }) => item.name === "spinner",
);

const spinnerDocs = {
  ...spinnerRegistry,
  category: "ui",
  props: {
    className: "string",
    "aria-label": "string",
  },
  examples: [
    {
      description: "Default size",
      code: `<Spinner />`,
    },
    {
      description: "Custom sizes",
      code: `<div className="flex items-center gap-6">
  <Spinner className="size-3" />
  <Spinner className="size-4" />
  <Spinner className="size-8" />
</div>`,
    },
    {
      description: "Inside a button",
      code: `<Button disabled>
  <Spinner aria-label="Saving" />
  Saving invoice
</Button>`,
    },
  ],
  related_components: ["skeleton", "button"],
};

export default spinnerDocs;
