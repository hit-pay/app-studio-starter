import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/docs/doc-example-page";
import { DocMdx } from "@/docs/doc-mdx";
import TooltipDemoDocs from "../../../docs/ui/tooltip.mdx";

export const Route = createFileRoute("/ui/tooltip")({
  component: TooltipExamplesPage,
});

function TooltipExamplesPage() {
  return (
    <DocExamplePage to="/ui/tooltip">
      <DocMdx>
        <TooltipDemoDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
