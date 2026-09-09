import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import TextareaDemoDocs from "../../../content/docs/components/textarea.mdx";

export const Route = createFileRoute("/base-ui/textarea")({
  component: TextareaExamplesPage,
});

function TextareaExamplesPage() {
  return (
    <DocExamplePage to="/base-ui/textarea">
      <DocMdx>
        <TextareaDemoDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
