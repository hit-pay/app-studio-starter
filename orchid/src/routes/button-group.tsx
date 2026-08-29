import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import ButtonGroupDocs from "../../content/docs/components/button-group.mdx";

export const Route = createFileRoute("/button-group")({
  component: ButtonGroupExamplesPage,
});

function ButtonGroupExamplesPage() {
  return (
    <DocExamplePage to="/button-group">
      <DocMdx>
        <ButtonGroupDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
