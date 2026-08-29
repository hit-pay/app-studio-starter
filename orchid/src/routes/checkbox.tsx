import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import CheckboxDocs from "../../content/docs/components/checkbox.mdx";

export const Route = createFileRoute("/checkbox")({
  component: CheckboxExamplesPage,
});

function CheckboxExamplesPage() {
  return (
    <DocExamplePage to="/checkbox">
      <DocMdx>
        <CheckboxDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
