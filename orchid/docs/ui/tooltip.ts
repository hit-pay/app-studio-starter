// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const tooltipRegistry = registry.items.find(
  (item: { name: string }) => item.name === "tooltip",
);

const tooltipDocs = {
  ...tooltipRegistry,
  category: "ui",
  props: {
    side: ["top", "bottom", "left", "right"],
    align: ["start", "center", "end"],
    arrowHidden: "boolean",
    delay: "number",
  },
  examples: [
    {
      description: "Default tooltip",
      code: `<Tooltip>
  <TooltipTrigger render={<Button variant="outline" size="sm" />}>
    PayNow
  </TooltipTrigger>
  <TooltipContent>Instant SGD transfer via PayNow QR</TooltipContent>
</Tooltip>`,
    },
    {
      description: "Placement",
      code: `<Tooltip>
  <TooltipTrigger render={<Button variant="outline" size="sm" />}>
    Invoice
  </TooltipTrigger>
  <TooltipContent side="bottom">INV-2048 is overdue</TooltipContent>
</Tooltip>`,
    },
    {
      description: "Without arrow",
      code: `<Tooltip>
  <TooltipTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Help" />}>
    ?
  </TooltipTrigger>
  <TooltipContent arrowHidden>Refund policy for card payments</TooltipContent>
</Tooltip>`,
    },
  ],
  related_components: ["copy-button", "form-section", "button"],
};

export default tooltipDocs;
