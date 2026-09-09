import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import TooltipDemoDocs from "../../../content/docs/components/tooltip.mdx";

export const Route = createFileRoute("/base-ui/tooltip")({
  component: TooltipExamplesPage,
});

function TooltipExamplesPage() {
  return (
    <DocExamplePage to="/base-ui/tooltip">
      <DocMdx>
        <TooltipDemoDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
