import { Link } from "@tanstack/react-router";

import {
  docBlocksByName,
  docComponentsByName,
  docFormsByName,
} from "@/components/doc/doc-components";
import {
  ListItem,
  ListItemBody,
  ListItemDescription,
  ListItemTitle,
} from "@/components/ui/list-item";

function CatalogGroup({
  title,
  items,
}: {
  title: string;
  items: readonly { to: string; name: string; description: string }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
        {title}
      </h2>
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
    </div>
  );
}

function ComponentCatalog() {
  return (
    <div className="flex flex-col gap-10">
      <CatalogGroup title="Component" items={docComponentsByName()} />
      <CatalogGroup title="Form" items={docFormsByName()} />
      <CatalogGroup title="Block" items={docBlocksByName()} />
    </div>
  );
}

export { ComponentCatalog };
