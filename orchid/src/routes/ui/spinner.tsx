import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/docs/doc-example-page";
import { DocMdx } from "@/docs/doc-mdx";
import SpinnerDemoDocs from "../../../docs/ui/spinner.mdx";

export const Route = createFileRoute("/ui/spinner")({
  component: SpinnerExamplesPage,
});

function SpinnerExamplesPage() {
  return (
    <DocExamplePage to="/ui/spinner">
      <DocMdx>
        <SpinnerDemoDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
