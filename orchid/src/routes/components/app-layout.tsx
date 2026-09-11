import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import Docs from "../../../content/docs/components/app-layout.mdx";

export const Route = createFileRoute("/components/app-layout")({
  component: Page,
});

function Page() {
  return (
    <DocExamplePage to="/components/app-layout">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  );
}
