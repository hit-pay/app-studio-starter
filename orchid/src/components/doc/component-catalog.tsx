import { Link } from "@tanstack/react-router";

import {
  docBaseComponentsByName,
  docBlocksByName,
} from "@/components/doc/doc-components";
import {
  ListItem,
  ListItemBody,
  ListItemDescription,
  ListItemTitle,
} from "@/components/ui/list-item";

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

function ComponentCatalog() {
  return (
    <div className="grid gap-8">
      <section className="grid gap-3">
        <h2 className="text-sm font-medium text-oc-foreground">
          Base Components
        </h2>
        <CatalogGrid items={docBaseComponentsByName()} />
      </section>
      <section className="grid gap-3">
        <h2 className="text-sm font-medium text-oc-foreground">
          Components & Block
        </h2>
        <p className="text-sm text-oc-muted-foreground">
          Ready-to-use blocks. Drive them with props or a schema; do not
          assemble them from many base components.
        </p>
        <CatalogGrid items={docBlocksByName()} />
      </section>
    </div>
  );
}

export { ComponentCatalog };
