import { createFileRoute } from "@tanstack/react-router";

import { ComponentCatalog } from "@/docs/component-catalog";
import { DocExamplePage } from "@/docs/doc-example-page";

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
