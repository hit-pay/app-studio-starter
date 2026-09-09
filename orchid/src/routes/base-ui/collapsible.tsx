import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import CollapsibleDocs from "../../../content/docs/components/collapsible.mdx";

export const Route = createFileRoute("/base-ui/collapsible")({
  component: CollapsibleExamplesPage,
});

function CollapsibleExamplesPage() {
  return (
    <DocExamplePage to="/base-ui/collapsible">
      <DocMdx>
        <CollapsibleDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
