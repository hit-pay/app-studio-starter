import { createFileRoute } from "@tanstack/react-router";

import { ComponentCatalog } from "@/docs/component-catalog";
import { DocExamplePage } from "@/docs/doc-example-page";

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
