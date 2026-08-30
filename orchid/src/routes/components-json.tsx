import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import ComponentsJsonDocs from "../../content/docs/guides/components-json.mdx";

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
