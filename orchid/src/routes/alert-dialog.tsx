import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import AlertDialogDocs from "../../content/docs/components/alert-dialog.mdx";

export const Route = createFileRoute("/alert-dialog")({
  component: AlertDialogExamplesPage,
});

function AlertDialogExamplesPage() {
  return (
    <DocExamplePage to="/alert-dialog">
      <DocMdx>
        <AlertDialogDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
