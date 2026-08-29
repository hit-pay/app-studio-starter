import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import CollapsibleDocs from "../../content/docs/components/collapsible.mdx";

export const Route = createFileRoute("/collapsible")({
  component: CollapsibleExamplesPage,
});

function CollapsibleExamplesPage() {
  return (
    <DocExamplePage to="/collapsible">
      <DocMdx>
        <CollapsibleDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
