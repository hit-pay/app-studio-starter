import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import TextareaDemoDocs from "../../content/docs/components/textarea.mdx";

export const Route = createFileRoute("/textarea")({
  component: TextareaExamplesPage,
});

function TextareaExamplesPage() {
  return (
    <DocExamplePage to="/textarea">
      <DocMdx>
        <TextareaDemoDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
