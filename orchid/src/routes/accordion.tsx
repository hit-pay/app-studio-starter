import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import AccordionDocs from "../../content/docs/components/accordion.mdx";

export const Route = createFileRoute("/accordion")({
  component: AccordionExamplesPage,
});

function AccordionExamplesPage() {
  return (
    <DocExamplePage to="/accordion">
      <DocMdx>
        <AccordionDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
