import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import StatCardDemoDocs from "../../content/docs/components/stat-card.mdx";

export const Route = createFileRoute("/stat-card")({
  component: StatCardExamplesPage,
});

function StatCardExamplesPage() {
  return (
    <DocExamplePage to="/stat-card">
      <DocMdx>
        <StatCardDemoDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
