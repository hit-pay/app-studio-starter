import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/docs/doc-example-page";
import { DocMdx } from "@/docs/doc-mdx";
import MetricCardDemoDocs from "../../../docs/components/metric-card.mdx";

export const Route = createFileRoute("/components/metric-card")({
  component: MetricCardExamplesPage,
});

function MetricCardExamplesPage() {
  return (
    <DocExamplePage to="/components/metric-card">
      <DocMdx>
        <MetricCardDemoDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
