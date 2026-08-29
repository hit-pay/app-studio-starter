import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import TooltipDemoDocs from "../../content/docs/components/tooltip.mdx";

export const Route = createFileRoute("/tooltip")({
  component: TooltipExamplesPage,
});

function TooltipExamplesPage() {
  return (
    <DocExamplePage to="/tooltip">
      <DocMdx>
        <TooltipDemoDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
