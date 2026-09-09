import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import MetricCardDemoDocs from "../../../content/docs/components/metric-card.mdx";

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
