import { createFileRoute } from "@tanstack/react-router";

import { DocExamplePage } from "@/docs/doc-example-page";
import { DocMdx } from "@/docs/doc-mdx";
import HomeDocs from "../../docs/index.mdx";

export const Route = createFileRoute("/")({ component: IndexPage });

function IndexPage() {
  return (
    <DocExamplePage to="/">
      <DocMdx>
        <HomeDocs />
      </DocMdx>
    </DocExamplePage>
  );
}
