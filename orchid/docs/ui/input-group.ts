// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const inputGroupRegistry = registry.items.find(
  (item: { name: string }) => item.name === "input-group",
);

const inputGroupDocs = {
  ...inputGroupRegistry,
  category: "ui",
  props: {
    align: ["inline-start", "inline-end", "block-start", "block-end"],
    size: ["xs", "sm", "icon-xs", "icon-sm"],
  },
  examples: [
    {
      description: "Leading icon",
      code: `<InputGroup>
  <InputGroupAddon>
    <MailIcon />
  </InputGroupAddon>
  <InputGroupInput placeholder="alex@example.com" />
</InputGroup>`,
    },
    {
      description: "Prefix text",
      code: `<InputGroup>
  <InputGroupAddon className="self-stretch bg-oc-muted">
    <InputGroupText className="pr-2">https://hitpay.shop/</InputGroupText>
  </InputGroupAddon>
  <InputGroupSeparator />
  <InputGroupInput placeholder="studio" />
</InputGroup>`,
    },
    {
      description: "Trailing button",
      code: `<InputGroup>
  <InputGroupInput placeholder="Search customers" />
  <InputGroupAddon align="inline-end">
    <InputGroupButton size="icon-xs" aria-label="Search">
      <SearchIcon />
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>`,
    },
    {
      description: "Textarea with addons",
      code: `<InputGroup>
  <InputGroupAddon align="block-start">Internal note</InputGroupAddon>
  <InputGroupTextarea placeholder="Add context for your team…" />
</InputGroup>`,
    },
  ],
  related_components: ["input", "textarea", "field", "button", "select"],
};

export default inputGroupDocs;
