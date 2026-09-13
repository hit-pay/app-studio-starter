import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/docs/doc-example-page";
import { DocMdx } from "@/docs/doc-mdx";
import ChoiceCardDocs from "../../../docs/components/choice-card.mdx";

export const Route = createFileRoute("/components/choice-card")({
  component: ChoiceCardExamplesPage,
});

function ChoiceCardExamplesPage() {
  return (
    <DocExamplePage to="/components/choice-card">
      <DocMdx>
        <ChoiceCardDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
