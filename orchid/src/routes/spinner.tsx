import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import SpinnerDemoDocs from "../../content/docs/components/spinner.mdx";

export const Route = createFileRoute("/spinner")({
  component: SpinnerExamplesPage,
});

function SpinnerExamplesPage() {
  return (
    <DocExamplePage to="/spinner">
      <DocMdx>
        <SpinnerDemoDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
