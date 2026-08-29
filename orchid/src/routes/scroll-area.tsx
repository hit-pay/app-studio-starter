import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import ScrollAreaDemoDocs from "../../content/docs/components/scroll-area.mdx";

export const Route = createFileRoute("/scroll-area")({
  component: ScrollAreaExamplesPage,
});

function ScrollAreaExamplesPage() {
  return (
    <DocExamplePage to="/scroll-area">
      <DocMdx>
        <ScrollAreaDemoDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
