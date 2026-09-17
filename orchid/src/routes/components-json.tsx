import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/docs/doc-example-page";
import { DocMdx } from "@/docs/doc-mdx";
import ComponentsJsonDocs from "../../docs/guides/components-json.mdx";

export const Route = createFileRoute("/components-json")({
  component: ComponentsJsonPage,
});

function ComponentsJsonPage() {
  return (
    <DocExamplePage to="/components-json">
      <DocMdx>
        <ComponentsJsonDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
