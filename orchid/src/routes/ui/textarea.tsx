import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/docs/doc-example-page";
import { DocMdx } from "@/docs/doc-mdx";
import TextareaDemoDocs from "../../../docs/ui/textarea.mdx";

export const Route = createFileRoute("/ui/textarea")({
  component: TextareaExamplesPage,
});

function TextareaExamplesPage() {
  return (
    <DocExamplePage to="/ui/textarea">
      <DocMdx>
        <TextareaDemoDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
