import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/docs/doc-example-page";
import { DocMdx } from "@/docs/doc-mdx";
import Docs from "../../../docs/components/page-layout.mdx";

export const Route = createFileRoute("/components/page-layout")({
  component: PageLayout,
});

function PageLayout() {
  return (
    <DocExamplePage to="/components/page-layout">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  );
}
