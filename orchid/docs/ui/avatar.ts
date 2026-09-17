// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const avatarRegistry = registry.items.find(
  (item: { name: string }) => item.name === "avatar",
);

const avatarDocs = {
  ...avatarRegistry,
  category: "ui",
  props: {
    size: ["sm", "default", "lg"],
  },
  examples: [
    {
      description: "Image with fallback",
      code: `<Avatar>
  <AvatarImage src={photoUrl} alt="Priya Nair" />
  <AvatarFallback>PN</AvatarFallback>
</Avatar>`,
    },
    {
      description: "Avatar with badge",
      code: `<Avatar>
  <AvatarFallback>PN</AvatarFallback>
  <AvatarBadge><CheckIcon /></AvatarBadge>
</Avatar>`,
    },
    {
      description: "Avatar group",
      code: `<AvatarGroup>
  <Avatar><AvatarFallback>PN</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>AT</AvatarFallback></Avatar>
  <AvatarGroupCount>+2</AvatarGroupCount>
</AvatarGroup>`,
    },
  ],
  related_components: ["customer-card", "avatar-group"],
};

export default avatarDocs;
