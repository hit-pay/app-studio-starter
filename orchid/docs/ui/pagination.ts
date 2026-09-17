// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const paginationRegistry = registry.items.find(
  (item: { name: string }) => item.name === "pagination",
);

const paginationDocs = {
  ...paginationRegistry,
  category: "ui",
  props: {
    isActive: "boolean",
    size: ["default", "icon"],
  },
  examples: [
    {
      description: "Page links",
      code: `<Pagination>
  <PaginationPrevious href="?page=1" aria-disabled />
  <PaginationContent>
    <PaginationItem>
      <PaginationLink href="?page=1" isActive>
        1
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="?page=2">2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="?page=3">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="?page=15">15</PaginationLink>
    </PaginationItem>
  </PaginationContent>
  <PaginationNext href="?page=2" />
</Pagination>`,
    },
    {
      description: "With range label",
      code: `<div className="flex w-full flex-wrap items-center justify-between gap-4">
  <PaginationInfo>Showing 11–20 of 80 invoices</PaginationInfo>
  <Pagination className="w-auto justify-end">
    <PaginationPrevious href="?page=1" />
    <PaginationContent>
      <PaginationItem>
        <PaginationLink href="?page=1">1</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="?page=2" isActive>
          2
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="?page=3">3</PaginationLink>
      </PaginationItem>
    </PaginationContent>
    <PaginationNext href="?page=3" />
  </Pagination>
</div>`,
    },
  ],
  related_components: ["data-table", "button"],
};

export default paginationDocs;
