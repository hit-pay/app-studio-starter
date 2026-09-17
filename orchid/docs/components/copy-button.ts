// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const copyButtonRegistry = registry.items.find(
  (item: { name: string }) => item.name === "copy-button",
);

const copyButtonDocs = {
  ...copyButtonRegistry,
  category: "components",
  props: {
    value: "string",
    label: "string",
  },
  examples: [
    {
      description: "Beside text",
      code: `<div className="flex items-center gap-2 text-sm text-oc-foreground">
  <span>INV-2048</span>
  <CopyButton value="INV-2048" />
</div>`,
    },
    {
      description: "Phone number",
      code: `<div className="flex items-center gap-2 text-sm text-oc-foreground">
  <span>+65 8123 4567</span>
  <CopyButton value="+65 8123 4567" />
</div>`,
    },
    {
      description: "Custom copied label",
      code: `<div className="flex items-center gap-2 text-sm text-oc-foreground">
  <span>hitpay.shop/pay/pl_8f2a91</span>
  <CopyButton
    value="https://hitpay.shop/pay/pl_8f2a91"
    label="Link copied!"
  />
</div>`,
    },
  ],
  related_components: ["tooltip", "page-layout", "detail-card", "data-list"],
};

export default copyButtonDocs;
