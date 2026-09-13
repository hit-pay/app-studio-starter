import { createFileRoute } from "@tanstack/react-router";

import { ComponentCatalog } from "@/components/doc/component-catalog";
import { DocExamplePage } from "@/components/doc/doc-example-page";

export const Route = createFileRoute("/ui/")({
  component: BaseComponentsPage,
});

function BaseComponentsPage() {
  return (
    <DocExamplePage to="/ui">
      <ComponentCatalog catalog="base" />
    </DocExamplePage>
  );
}
