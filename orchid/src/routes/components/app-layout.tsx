import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/docs/doc-example-page";
import { DocMdx } from "@/docs/doc-mdx";
import Docs from "../../../docs/components/app-layout.mdx";

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
