import { Link } from "@tanstack/react-router";

import {
  DOC_BASE_GROUPS,
  DOC_BLOCK_GROUPS,
} from "@/components/doc/doc-components";
import {
  ListItem,
  ListItemBody,
  ListItemDescription,
  ListItemTitle,
} from "@ui/displaying-data/list";

function CatalogGrid({
  items,
}: {
  items: readonly { to: string; name: string; description: string }[];
}) {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <Link key={item.to} to={item.to} className="block min-w-0">
          <ListItem className="h-full">
            <ListItemBody>
              <ListItemTitle>{item.name}</ListItemTitle>
              <ListItemDescription className="text-oc-muted-foreground">
                {item.description}
              </ListItemDescription>
            </ListItemBody>
          </ListItem>
        </Link>
      ))}
    </div>
  );
}

function CatalogSection({
  title,
  description,
  groups,
}: {
  title: string;
  description?: string;
  groups: readonly {
    label: string;
    items: readonly { to: string; name: string; description: string }[];
  }[];
}) {
  return (
    <section className="grid gap-6">
      <div className="grid gap-1">
        <h2 className="text-sm font-medium text-oc-foreground">{title}</h2>
        {description ? (
          <p className="text-sm text-oc-muted-foreground">{description}</p>
        ) : null}
      </div>
      {groups.map((group) => (
        <div key={group.label} className="grid gap-3">
          <h3 className="text-xs font-medium tracking-[0.16em] text-oc-muted-foreground uppercase">
            {group.label}
          </h3>
          <CatalogGrid items={group.items} />
        </div>
      ))}
    </section>
  );
}

function ComponentCatalog({
  catalog,
}: {
  catalog: "blocks" | "base";
}) {
  if (catalog === "base") {
    return (
      <div className="grid gap-8">
        <CatalogSection title="Base Components" groups={DOC_BASE_GROUPS} />
      </div>
    );
  }

  return (
    <div className="grid gap-8">
      <CatalogSection
        title="Components & Blocks"
        description="Read these first. Ready-to-use blocks driven by props or a schema. Do not assemble them from many base components."
        groups={DOC_BLOCK_GROUPS}
      />
    </div>
  );
}

export { ComponentCatalog };
