import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/docs/doc-example-page";
import { DocMdx } from "@/docs/doc-mdx";
import ToastDemoDocs from "../../../docs/ui/toast.mdx";

export const Route = createFileRoute("/ui/toast")({
  component: ToastExamplesPage,
});

function ToastExamplesPage() {
  return (
    <DocExamplePage to="/ui/toast">
      <DocMdx>
        <ToastDemoDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
