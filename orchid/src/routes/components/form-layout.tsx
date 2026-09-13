import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/docs/doc-example-page";
import { DocMdx } from "@/docs/doc-mdx";
import Docs from "../../../docs/components/form-layout.mdx";

export const Route = createFileRoute("/components/form-layout")({
  component: Page,
});

function Page() {
  return (
    <DocExamplePage to="/components/form-layout">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  );
}
