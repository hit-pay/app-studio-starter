import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import AccordionDocs from "../../../content/docs/components/accordion.mdx";

export const Route = createFileRoute("/base-ui/accordion")({
  component: AccordionExamplesPage,
});

function AccordionExamplesPage() {
  return (
    <DocExamplePage to="/base-ui/accordion">
      <DocMdx>
        <AccordionDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
