import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import ToastDemoDocs from "../../content/docs/components/toast.mdx";

export const Route = createFileRoute("/toast")({
  component: ToastExamplesPage,
});

function ToastExamplesPage() {
  return (
    <DocExamplePage to="/toast">
      <DocMdx>
        <ToastDemoDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
