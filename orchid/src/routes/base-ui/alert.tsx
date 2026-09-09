import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import AlertDocs from "../../../content/docs/components/alert.mdx";

export const Route = createFileRoute("/base-ui/alert")({
  component: AlertExamplesPage,
});

function AlertExamplesPage() {
  return (
    <DocExamplePage to="/base-ui/alert">
      <DocMdx>
        <AlertDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
