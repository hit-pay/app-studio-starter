// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const skeletonRegistry = registry.items.find(
  (item: { name: string }) => item.name === "skeleton",
);

const skeletonDocs = {
  ...skeletonRegistry,
  category: "ui",
  props: {
    className: "string",
  },
  examples: [
    {
      description: "Text lines",
      code: `<div className="flex max-w-sm flex-col gap-2">
  <Skeleton className="h-4 w-3/4" />
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-1/2" />
</div>`,
    },
    {
      description: "Avatar and name",
      code: `<div className="flex items-center gap-2">
  <Skeleton className="size-8 rounded-full" />
  <div className="flex min-w-0 flex-1 flex-col gap-1">
    <Skeleton className="h-4 w-40" />
    <Skeleton className="h-3.5 w-56" />
  </div>
</div>`,
    },
    {
      description: "Product row",
      code: `<div className="flex max-w-sm items-center gap-3">
  <Skeleton className="size-12 rounded-md" />
  <div className="flex min-w-0 flex-1 flex-col gap-1.5">
    <Skeleton className="h-4 w-32" />
    <Skeleton className="h-3.5 w-24" />
    <Skeleton className="h-3 w-16" />
  </div>
</div>`,
    },
  ],
  related_components: ["spinner", "avatar", "customer-card"],
};

export default skeletonDocs;
