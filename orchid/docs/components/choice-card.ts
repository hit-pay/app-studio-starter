// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const choiceCardRegistry = registry.items.find(
  (item: { name: string }) => item.name === "choice-card",
);

const choiceCardDocs = {
  ...choiceCardRegistry,
  category: "components",
  props: {
    alignment: ["vertical", "horizontal", "left", "center"],
    iconAlign: ["left", "center"],
  },
  examples: [
    {
      description: "Vertical group",
      code: `<ChoiceCardGroup defaultValue="paynow">
  <ChoiceCard
    value="paynow"
    icon={<PayNowIcon />}
    title="PayNow"
    description="Instant SGD transfers via QR"
  />
  <ChoiceCard
    value="cards"
    icon={<CardsIcon />}
    title="Cards"
    description="Visa, Mastercard, and AMEX"
  />
  <ChoiceCard
    value="link"
    icon={<LinkIcon />}
    title="Payment Link"
    description="Share a checkout URL with the customer"
  />
</ChoiceCardGroup>`,
    },
    {
      description: "Horizontal centered cards",
      code: `<ChoiceCardGroup defaultValue="invoice" alignment="horizontal">
  <ChoiceCard
    value="invoice"
    alignment="center"
    iconAlign="center"
    icon={<InvoiceIcon />}
    title="Invoice"
    description="INV-2048"
    className="flex-1"
  />
  <ChoiceCard
    value="recurring"
    alignment="center"
    iconAlign="center"
    icon={<RecurringIcon />}
    title="Recurring"
    description="Subscriptions"
    className="flex-1"
  />
</ChoiceCardGroup>`,
    },
  ],
  related_components: ["radio-group", "form-builder"],
};

export default choiceCardDocs;
