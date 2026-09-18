// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const badgeRegistry = registry.items.find(
  (item: { name: string }) => item.name === "badge",
);

const badgeDocs = {
  ...badgeRegistry,
  category: "ui",
  props: {
    variant: ["default", "secondary", "destructive", "outline", "ghost", "link"],
    tone: [
      "blue",
      "purple",
      "orange",
      "red",
      "light-red",
      "white",
      "dark-blue",
      "grey",
      "tosca",
      "green",
    ],
    appearance: ["soft", "outline", "ghost"],
    role: ["owner", "admin", "manager", "cashier"],
  },
  examples: [
    {
      description: "Status variants",
      code: `<div className="flex flex-wrap items-center gap-2">
  <Badge>Paid</Badge>
  <Badge variant="secondary">Pending</Badge>
  <Badge variant="destructive">Failed</Badge>
</div>`,
    },
    {
      description: "Orchid tones and appearances",
      code: `<div className="flex flex-wrap items-center gap-2">
  <Badge tone="green">Paid</Badge>
  <Badge tone="purple" appearance="outline">Cards</Badge>
  <Badge tone="orange" appearance="ghost">Review</Badge>
</div>`,
    },
    {
      description: "Badge with icon",
      code: `<Badge tone="blue">
  <CircleDashIcon data-icon="inline-start" />
  PayNow
</Badge>`,
    },
    {
      description: "Removable badge",
      code: `<Badge tone="tosca">
  Recurring
  <BadgeRemove />
</Badge>`,
    },
    {
      description: "User role badge",
      code: `<UserBadge role="admin" />`,
    },
  ],
  related_components: ["avatar", "banner", "select"],
};

export default badgeDocs;
