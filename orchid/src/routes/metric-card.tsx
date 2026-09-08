import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import MetricCardDemoDocs from "../../content/docs/components/metric-card.mdx";

export const Route = createFileRoute("/metric-card")({
  component: MetricCardExamplesPage,
});

function MetricCardExamplesPage() {
  return (
    <DocExamplePage to="/metric-card">
      <DocMdx>
        <MetricCardDemoDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
