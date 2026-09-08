import { Link } from "@tanstack/react-router";

import { docAllComponentsByName } from "@/components/doc/doc-components";
import {
  ListItem,
  ListItemBody,
  ListItemDescription,
  ListItemTitle,
} from "@/components/ui/list-item";

function ComponentCatalog() {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {docAllComponentsByName().map((item) => (
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

export { ComponentCatalog };
