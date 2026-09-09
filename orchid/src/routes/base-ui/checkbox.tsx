import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import CheckboxDocs from "../../../content/docs/components/checkbox.mdx";

export const Route = createFileRoute("/base-ui/checkbox")({
  component: CheckboxExamplesPage,
});

function CheckboxExamplesPage() {
  return (
    <DocExamplePage to="/base-ui/checkbox">
      <DocMdx>
        <CheckboxDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
