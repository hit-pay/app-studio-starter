import { createFileRoute } from "@tanstack/react-router";

import { ComponentCatalog } from "@/components/doc/component-catalog";
import { DocExamplePage } from "@/components/doc/doc-example-page";

export const Route = createFileRoute("/components/")({
  component: BlocksPage,
});

function BlocksPage() {
  return (
    <DocExamplePage to="/components">
      <ComponentCatalog catalog="blocks" />
    </DocExamplePage>
  );
}
