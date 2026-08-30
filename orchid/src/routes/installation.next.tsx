import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import Docs from "../../content/docs/guides/installation-next.mdx";

export const Route = createFileRoute("/installation/next")({
  component: Page,
});

function Page() {
  return (
    <DocExamplePage to="/installation/next">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  );
}
