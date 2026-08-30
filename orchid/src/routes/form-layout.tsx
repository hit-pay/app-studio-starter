import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import Docs from "../../content/docs/components/form-layout.mdx";

export const Route = createFileRoute("/form-layout")({
  component: Page,
});

function Page() {
  return (
    <DocExamplePage to="/form-layout">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  );
}
