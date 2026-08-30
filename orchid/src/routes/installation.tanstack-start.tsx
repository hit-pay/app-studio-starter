import { createFileRoute } from "@tanstack/react-router";
import { DocExamplePage } from "@/components/doc/doc-example-page";
import { DocMdx } from "@/components/doc/doc-mdx";
import Docs from "../../content/docs/guides/installation-tanstack-start.mdx";

export const Route = createFileRoute("/installation/tanstack-start")({
  component: Page,
});

function Page() {
  return (
    <DocExamplePage to="/installation/tanstack-start">
      <DocMdx>
        <Docs />
      </DocMdx>
    </DocExamplePage>
  );
}
