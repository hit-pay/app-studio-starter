import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import SelectDemoDocs from "../../content/docs/components/select.mdx";

export const Route = createFileRoute("/select")({
  component: SelectExamplesPage,
});

function SelectExamplesPage() {
  return (
    <DocExamplePage to="/select">
      <DocMdx>
        <SelectDemoDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
