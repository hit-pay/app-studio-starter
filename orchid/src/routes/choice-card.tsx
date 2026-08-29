import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import ChoiceCardDocs from "../../content/docs/components/choice-card.mdx";

export const Route = createFileRoute("/choice-card")({
  component: ChoiceCardExamplesPage,
});

function ChoiceCardExamplesPage() {
  return (
    <DocExamplePage to="/choice-card">
      <DocMdx>
        <ChoiceCardDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
