import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import ScrollAreaDemoDocs from "../../../content/docs/components/scroll-area.mdx";

export const Route = createFileRoute("/base-ui/scroll-area")({
  component: ScrollAreaExamplesPage,
});

function ScrollAreaExamplesPage() {
  return (
    <DocExamplePage to="/base-ui/scroll-area">
      <DocMdx>
        <ScrollAreaDemoDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
