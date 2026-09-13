import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/docs/doc-example-page";
import { DocMdx } from "@/docs/doc-mdx";
import ButtonGroupDocs from "../../../docs/ui/button-group.mdx";

export const Route = createFileRoute("/ui/button-group")({
  component: ButtonGroupExamplesPage,
});

function ButtonGroupExamplesPage() {
  return (
    <DocExamplePage to="/ui/button-group">
      <DocMdx>
        <ButtonGroupDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
