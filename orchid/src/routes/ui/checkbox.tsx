import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/docs/doc-example-page";
import { DocMdx } from "@/docs/doc-mdx";
import CheckboxDocs from "../../../docs/ui/checkbox.mdx";

export const Route = createFileRoute("/ui/checkbox")({
  component: CheckboxExamplesPage,
});

function CheckboxExamplesPage() {
  return (
    <DocExamplePage to="/ui/checkbox">
      <DocMdx>
        <CheckboxDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
