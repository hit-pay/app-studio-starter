import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import Docs from "../../content/docs/components/page-layout.mdx";

export const Route = createFileRoute("/page-layout")({
  component: PageLayout,
});

function PageLayout() {
  return (
    <DocExamplePage to="/page-layout">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  );
}
